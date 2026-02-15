# RCCP Man-Hours - API Contract

**API Type:** Firebase SDK (Client-side)  
**Pattern:** No REST API needed - direct Firestore access  
**Date:** 15 Feb 2026

---

## 1. API ARCHITECTURE DECISION

### Decision: Use Firebase Client SDK (Not REST API)
**Reasoning:**
- Firestore provides real-time sync
- Built-in offline support
- No server maintenance
- Security via Firestore Rules
- Simpler architecture

**Implication:**
- Frontend connects directly to Firestore
- No backend server code needed
- Security enforced by Firestore Rules
- Firebase SDK handles auth tokens

---

## 2. AUTHENTICATION API

### Firebase Auth SDK Methods

#### Register User
```javascript
// Method: createUserWithEmailAndPassword
const registerUser = async (email, password, userData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Store additional data in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    name: userData.name,
    email: email,
    company: userData.company,
    createdAt: new Date().toISOString()
  });
  
  return { success: true, user };
};

// Input
{
  email: string (required, valid email),
  password: string (required, min 6 chars),
  name: string (required),
  company: string (optional)
}

// Output Success
{
  success: true,
  user: {
    uid: string,
    email: string
  }
}

// Output Error
{
  success: false,
  error: string (error message)
}
```

#### Login User
```javascript
// Method: signInWithEmailAndPassword
const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return { success: true, user: userCredential.user };
};

// Input
{
  email: string (required),
  password: string (required)
}

// Output Success
{
  success: true,
  user: {
    uid: string,
    email: string
  }
}

// Output Error
{
  success: false,
  error: string
}
```

#### Logout User
```javascript
// Method: signOut
const logoutUser = async () => {
  await signOut(auth);
  return { success: true };
};
```

#### Get Current User
```javascript
// Method: onAuthStateChanged (listener)
const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
```

---

## 3. FIRESTORE DATA API

### Projects Collection

#### Create Project
```javascript
// Method: addDoc
const createProject = async (userId, projectData) => {
  const projectRef = await addDoc(collection(db, 'projects'), {
    userId: userId,
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return { id: projectRef.id };
};

// Input
{
  userId: string (required),
  projectNumber: string (required),
  name: string (required),
  customer: string (required),
  location: string (optional),
  productType: enum ['vessel', 'skid', 'ehouse', 'structure', 'other'],
  description: string (optional),
  status: enum ['draft', 'active', 'completed', 'cancelled'],
  // ... technical parameters
}

// Output
{
  id: string (Firestore document ID)
}
```

#### Get User Projects
```javascript
// Method: getDocs with query
const getUserProjects = async (userId) => {
  const q = query(
    collection(db, 'projects'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  const projects = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });
  
  return projects;
};

// Output
[
  {
    id: string,
    projectNumber: string,
    name: string,
    // ... other fields
  }
]
```

#### Get Single Project
```javascript
// Method: getDoc
const getProject = async (projectId) => {
  const docRef = doc(db, 'projects', projectId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('Project not found');
  }
};

// Input
projectId: string (required)

// Output
{
  id: string,
  // ... all project fields
}
```

#### Update Project
```javascript
// Method: updateDoc
const updateProject = async (projectId, data) => {
  const docRef = doc(db, 'projects', projectId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
  return { success: true };
};

// Input
projectId: string (required)
data: object (fields to update)

// Output
{
  success: true
}
```

#### Delete Project
```javascript
// Method: deleteDoc
const deleteProject = async (projectId) => {
  await deleteDoc(doc(db, 'projects', projectId));
  return { success: true };
};

// Input
projectId: string (required)

// Output
{
  success: true
}
```

---

### Project Components

#### Save Components
```javascript
// Method: setDoc (creates or overwrites)
const saveComponents = async (projectId, components) => {
  await setDoc(doc(db, 'projectComponents', projectId), {
    components: components,
    updatedAt: new Date().toISOString()
  });
  return { success: true };
};

// Input
projectId: string (required)
components: array

// Components Schema
[
  {
    id: string,
    type: string,
    name: string,
    quantity: number,
    thickness: number,
    material: string,
    dimensions: object
  }
]

// Output
{
  success: true
}
```

#### Get Components
```javascript
// Method: getDoc
const getComponents = async (projectId) => {
  const docRef = doc(db, 'projectComponents', projectId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().components || [];
  } else {
    return [];
  }
};

// Output
[
  {
    id: string,
    type: string,
    name: string,
    // ...
  }
]
```

---

### Project Scope

#### Save Scope Selection
```javascript
// Method: setDoc
const saveScope = async (projectId, selectedScopes) => {
  await setDoc(doc(db, 'projectScope', projectId), {
    selectedScopes: selectedScopes,
    updatedAt: new Date().toISOString()
  });
  return { success: true };
};

// Input
projectId: string
selectedScopes: array of scope codes

// Output
{
  success: true
}
```

#### Get Scope Selection
```javascript
// Method: getDoc
const getScope = async (projectId) => {
  const docRef = doc(db, 'projectScope', projectId);
  const docSnap = await getDoc(docRef);
  
  return docSnap.exists() ? docSnap.data().selectedScopes || [] : [];
};

// Output
[
  { code: string, category: string, name: string, selected: boolean }
]
```

---

### Project Activities

#### Save Activities
```javascript
// Method: setDoc
const saveActivities = async (projectId, activities, summary) => {
  await setDoc(doc(db, 'projectActivities', projectId), {
    activities: activities,
    summary: summary,
    updatedAt: new Date().toISOString()
  });
  return { success: true };
};

// Input
projectId: string
activities: array
summary: object

// Output
{
  success: true
}
```

#### Get Activities
```javascript
// Method: getDoc
const getActivities = async (projectId) => {
  const docRef = doc(db, 'projectActivities', projectId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      activities: docSnap.data().activities || [],
      summary: docSnap.data().summary || {}
    };
  } else {
    return { activities: [], summary: {} };
  }
};

// Output
{
  activities: [...],
  summary: {
    totalBaseHours: number,
    totalAdjustedHours: number,
    totalCrew: number,
    estimatedDuration: number
  }
}
```

---

## 4. SYSTEM CONFIG API (Read-Only)

### Get Material Grades
```javascript
const getMaterialGrades = async () => {
  const docRef = doc(db, 'systemConfig', 'materialGrades');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().grades : [];
};

// Output
[
  {
    code: string,
    name: string,
    cuttingFactor: number,
    fitupFactor: number,
    weldingFactor: number
  }
]
```

### Get Welding Processes
```javascript
const getWeldingProcesses = async () => {
  const docRef = doc(db, 'systemConfig', 'weldingProcesses');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().processes : [];
};

// Output
[
  {
    code: string,
    name: string,
    depositRate: number,
    efficiency: number
  }
]
```

### Get Scope Types
```javascript
const getScopeTypes = async () => {
  const docRef = doc(db, 'systemConfig', 'scopeTypes');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().categories : [];
};

// Output
[
  {
    code: string,
    name: string,
    items: [
      { code: string, name: string }
    ]
  }
]
```

---

## 5. CALCULATION API (Client-Side)

### Calculate Activity Hours
```javascript
// Pure function (no API call)
const calculateActivityHours = (activity) => {
  const { baseHours, quantity, difficultyFactor, efficiencyFactor } = activity;
  return (baseHours * quantity * difficultyFactor) / efficiencyFactor;
};

// Input
{
  baseHours: number,
  quantity: number,
  difficultyFactor: number,
  efficiencyFactor: number
}

// Output
totalHours: number
```

### Calculate Material Factor
```javascript
const getMaterialFactor = (materialCode, activityType) => {
  const factors = {
    'CS': { cutting: 1.0, fitup: 1.0, welding: 1.0 },
    'SS304': { cutting: 1.2, fitup: 1.15, welding: 1.3 },
    // ... more materials
  };
  
  return factors[materialCode]?.[activityType] || 1.0;
};

// Input
materialCode: string ('CS' | 'SS304' | 'SS316' | 'Alloy' | 'Duplex')
activityType: string ('cutting' | 'fitup' | 'welding')

// Output
factor: number
```

### Calculate Thickness Factor
```javascript
const getThicknessFactor = (thickness, activityType) => {
  if (thickness <= 12) return 1.0;
  if (thickness <= 25) return 1.3;
  if (thickness <= 50) return 1.8;
  return 2.5;
};

// Input
thickness: number (mm)
activityType: string

// Output
factor: number
```

---

## 6. ERROR HANDLING

### Standard Error Format
```javascript
{
  success: false,
  error: {
    code: string,
    message: string
  }
}
```

### Common Error Codes
| Code | Description | Action |
|------|-------------|--------|
| `auth/invalid-email` | Invalid email format | Show validation error |
| `auth/user-not-found` | User doesn't exist | Show "user not found" |
| `auth/wrong-password` | Wrong password | Show "invalid credentials" |
| `auth/email-already-in-use` | Email taken | Show "email exists" |
| `permission-denied` | No access | Redirect to login |
| `not-found` | Document not found | Show "not found" message |
| `network-request-failed` | Network error | Retry or show offline message |

---

## 7. API SECURITY

### Authentication Required
All Firestore operations require authentication except:
- Login
- Signup
- Password reset

### Authorization
Enforced by Firestore Security Rules:
```javascript
// Users can only access their own data
match /projects/{projectId} {
  allow read, write: if request.auth != null 
                     && resource.data.userId == request.auth.uid;
}
```

---

## 8. RATE LIMITS

### Firebase Limits
- **Authentication:** 10 SMS/hour, 100 verifications/IP/hour
- **Firestore:** 1M concurrent connections, 10MB max document size
- **Hosting:** 10GB transfer/day (free tier)

**Well within limits for this application.**

---

## 9. API VERSIONING

Not applicable - using Firebase SDK which handles versioning.

---

**Next:** Implementation in React components