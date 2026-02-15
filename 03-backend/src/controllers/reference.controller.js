const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get all material grades
 */
const getMaterialGrades = async (req, res, next) => {
  try {
    const grades = await prisma.materialGrade.findMany({
      where: { isActive: true },
      orderBy: { gradeCode: 'asc' }
    });

    res.json({
      count: grades.length,
      grades
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all welding processes
 */
const getWeldingProcesses = async (req, res, next) => {
  try {
    const processes = await prisma.weldingProcess.findMany({
      where: { isActive: true },
      orderBy: { processCode: 'asc' }
    });

    res.json({
      count: processes.length,
      processes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all scope types
 */
const getScopeTypes = async (req, res, next) => {
  try {
    const scopeTypes = await prisma.scopeType.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' }
    });

    res.json({
      count: scopeTypes.length,
      scopeTypes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get calculation rules
 */
const getCalculationRules = async (req, res, next) => {
  try {
    const { productType, scopeTypeCode } = req.query;

    const where = { isActive: true };

    if (productType) {
      where.OR = [
        { productType },
        { productType: null }
      ];
    }

    if (scopeTypeCode) {
      where.scopeTypeCode = scopeTypeCode;
    }

    const rules = await prisma.calculationRule.findMany({
      where,
      orderBy: { priority: 'asc' }
    });

    res.json({
      count: rules.length,
      rules
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterialGrades,
  getWeldingProcesses,
  getScopeTypes,
  getCalculationRules
};
