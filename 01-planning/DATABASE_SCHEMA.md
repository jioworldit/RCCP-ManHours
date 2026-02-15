# RCCP Man-Hours - Phase 1: Database Schema Design

**Owner:** Major Jio (System Architect)  
**Date:** 2026-02-15  
**Status:** Planning - Before Code  
**Cost Tier:** 1 (Free - Local documentation)

---

## 🗄️ Database Architecture Overview

**Database Type:** PostgreSQL (Relational)  
**ORM:** Prisma or TypeORM (for type safety)  
**Rationale:** Complex relationships require ACID compliance and JOIN capabilities

---

## 📊 Entity Relationship Diagram (ERD)

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────────┐
│    projects     │       │  project_scopes  │       │    activities   │
├─────────────────┤       ├──────────────────┤       ├─────────────────┤
│ PK: id          │──1:N──│ PK: id           │──1:N──│ PK: id          │
│ project_number  │       │ FK: project_id   │       │ FK: scope_id    │
│ customer_name   │       │ FK: scope_type_id│       │ activity_code   │
│ product_type    │       │ is_selected      │       │ description     │
│ description     │       │ notes            │       │ quantity        │
│ quantity        │       └──────────────────┘       │ unit            │
│ created_at      │              │                   │ base_hours      │
│ updated_at      │              │                   │ difficulty_factor│
└─────────────────┘              │                   │ efficiency      │
        │                        │                   │ total_hours     │
        │                        │                   │ crew_size       │
        │                        ▼                   │ duration        │
        │              ┌──────────────────┐          │ welding_process │
        │              │   scope_types    │          │ is_manual_edit  │
        │              ├──────────────────┤          │ created_at      │
        │              │ PK: id           │          └─────────────────┘
        │              │ code             │
        │              │ name             │
        │              │ category         │
        │              └──────────────────┘
        │
        ▼
┌────────────────────────┐
│  technical_parameters  │
├────────────────────────┤
│ PK: id                 │
│ FK: project_id         │
│ shell_thickness_mm     │
│ material_grade         │
│ diameter_mm            │
│ length_mm              │
│ num_nozzles            │
│ linear_weld_length_m   │
│ structural_weight_tons │
│ design_pressure_bar    │
│ design_temp_celsius    │
│ corrosion_allowance_mm │
└────────────────────────┘

┌────────────────────────┐
│   calculation_rules    │
├────────────────────────┤
│ PK: id                 │
│ rule_name              │
│ product_type           │
│ scope_type             │
│ activity_code_pattern  │
│ base_hours_formula     │
│ difficulty_factors     │
│ material_multipliers   │
│ thickness_thresholds   │
│ is_active              │
└────────────────────────┘

┌────────────────────────┐
│    material_grades     │
├────────────────────────┤
│ PK: id                 │
│ grade_code             │
│ grade_name             │
│ category               │
│ difficulty_multiplier  │
│ welding_factor         │
│ cutting_factor         │
│ fitup_factor           │
└────────────────────────┘

┌────────────────────────┐
│    welding_processes   │
├────────────────────────┤
│ PK: id                 │
│ process_code           │
│ process_name           │
│ deposit_rate_kg_hr     │
│ efficiency_factor      │
│ setup_time_minutes     │
└────────────────────────┘
```

---

## 📋 Detailed Table Schemas

### **1. projects** (Master Table)
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(50) NOT NULL CHECK (product_type IN ('Vessel', 'Skid', 'Structure', 'E-House')),
    description TEXT,
    quantity INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
    total_estimated_hours DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_projects_customer ON projects(customer_name);
CREATE INDEX idx_projects_product_type ON projects(product_type);
CREATE INDEX idx_projects_status ON projects(status);
```

### **2. scope_types** (Lookup/Reference Table)
```sql
CREATE TABLE scope_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('preparation', 'fabrication', 'testing', 'finishing')),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    requires_welding BOOLEAN DEFAULT FALSE,
    requires_ndt BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Initial Data
INSERT INTO scope_types (code, name, category, description, display_order) VALUES
('MAT_HANDLING', 'Material Handling', 'preparation', 'Receipt, storage, and movement of materials', 1),
('MARKING', 'Marking & Cutting', 'preparation', 'Layout, marking, and cutting operations', 2),
('FITUP', 'Fit-up Assembly', 'fabrication', 'Component fitting and tack welding', 3),
('WELDING', 'Welding Operations', 'fabrication', 'All welding processes', 4),
('NDT', 'Non-Destructive Testing', 'testing', 'RT, UT, PT, MT examinations', 5),
('HYDROTEST', 'Hydrostatic Testing', 'testing', 'Pressure testing', 6),
('HEAT_TREAT', 'Heat Treatment', 'fabrication', 'Stress relieving, PWHT', 7),
('PAINTING', 'Painting & Coating', 'finishing', 'Surface preparation and painting', 8),
('PACKING', 'Packing & Despatch', 'finishing', 'Final packing and shipment', 9);
```

### **3. project_scopes** (Junction Table - Projects ↔ Scope Types)
```sql
CREATE TABLE project_scopes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    scope_type_id UUID NOT NULL REFERENCES scope_types(id),
    is_selected BOOLEAN DEFAULT FALSE,
    notes TEXT,
    estimated_hours DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(project_id, scope_type_id)
);

CREATE INDEX idx_project_scopes_project ON project_scopes(project_id);
CREATE INDEX idx_project_scopes_scope ON project_scopes(scope_type_id);
```

### **4. technical_parameters** (Product Specifications)
```sql
CREATE TABLE technical_parameters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- Physical Dimensions
    shell_thickness_mm DECIMAL(8,2),
    diameter_mm DECIMAL(10,2),
    length_mm DECIMAL(10,2),
    structural_weight_tons DECIMAL(8,3),
    
    -- Material Properties
    material_grade VARCHAR(50) NOT NULL,
    material_category VARCHAR(20) CHECK (material_category IN ('CS', 'SS', 'Alloy', 'Duplex', 'Aluminum')),
    
    -- Fabrication Details
    num_nozzles INTEGER DEFAULT 0,
    num_manholes INTEGER DEFAULT 0,
    linear_weld_length_m DECIMAL(8,2) DEFAULT 0,
    
    -- Design Conditions
    design_pressure_bar DECIMAL(8,2),
    design_temp_celsius DECIMAL(8,2),
    corrosion_allowance_mm DECIMAL(6,2) DEFAULT 0,
    
    -- Special Requirements
    requires_radiography BOOLEAN DEFAULT FALSE,
    requires_stress_relieve BOOLEAN DEFAULT FALSE,
    requires_post_weld_heat_treatment BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tech_params_project ON technical_parameters(project_id);
CREATE INDEX idx_tech_params_material ON technical_parameters(material_grade);
```

### **5. material_grades** (Reference Data)
```sql
CREATE TABLE material_grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_code VARCHAR(50) UNIQUE NOT NULL,
    grade_name VARCHAR(100) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('CS', 'SS', 'Alloy', 'Duplex', 'Aluminum')),
    
    -- Productivity Multipliers (1.0 = baseline)
    cutting_factor DECIMAL(4,2) DEFAULT 1.00,
    fitup_factor DECIMAL(4,2) DEFAULT 1.00,
    welding_factor DECIMAL(4,2) DEFAULT 1.00,
    ndt_factor DECIMAL(4,2) DEFAULT 1.00,
    
    -- Specific properties
    density_kg_m3 INTEGER,
    typical_thickness_range_mm VARCHAR(50),
    
    is_active BOOLEAN DEFAULT TRUE
);

-- Sample Data
INSERT INTO material_grades (grade_code, grade_name, category, cutting_factor, fitup_factor, welding_factor, ndt_factor) VALUES
('SA516_Gr70', 'SA-516 Grade 70', 'CS', 1.00, 1.00, 1.00, 1.00),
('SA516_Gr60', 'SA-516 Grade 60', 'CS', 1.00, 1.00, 1.00, 1.00),
('SS304', 'Stainless Steel 304', 'SS', 1.20, 1.15, 1.30, 1.10),
('SS316', 'Stainless Steel 316', 'SS', 1.25, 1.20, 1.35, 1.10),
('SS316L', 'Stainless Steel 316L', 'SS', 1.25, 1.20, 1.35, 1.10),
('SA387_Gr11', 'SA-387 Grade 11 (1.25Cr-0.5Mo)', 'Alloy', 1.30, 1.25, 1.50, 1.20),
('SA387_Gr22', 'SA-387 Grade 22 (2.25Cr-1Mo)', 'Alloy', 1.35, 1.30, 1.60, 1.25),
('DUPLEX_2205', 'Duplex Stainless 2205', 'Duplex', 1.50, 1.45, 1.80, 1.30),
('DUPLEX_2507', 'Super Duplex 2507', 'Duplex', 1.60, 1.55, 2.00, 1.35);
```

### **6. welding_processes** (Reference Data)
```sql
CREATE TABLE welding_processes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    process_code VARCHAR(20) UNIQUE NOT NULL,
    process_name VARCHAR(100) NOT NULL,
    process_type VARCHAR(20) CHECK (process_type IN ('manual', 'semi-auto', 'auto')),
    
    -- Performance Metrics
    deposit_rate_kg_hr DECIMAL(5,2),
    efficiency_factor DECIMAL(4,2) DEFAULT 0.85,
    setup_time_minutes INTEGER DEFAULT 15,
    
    -- Applicability
    applicable_materials VARCHAR(255), -- JSON array or comma-separated
    typical_thickness_range_mm VARCHAR(50),
    
    is_active BOOLEAN DEFAULT TRUE
);

-- Sample Data
INSERT INTO welding_processes (process_code, process_name, process_type, deposit_rate_kg_hr, efficiency_factor, setup_time_minutes) VALUES
('SMAW', 'Shielded Metal Arc Welding', 'manual', 1.5, 0.75, 10),
('GTAW', 'Gas Tungsten Arc Welding', 'manual', 0.8, 0.85, 15),
('GMAW', 'Gas Metal Arc Welding', 'semi-auto', 3.0, 0.90, 10),
('FCAW', 'Flux Cored Arc Welding', 'semi-auto', 3.5, 0.85, 10),
('SAW', 'Submerged Arc Welding', 'auto', 8.0, 0.95, 30);
```

### **7. calculation_rules** (The Rule Engine Core)
```sql
CREATE TABLE calculation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Rule Identification
    rule_name VARCHAR(100) NOT NULL,
    rule_code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    
    -- Applicability Filters
    product_type VARCHAR(50), -- NULL = all types
    material_category VARCHAR(20), -- NULL = all materials
    scope_type_code VARCHAR(20), -- References scope_types.code
    
    -- Activity Generation Pattern
    activity_code_pattern VARCHAR(20) NOT NULL, -- e.g., "W-NNN-{nozzle_num}"
    activity_description_template TEXT NOT NULL, -- e.g., "Nozzle {nozzle_num} Welding"
    
    -- Calculation Formula (stored as JSON or expression)
    base_hours_formula TEXT NOT NULL,
    -- Example: "{nozzle_count} * (2.5 + {thickness_mm} * 0.1) * {material_welding_factor}"
    
    -- Parameters Used (JSON array)
    required_parameters JSONB DEFAULT '[]',
    -- Example: ["nozzle_count", "thickness_mm", "material_welding_factor"]
    
    -- Conditions (when to apply this rule)
    min_thickness_mm DECIMAL(8,2),
    max_thickness_mm DECIMAL(8,2),
    min_diameter_mm DECIMAL(10,2),
    max_diameter_mm DECIMAL(10,2),
    
    -- Multipliers
    default_difficulty_factor DECIMAL(4,2) DEFAULT 1.00,
    default_efficiency_factor DECIMAL(4,2) DEFAULT 0.85,
    
    -- Metadata
    priority INTEGER DEFAULT 100, -- Lower = higher priority
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for rule matching
CREATE INDEX idx_calc_rules_product ON calculation_rules(product_type);
CREATE INDEX idx_calc_rules_material ON calculation_rules(material_category);
CREATE INDEX idx_calc_rules_scope ON calculation_rules(scope_type_code);
CREATE INDEX idx_calc_rules_active ON calculation_rules(is_active);
```

### **8. activities** (Generated Bill of Activities)
```sql
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    scope_id UUID REFERENCES project_scopes(id),
    
    -- Activity Identification
    activity_code VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    scope_type_code VARCHAR(20),
    
    -- Quantities
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit VARCHAR(20) NOT NULL CHECK (unit IN ('nos', 'meters', 'kg', 'hours', 'm2', 'm3')),
    
    -- Calculation Components
    base_hours DECIMAL(8,2) NOT NULL,
    difficulty_factor DECIMAL(4,2) DEFAULT 1.00,
    efficiency_factor DECIMAL(4,2) DEFAULT 0.85,
    total_hours DECIMAL(8,2) NOT NULL,
    
    -- Resource Planning
    welding_process VARCHAR(20) REFERENCES welding_processes(process_code),
    crew_size INTEGER DEFAULT 1,
    duration_days DECIMAL(5,2),
    
    -- Tracking
    is_auto_generated BOOLEAN DEFAULT TRUE,
    is_manual_edit BOOLEAN DEFAULT FALSE,
    manual_override_hours DECIMAL(8,2),
    notes TEXT,
    
    -- Sorting
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_project ON activities(project_id);
CREATE INDEX idx_activities_scope ON activities(scope_id);
CREATE INDEX idx_activities_code ON activities(activity_code);
```

---

## 🔗 Relationship Summary

```
projects (1) ──────────────────────── (N) project_scopes (N) ───────── (1) scope_types
    │                                        │
    │ (1:1)                                  │ (1:N)
    ▼                                        ▼
technical_parameters (1:N)             activities
    │                                        │
    │                                        │ (N:1)
    │                                        ▼
    │                                    material_grades
    │
    │ (Rules engine queries all tables)
    ▼
calculation_rules (N:M via conditions)
```

---

## 🎯 Key Design Decisions

1. **UUID Primary Keys:** For global uniqueness and security
2. **Junction Table (project_scopes):** Flexible many-to-many with metadata
3. **Rule Engine Pattern:** Formula-based calculations stored as text/JSON
4. **Reference Tables:** material_grades, welding_processes for maintainability
5. **Audit Fields:** created_at, updated_at on all tables
6. **Soft Deletes:** Not implemented (use status fields for archiving)

---

**Next Document:** LOGIC_FLOW.md - Calculation engine logic and algorithms

---

*Cost Tier: 1 (Free - Local documentation, no API calls)*  
*Status: Ready for Captain Review*