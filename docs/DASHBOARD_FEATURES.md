# Dashboard Features Guide

This document details the specific features and functionalities available in the dashboards for each primary user role.

## 1. Parent Dashboard
**Route**: `/parent-dashboard`

Designed for parents to oversee their children's reading development.

### Core Features:
*   **Children Overview**:
    *   Displays cards for each linked child.
    *   Shows quick stats: Name, Age, Grade, Last Assessment Score.
    *   "Add Child" button to link or create new student profiles.
*   **Progress Tracking**:
    *   **Line Chart**: Visualizes reading scores over time (last 4 months/weeks).
    *   **Strengths & Weaknesses**: AI-generated insights highlighting areas where the child excels (e.g., "Strong word recognition") and needs focus (e.g., "Pronunciation accuracy").
*   **Reports**:
    *   Access to detailed assessment reports.
    *   Option to download reports as PDF (if implemented).
*   **Settings**:
    *   Manage account details and preferences.

## 2. Teacher Dashboard
**Route**: `/teacher-dashboard`

A command center for educators to manage reading assessments for entire classes.

### Core Features:
*   **Class Overview (Home)**:
    *   **Key Metrics**: Total Students, Class Average Score, Tests Completed this week, Students Needing Support.
    *   **Performance Summary**: Pie chart showing the distribution of students (Excellent vs. On Track vs. Needs Support).
    *   **Featured Students**: Highlights students with recent significant changes in performance.
*   **Student Management**:
    *   Searchable list of all students in the class.
    *   Status indicators (Green/Yellow/Red) for quick health checks.
    *   Detailed view for individual student history.
*   **Analytics**:
    *   Class-wide performance trends.
    *   Identification of common stumbling blocks/words for the whole class.
*   **Schedule Assessment**:
    *   Tools to assign specific reading passages to students.
*   **Generate Report**:
    *   Button to generate a comprehensive class performance report.

## 3. Student Dashboard
**Route**: `/student-dashboard`

A simplified, engaging interface for children to take tests.

### Core Features:
*   **Start Assessment**:
    *   Primary action button to begin a new reading test.
    *   Selection of reading ability/grade level passages.
*   **Assessment Interface**:
    *   **Text Display**: Large, clear font for the reading passage.
    *   **Microphone Control**: Simple Start/Stop recording buttons.
    *   **Real-time Feedback**: Visual indicators that the system is "listening".
*   **My Progress**:
    *   Simple badges or gamified stats (e.g., "Reading Streak", "Stars Earned").
    *   Link to previous test results (simplified view).

## 4. Admin Dashboard
**Route**: `/admin-dashboard`

For system administrators to maintain the platform.

*   **User Management**: View, Edit, Delete users (Teachers, Parents, Doctors).
*   **System Health**: Monitoring API status and database connections.
