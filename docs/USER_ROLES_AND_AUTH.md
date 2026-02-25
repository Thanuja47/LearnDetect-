# User Roles and Authentication System

## Overview
LearnDetect uses a role-based authentication system to provide tailored experiences for different user types. The system is built using JWT (JSON Web Tokens) for secure session management and React Redux for client-side state handling.

## User Roles

The application supports the following user roles:

1.  **Student**
    *   **Purpose**: To take reading assessments and view their own progress.
    *   **Features**: Access to reading materials, speech-based assessment interface, basic progress tracking.
    *   **Signup Fields**: Name, Age, Grade Level, Parent Email (for linking).

2.  **Parent**
    *   **Purpose**: To monitor their children's progress and manage their accounts.
    *   **Features**: Dashboard overview of all children, detailed progress reports, ability to add new children profiles.
    *   **Signup Fields**: Name, Email, Password.

3.  **Teacher**
    *   **Purpose**: To manage classes and track student performance.
    *   **Features**: Class roster view, ability to schedule assessments, class-wide analytics, report generation.
    *   **Signup Fields**: Name, Email, School/Institution Name, Subject/Grade taught.

4.  **Doctor**
    *   **Purpose**: To provide professional evaluation (if integrated).
    *   **Features**: View patient reports shared by parents.

5.  **Admin**
    *   **Purpose**: System management.
    *   **Features**: User management, system configuration.

## Authentication Workflow

### 1. Sign Up
*   **Route**: `/signup`
*   **Process**:
    1.  User selects their role (Student, Parent, Teacher).
    2.  Role-specific form fields are displayed dynamically.
    3.  On submission, the `auth/register` API endpoint is called.
    4.  Upon success, a JWT token and user data are returned.
    5.  The token is stored in `localStorage` and Redux state.
    6.  User is redirected to their specific dashboard based on role.

### 2. Login
*   **Route**: `/login`
*   **Process**:
    1.  User enters Email and Password.
    2.  `auth/login` endpoint validates credentials.
    3.  Server returns JWT token and User object (including role).
    4.  App updates `LanguageProvider` preference if saved.
    5.  User is redirected to the dashboard corresponding to their role.

### 3. Route Protection
*   **Middleware**: Next.js Middleware (`middleware.ts`) intercepts requests.
*   **Logic**:
    *   Checks for presence of valid authentication token.
    *   Verifies if the user's role allows access to the requested path (e.g., preventing a Student from accessing `/teacher-dashboard`).
    *   Redirects unauthorized users to `/login` or `/unauthorized`.

### 4. Logout
*   **Action**: Clears `localStorage` tokens and resets Redux auth state.
*   **Redirect**: Sends user back to the Landing Page or Login page.
