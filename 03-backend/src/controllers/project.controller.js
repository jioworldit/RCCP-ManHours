const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get all projects for the current user
 */
const getAllProjects = async (req, res, next) => {
  try {
    const { status, productType, search } = req.query;

    // Build where clause
    const where = {
      userId: req.user.id
    };

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

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { activities: true }
        }
      }
    });

    res.json({
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get project by ID with all related data
 */
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: req.user.id
      },
      include: {
        technicalParameters: true,
        projectScopes: {
          include: {
            scopeType: true
          }
        },
        activities: {
          orderBy: { displayOrder: 'asc' }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new project
 */
const createProject = async (req, res, next) => {
  try {
    const { projectNumber, customerName, productType, description, quantity } = req.body;

    const project = await prisma.project.create({
      data: {
        projectNumber,
        customerName,
        productType,
        description,
        quantity: quantity || 1,
        userId: req.user.id
      },
      include: {
        projectScopes: {
          include: { scopeType: true }
        }
      }
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update project
 */
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customerName, description, quantity, status } = req.body;

    // Verify project exists and belongs to user
    const existingProject = await prisma.project.findFirst({
      where: { id, userId: req.user.id }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        customerName,
        description,
        quantity,
        status
      }
    });

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete project
 */
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify project exists and belongs to user
    const existingProject = await prisma.project.findFirst({
      where: { id, userId: req.user.id }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Project not found'
      });
    }

    await prisma.project.delete({
      where: { id }
    });

    res.json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Save technical parameters for a project
 */
const saveTechnicalParameters = async (req, res, next) => {
  try {
    const { id } = req.params;
    const params = req.body;

    // Verify project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: { id, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({
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
      message: 'Technical parameters saved successfully',
      technicalParameters
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Save scope selections for a project
 */
const saveScopeSelections = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { scopeSelections } = req.body; // Array of { scopeTypeId, isSelected, notes }

    // Verify project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: { id, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({
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
      message: 'Scope selections saved successfully',
      scopeSelections: results
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
