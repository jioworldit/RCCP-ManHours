# RCCP Man-Hours - Requirements Analysis

**Project:** RCCP Man-Hours Estimation System  
**Version:** 1.0  
**Date:** 15 Feb 2026

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose
A web-based application for calculating man-hours required for fabrication projects in heavy engineering industries (Pressure Vessels, Process Skids, E-Houses, Structural Steel).

### 1.2 Target Users
- **Primary:** Fabrication engineers, project managers
- **Secondary:** Estimators, production planners
- **Tertiary:** Management for reporting and analytics

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 Authentication System
- User registration with email/password
- User login/logout
- Password reset functionality
- Session management
- User profile management

### 2.2 Project Management
- Create new projects
- Edit existing projects
- Delete projects
- View project list with search/filter
- Project status tracking (Draft, In Progress, Completed)

### 2.3 Product Types (5 Categories)
1. **Pressure Vessel**
   - Shells, Dish Heads, Nozzles
   - Skirt/Saddles, Lifting Lugs
   - Internals, Externals, Manways, Trunnions

2. **Process Skids**
   - Structural Frames, Equipment Modules
   - Piping Systems, Instrumentation
   - Electrical Panels

3. **E-House (Electrical House)**
   - Building Structure, HVAC Systems
   - Electrical Equipment, Control Systems
   - Lighting, Fire Suppression

4. **Structural Steel**
   - Columns, Beams, Bracing
   - Platforms, Ladders

5. **Other Fabricated Items**
   - Custom components

### 2.4 Component Management
- Add components per product type
- Specify quantity, dimensions, thickness
- Material grade selection (CS, SS304, SS316, Alloy, Duplex)
- Delete components
- Save component templates

### 2.5 Scope of Work (Checklist)
Hierarchical checklist with 9 main categories:

1. **Material Handling**
   - Receipt & Inspection, Storage, Issue to Production

2. **Marking & Cutting**
   - Layout & Marking, Plasma Cutting, Oxy-Fuel Cutting, Machining

3. **Fit-Up Assembly**
   - Component Fit-Up, Tack Welding, Alignment Check

4. **Welding Operations**
   - Root Pass, Fill Pass, Cap Pass, Post-Weld Cleaning

5. **NDT (Non-Destructive Testing)**
   - RT (Radiographic), UT (Ultrasonic), MT (Magnetic), PT (Penetrant)

6. **Heat Treatment**
   - Stress Relieving, Normalizing, PWHT

7. **Hydrostatic Testing**
   - Setup, Fill, Hold, Inspect, Drain

8. **Surface Prep & Painting**
   - Blasting, Primer, Intermediate, Finish Coat

9. **Packing & Dispatch**
   - Final Inspection, Documentation, Packing, Loading

**Features:**
- Expand/collapse categories
- Select All/Deselect per category
- Save as template
- Load from template
- Progress indicator

### 2.6 Technical Parameters
- Shell Thickness (mm)
- Material Grade (dropdown)
- Diameter/Length (mm)
- Number of Nozzles
- Linear Weld Length (meters)
- Structural Weight (Tons)
- Design Pressure/Temperature
- Corrosion Allowance

### 2.7 Activities & Calculations

**Auto-Generated Activity List:**
Based on components and scope selection, system generates:
- Activity Code (F-101, W-203, NDT-301, etc.)
- Description
- Quantity
- Unit (nos/m/m2/kg)
- Base Hours (from standards)

**Calculation Formula:**
```
Total Man-Hours = (Base Hours × Quantity × Difficulty Factor) / Efficiency
```

**Adjustable Factors:**
- Difficulty Factor (0.5, 0.75, 1.0, 1.25, 1.5, 2.0)
- Efficiency Factor (typically 0.75-0.95)

**Manpower Requirements:**
- Fabricators: Qty × Hours
- Welders: Qty × Hours
- Fitters: Qty × Hours
- Grinders: Qty × Hours
- Helpers: Qty × Hours
- Inspectors: Qty × Hours

**Welding Processes:**
- SMAW, GTAW, GMAW, FCAW, SAW
- Combinations: SMAW+SAW, GTAW+SMAW, GTAW+SAW, SMAW+FCAW

### 2.8 Results Dashboard
- Summary cards (Total Hours, Duration, Manpower, Cost)
- Activity breakdown by type
- Visual charts (pie/bar)
- Export to CSV, PDF, Excel
- Print-friendly layout

### 2.9 Export Functionality
- **CSV Export:** Detailed data table
- **PDF Report:** Formatted report with charts
- **Excel:** With formulas and formatting
- **Print:** Optimized layout

---

## 3. NON-FUNCTIONAL REQUIREMENTS

### 3.1 Performance
- Page load time: < 3 seconds
- Calculation response: < 1 second
- Support 100+ concurrent users

### 3.2 Security
- Firebase Authentication
- HTTPS only
- Firestore security rules
- Input validation
- XSS protection

### 3.3 Usability
- Responsive design (desktop, tablet, mobile)
- Intuitive navigation
- Clear error messages
- Loading indicators
- Form validation feedback

### 3.4 Reliability
- 99.9% uptime (Firebase SLA)
- Data backup (Firebase automatic)
- Offline capability (optional v2)

### 3.5 Scalability
- Support growing user base
- Handle large projects (1000+ activities)
- Efficient database queries

---

## 4. USER FLOWS

### 4.1 New User Registration
```
Landing Page → Sign Up → Fill Form → Verification → Dashboard
```

### 4.2 Create New Project
```
Dashboard → New Project → Enter Details → Select Product Type → 
Add Components → Select Scope → Review Activities → Calculate → Save
```

### 4.3 View/Edit Existing Project
```
Dashboard → Select Project → View Details → Edit → Save Changes
```

### 4.4 Export Report
```
Project Results → Select Format → Download/Print
```

---

## 5. MVP vs V2 FEATURES

### MVP (Must Have)
- [ ] User auth (login/signup)
- [ ] Create/view projects
- [ ] 5 product types
- [ ] Component entry
- [ ] Scope checklist
- [ ] Activities with calculations
- [ ] CSV export
- [ ] Responsive design

### V2 (Nice to Have)
- [ ] PDF/Excel export
- [ ] Advanced charts
- [ ] Template system
- [ ] Historical data analysis
- [ ] AI productivity recommendations
- [ ] Multi-language support
- [ ] Mobile app
- [ ] ERP integration

---

## 6. SUCCESS CRITERIA

- [ ] User can register and login
- [ ] User can create complete project
- [ ] Calculations are accurate (±5%)
- [ ] All 7 screens functional
- [ ] Data persists properly
- [ ] Export works (CSV)
- [ ] Mobile responsive
- [ ] Zero critical bugs

---

**Document Version:** 1.0  
**Approved By:** Major Jio  
**Next:** System Design Document