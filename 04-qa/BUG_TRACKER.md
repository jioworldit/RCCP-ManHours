# RCCP Man-Hours Bug Tracker

**Project:** RCCP Man-Hours Estimation System  
**Phase:** 4 - QA Testing  
**Created:** 2026-02-16  
**Status:** Active

---

## Bug Summary

| Severity | Count | Fixed | Remaining |
|----------|-------|-------|-----------|
| Critical | 1 | 1 | 0 |
| High | 0 | 0 | 0 |
| Medium | 2 | 1 | 1 |
| Low | 2 | 0 | 2 |
| **TOTAL** | **5** | **2** | **3** |

---

## Bug Details

### BUG-001: API Endpoint Mismatch (CRITICAL) ✅ FIXED

| Field | Value |
|-------|-------|
| **ID** | BUG-001 |
| **Title** | Frontend API endpoints don't match backend routes |
| **Severity** | Critical |
| **Priority** | P0 - Blocker |
| **Status** | ✅ Fixed |
| **Component** | Frontend API Service |
| **Assignee** | QA Sub-Agent |
| **Reported** | 2026-02-16 |
| **Fixed** | 2026-02-16 |

**Description:**
All API calls from the frontend were failing with 404 errors because the endpoint URLs in `src/services/api.js` did not match the actual backend routes.

**Steps to Reproduce:**
1. Start backend server on port 3000
2. Start frontend development server
3. Open browser and navigate to frontend
4. Observe network tab - all API calls return 404

**Expected Behavior:**
API calls should return 200 OK with data

**Actual Behavior:**
```json
{
  "error": "Not Found",
  "message": "Route GET /api/projects/xxx/activities not found"
}
```

**Root Cause:**
Frontend API service used RESTful nested routes (`/projects/:id/activities`) but backend used flat routes (`/activities/project/:id`).

**Fix Applied:**
Updated `03-development/frontend/src/services/api.js`:

```javascript
// Before (Broken)
getActivities: (projectId) => api.get(`/projects/${projectId}/activities`),
generateActivities: (projectId) => api.post(`/projects/${projectId}/activities/generate`),
updateActivity: (activityId, data) => api.patch(`/activities/${activityId}`, data),
bulkUpdateActivities: (projectId, activityUpdates) => 
  api.patch(`/projects/${projectId}/activities`, { activityUpdates }),
addActivity: (projectId, data) => api.post(`/projects/${projectId}/activities`, data),

// After (Fixed)
getActivities: (projectId) => api.get(`/activities/project/${projectId}`),
generateActivities: (projectId) => api.post(`/activities/generate/${projectId}`),
updateActivity: (activityId, data) => api.put(`/activities/${activityId}`, data),
bulkUpdateActivities: (projectId, activityUpdates) => 
  api.put(`/activities/project/${projectId}/bulk`, { activityUpdates }),
addActivity: (projectId, data) => api.post(`/activities/project/${projectId}/manual`, data),
```

**Verification:**
- [x] All API calls return 200 OK
- [x] Data returned matches expected format
- [x] Build successful with fixed code

---

### BUG-002: Reference API Endpoint Mismatch (MEDIUM) ✅ FIXED

| Field | Value |
|-------|-------|
| **ID** | BUG-002 |
| **Title** | Reference data API endpoints use wrong prefix |
| **Severity** | Medium |
| **Priority** | P1 - High |
| **Status** | ✅ Fixed |
| **Component** | Frontend API Service |
| **Assignee** | QA Sub-Agent |
| **Reported** | 2026-02-16 |
| **Fixed** | 2026-02-16 |

**Description:**
Reference data endpoints in frontend used `/references/` (plural) but backend routes are `/reference/` (singular).

**Steps to Reproduce:**
1. Call `referenceApi.getWeldingProcesses()` from frontend
2. Observe 404 error

**Expected Behavior:**
Return list of welding processes

**Actual Behavior:**
404 Not Found

**Fix Applied:**
```javascript
// Before (Broken)
getWeldingProcesses: () => api.get('/references/welding-processes'),
getScopeTypes: () => api.get('/references/scope-types'),
getMaterialGrades: () => api.get('/references/material-grades')

// After (Fixed)
getWeldingProcesses: () => api.get('/reference/welding-processes'),
getScopeTypes: () => api.get('/reference/scope-types'),
getMaterialGrades: () => api.get('/reference/material-grades')
```

---

### BUG-003: Incomplete Frontend Implementation (MEDIUM) ⏳ NOT FIXED

| Field | Value |
|-------|-------|
| **ID** | BUG-003 |
| **Title** | Frontend missing critical pages and routing |
| **Severity** | Medium |
| **Priority** | P1 - High |
| **Status** | ⏳ Open - Requires Development |
| **Component** | Frontend Application |
| **Assignee** | TBD |
| **Reported** | 2026-02-16 |
| **ETA** | Phase 5 or later |

**Description:**
The frontend application is incomplete and does not provide a full user experience. Only the ActivitiesGrid component is implemented.

**Missing Features:**
1. ❌ Authentication pages (Login, Register, Forgot Password)
2. ❌ Dashboard/Project List view
3. ❌ Project creation/editing forms
4. ❌ React Router navigation
5. ❌ Navigation menu/sidebar
6. ❌ Results/Reports screen
7. ❌ Chart/visualization components
8. ❌ Export functionality

**Current State:**
- App.js only renders `<ActivitiesGrid />`
- No routing between pages
- No authentication UI
- URL parameters required to specify project

**Expected Behavior:**
Full SPA with:
- Login/Register pages
- Dashboard with project list
- Navigation sidebar
- Multi-step project wizard
- Results and export screens

**Recommendation:**
Complete frontend implementation before production deployment.

---

### BUG-004: Missing Pagination Metadata (LOW) ⏳ NOT FIXED

| Field | Value |
|-------|-------|
| **ID** | BUG-004 |
| **Title** | List endpoints don't return pagination metadata |
| **Severity** | Low |
| **Priority** | P3 - Low |
| **Status** | ⏳ Open - Acceptable for MVP |
| **Component** | Backend API |
| **Assignee** | TBD |
| **Reported** | 2026-02-16 |

**Description:**
The projects list endpoint accepts pagination query parameters but doesn't include pagination metadata in the response.

**Steps to Reproduce:**
1. Call `GET /api/projects?page=1&limit=10`
2. Observe response doesn't include total count or page info

**Current Response:**
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": {
    "projects": [...]
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": {
    "projects": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 48,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

**Impact:**
Low - Frontend can implement basic pagination without metadata

---

### BUG-005: Components Page API Endpoint Mismatch (LOW) ⏳ NOT FIXED

| Field | Value |
|-------|-------|
| **ID** | BUG-005 |
| **Title** | Components.jsx uses incorrect API endpoint |
| **Severity** | Low |
| **Priority** | P3 - Low |
| **Status** | ⏳ Open - Page not currently used |
| **Component** | Frontend Pages |
| **Assignee** | TBD |
| **Reported** | 2026-02-16 |

**Description:**
The Components.jsx page uses hardcoded API URLs that don't match the backend routes, similar to BUG-001.

**Current Code (Broken):**
```javascript
const API_URL = '/api';
// ...
const response = await axios.get(`${API_URL}/projects/${projectId}/components`, {...});
await axios.post(`${API_URL}/projects/${projectId}/components/batch`, {...});
```

**Expected:**
Should use the shared api.js service or correct endpoints.

**Note:**
This page is not currently used in App.js, so it doesn't affect the running application.

---

## Bug Lifecycle

```
[Open] → [Assigned] → [In Progress] → [Fixed] → [Verified] → [Closed]
   ↑                                                    |
   └────────────── [Reopened] ←─────────────────────────┘
```

### Status Definitions

| Status | Description |
|--------|-------------|
| ⏳ Open | Bug confirmed, not yet assigned |
| 📝 Assigned | Bug assigned to developer |
| 🔧 In Progress | Developer working on fix |
| ✅ Fixed | Fix committed, awaiting verification |
| ✔️ Verified | QA verified fix works |
| 🚪 Closed | Bug resolved |
| 🔄 Reopened | Fix failed verification |

---

## Fixed Bugs History

### 2026-02-16
- **BUG-001**: API Endpoint Mismatch (CRITICAL) - Fixed
- **BUG-002**: Reference API Endpoint Mismatch (MEDIUM) - Fixed

---

## Open Bugs Priority Queue

1. **BUG-003**: Incomplete Frontend Implementation (MEDIUM)
   - Required for production deployment
   - Estimate: 2-3 days development

2. **BUG-004**: Missing Pagination Metadata (LOW)
   - Nice to have for better UX
   - Estimate: 2 hours

3. **BUG-005**: Components Page API Endpoint Mismatch (LOW)
   - Only needed if Components page is used
   - Estimate: 30 minutes

---

**END OF BUG TRACKER**
