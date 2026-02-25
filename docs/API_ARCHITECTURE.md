# API Architecture & Frontend Integration

This document explains how the React frontend communicates with the Node.js/Express backend.

## API Structure

The backend exposes a RESTful API. The frontend interacts with it using the `axios` library, encapsulated in `lib/api.ts`.

### Base Configuration
*   **Base URL**: `http://localhost:5000/api` (Development)
*   **Interceptor**: automatically attaches the `Bearer <token>` from localStorage to every request to secured endpoints.

## Core API Modules

### 1. Authentication (`auth`)
*   `POST /auth/register`: Create new user.
*   `POST /auth/login`: Authenticate and receive token.

### 2. Dashboard Data (`dashboard`)
*   `GET /dashboard/parent`: Aggregated data for parent view.
*   `GET /dashboard/teacher`: Aggregated data for teacher view.
*   `GET /dashboard/student`: Aggregated data for student view.

### 3. Students (`students`)
*   `GET /students`: List all students (Teacher view).
*   `POST /students`: Add new student (Parent/Teacher action).
*   `GET /students/:id`: Detailed student profile.

### 4. Assessments (`assessments`)
*   `POST /assessments`: Submit a new reading recording/result.
*   `GET /assessments/history`: Get past results.

## State Management (Redux)

The application uses Redux Toolkit to manage server state and UI state.

*   `store/slices/authSlice.ts`:
    *   Manages `user` object and `isAuthenticated` flag.
    *   Handles login/register async thunks.
*   `store/slices/dashboardSlice.ts`:
    *   Generic slice for simple dashboard data fetching.
*   `store/slices/parentSlice.ts` & `teacherSlice.ts`:
    *   Role-specific data handling to keep logic separated.

## Error Handling
*   **API Errors**: The `axios` interceptor catches 401 (Unauthorized) errors and can trigger a logout.
*   **UI Feedback**: Components use `isLoading` and `error` states from Redux slices to show spinners or error messages (using `sooner` toast notifications).
