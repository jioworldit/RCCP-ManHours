# RCCP Man-Hours - Project Brief

**Project Name:** RCCP Man-Hours  
**Type:** Web Application  
**Industry:** Heavy Engineering / Fabrication  
**Status:** Phase 0 - Initiation  
**Date:** 2026-02-15  
**Requested By:** Sanjay Shingala (RAK AI Studio)

---

## 🎯 Project Overview

A comprehensive **Fabrication Man-Hour Estimation System** for heavy engineering products including:
- Pressure Vessels
- Process Skids  
- E-Houses
- Structural Steel

The system calculates total required man-hours for fabrication projects based on technical inputs, scope of work, and productivity factors.

---

## 🏗️ Core Workflow (5 Steps)

### **Step 1: Project Initialization**
Create new project with metadata:
- Project Number
- Customer Name
- Product Type (Dropdown: Vessel/Skid/Structure/E-House)
- Description
- Quantity

### **Step 2: Scope of Work Selector (Dynamic Checklist)**
Multi-level checklist for scope definition:
- Material Handling
- Marking/Cutting
- Fit-up
- Welding (GTAW/SMAW/SAW/FCAW)
- NDT (RT/UT/PT/MT)
- Hydrotest
- Painting
- Packing
- Heat Treatment
- Stress Relieving

**Requirement:** Show subsequent technical fields ONLY based on selected scope items.

### **Step 3: Technical Parameter Input**
Product-specific technical specs:
- Shell Thickness (mm)
- Material Grade (CS/SS/Alloy/Duplex)
- Diameter/Length (mm)
- Number of Nozzles
- Linear Weld Length (meters)
- Structural Weight (Tons)
- Design Pressure/Temperature
- Corrosion Allowance

### **Step 4: The "Estimation Engine" (Core Logic)**

**Auto-Generation:**
- Based on Steps 2 & 3, automatically generate detailed "Activity List" (Bill of Activities)
- Example: If "Nozzles = 4", generate 4 rows for "Nozzle Fit-up" and "Nozzle Welding"

**Activity Codes:**
- Assign standard industry activity codes (e.g., F-101, W-203, NDT-301)

**Calculation Logic:**
- Base Man-Hours derived from industry standards (per mm thickness, per nozzle, per meter weld)
- Difficulty Factor based on material grade and thickness
- Efficiency Factor based on crew experience and conditions

### **Step 5: Interactive Calculation Grid**

**Excel-like Data Table with Columns:**
- Activity Code
- Description
- Quantity
- Unit (nos/meters/kg/hours)
- Base Man-Hours (Standard)
- Productivity Factor (User Editable, default 1.0)
- Welding Process (if applicable)
- Crew Size
- Duration (calculated)
- **Formula:** `(Base Hours × Quantity × Difficulty Factor) / Efficiency = Total Man-Hours`

**Features:**
- Inline editing
- Manual row addition
- Override calculated values
- Real-time totals

---

## 🛠️ Technical Requirements

### **Database: Relational (SQL)**
Handle complex relationships:
```
Projects → Scopes → Activities → Calculations
```

### **UI/UX:**
- Clean, high-density dashboard
- Stepper workflow (Steps 1-5)
- Tabs for organization
- Inline editing grid
- Responsive design

### **Data Export:**
- CSV export
- PDF report generation
- Print-friendly layout

---

## 🔧 Advanced Features (Future Phases)

### **Rule Engine:**
- Configurable calculation rules
- Material-specific productivity factors
- Seasonal adjustments
- Crew skill level modifiers

### **Historical Data:**
- Store past estimations
- Compare actual vs estimated
- Machine learning for prediction

### **Integration:**
- ERP system connection
- Material procurement API
- Labor cost integration

### **Multi-Currency & Units:**
- Metric/Imperial toggle
- Currency conversion
- Regional standards (ASME/API/EN)

---

## 📊 Success Criteria

- [ ] Accurate man-hour estimation within ±10% of industry standards
- [ ] Dynamic scope selection working correctly
- [ ] Auto-generation of activity list based on inputs
- [ ] Interactive grid with real-time calculations
- [ ] Export functionality (CSV/PDF)
- [ ] User-friendly interface for engineers

---

## 🎖️ Captain Assignments

| Phase | Captain | Focus |
|-------|---------|-------|
| 1. Planning | Major Jio | Architecture, DB Schema, Rule Engine Design |
| 2. Design | Captain Stitch | Industrial UI/UX, Data Table Interface |
| 3. Development | Captain Anti-B | Full-Stack, Calculation Engine |
| 4. Database | Captain Fire-F | SQL Schema, Relationships, Queries |
| 5. Testing | Captain QA | Calculation Accuracy, Edge Cases |

---

**Next Step:** Phase 1 - Major Jio to outline Database Schema and Logic Flow before any code is written.

---

*Document Version: 1.0*  
*Status: Phase 0 - Initiation Complete*