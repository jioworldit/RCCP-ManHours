# RCCP Man-Hours - Database Schema

**Database:** Cloud Firestore (NoSQL)  
**Structure:** Collections → Documents → Fields  
**Date:** 15 Feb 2026

---

## 1. COLLECTIONS OVERVIEW

```
users/                  # User profiles
├── {userId}            # Document: User data

projects/               # Project headers
├── {projectId}         # Document: Project info

projectComponents/      # Components per project
├── {projectId}         # Document: Array of components

projectScope/           # Selected scope items
├── {projectId}         # Document: Checklist data

projectActivities/      # Calculated activities
├── {projectId}         # Document: Activities array

systemConfig/           # System configuration (optional)
├── materialGrades      # Document: Material multipliers
├── weldingProcesses    # Document: Welding data
└── scopeTypes          # Document: Scope definitions
```

---

## 2. USERS COLLECTION

**Collection:** `users`  
**Document ID:** Firebase Auth UID  
**Purpose:** User profile data

### Schema
```javascript
{
  email: string,           // User's email
  name: string,            // Full name
  company: string,         // Company name (optional)
  phone: string,           // Phone number (optional)
  role: string,            // 'user' | 'admin' (default: 'user')
  createdAt: timestamp,    // Account creation date
  updatedAt: timestamp,    // Last update date
  lastLoginAt: timestamp   // Last login date
}
```

### Example Document
```javascript
{
  email: "john@example.com",
  name: "John Doe",
  company: "ABC Fabrication Ltd",
  phone: "+971 50 123 4567",
  role: "user",
  createdAt: Timestamp.fromDate(new Date("2026-02-15")),
  updatedAt: Timestamp.fromDate(new Date("2026-02-15")),
  lastLoginAt: Timestamp.fromDate(new Date("2026-02-15"))
}
```

---

## 3. PROJECTS COLLECTION

**Collection:** `projects`  
**Document ID:** Auto-generated Firestore ID  
**Purpose:** Project header information

### Schema
```javascript
{
  userId: string,              // Reference to users/{userId}
  projectNumber: string,       // Unique project number (e.g., "RCCP-2026-001")
  name: string,                // Project name
  customer: string,            // Customer name
  location: string,            // Project location
  productType: string,         // Enum: 'vessel' | 'skid' | 'ehouse' | 'structure' | 'other'
  description: string,         // Project description (optional)
  status: string,              // Enum: 'draft' | 'active' | 'completed' | 'cancelled'
  
  // Technical Parameters (optional)
  shellThickness: number,      // mm
  materialGrade: string,       // 'CS' | 'SS304' | 'SS316' | 'SS316L' | 'Alloy' | 'Duplex'
  diameter: number,            // mm
  length: number,              // mm
  numNozzles: number,
  weldLength: number,          // meters
  weight: number,              // tons
  designPressure: number,      // bar
  designTemp: number,          // celsius
  
  // Calculated Fields
  totalHours: number,          // Total man-hours
  totalCost: number,           // Total cost (optional)
  
  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
  completedAt: timestamp       // Null until completed
}
```

### Example Document
```javascript
{
  userId: "abc123def456",
  projectNumber: "RCCP-2026-001",
  name: "Pressure Vessel PV-101",
  customer: "OilCo International",
  location: "Dubai, UAE",
  productType: "vessel",
  description: "ASME VIII Div 1 Pressure Vessel",
  status: "active",
  
  shellThickness: 25,
  materialGrade: "SS316",
  diameter: 2000,
  length: 6000,
  numNozzles: 8,
  weldLength: 45.5,
  weight: 12.5,
  designPressure: 15,
  designTemp: 200,
  
  totalHours: 1250.5,
  totalCost: null,
  
  createdAt: Timestamp.fromDate(new Date("2026-02-15")),
  updatedAt: Timestamp.fromDate(new Date("2026-02-15")),
  completedAt: null
}
```

### Indexes Required
```javascript
// Composite indexes for queries
projects: {
  fields: [
    { fieldPath: "userId", order: "ASCENDING" },
    { fieldPath: "createdAt", order: "DESCENDING" }
  ]
}
```

---

## 4. PROJECT COMPONENTS COLLECTION

**Collection:** `projectComponents`  
**Document ID:** Same as project ID  
**Purpose:** Store components for each project

### Schema
```javascript
{
  components: array,           // Array of component objects
  updatedAt: timestamp
}
```

### Component Object Schema
```javascript
{
  id: string,                  // Unique component ID
  type: string,                // Component type
  name: string,                // Component name
  quantity: number,            // Quantity
  thickness: number,           // Thickness in mm
  material: string,            // Material grade
  dimensions: {                // Dimensions object
    diameter: number,          // For cylindrical
    length: number,            // For cylindrical
    width: number,             // For rectangular
    height: number,            // For rectangular
    depth: number              // For rectangular
  },
  weight: number,              // Calculated weight (kg)
  notes: string                // Optional notes
}
```

### Example Document
```javascript
{
  components: [
    {
      id: "comp_001",
      type: "shell",
      name: "Shell Course 1",
      quantity: 1,
      thickness: 25,
      material: "SS316",
      dimensions: {
        diameter: 2000,
        length: 2000
      },
      weight: 2500,
      notes: "Longitudinal seam"
    },
    {
      id: "comp_002",
      type: "dish_head",
      name: "Top Dish Head",
      quantity: 1,
      thickness: 25,
      material: "SS316",
      dimensions: {
        diameter: 2000,
        crownRadius: 1800
      },
      weight: 850,
      notes: "Ellipsoidal"
    },
    {
      id: "comp_003",
      type: "nozzle",
      name: "Inlet Nozzle",
      quantity: 2,
      thickness: 12,
      material: "SS316",
      dimensions: {
        diameter: 150,
        length: 300
      },
      weight: 45,
      notes: "4 inch, 300#"
    }
  ],
  updatedAt: Timestamp.fromDate(new Date("2026-02-15"))
}
```

---

## 5. PROJECT SCOPE COLLECTION

**Collection:** `projectScope`  
**Document ID:** Same as project ID  
**Purpose:** Store selected scope checklist items

### Schema
```javascript
{
  selectedScopes: array,       // Array of selected scope codes
  templates: array,            // Saved templates (optional)
  updatedAt: timestamp
}
```

### Scope Item Object
```javascript
{
  code: string,                // Scope code (e.g., "WELDING_ROOT")
  category: string,            // Category (e.g., "welding")
  name: string,                // Display name
  selected: boolean            // Is selected
}
```

### Example Document
```javascript
{
  selectedScopes: [
    { code: "MAT_RECEIPT", category: "material", name: "Material Receipt", selected: true },
    { code: "MAT_STORAGE", category: "material", name: "Storage", selected: true },
    { code: "CUT_PLASMA", category: "cutting", name: "Plasma Cutting", selected: true },
    { code: "FITUP_COMPONENT", category: "fitup", name: "Component Fit-Up", selected: true },
    { code: "WELDING_ROOT", category: "welding", name: "Root Pass", selected: true },
    { code: "WELDING_FILL", category: "welding", name: "Fill Pass", selected: true },
    { code: "WELDING_CAP", category: "welding", name: "Cap Pass", selected: true },
    { code: "NDT_RT", category: "ndt", name: "Radiographic Testing", selected: true },
    { code: "HYDRO_SETUP", category: "hydrotest", name: "Test Setup", selected: true }
  ],
  templates: [],
  updatedAt: Timestamp.fromDate(new Date("2026-02-15"))
}
```

---

## 6. PROJECT ACTIVITIES COLLECTION

**Collection:** `projectActivities`  
**Document ID:** Same as project ID  
**Purpose:** Store calculated activities and man-hours

### Schema
```javascript
{
  activities: array,           // Array of activity objects
  summary: {                   // Summary calculations
    totalBaseHours: number,
    totalAdjustedHours: number,
    totalCrew: number,
    estimatedDuration: number  // Days
  },
  updatedAt: timestamp
}
```

### Activity Object Schema
```javascript
{
  id: string,                  // Unique activity ID
  code: string,                // Activity code (e.g., "F-101")
  description: string,         // Activity description
  componentId: string,         // Reference to component
  componentName: string,       // Component name
  quantity: number,            // Quantity
  unit: string,                // Unit (nos/m/m2/kg/hours)
  baseHours: number,           // Base hours per unit
  difficultyFactor: number,    // Difficulty multiplier
  efficiencyFactor: number,    // Efficiency (0.75-0.95)
  totalHours: number,          // Calculated total hours
  
  // Manpower
  crewSize: number,            // Total crew size
  duration: number,            // Duration in days
  
  // Manpower breakdown
  manpower: {
    fabricators: { qty: number, hours: number },
    welders: { qty: number, hours: number },
    fitters: { qty: number, hours: number },
    grinders: { qty: number, hours: number },
    helpers: { qty: number, hours: number },
    inspectors: { qty: number, hours: number }
  },
  
  // Welding (if applicable)
  weldingProcess: string,      // SMAW/GTAW/etc.
  
  // Metadata
  isManualEdit: boolean,       // Was manually edited
  notes: string                // Optional notes
}
```

### Example Document
```javascript
{
  activities: [
    {
      id: "act_001",
      code: "F-101",
      description: "Shell Course Fit-Up",
      componentId: "comp_001",
      componentName: "Shell Course 1",
      quantity: 1,
      unit: "nos",
      baseHours: 8.5,
      difficultyFactor: 1.2,
      efficiencyFactor: 0.85,
      totalHours: 12.0,
      crewSize: 4,
      duration: 1.5,
      manpower: {
        fabricators: { qty: 2, hours: 12 },
        fitters: { qty: 2, hours: 12 }
      },
      weldingProcess: null,
      isManualEdit: false,
      notes: ""
    },
    {
      id: "act_002",
      code: "W-201",
      description: "Nozzle 1 Set-On Weld",
      componentId: "comp_003",
      componentName: "Inlet Nozzle",
      quantity: 1,
      unit: "nos",
      baseHours: 4.2,
      difficultyFactor: 1.35,
      efficiencyFactor: 0.80,
      totalHours: 7.09,
      crewSize: 3,
      duration: 0.75,
      manpower: {
        welders: { qty: 2, hours: 7.09 },
        helpers: { qty: 1, hours: 7.09 }
      },
      weldingProcess: "GTAW+SMAW",
      isManualEdit: false,
      notes: ""
    }
  ],
  summary: {
    totalBaseHours: 125.5,
    totalAdjustedHours: 187.25,
    totalCrew: 12,
    estimatedDuration: 23.4
  },
  updatedAt: Timestamp.fromDate(new Date("2026-02-15"))
}
```

---

## 7. SYSTEM CONFIG COLLECTION (Optional)

**Collection:** `systemConfig`  
**Purpose:** Store reference data and configuration

### Material Grades Document
```javascript
// Document: systemConfig/materialGrades
{
  grades: [
    { code: "CS", name: "Carbon Steel", cuttingFactor: 1.0, fitupFactor: 1.0, weldingFactor: 1.0 },
    { code: "SS304", name: "Stainless 304", cuttingFactor: 1.2, fitupFactor: 1.15, weldingFactor: 1.3 },
    { code: "SS316", name: "Stainless 316", cuttingFactor: 1.25, fitupFactor: 1.2, weldingFactor: 1.35 },
    { code: "SS316L", name: "Stainless 316L", cuttingFactor: 1.25, fitupFactor: 1.2, weldingFactor: 1.35 },
    { code: "Alloy", name: "Chrome-Moly Alloy", cuttingFactor: 1.3, fitupFactor: 1.25, weldingFactor: 1.5 },
    { code: "Duplex", name: "Duplex Stainless", cuttingFactor: 1.5, fitupFactor: 1.45, weldingFactor: 1.8 }
  ]
}
```

### Welding Processes Document
```javascript
// Document: systemConfig/weldingProcesses
{
  processes: [
    { code: "SMAW", name: "Shielded Metal Arc", depositRate: 1.5, efficiency: 0.75 },
    { code: "GTAW", name: "Tungsten Arc", depositRate: 0.8, efficiency: 0.85 },
    { code: "GMAW", name: "MIG/MAG", depositRate: 3.0, efficiency: 0.90 },
    { code: "FCAW", name: "Flux Cored", depositRate: 3.5, efficiency: 0.85 },
    { code: "SAW", name: "Submerged Arc", depositRate: 8.0, efficiency: 0.95 }
  ]
}
```

### Scope Types Document
```javascript
// Document: systemConfig/scopeTypes
{
  categories: [
    {
      code: "material",
      name: "Material Handling",
      items: [
        { code: "MAT_RECEIPT", name: "Receipt & Inspection" },
        { code: "MAT_STORAGE", name: "Storage" },
        { code: "MAT_ISSUE", name: "Issue to Production" }
      ]
    },
    {
      code: "cutting",
      name: "Marking & Cutting",
      items: [
        { code: "CUT_MARKING", name: "Layout & Marking" },
        { code: "CUT_PLASMA", name: "Plasma Cutting" },
        { code: "CUT_OXY", name: "Oxy-Fuel Cutting" },
        { code: "CUT_MACHINE", name: "Machining" }
      ]
    }
    // ... more categories
  ]
}
```

---

## 8. DATA RELATIONSHIPS

```
users/{userId}
    │
    └── (owns many)
        │
        projects/{projectId}
            │
            ├── (has one) → projectComponents/{projectId}
            ├── (has one) → projectScope/{projectId}
            └── (has one) → projectActivities/{projectId}
```

---

## 9. SECURITY RULES

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Projects - users can only access their own
    match /projects/{projectId} {
      allow read, write: if request.auth != null && 
                          resource.data.userId == request.auth.uid;
      allow create: if request.auth != null &&
                     request.resource.data.userId == request.auth.uid;
    }
    
    // Project data - same as projects
    match /projectComponents/{projectId} {
      allow read, write: if request.auth != null &&
                          exists(/databases/$(database)/documents/projects/$(projectId)) &&
                          get(/databases/$(database)/documents/projects/$(projectId)).data.userId == request.auth.uid;
    }
    
    match /projectScope/{projectId} {
      allow read, write: if request.auth != null &&
                          exists(/databases/$(database)/documents/projects/$(projectId)) &&
                          get(/databases/$(database)/documents/projects/$(projectId)).data.userId == request.auth.uid;
    }
    
    match /projectActivities/{projectId} {
      allow read, write: if request.auth != null &&
                          exists(/databases/$(database)/documents/projects/$(projectId)) &&
                          get(/databases/$(database)/documents/projects/$(projectId)).data.userId == request.auth.uid;
    }
    
    // System config - read-only for all authenticated users
    match /systemConfig/{document} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin via console
    }
  }
}
```

---

**Next Document:** API Contract