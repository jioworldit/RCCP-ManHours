-- RCCP Database Schema
-- Resource Capacity & Cost Planning System

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS components CASCADE;
DROP TABLE IF EXISTS project_scopes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS material_grades CASCADE;
DROP TABLE IF EXISTS welding_processes CASCADE;
DROP TABLE IF EXISTS scope_types CASCADE;

-- =====================================================
-- REFERENCE TABLES (Seed Data)
-- =====================================================

-- Material Grades Table
CREATE TABLE material_grades (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    cutting_factor DECIMAL(4,2) DEFAULT 1.00,
    fitup_factor DECIMAL(4,2) DEFAULT 1.00,
    welding_factor DECIMAL(4,2) DEFAULT 1.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Welding Processes Table
CREATE TABLE welding_processes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    deposit_rate DECIMAL(6,2), -- kg/hour or similar
    efficiency DECIMAL(5,2), -- percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scope Types Table
CREATE TABLE scope_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_number VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    customer VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    product_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'draft',
    total_hours DECIMAL(10,2) DEFAULT 0.00,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Scopes Table
CREATE TABLE project_scopes (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    scope_code VARCHAR(20) NOT NULL REFERENCES scope_types(code),
    is_selected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, scope_code)
);

-- Components Table
CREATE TABLE components (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    component_type VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1,
    dimensions VARCHAR(100), -- e.g., "1000x500x300"
    thickness DECIMAL(8,2), -- in mm
    material VARCHAR(20) REFERENCES material_grades(code),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities Table
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    activity_code VARCHAR(20) NOT NULL,
    description TEXT,
    component_id INTEGER REFERENCES components(id) ON DELETE SET NULL,
    qty DECIMAL(10,2) DEFAULT 1.00,
    unit VARCHAR(20) DEFAULT 'ea',
    base_hours DECIMAL(8,2) NOT NULL DEFAULT 0.00,
    factor DECIMAL(4,2) DEFAULT 1.00,
    total_hours DECIMAL(10,2) GENERATED ALWAYS AS (base_hours * factor) STORED,
    crew_size INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_customer ON projects(customer);
CREATE INDEX idx_components_project ON components(project_id);
CREATE INDEX idx_activities_project ON activities(project_id);
CREATE INDEX idx_activities_component ON activities(component_id);
CREATE INDEX idx_project_scopes_project ON project_scopes(project_id);

-- =====================================================
-- SEED DATA
-- =====================================================

-- Material Grades
INSERT INTO material_grades (code, name, category, cutting_factor, fitup_factor, welding_factor) VALUES
('CS', 'Carbon Steel', 'Ferrous', 1.00, 1.00, 1.00),
('SS304', 'Stainless Steel 304', 'Stainless', 1.20, 1.10, 1.15),
('SS316', 'Stainless Steel 316', 'Stainless', 1.25, 1.15, 1.20),
('SS316L', 'Stainless Steel 316L', 'Stainless', 1.25, 1.15, 1.20),
('Alloy', 'Alloy Steel', 'Ferrous', 1.10, 1.05, 1.10),
('Duplex', 'Duplex Stainless Steel', 'Stainless', 1.30, 1.20, 1.25);

-- Welding Processes
INSERT INTO welding_processes (code, name, deposit_rate, efficiency) VALUES
('SMAW', 'Shielded Metal Arc Welding', 1.50, 65.00),
('GTAW', 'Gas Tungsten Arc Welding', 0.80, 95.00),
('GMAW', 'Gas Metal Arc Welding', 2.50, 90.00),
('FCAW', 'Flux Cored Arc Welding', 3.00, 85.00),
('SAW', 'Submerged Arc Welding', 5.00, 95.00);

-- Scope Types
INSERT INTO scope_types (code, name, category) VALUES
('MH', 'Material Handling', 'Pre-Fabrication'),
('CUT', 'Cutting', 'Fabrication'),
('FIT', 'Fitup', 'Fabrication'),
('WELD', 'Welding', 'Fabrication'),
('NDT', 'NDT Inspection', 'Quality Control'),
('HYDRO', 'Hydrotest', 'Testing'),
('HT', 'Heat Treat', 'Post-Fabrication'),
('PAINT', 'Painting', 'Finishing'),
('PACK', 'Packing', 'Logistics');

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_components_updated_at BEFORE UPDATE ON components
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_scopes_updated_at BEFORE UPDATE ON project_scopes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SCHEMA COMPLETE
-- =====================================================
