-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'ENGINEER', 'VIEWER');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Vessel', 'Skid', 'Structure', 'E-House');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'in_progress', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ScopeCategory" AS ENUM ('preparation', 'fabrication', 'testing', 'finishing');

-- CreateEnum
CREATE TYPE "MaterialCategory" AS ENUM ('CS', 'SS', 'Alloy', 'DUPLEX', 'Aluminum');

-- CreateEnum
CREATE TYPE "ProcessType" AS ENUM ('manual', 'semi-auto', 'auto');

-- CreateEnum
CREATE TYPE "ActivityUnit" AS ENUM ('nos', 'meters', 'kg', 'hours', 'm2', 'm3');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "project_number" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "product_type" "ProductType" NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "total_estimated_hours" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scope_types" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ScopeCategory" NOT NULL,
    "description" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "requires_welding" BOOLEAN NOT NULL DEFAULT false,
    "requires_ndt" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "scope_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_scopes" (
    "id" TEXT NOT NULL,
    "is_selected" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "estimated_hours" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_id" TEXT NOT NULL,
    "scope_type_id" TEXT NOT NULL,

    CONSTRAINT "project_scopes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technical_parameters" (
    "id" TEXT NOT NULL,
    "shell_thickness_mm" DECIMAL(8,2),
    "diameter_mm" DECIMAL(10,2),
    "length_mm" DECIMAL(10,2),
    "structural_weight_tons" DECIMAL(8,3),
    "material_grade" TEXT NOT NULL,
    "material_category" "MaterialCategory" NOT NULL,
    "num_nozzles" INTEGER NOT NULL DEFAULT 0,
    "num_manholes" INTEGER NOT NULL DEFAULT 0,
    "linear_weld_length_m" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "design_pressure_bar" DECIMAL(8,2),
    "design_temp_celsius" DECIMAL(8,2),
    "corrosion_allowance_mm" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "requires_radiography" BOOLEAN NOT NULL DEFAULT false,
    "requires_stress_relieve" BOOLEAN NOT NULL DEFAULT false,
    "requires_post_weld_heat_treatment" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "technical_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_grades" (
    "id" TEXT NOT NULL,
    "grade_code" TEXT NOT NULL,
    "grade_name" TEXT NOT NULL,
    "category" "MaterialCategory" NOT NULL,
    "cutting_factor" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "fitup_factor" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "welding_factor" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "ndt_factor" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "density_kg_m3" INTEGER,
    "typical_thickness_range_mm" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "material_grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "welding_processes" (
    "id" TEXT NOT NULL,
    "process_code" TEXT NOT NULL,
    "process_name" TEXT NOT NULL,
    "process_type" "ProcessType" NOT NULL,
    "deposit_rate_kg_hr" DECIMAL(5,2),
    "efficiency_factor" DECIMAL(4,2) NOT NULL DEFAULT 0.85,
    "setup_time_minutes" INTEGER NOT NULL DEFAULT 15,
    "applicable_materials" TEXT,
    "typical_thickness_range_mm" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "welding_processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculation_rules" (
    "id" TEXT NOT NULL,
    "rule_name" TEXT NOT NULL,
    "rule_code" TEXT NOT NULL,
    "description" TEXT,
    "product_type" "ProductType",
    "material_category" "MaterialCategory",
    "scope_type_code" TEXT,
    "activity_code_pattern" TEXT NOT NULL,
    "activity_description_template" TEXT NOT NULL,
    "base_hours_formula" TEXT NOT NULL,
    "required_parameters" JSONB NOT NULL DEFAULT '[]',
    "min_thickness_mm" DECIMAL(8,2),
    "max_thickness_mm" DECIMAL(8,2),
    "min_diameter_mm" DECIMAL(10,2),
    "max_diameter_mm" DECIMAL(10,2),
    "default_difficulty_factor" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "default_efficiency_factor" DECIMAL(4,2) NOT NULL DEFAULT 0.85,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calculation_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "activity_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scope_type_code" TEXT,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "unit" "ActivityUnit" NOT NULL,
    "base_hours" DECIMAL(8,2) NOT NULL,
    "difficulty_factor" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "efficiency_factor" DECIMAL(4,2) NOT NULL DEFAULT 0.85,
    "total_hours" DECIMAL(8,2) NOT NULL,
    "welding_process" TEXT,
    "crew_size" INTEGER NOT NULL DEFAULT 1,
    "duration_days" DECIMAL(5,2),
    "is_auto_generated" BOOLEAN NOT NULL DEFAULT true,
    "is_manual_edit" BOOLEAN NOT NULL DEFAULT false,
    "manual_override_hours" DECIMAL(8,2),
    "notes" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,
    "scope_id" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "projects_project_number_key" ON "projects"("project_number");

-- CreateIndex
CREATE INDEX "idx_projects_customer" ON "projects"("customer_name");

-- CreateIndex
CREATE INDEX "idx_projects_product_type" ON "projects"("product_type");

-- CreateIndex
CREATE INDEX "idx_projects_status" ON "projects"("status");

-- CreateIndex
CREATE UNIQUE INDEX "scope_types_code_key" ON "scope_types"("code");

-- CreateIndex
CREATE INDEX "idx_project_scopes_project" ON "project_scopes"("project_id");

-- CreateIndex
CREATE INDEX "idx_project_scopes_scope" ON "project_scopes"("scope_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_scopes_project_id_scope_type_id_key" ON "project_scopes"("project_id", "scope_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "technical_parameters_project_id_key" ON "technical_parameters"("project_id");

-- CreateIndex
CREATE INDEX "idx_tech_params_project" ON "technical_parameters"("project_id");

-- CreateIndex
CREATE INDEX "idx_tech_params_material" ON "technical_parameters"("material_grade");

-- CreateIndex
CREATE UNIQUE INDEX "material_grades_grade_code_key" ON "material_grades"("grade_code");

-- CreateIndex
CREATE UNIQUE INDEX "welding_processes_process_code_key" ON "welding_processes"("process_code");

-- CreateIndex
CREATE UNIQUE INDEX "calculation_rules_rule_code_key" ON "calculation_rules"("rule_code");

-- CreateIndex
CREATE INDEX "idx_calc_rules_product" ON "calculation_rules"("product_type");

-- CreateIndex
CREATE INDEX "idx_calc_rules_material" ON "calculation_rules"("material_category");

-- CreateIndex
CREATE INDEX "idx_calc_rules_scope" ON "calculation_rules"("scope_type_code");

-- CreateIndex
CREATE INDEX "idx_calc_rules_active" ON "calculation_rules"("is_active");

-- CreateIndex
CREATE INDEX "idx_activities_project" ON "activities"("project_id");

-- CreateIndex
CREATE INDEX "idx_activities_scope" ON "activities"("scope_id");

-- CreateIndex
CREATE INDEX "idx_activities_code" ON "activities"("activity_code");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_scopes" ADD CONSTRAINT "project_scopes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_scopes" ADD CONSTRAINT "project_scopes_scope_type_id_fkey" FOREIGN KEY ("scope_type_id") REFERENCES "scope_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technical_parameters" ADD CONSTRAINT "technical_parameters_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_welding_process_fkey" FOREIGN KEY ("welding_process") REFERENCES "welding_processes"("process_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_scope_id_fkey" FOREIGN KEY ("scope_id") REFERENCES "project_scopes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
