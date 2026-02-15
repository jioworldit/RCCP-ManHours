const { PrismaClient, MaterialCategory, ProcessType, ScopeCategory, ProductType } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create default users
  console.log('Creating users...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@rccp.local' },
    update: {},
    create: {
      email: 'admin@rccp.local',
      password: adminPassword,
      name: 'System Administrator',
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'engineer@rccp.local' },
    update: {},
    create: {
      email: 'engineer@rccp.local',
      password: userPassword,
      name: 'Lead Engineer',
      role: 'ENGINEER',
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@rccp.local' },
    update: {},
    create: {
      email: 'user@rccp.local',
      password: userPassword,
      name: 'Standard User',
      role: 'USER',
    },
  });

  // 2. Seed material grades
  console.log('Creating material grades...');
  const materialGrades = [
    {
      gradeCode: 'SA516_Gr70',
      gradeName: 'SA-516 Grade 70',
      category: MaterialCategory.CS,
      cuttingFactor: 1.00,
      fitupFactor: 1.00,
      weldingFactor: 1.00,
      ndtFactor: 1.00,
      densityKgM3: 7850,
      typicalThicknessRangeMm: '6-150',
    },
    {
      gradeCode: 'SA516_Gr60',
      gradeName: 'SA-516 Grade 60',
      category: MaterialCategory.CS,
      cuttingFactor: 1.00,
      fitupFactor: 1.00,
      weldingFactor: 1.00,
      ndtFactor: 1.00,
      densityKgM3: 7850,
      typicalThicknessRangeMm: '6-150',
    },
    {
      gradeCode: 'SS304',
      gradeName: 'Stainless Steel 304',
      category: MaterialCategory.SS,
      cuttingFactor: 1.20,
      fitupFactor: 1.15,
      weldingFactor: 1.30,
      ndtFactor: 1.10,
      densityKgM3: 8000,
      typicalThicknessRangeMm: '3-50',
    },
    {
      gradeCode: 'SS316',
      gradeName: 'Stainless Steel 316',
      category: MaterialCategory.SS,
      cuttingFactor: 1.25,
      fitupFactor: 1.20,
      weldingFactor: 1.35,
      ndtFactor: 1.10,
      densityKgM3: 8000,
      typicalThicknessRangeMm: '3-50',
    },
    {
      gradeCode: 'SS316L',
      gradeName: 'Stainless Steel 316L',
      category: MaterialCategory.SS,
      cuttingFactor: 1.25,
      fitupFactor: 1.20,
      weldingFactor: 1.35,
      ndtFactor: 1.10,
      densityKgM3: 8000,
      typicalThicknessRangeMm: '3-50',
    },
    {
      gradeCode: 'SA387_Gr11',
      gradeName: 'SA-387 Grade 11 (1.25Cr-0.5Mo)',
      category: MaterialCategory.ALLOY,
      cuttingFactor: 1.30,
      fitupFactor: 1.25,
      weldingFactor: 1.50,
      ndtFactor: 1.20,
      densityKgM3: 7850,
      typicalThicknessRangeMm: '10-100',
    },
    {
      gradeCode: 'SA387_Gr22',
      gradeName: 'SA-387 Grade 22 (2.25Cr-1Mo)',
      category: MaterialCategory.ALLOY,
      cuttingFactor: 1.35,
      fitupFactor: 1.30,
      weldingFactor: 1.60,
      ndtFactor: 1.25,
      densityKgM3: 7850,
      typicalThicknessRangeMm: '10-150',
    },
    {
      gradeCode: 'DUPLEX_2205',
      gradeName: 'Duplex Stainless 2205',
      category: MaterialCategory.DUPLEX,
      cuttingFactor: 1.50,
      fitupFactor: 1.45,
      weldingFactor: 1.80,
      ndtFactor: 1.30,
      densityKgM3: 7800,
      typicalThicknessRangeMm: '3-100',
    },
    {
      gradeCode: 'DUPLEX_2507',
      gradeName: 'Super Duplex 2507',
      category: MaterialCategory.DUPLEX,
      cuttingFactor: 1.60,
      fitupFactor: 1.55,
      weldingFactor: 2.00,
      ndtFactor: 1.35,
      densityKgM3: 7800,
      typicalThicknessRangeMm: '3-100',
    },
  ];

  for (const grade of materialGrades) {
    await prisma.materialGrade.upsert({
      where: { gradeCode: grade.gradeCode },
      update: {},
      create: grade,
    });
  }

  // 3. Seed welding processes
  console.log('Creating welding processes...');
  const weldingProcesses = [
    {
      processCode: 'SMAW',
      processName: 'Shielded Metal Arc Welding',
      processType: ProcessType.MANUAL,
      depositRateKgHr: 1.5,
      efficiencyFactor: 0.75,
      setupTimeMinutes: 10,
      applicableMaterials: 'CS, SS, Alloy',
      typicalThicknessRangeMm: '3-50',
    },
    {
      processCode: 'GTAW',
      processName: 'Gas Tungsten Arc Welding',
      processType: ProcessType.MANUAL,
      depositRateKgHr: 0.8,
      efficiencyFactor: 0.85,
      setupTimeMinutes: 15,
      applicableMaterials: 'CS, SS, Alloy, Duplex',
      typicalThicknessRangeMm: '1-25',
    },
    {
      processCode: 'GMAW',
      processName: 'Gas Metal Arc Welding',
      processType: ProcessType.SEMI_AUTO,
      depositRateKgHr: 3.0,
      efficiencyFactor: 0.90,
      setupTimeMinutes: 10,
      applicableMaterials: 'CS, SS, Aluminum',
      typicalThicknessRangeMm: '1-50',
    },
    {
      processCode: 'FCAW',
      processName: 'Flux Cored Arc Welding',
      processType: ProcessType.SEMI_AUTO,
      depositRateKgHr: 3.5,
      efficiencyFactor: 0.85,
      setupTimeMinutes: 10,
      applicableMaterials: 'CS, Alloy',
      typicalThicknessRangeMm: '5-100',
    },
    {
      processCode: 'SAW',
      processName: 'Submerged Arc Welding',
      processType: ProcessType.AUTO,
      depositRateKgHr: 8.0,
      efficiencyFactor: 0.95,
      setupTimeMinutes: 30,
      applicableMaterials: 'CS',
      typicalThicknessRangeMm: '10-200',
    },
  ];

  for (const process of weldingProcesses) {
    await prisma.weldingProcess.upsert({
      where: { processCode: process.processCode },
      update: {},
      create: process,
    });
  }

  // 4. Seed scope types
  console.log('Creating scope types...');
  const scopeTypes = [
    {
      code: 'MAT_HANDLING',
      name: 'Material Handling',
      category: ScopeCategory.PREPARATION,
      description: 'Receipt, storage, and movement of materials',
      displayOrder: 1,
      requiresWelding: false,
      requiresNdt: false,
    },
    {
      code: 'MARKING',
      name: 'Marking & Cutting',
      category: ScopeCategory.PREPARATION,
      description: 'Layout, marking, and cutting operations',
      displayOrder: 2,
      requiresWelding: false,
      requiresNdt: false,
    },
    {
      code: 'FITUP',
      name: 'Fit-up Assembly',
      category: ScopeCategory.FABRICATION,
      description: 'Component fitting and tack welding',
      displayOrder: 3,
      requiresWelding: true,
      requiresNdt: false,
    },
    {
      code: 'WELDING',
      name: 'Welding Operations',
      category: ScopeCategory.FABRICATION,
      description: 'All welding processes',
      displayOrder: 4,
      requiresWelding: true,
      requiresNdt: true,
    },
    {
      code: 'NDT',
      name: 'Non-Destructive Testing',
      category: ScopeCategory.TESTING,
      description: 'RT, UT, PT, MT examinations',
      displayOrder: 5,
      requiresWelding: false,
      requiresNdt: true,
    },
    {
      code: 'HYDROTEST',
      name: 'Hydrostatic Testing',
      category: ScopeCategory.TESTING,
      description: 'Pressure testing',
      displayOrder: 6,
      requiresWelding: false,
      requiresNdt: false,
    },
    {
      code: 'HEAT_TREAT',
      name: 'Heat Treatment',
      category: ScopeCategory.FABRICATION,
      description: 'Stress relieving, PWHT',
      displayOrder: 7,
      requiresWelding: false,
      requiresNdt: false,
    },
    {
      code: 'PAINTING',
      name: 'Painting & Coating',
      category: ScopeCategory.FINISHING,
      description: 'Surface preparation and painting',
      displayOrder: 8,
      requiresWelding: false,
      requiresNdt: false,
    },
    {
      code: 'PACKING',
      name: 'Packing & Despatch',
      category: ScopeCategory.FINISHING,
      description: 'Final packing and shipment',
      displayOrder: 9,
      requiresWelding: false,
      requiresNdt: false,
    },
  ];

  for (const scope of scopeTypes) {
    await prisma.scopeType.upsert({
      where: { code: scope.code },
      update: {},
      create: scope,
    });
  }

  // 5. Seed calculation rules
  console.log('Creating calculation rules...');
  const calculationRules = [
    {
      ruleName: 'Material Receipt and Handling',
      ruleCode: 'GEN-101',
      description: 'Material receipt, inspection and storage operations',
      scopeTypeCode: 'MAT_HANDLING',
      productType: null,
      materialCategory: null,
      activityCodePattern: 'M-101',
      activityDescriptionTemplate: 'Material Receipt, Inspection and Storage',
      baseHoursFormula: '({weight_tons} * 0.5) * {material_cutting_factor}',
      requiredParameters: ['weight_tons', 'material_cutting_factor'],
      defaultDifficultyFactor: 1.0,
      defaultEfficiencyFactor: 0.90,
      priority: 100,
    },
    {
      ruleName: 'Marking and Cutting',
      ruleCode: 'GEN-102',
      description: 'Layout, marking and cutting operations',
      scopeTypeCode: 'MARKING',
      productType: null,
      materialCategory: null,
      activityCodePattern: 'M-102',
      activityDescriptionTemplate: 'Layout, Marking and Cutting',
      baseHoursFormula: '({weight_tons} * 2.0) * {material_cutting_factor}',
      requiredParameters: ['weight_tons', 'material_cutting_factor'],
      defaultDifficultyFactor: 1.1,
      defaultEfficiencyFactor: 0.85,
      priority: 100,
    },
    {
      ruleName: 'Shell Fit-Up and Tack Welding',
      ruleCode: 'FAB-101',
      description: 'Shell course fit-up and tack weld operations',
      scopeTypeCode: 'FITUP',
      productType: ProductType.Vessel,
      materialCategory: null,
      activityCodePattern: 'F-101',
      activityDescriptionTemplate: 'Shell Course Fit-Up and Tack Weld',
      baseHoursFormula: '((3.14159 * {diameter_mm} / 1000) * 0.8) * ({thickness_mm} <= 12 ? 1.0 : ({thickness_mm} <= 25 ? 1.2 : ({thickness_mm} <= 50 ? 1.5 : 2.0))) * {material_fitup_factor}',
      requiredParameters: ['diameter_mm', 'thickness_mm', 'material_fitup_factor'],
      defaultDifficultyFactor: 1.1,
      defaultEfficiencyFactor: 0.85,
      priority: 90,
    },
    {
      ruleName: 'Shell Longitudinal Welding',
      ruleCode: 'VES-101',
      description: 'Shell longitudinal seam welding',
      scopeTypeCode: 'WELDING',
      productType: ProductType.Vessel,
      materialCategory: null,
      activityCodePattern: 'W-101',
      activityDescriptionTemplate: 'Shell Longitudinal Seam Welding',
      baseHoursFormula: '({weld_length_m} * 0.5) * ({thickness_mm} <= 12 ? 1.0 : ({thickness_mm} <= 25 ? 1.3 : ({thickness_mm} <= 50 ? 1.8 : 2.5))) * {material_welding_factor}',
      requiredParameters: ['weld_length_m', 'thickness_mm', 'material_welding_factor'],
      defaultDifficultyFactor: 1.0,
      defaultEfficiencyFactor: 0.85,
      priority: 90,
    },
    {
      ruleName: 'Nozzle Set-On Welding',
      ruleCode: 'VES-201',
      description: 'Nozzle set-on weld operations',
      scopeTypeCode: 'WELDING',
      productType: ProductType.Vessel,
      materialCategory: null,
      activityCodePattern: 'W-2{nozzle_num}',
      activityDescriptionTemplate: 'Nozzle {nozzle_num} - Set-On Weld',
      baseHoursFormula: '(2.5 + {thickness_mm} * 0.08) * {material_welding_factor} * ({diameter_mm} <= 50 ? 0.8 : ({diameter_mm} <= 100 ? 1.0 : ({diameter_mm} <= 200 ? 1.3 : 1.6)))',
      requiredParameters: ['nozzle_num', 'thickness_mm', 'diameter_mm', 'material_welding_factor'],
      defaultDifficultyFactor: 1.1,
      defaultEfficiencyFactor: 0.80,
      priority: 80,
    },
    {
      ruleName: 'Radiographic Testing',
      ruleCode: 'NDT-101',
      description: 'RT examination of welds',
      scopeTypeCode: 'NDT',
      productType: null,
      materialCategory: null,
      activityCodePattern: 'N-101',
      activityDescriptionTemplate: 'RT Examination of Shell Welds',
      baseHoursFormula: 'Math.ceil({weld_length_m} / 0.5) * 1.5 * {material_ndt_factor}',
      requiredParameters: ['weld_length_m', 'material_ndt_factor'],
      defaultDifficultyFactor: 1.0,
      defaultEfficiencyFactor: 0.90,
      priority: 100,
    },
    {
      ruleName: 'Hydrostatic Testing',
      ruleCode: 'TEST-101',
      description: 'Hydrostatic testing and report',
      scopeTypeCode: 'HYDROTEST',
      productType: ProductType.Vessel,
      materialCategory: null,
      activityCodePattern: 'T-101',
      activityDescriptionTemplate: 'Hydrostatic Testing and Report',
      baseHoursFormula: '8.0 * ((3.14159 * Math.pow({diameter_mm}/2000, 2) * ({length_mm}/1000)) <= 10 ? 1.0 : ((3.14159 * Math.pow({diameter_mm}/2000, 2) * ({length_mm}/1000)) <= 50 ? 1.3 : ((3.14159 * Math.pow({diameter_mm}/2000, 2) * ({length_mm}/1000)) <= 100 ? 1.6 : 2.0)))',
      requiredParameters: ['diameter_mm', 'length_mm'],
      defaultDifficultyFactor: 1.0,
      defaultEfficiencyFactor: 0.95,
      priority: 100,
    },
    {
      ruleName: 'Painting and Coating',
      ruleCode: 'FIN-101',
      description: 'Surface preparation and painting',
      scopeTypeCode: 'PAINTING',
      productType: null,
      materialCategory: null,
      activityCodePattern: 'P-101',
      activityDescriptionTemplate: 'Surface Preparation and Painting',
      baseHoursFormula: '({weight_tons} * 3.0)',
      requiredParameters: ['weight_tons'],
      defaultDifficultyFactor: 1.0,
      defaultEfficiencyFactor: 0.90,
      priority: 100,
    },
    {
      ruleName: 'Packing and Despatch',
      ruleCode: 'FIN-102',
      description: 'Final packing and shipment',
      scopeTypeCode: 'PACKING',
      productType: null,
      materialCategory: null,
      activityCodePattern: 'P-102',
      activityDescriptionTemplate: 'Packing and Despatch',
      baseHoursFormula: '({weight_tons} * 1.5)',
      requiredParameters: ['weight_tons'],
      defaultDifficultyFactor: 1.0,
      defaultEfficiencyFactor: 0.95,
      priority: 100,
    },
  ];

  for (const rule of calculationRules) {
    await prisma.calculationRule.upsert({
      where: { ruleCode: rule.ruleCode },
      update: {},
      create: rule,
    });
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
