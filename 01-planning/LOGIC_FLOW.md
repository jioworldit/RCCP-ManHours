# RCCP Man-Hours - Phase 1: Logic Flow & Calculation Engine

**Owner:** Major Jio (System Architect)  
**Date:** 2026-02-15  
**Status:** Planning - Before Code  
**Cost Tier:** 1 (Free - Local documentation)

---

## 🧮 The Estimation Engine - Core Logic

### **Formula Foundation**
```
TOTAL MAN-HOURS = (BASE HOURS × QUANTITY × DIFFICULTY FACTOR) / EFFICIENCY

Where:
- BASE HOURS = Derived from industry standards and technical parameters
- QUANTITY = Number of units (nozzles, meters of weld, etc.)
- DIFFICULTY FACTOR = Material complexity + Thickness penalty + Special conditions
- EFFICIENCY = Crew experience + Working conditions (typically 0.75-0.95)
```

---

## 🔄 System Workflow (Data Flow)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         STEP 1: PROJECT INIT                        │
│  Input: Project metadata (number, customer, type, quantity)         │
│  Output: Project record created in DB                               │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      STEP 2: SCOPE SELECTION                        │
│  Input: User selects scope items from checklist                     │
│  Output: project_scopes records created (is_selected = true)        │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 3: TECHNICAL INPUTS                         │
│  Input: Thickness, material, dimensions, nozzles, etc.              │
│  Output: technical_parameters record created                        │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 4: ACTIVITY GENERATION                      │
│  Input: Project ID, Scope selections, Technical params              │
│  Process: RULE ENGINE matches and generates activities              │
│  Output: activities records auto-generated                          │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 5: CALCULATION GRID                         │
│  Input: Activities with base calculations                           │
│  Process: User edits factors, system recalculates real-time         │
│  Output: Final man-hour estimates                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 The Rule Engine Algorithm

### **Rule Matching Process**

```python
FUNCTION GenerateActivities(project_id):
    
    # 1. Fetch Project Data
    project = GET projects WHERE id = project_id
    tech_params = GET technical_parameters WHERE project_id = project_id
    scopes = GET project_scopes WHERE project_id = project_id AND is_selected = true
    material = GET material_grades WHERE grade_code = tech_params.material_grade
    
    # 2. Initialize Empty Activity List
    activities = []
    
    # 3. For Each Selected Scope, Apply Rules
    FOR EACH scope IN scopes:
        
        # Fetch applicable rules
        rules = GET calculation_rules WHERE:
            scope_type_code = scope.scope_type_code AND
            is_active = true AND
            (product_type IS NULL OR product_type = project.product_type) AND
            (material_category IS NULL OR material_category = material.category) AND
            (min_thickness_mm IS NULL OR tech_params.shell_thickness_mm >= min_thickness_mm) AND
            (max_thickness_mm IS NULL OR tech_params.shell_thickness_mm <= max_thickness_mm)
        
        ORDER BY priority ASC, created_at ASC
        
        # 4. Apply Each Rule
        FOR EACH rule IN rules:
            
            # Parse the formula template
            formula = rule.base_hours_formula
            
            # Build parameter dictionary
            params = {
                'thickness_mm': tech_params.shell_thickness_mm,
                'diameter_mm': tech_params.diameter_mm,
                'length_mm': tech_params.length_mm,
                'nozzle_count': tech_params.num_nozzles,
                'weld_length_m': tech_params.linear_weld_length_m,
                'weight_tons': tech_params.structural_weight_tons,
                'material_cutting_factor': material.cutting_factor,
                'material_fitup_factor': material.fitup_factor,
                'material_welding_factor': material.welding_factor,
                'material_ndt_factor': material.ndt_factor
            }
            
            # Handle array-type rules (like nozzles)
            IF rule.activity_code_pattern CONTAINS "{nozzle_num}":
                
                FOR i FROM 1 TO tech_params.num_nozzles:
                    
                    # Generate activity for each nozzle
                    activity_code = REPLACE(rule.activity_code_pattern, "{nozzle_num}", i)
                    description = REPLACE(rule.activity_description_template, "{nozzle_num}", "Nozzle " + i)
                    
                    # Calculate base hours
                    base_hours = EVALUATE(formula, params)
                    
                    # Apply difficulty factor
                    difficulty = rule.default_difficulty_factor
                    IF tech_params.shell_thickness_mm > 50:
                        difficulty = difficulty × 1.2  # Thick wall penalty
                    
                    # Calculate total hours
                    total_hours = (base_hours × 1 × difficulty) / rule.default_efficiency_factor
                    
                    # Create activity record
                    activity = {
                        project_id: project_id,
                        activity_code: activity_code,
                        description: description,
                        quantity: 1,
                        unit: 'nos',
                        base_hours: base_hours,
                        difficulty_factor: difficulty,
                        efficiency_factor: rule.default_efficiency_factor,
                        total_hours: total_hours,
                        is_auto_generated: true,
                        scope_type_code: rule.scope_type_code
                    }
                    
                    activities.APPEND(activity)
                    
            ELSE:
                # Single activity rule
                
                # Calculate base hours using formula
                base_hours = EVALUATE(formula, params)
                
                # Determine quantity
                quantity = EXTRACT_QUANTITY(rule, tech_params)
                
                # Calculate difficulty based on conditions
                difficulty = CALCULATE_DIFFICULTY(rule, tech_params, material)
                
                # Calculate total
                total_hours = (base_hours × quantity × difficulty) / rule.default_efficiency_factor
                
                # Create activity
                activity = {
                    project_id: project_id,
                    activity_code: rule.activity_code_pattern,
                    description: rule.activity_description_template,
                    quantity: quantity,
                    unit: DETERMINE_UNIT(rule),
                    base_hours: base_hours,
                    difficulty_factor: difficulty,
                    efficiency_factor: rule.default_efficiency_factor,
                    total_hours: total_hours,
                    is_auto_generated: true,
                    scope_type_code: rule.scope_type_code
                }
                
                activities.APPEND(activity)
    
    # 5. Save All Activities to Database
    FOR EACH activity IN activities:
        INSERT INTO activities VALUES (activity)
    
    RETURN activities.COUNT
```

---

## 📐 Calculation Rules Library (Sample)

### **Rule 1: Shell Plate Welding (Longitudinal)**
```yaml
rule_code: VES-101
rule_name: Shell Longitudinal Welding
scope_type_code: WELDING
product_type: Vessel
applicable_to: [CS, SS, Alloy, Duplex]

activity_code_pattern: W-101
activity_description_template: Shell Longitudinal Seam Welding

formula: |
  base = {weld_length_m} * 0.5  # 0.5 hrs per meter (baseline SMAW)
  
  # Thickness factor
  IF {thickness_mm} <= 12:
    thickness_mult = 1.0
  ELIF {thickness_mm} <= 25:
    thickness_mult = 1.3
  ELIF {thickness_mm} <= 50:
    thickness_mult = 1.8
  ELSE:
    thickness_mult = 2.5
  
  # Material factor
  material_mult = {material_welding_factor}
  
  RETURN base * thickness_mult * material_mult

parameters_required:
  - weld_length_m
  - thickness_mm
  - material_welding_factor

default_difficulty: 1.0
default_efficiency: 0.85
unit: meters
```

### **Rule 2: Nozzle Welding (Set-On Type)**
```yaml
rule_code: VES-201
rule_name: Nozzle Set-On Welding
scope_type_code: WELDING
product_type: Vessel
applicable_to: [CS, SS, Alloy, Duplex]

activity_code_pattern: W-2{nozzle_num:03d}
activity_description_template: Nozzle {nozzle_num} - Set-On Weld

formula: |
  # Base welding time per nozzle
  base = 2.5  # Hours (setup + tack + root + fill + cap)
  
  # Thickness adjustment
  thickness_add = {thickness_mm} * 0.08  # 0.08 hrs per mm
  
  # Material multiplier
  material_mult = {material_welding_factor}
  
  # Diameter factor (larger nozzles take longer)
  IF {diameter_mm} <= 50:
    size_mult = 0.8
  ELIF {diameter_mm} <= 100:
    size_mult = 1.0
  ELIF {diameter_mm} <= 200:
    size_mult = 1.3
  ELSE:
    size_mult = 1.6
  
  RETURN (base + thickness_add) * material_mult * size_mult

parameters_required:
  - nozzle_num
  - thickness_mm
  - diameter_mm
  - material_welding_factor

default_difficulty: 1.1
default_efficiency: 0.80
unit: nos
generate_array: true  # Create multiple activities based on nozzle_count
```

### **Rule 3: Material Handling**```yaml
rule_code: GEN-101
rule_name: Material Receipt and Handling
scope_type_code: MAT_HANDLING
product_type: null  # All types
applicable_to: [CS, SS, Alloy, Duplex, Aluminum]

activity_code_pattern: M-101
activity_description_template: Material Receipt, Inspection and Storage

formula: |
  # Base handling per ton
  base = {weight_tons} * 0.5  # 0.5 hours per ton
  
  # Material complexity (SS/Alloy needs more care)
  material_mult = {material_cutting_factor}
  
  RETURN base * material_mult

parameters_required:
  - weight_tons
  - material_cutting_factor

default_difficulty: 1.0
default_efficiency: 0.90
unit: tons
```

### **Rule 4: Fit-Up Assembly (Shell)**
```yaml
rule_code: FAB-101
rule_name: Shell Fit-Up and Tack Welding
scope_type_code: FITUP
product_type: Vessel
applicable_to: [CS, SS, Alloy, Duplex]

activity_code_pattern: F-101
activity_description_template: Shell Course Fit-Up and Tack Weld

formula: |
  # Base fit-up time per meter of circumference
  circumference_m = 3.14159 * {diameter_mm} / 1000
  
  # Fit-up hours (alignment, tack welding)
  base = circumference_m * 0.8  # 0.8 hrs per meter
  
  # Thickness factor (thicker = harder to align)
  IF {thickness_mm} <= 12:
    thick_mult = 1.0
  ELIF {thickness_mm} <= 25:
    thick_mult = 1.2
  ELIF {thickness_mm} <= 50:
    thick_mult = 1.5
  ELSE:
    thick_mult = 2.0
  
  # Material factor
  material_mult = {material_fitup_factor}
  
  RETURN base * thick_mult * material_mult

parameters_required:
  - diameter_mm
  - thickness_mm
  - material_fitup_factor

default_difficulty: 1.1
default_efficiency: 0.85
unit: meters
```

### **Rule 5: Radiographic Testing (RT)**
```yaml
rule_code: NDT-101
rule_name: Radiographic Testing of Welds
scope_type_code: NDT
product_type: null
applicable_to: [CS, SS, Alloy, Duplex]

activity_code_pattern: N-101
activity_description_template: RT Examination of Shell Welds

formula: |
  # RT is typically per joint/location
  # Number of RT shots based on weld length and code requirements
  
  weld_length_m = {weld_length_m}
  
  # ASME standard: RT every 500mm or as per joint count
  num_shots = CEILING(weld_length_m / 0.5)  # One shot per 0.5m
  
  # Time per RT shot (setup + exposure + interpretation)
  time_per_shot = 1.5  # Hours
  
  RETURN num_shots * time_per_shot * {material_ndt_factor}

parameters_required:
  - weld_length_m
  - material_ndt_factor

default_difficulty: 1.0
default_efficiency: 0.90
unit: shots
```

### **Rule 6: Hydrostatic Testing**
```yaml
rule_code: TEST-101
rule_name: Hydrostatic Testing
scope_type_code: HYDROTEST
product_type: Vessel
applicable_to: [CS, SS, Alloy, Duplex]

activity_code_pattern: T-101
activity_description_template: Hydrostatic Testing and Report

formula: |
  # Base test time
  base = 8.0  # Hours (setup + fill + hold + drain + inspection)
  
  # Volume factor (larger vessels take longer)
  volume_m3 = 3.14159 * ({diameter_mm}/2000)^2 * ({length_mm}/1000)
  
  IF volume_m3 <= 10:
    volume_mult = 1.0
  ELIF volume_m3 <= 50:
    volume_mult = 1.3
  ELIF volume_m3 <= 100:
    volume_mult = 1.6
  ELSE:
    volume_mult = 2.0
  
  RETURN base * volume_mult

parameters_required:
  - diameter_mm
  - length_mm

default_difficulty: 1.0
default_efficiency: 0.95
unit: test
```

---

## 🧮 Difficulty Factor Calculation

### **Composite Difficulty Formula**
```
DIFFICULTY FACTOR = Material Factor × Thickness Factor × Position Factor × Special Conditions
```

#### **Material Factor (from material_grades table)**
| Material | Welding | Fit-Up | NDT | Cutting |
|----------|---------|--------|-----|---------|
| CS | 1.00 | 1.00 | 1.00 | 1.00 |
| SS 304 | 1.30 | 1.15 | 1.10 | 1.20 |
| SS 316 | 1.35 | 1.20 | 1.10 | 1.25 |
| Alloy | 1.50 | 1.25 | 1.20 | 1.30 |
| Duplex | 1.80 | 1.45 | 1.30 | 1.50 |

#### **Thickness Factor**```python
FUNCTION GetThicknessFactor(thickness_mm, activity_type):
    
    IF activity_type == 'welding':
        IF thickness_mm <= 12:     RETURN 1.0
        ELIF thickness_mm <= 25:   RETURN 1.3
        ELIF thickness_mm <= 50:   RETURN 1.8
        ELIF thickness_mm <= 100:  RETURN 2.5
        ELSE:                      RETURN 3.5
    
    ELIF activity_type == 'fitup':
        IF thickness_mm <= 12:     RETURN 1.0
        ELIF thickness_mm <= 25:   RETURN 1.2
        ELIF thickness_mm <= 50:   RETURN 1.5
        ELSE:                      RETURN 2.0
    
    ELIF activity_type == 'ndt':
        IF thickness_mm <= 25:     RETURN 1.0
        ELIF thickness_mm <= 50:   RETURN 1.2
        ELSE:                      RETURN 1.4
    
    ELSE:
        RETURN 1.0
```

#### **Position Factor (Welding Only)**
```
Flat Position:      1.00
Horizontal:         1.10
Vertical Up:        1.25
Vertical Down:      1.15
Overhead:           1.40
Confined Space:     1.30
```

#### **Special Conditions Multipliers**
```
High Temperature Service:   × 1.10
Cryogenic Service:          × 1.15
Sour Service (H2S):         × 1.20
Clad/Lined Vessel:          × 1.25
Post Weld Heat Treatment:   × 1.15
Radiography Required:       × 1.10
```

---

## ⚡ Real-Time Calculation API

### **Endpoint: Recalculate Activities**
```javascript
POST /api/projects/{project_id}/recalculate

Request Body:
{
  "activity_updates": [
    {
      "activity_id": "uuid",
      "difficulty_factor": 1.2,
      "efficiency_factor": 0.85,
      "crew_size": 3,
      "manual_override_hours": null  // If set, use this instead of calculated
    }
  ]
}

Response:
{
  "updated_activities": [...],
  "total_hours": 1250.5,
  "total_duration_days": 45.2
}
```

### **Calculation Logic (Backend)**
```javascript
FUNCTION RecalculateActivity(activity_id, updates):
    
    activity = GET activities WHERE id = activity_id
    
    IF updates.manual_override_hours IS NOT NULL:
        activity.total_hours = updates.manual_override_hours
        activity.is_manual_edit = true
    ELSE:
        // Recalculate using formula
        base = activity.base_hours
        qty = activity.quantity
        diff = updates.difficulty_factor || activity.difficulty_factor
        eff = updates.efficiency_factor || activity.efficiency_factor
        
        activity.total_hours = (base * qty * diff) / eff
        activity.difficulty_factor = diff
        activity.efficiency_factor = eff
    
    // Calculate duration
    activity.crew_size = updates.crew_size || activity.crew_size
    activity.duration_days = activity.total_hours / (activity.crew_size * 8)
    
    SAVE activity
    
    // Recalculate project totals
    RecalculateProjectTotals(activity.project_id)
    
    RETURN activity
```

---

## 📊 Export Logic

### **CSV Export**
```python
FUNCTION ExportToCSV(project_id):
    
    project = GET projects WHERE id = project_id
    activities = GET activities WHERE project_id = project_id ORDER BY display_order
    
    csv_rows = []
    csv_rows.APPEND(["Project:", project.project_number, "Customer:", project.customer_name])
    csv_rows.APPEND(["Product Type:", project.product_type, "Quantity:", project.quantity])
    csv_rows.APPEND([])  // Empty row
    csv_rows.APPEND(["Activity Code", "Description", "Qty", "Unit", "Base Hrs", "Diff Factor", "Eff Factor", "Total Hrs", "Crew", "Duration"])
    
    total = 0
    FOR EACH activity IN activities:
        csv_rows.APPEND([
            activity.activity_code,
            activity.description,
            activity.quantity,
            activity.unit,
            activity.base_hours,
            activity.difficulty_factor,
            activity.efficiency_factor,
            activity.total_hours,
            activity.crew_size,
            activity.duration_days
        ])
        total += activity.total_hours
    
    csv_rows.APPEND([])
    csv_rows.APPEND(["", "", "", "", "", "", "TOTAL:", total, "", ""])
    
    RETURN csv_rows
```

### **PDF Report Generation**
```python
FUNCTION GeneratePDF(project_id):
    
    // Similar to CSV but formatted as professional report
    // Include:
    // - Company logo and project header
    // - Technical parameters summary
    // - Activity table with formatting
    // - Summary statistics
    // - Approval signature section
    
    RETURN pdf_buffer
```

---

## 🎯 Key Algorithms Summary

1. **Rule Matching:** Filter rules by scope, product, material, thickness ranges
2. **Activity Generation:** Loop-based for array-type rules (nozzles), single for others
3. **Formula Evaluation:** Safe math evaluation with parameter substitution
4. **Difficulty Calculation:** Multiplicative factors (material × thickness × position × special)
5. **Real-Time Recalc:** Instant update when user changes factors
6. **Export:** Structured data formatting for CSV/PDF

---

## ⚠️ Edge Cases & Handling

### **Zero or Missing Parameters**
- IF thickness = NULL → Use default 10mm with warning
- IF material not found → Default to CS (1.0 factors)
- IF quantity = 0 → Skip activity generation with note

### **Extreme Values**
- IF thickness > 200mm → Cap at 200mm + warning
- IF weight > 1000 tons → Log for review
- IF weld length > 1000m → Confirm with user

### **Missing Rules**
- IF no rule matches scope → Create generic placeholder
- Log unmatched conditions for rule engine improvement

---

**Next Step:** Phase 1 Captain Review → Then Phase 2 Design

---

*Cost Tier: 1 (Free - Local documentation)*  
*Status: Ready for Captain Review*