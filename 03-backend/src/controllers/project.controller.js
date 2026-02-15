const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get all projects for the current user with pagination and filters
 * @route GET /api/projects
 * @query page - Page number (default: 1)
 * @query limit - Items per page (default: 10, max: 100)
 * @query status - Filter by status
 * @query productType - Filter by product type
 * @query userId - Filter by user (admin only)
 * @query search - Search in projectNumber, customerName, description
 */
const getAllProjects = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      productType, 
      userId,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Parse pagination parameters
    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 100); // Max 100 items per page
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where = {};
    
    // Regular users can only see their own projects
    // Admins can filter by userId or see all
    if (req.user.role === 'ADMIN' && userId) {
      where.userId = userId;
    } else {
      where.userId = req.user.id;
    }

    if (status) {
      where.status = status;
    }

    if (productType) {
      where.productType = productType;
    }

    if (search) {
      where.OR = [
        { projectNumber: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Execute count and find in parallel for better performance
    const [totalCount, projects] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limitNum,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          technicalParameters: {
            select: {
              id: true,
              materialGrade: true,
              materialCategory: true,
              diameterMm: true,
              lengthMm: true
            }
          },
          _count: {
            select: { 
              activities: true,
              projectScopes: true
            }
          }
        }
      })
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.json({
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        projects,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          limit: limitNum,
          hasNextPage,
          hasPrevPage
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get project by ID with all related data
 * @route GET /api/projects/:id
 */
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        // Admin can view any project, others only their own
        ...(req.user.role !== 'ADMIN' && { userId: req.user.id })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        technicalParameters: true,
        projectScopes: {
          include: {
            scopeType: true
          },
          orderBy: {
            scopeType: {
              displayOrder: 'asc'
            }
          }
        },
        activities: {
          orderBy: { displayOrder: 'asc' },
          include: {
            weldingProcess: true,
            scope: {
              include: {
                scopeType: true
              }
            }
          }
        },
        _count: {
          select: {
            activities: true,
            projectScopes: true
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project retrieved successfully',
      data: { project }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new project
 * @route POST /api/projects
 */
const createProject = async (req, res, next) => {
  try {
    const { projectNumber, customerName, productType, description, quantity } = req.body;

    // Check if project number already exists
    const existingProject = await prisma.project.findUnique({
      where: { projectNumber }
    });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'A project with this project number already exists'
      });
    }

    const project = await prisma.project.create({
      data: {
        projectNumber,
        customerName,
        productType,
        description,
        quantity: quantity || 1,
        userId: req.user.id,
        status: 'DRAFT'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        projectScopes: {
          include: { scopeType: true }
        },
        _count: {
          select: {
            activities: true,
            projectScopes: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update project
 * @route PUT /api/projects/:id
 */
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customerName, description, quantity, status } = req.body;

    // Build update data dynamically
    const updateData = {};
    if (customerName !== undefined) updateData.customerName = customerName;
    if (description !== undefined) updateData.description = description;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (status !== undefined) updateData.status = status;

    // Verify project exists and belongs to user (or admin)
    const whereClause = { id };
    if (req.user.role !== 'ADMIN') {
      whereClause.userId = req.user.id;
    }

    const existingProject = await prisma.project.findFirst({
      where: whereClause
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        technicalParameters: true,
        projectScopes: {
          include: { scopeType: true }
        },
        _count: {
          select: {
            activities: true,
            projectScopes: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: { project }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete project
 * @route DELETE /api/projects/:id
 */
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify project exists and belongs to user (or admin)
    const whereClause = { id };
    if (req.user.role !== 'ADMIN') {
      whereClause.userId = req.user.id;
    }

    const existingProject = await prisma.project.findFirst({
      where: whereClause
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    await prisma.project.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: {
        deletedProjectId: id
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Save technical parameters for a project
 * @route POST /api/projects/:id/technical-parameters
 */
const saveTechnicalParameters = async (req, res, next) => {
  try {
    const { id } = req.params;
    const params = req.body;

    // Verify project exists and belongs to user (or admin)
    const whereClause = { id };
    if (req.user.role !== 'ADMIN') {
      whereClause.userId = req.user.id;
    }

    const project = await prisma.project.findFirst({
      where: whereClause
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    // Upsert technical parameters
    const technicalParameters = await prisma.technicalParameters.upsert({
      where: { projectId: id },
      create: {
        projectId: id,
        ...params
      },
      update: params
    });

    res.json({
      success: true,
      message: 'Technical parameters saved successfully',
      data: { technicalParameters }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Save scope selections for a project
 * @route POST /api/projects/:id/scopes
 */
const saveScopeSelections = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { scopeSelections } = req.body; // Array of { scopeTypeId, isSelected, notes }

    if (!Array.isArray(scopeSelections)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'scopeSelections must be an array'
      });
    }

    // Verify project exists and belongs to user (or admin)
    const whereClause = { id };
    if (req.user.role !== 'ADMIN') {
      whereClause.userId = req.user.id;
    }

    const project = await prisma.project.findFirst({
      where: whereClause
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    // Use transaction to update scope selections
    const results = await prisma.$transaction(
      scopeSelections.map(selection => 
        prisma.projectScope.upsert({
          where: {
            projectId_scopeTypeId: {
              projectId: id,
              scopeTypeId: selection.scopeTypeId
            }
          },
          create: {
            projectId: id,
            scopeTypeId: selection.scopeTypeId,
            isSelected: selection.isSelected,
            notes: selection.notes
          },
          update: {
            isSelected: selection.isSelected,
            notes: selection.notes
          }
        })
      )
    );

    res.json({
      success: true,
      message: 'Scope selections saved successfully',
      data: { scopeSelections: results }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  saveTechnicalParameters,
  saveScopeSelections
};
