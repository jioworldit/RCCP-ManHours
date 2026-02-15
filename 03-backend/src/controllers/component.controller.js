const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get all components for a project
 * @route GET /api/projects/:id/components
 */
const getComponents = async (req, res, next) => {
  try {
    const { id } = req.params;

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

    const components = await prisma.component.findMany({
      where: { projectId: id },
      orderBy: { createdAt: 'asc' }
    });

    res.json({
      success: true,
      message: 'Components retrieved successfully',
      data: { components }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new component
 * @route POST /api/projects/:id/components
 */
const createComponent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, thicknessMm, material } = req.body;

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

    const component = await prisma.component.create({
      data: {
        projectId: id,
        name,
        category,
        quantity: quantity || 1,
        thicknessMm: thicknessMm ? parseFloat(thicknessMm) : null,
        material
      }
    });

    res.status(201).json({
      success: true,
      message: 'Component created successfully',
      data: { component }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a component
 * @route PUT /api/components/:componentId
 */
const updateComponent = async (req, res, next) => {
  try {
    const { componentId } = req.params;
    const { name, category, quantity, thicknessMm, material } = req.body;

    // Verify component exists and user has access
    const component = await prisma.component.findFirst({
      where: { id: componentId },
      include: { project: true }
    });

    if (!component) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Component not found'
      });
    }

    // Check user has access to this project's components
    if (req.user.role !== 'ADMIN' && component.project.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: 'Access denied'
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (quantity !== undefined) updateData.quantity = parseInt(quantity);
    if (thicknessMm !== undefined) updateData.thicknessMm = thicknessMm ? parseFloat(thicknessMm) : null;
    if (material !== undefined) updateData.material = material;

    const updatedComponent = await prisma.component.update({
      where: { id: componentId },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Component updated successfully',
      data: { component: updatedComponent }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a component
 * @route DELETE /api/components/:componentId
 */
const deleteComponent = async (req, res, next) => {
  try {
    const { componentId } = req.params;

    // Verify component exists and user has access
    const component = await prisma.component.findFirst({
      where: { id: componentId },
      include: { project: true }
    });

    if (!component) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Component not found'
      });
    }

    // Check user has access to this project's components
    if (req.user.role !== 'ADMIN' && component.project.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: 'Access denied'
      });
    }

    await prisma.component.delete({
      where: { id: componentId }
    });

    res.json({
      success: true,
      message: 'Component deleted successfully',
      data: { deletedComponentId: componentId }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Save all components for a project (batch update)
 * @route POST /api/projects/:id/components/batch
 */
const saveComponents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { components } = req.body; // Array of components

    if (!Array.isArray(components)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'components must be an array'
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

    // Use transaction to handle all component operations
    const results = await prisma.$transaction(async (tx) => {
      // Delete existing components for this project
      await tx.component.deleteMany({
        where: { projectId: id }
      });

      // Create new components
      const createdComponents = [];
      for (const comp of components) {
        const created = await tx.component.create({
          data: {
            projectId: id,
            name: comp.name,
            category: comp.category,
            quantity: comp.quantity || 1,
            thicknessMm: comp.thicknessMm ? parseFloat(comp.thicknessMm) : null,
            material: comp.material
          }
        });
        createdComponents.push(created);
      }
      return createdComponents;
    });

    res.json({
      success: true,
      message: 'Components saved successfully',
      data: { components: results }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getComponents,
  createComponent,
  updateComponent,
  deleteComponent,
  saveComponents
};
