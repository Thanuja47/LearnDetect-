# Teacher Dashboard: Class Report Generation Process

## 1. Executive Summary
**Current Status**: 🔴 **Unimplemented / UI Placeholder**

The "Generate Class Report" feature in the Teacher Dashboard is currently a visual placeholder. While the button exists in the interface, it has no underlying logic connected to it, and the backend infrastructure does not currently support aggregate class reporting for teachers.

---

## 2. Technical Analysis

### 2.1 Frontend Implementation
*   **Location**: `app/teacher-dashboard/page.tsx`
*   **Current State**:
    The button is rendered as a static UI element with no event handlers.
    ```tsx
    // Line 333
    <Button variant="outline" className="h-12 bg-transparent">
      Generate Class Report
    </Button>
    ```
*   **State Management (`teacherSlice.ts`)**:
    The Redux slice contains thunks for data fetching (`fetchTeacherDashboard`, `fetchTeacherStudents`), but **no thunk exists** for report generation.

### 2.2 Backend Implementation
*   **Controller (`report.controller.js`)**:
    *   The `generateReport` function expects a `childId` in the request body.
    *   Logic is designed to generate a report for a *single student*, not a class aggregate.
*   **API Routes (`report.routes.js`)**:
    *   **Access Control Block**: Routes are strictly locked to the `PARENT` role.
    ```javascript
    router.use(authorize('PARENT')); // Teachers cannot access these routes
    ```
*   **Teacher Controller (`teacher.controller.js`)**:
    *   Contains logic for fetching student lists and stats, but has no endpoint to compile this into a downloadable or viewable report format.

---

## 3. Implementation Requirements

To fully implement this feature, the following technical changes are required:

### Step 1: Backend Updates
1.  **New API Endpoint**:
    *   Create `POST /teachers/reports/class` in `teacher.routes.js`.
2.  **Controller Logic**:
    *   Implement logic to calculate class-wide metrics (Average vs Grade Average, lowest performing skills, trend analysis).
    *   Return a structured JSON summary or a generated PDF buffer.
3.  **Permissions**:
    *   Ensure the route uses `authorize('TEACHER')`.

### Step 2: Frontend Integration
1.  **API Service**:
    *   Add `generateClassReport` to `teacherAPI` object in `lib/api.ts`.
2.  **Redux Action**:
    *   Create an async thunk `generateClassReport` in `teacherSlice.ts` to handle the API call and loading states.
3.  **UI Interaction**:
    *   Add `onClick` handler to the button in `TeacherDashboard`.
    *   Implement success feedback (e.g., "Report generated successfully" toast) and potential download trigger.
