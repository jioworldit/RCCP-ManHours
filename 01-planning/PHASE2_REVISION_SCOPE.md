# RCCP Man-Hours - Phase 2 Revision Scope

**Date:** 2026-02-15  
**Status:** Phase 2 - REVISION IN PROGRESS  
**Reason:** Client feedback - significant scope expansion

---

## 🔄 Original Scope vs Revised Scope

| Feature | Original | Revised |
|---------|----------|---------|
| **Screens** | 5 | 7+ |
| **Authentication** | ❌ None | ✅ Login system |
| **Dashboard** | ❌ None | ✅ Project list + drill-down |
| **Product Types** | Generic | 5 specific workflows |
| **Components** | Simple | Multi-component architecture |
| **Scope Checklist** | 9 items flat | Hierarchical + templates |
| **Manpower Planning** | ❌ None | ✅ Type/Qty/Duration per activity |
| **Welding Processes** | Basic | Combo processes (SMAW+SAW, etc.) |
| **AI Database** | ❌ None | ✅ Productivity norms engine |

---

## 📋 Revised Screen Requirements

### **Screen 0: Login/Authentication** ⭐ NEW
- Username/password login
- Session management
- Password reset

### **Screen 1: Dashboard** ⭐ NEW
- Project list table (Number, Name, Customer, Total Hours)
- Search/filter functionality
- Status indicators (Draft/In Progress/Completed)
- Drill-down to activity details
- Quick actions (Edit, Delete, Duplicate)

### **Screen 2: Project Entry** (ENHANCED)
- Project Number, Name, Client, Location
- **Product Type Selector:**
  - Pressure Vessel
  - Process Skids
  - E-House
  - Structure
  - Other Fabricated Items
- **Dynamic workflow based on product type**
- Save as draft option

### **Screen 3: Component Architecture** ⭐ NEW
**Multi-component entry system:**

**For Pressure Vessels:**
- Shells (qty, dimensions, thickness)
- Dish Heads (type, qty, thickness)
- Nozzles (qty, size, rating)
- Skirt/Saddles (qty, type)
- Lifting Lugs (qty, capacity)
- Internals (type, qty)
- Externals (type, qty)
- Manways (qty, size)
- Trunnions (qty, type)
- **Add Custom Component** button

**For Skids:**
- Structural Frames
- Equipment Modules
- Piping Systems
- Instrumentation
- Electrical Panels
- **Add Custom Component**

**For E-Houses:**
- Building Structure
- HVAC Systems
- Electrical Equipment
- Control Systems
- Lighting
- Fire Suppression
- **Add Custom Component**

**For Structures:**
- Columns
- Beams
- Bracing
- Platforms
- Ladders
- **Add Custom Component**

### **Screen 4: Scope Selection** (ENHANCED)
**Hierarchical checklist with sub-items:**

```
□ Material Handling
  □ Receipt & Inspection
  □ Storage
  □ Issue to Production

□ Marking & Cutting
  □ Layout & Marking
  □ Plasma Cutting
  □ Oxy-Fuel Cutting
  □ Machining

□ Fit-Up Assembly
  □ Component Fit-Up
  □ Tack Welding
  □ Alignment Check

□ Welding Operations
  □ Root Pass
  □ Fill Pass
  □ Cap Pass
  □ Post-Weld Cleaning

□ NDT (Non-Destructive Testing)
  □ RT (Radiographic)
  □ UT (Ultrasonic)
  □ MT (Magnetic Particle)
  □ PT (Dye Penetrant)

□ Heat Treatment
  □ Stress Relieving
  □ Normalizing
  □ PWHT

□ Hydrostatic Testing
  □ Test Setup
  □ Filling
  □ Hold Period
  □ Inspection
  □ Draining

□ Surface Preparation
  □ Blasting
  □ Grinding
  □ Cleaning

□ Painting & Coating
  □ Primer Coat
  □ Intermediate Coat
  □ Finish Coat

□ Packing & Dispatch
  □ Final Inspection
  □ Documentation
  □ Packing
  □ Loading
```

**Features:**
- Expand/collapse sections
- **Save as Template** option
- **Load from Template** dropdown
- Add custom checklist items

### **Screen 5: Technical Parameters** (PER COMPONENT)
**For each selected component:**
- Material Grade (dropdown with standards)
- Thickness (mm)
- Diameter/Length (mm)
- Weight (kg/auto-calc)
- Quantity
- **Component-specific fields:**
  - Nozzles: Rating (150#, 300#, 600#), Type (WN, SO, BL)
  - Heads: Type (Ellipsoidal, Hemispherical, Torispherical)
  - etc.

### **Screen 6: Activities Grid** (MAJOR ENHANCEMENT)
**Columns:**
1. Activity Code (auto-generated)
2. Description
3. Component Reference
4. Quantity
5. Unit
6. Base Hours
7. **Productivity Factor**
8. **Difficulty Factor**
9. **Efficiency Factor**
10. **Total Hours** (calculated)
11. **Crew Size**
12. **Duration (Days)**
13. **Manpower Requirements** ⭐ NEW:
    - Fabricator: [Qty] × [Hours]
    - Welder: [Qty] × [Hours]
    - Fitter: [Qty] × [Hours]
    - Grinder: [Qty] × [Hours]
    - Helper: [Qty] × [Hours]
    - Inspector: [Qty] × [Hours]
    - Add Custom Role
14. **Welding Process** ⭐ NEW:
    - SMAW
    - GTAW
    - GMAW
    - FCAW
    - SAW
    - **Combinations:**
      - SMAW + SAW
      - GTAW + SMAW
      - GTAW + SAW
      - SMAW + FCAW
      - etc.
15. Notes
16. Actions (Edit/Delete)

**Features:**
- Inline editing
- Add custom row
- Drag-drop reorder
- Real-time calculations
- **AI Suggestions** for base hours based on productivity norms

### **Screen 7: Results & Export** (ENHANCED)
**Summary Cards:**
- Total Man-Hours
- Total Duration
- Total Manpower Required
- Cost Estimate (if rates entered)

**Breakdown Tables:**
- By Activity Type
- By Component
- By Manpower Type
- Gantt Chart view (timeline)

**Export Options:**
- CSV (detailed)
- PDF (formatted report)
- Excel (with formulas)
- Print

---

## 🗄️ Database Schema Updates

### **New Tables Required:**

1. **users** - Authentication
2. **project_templates** - Reusable scope templates
3. **checklist_templates** - Saved checklist configurations
4. **components_library** - Component definitions per product type
5. **productivity_norms** - AI-powered base hour calculations
6. **manpower_types** - Role definitions (Fabricator, Welder, etc.)
7. **welding_processes** - Process combinations
8. **component_activities** - Link activities to components

### **Enhanced Tables:**
- **projects** - Add: created_by, status, template_id
- **activities** - Add: component_id, manpower_requirements (JSON), welding_process
- **scope_types** - Add: parent_id (for hierarchy)

---

## 🤖 AI-Powered Features

### **Productivity Norms Engine:**
```
AI analyzes:
- Component type
- Material grade
- Thickness
- Welding process
- Historical data

Suggests:
- Base hours
- Optimal crew size
- Productivity factors
```

### **Smart Templates:**
- Suggest checklist based on product type
- Auto-populate common components
- Recommend manpower based on complexity

---

## ⏱️ Revised Timeline

| Phase | Original | Revised | Delta |
|-------|----------|---------|-------|
| Phase 2: Design | 8-12 hrs | 20-24 hrs | +12 hrs |
| Phase 3: Development | 20-30 hrs | 40-50 hrs | +20 hrs |
| Phase 4: Database | 6-8 hrs | 12-16 hrs | +8 hrs |
| Phase 5: Testing | 8-12 hrs | 16-20 hrs | +8 hrs |
| **TOTAL** | **42-62 hrs** | **88-110 hrs** | **+48 hrs** |

**New Estimate:** 2-2.5 weeks (vs 1 week original)

---

## 💰 Revised Cost Estimate

| Category | Original | Revised |
|----------|----------|---------|
| Development Time | 50-74 hrs | 88-110 hrs |
| Est. Cost | $30-50 | $60-90 |

---

## ✅ Revised Deliverables Checklist

### **Phase 2.1: Design v2** (Captain Stitch)
- [ ] Login page mockup
- [ ] Dashboard with project list
- [ ] Enhanced Project Entry (5 product types)
- [ ] Component Architecture screen
- [ ] Hierarchical Scope Selection
- [ ] Technical Parameters (per component)
- [ ] Enhanced Activities Grid (manpower + welding)
- [ ] Results & Export screen
- [ ] Mobile responsive versions

### **Phase 3: Development** (Captain Anti-B)
- [ ] Authentication system
- [ ] Dashboard with search/filter
- [ ] Multi-product workflow engine
- [ ] Component builder
- [ ] Hierarchical checklist system
- [ ] Template save/load
- [ ] Enhanced calculation engine
- [ ] Manpower planning module
- [ ] Welding process library

### **Phase 4: Database** (Captain Fire-F)
- [ ] Users table + auth
- [ ] Templates system
- [ ] Components library
- [ ] Productivity norms table
- [ ] Manpower types
- [ ] Welding processes

### **Phase 7: AI Integration** (Captain Plan-G)
- [ ] Productivity norms engine
- [ ] Smart template suggestions
- [ ] Base hour recommendations

---

## 🎯 Success Criteria (Revised)

- [ ] Authentication system working
- [ ] Dashboard shows all projects with totals
- [ ] Drill-down to activity details
- [ ] 5 product-specific workflows functional
- [ ] Component library with custom add
- [ ] Hierarchical scope with templates
- [ ] Manpower planning per activity
- [ ] Welding process combinations
- [ ] AI suggests base hours
- [ ] All exports working (CSV/PDF/Excel)

---

**Document Version:** 2.0  
**Last Updated:** 2026-02-15  
**Status:** Revision in Progress  
**Next:** Captain Stitch to create revised mockups