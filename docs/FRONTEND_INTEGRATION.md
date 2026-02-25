# Frontend-Backend Integration Guide

This document explains how the frontend is integrated with the backend API using Redux Toolkit and Axios.

## Overview

The frontend uses:
- **Redux Toolkit**: For state management
- **Axios**: For HTTP requests
- **React-Redux**: For connecting Redux to React components

## Setup

### 1. Environment Variables

Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Dependencies Installed

```bash
pnpm add axios @reduxjs/toolkit react-redux
```

## File Structure

```
lib/
├── api.ts                    # Axios instance & API functions
└── store/
    ├── index.ts              # Redux store configuration
    ├── hooks.ts              # Typed hooks
    └── slices/
        ├── authSlice.ts      # Auth state management
        ├── studentSlice.ts   # Student dashboard state
        ├── parentSlice.ts    # Parent dashboard state
        ├── teacherSlice.ts   # Teacher dashboard state
        └── adminSlice.ts     # Admin dashboard state

components/
└── providers/
    └── redux-provider.tsx    # Redux Provider wrapper
```

## API Service (lib/api.ts)

The API service provides:

1. **Axios Instance** with:
   - Base URL from environment variable
   - Request interceptor for JWT token
   - Response interceptor for 401 handling

2. **API Functions** organized by feature:
   - `authAPI`: login, register, getMe, changePassword
   - `studentAPI`: getDashboard, getProfile, getAssessments, etc.
   - `parentAPI`: getDashboard, getProgress, getInsights
   - `childrenAPI`: getAll, getById, create, update, delete
   - `teacherAPI`: getDashboard, getStudents, addStudent, etc.
   - `scheduleAPI`: getAll, getById, create, update, delete
   - `assessmentAPI`: getAll, getById, submit
   - `reportAPI`: getAll, getById, generate
   - `adminAPI`: getDashboard, getUsers, updateUser, deleteUser

## Redux Slices

### authSlice
- **Actions**: login, register, logout, getMe, clearError
- **State**: user, token, isAuthenticated, isLoading, error

### studentSlice
- **Actions**: fetchDashboard, fetchProfile, fetchAssessments, fetchProgress, fetchAchievements, submitAssessment
- **State**: dashboard, profile, assessments, progress, achievements, stats

### parentSlice
- **Actions**: fetchParentDashboard, fetchChildren, fetchChildById, addChild, updateChild, deleteChild, fetchReports
- **State**: dashboard, children, selectedChild, progress, insights, reports

### teacherSlice
- **Actions**: fetchTeacherDashboard, fetchTeacherStudents, addTeacherStudent, removeTeacherStudent, fetchSchedules, createSchedule
- **State**: dashboard, students, selectedStudent, schedules, performance

### adminSlice
- **Actions**: fetchAdminDashboard, fetchUsers, updateUser, deleteUser
- **State**: dashboard, users, stats

## Updated Pages

### Auth Pages

#### Login Page (`app/login/page.tsx`)
```tsx
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { login, clearError } from "@/lib/store/slices/authSlice"

// Uses dispatch(login({ email, password }))
// Redirects based on user.role after login
```

#### Signup Page (`app/signup/page.tsx`)
```tsx
import { register, clearError } from "@/lib/store/slices/authSlice"

// Uses dispatch(register({ email, password, name, role }))
```

### Dashboard Pages

#### Student Dashboard (`app/student-dashboard/page.tsx`)
```tsx
import { fetchDashboard, fetchProgress, fetchAchievements } from "@/lib/store/slices/studentSlice"

// Auth check + redirect
// Fetches student data on mount
// Displays user.name in welcome message
```

#### Parent Dashboard (`app/parent-dashboard/page.tsx`)
```tsx
import { fetchParentDashboard, fetchChildren } from "@/lib/store/slices/parentSlice"

// Fetches dashboard stats and children list
// Falls back to mock data if API fails
```

#### Teacher Dashboard (`app/teacher-dashboard/page.tsx`)
```tsx
import { fetchTeacherDashboard, fetchTeacherStudents, fetchSchedules } from "@/lib/store/slices/teacherSlice"
```

#### Admin Dashboard (`app/admin-dashboard/page.tsx`)
```tsx
import { fetchAdminDashboard, fetchUsers } from "@/lib/store/slices/adminSlice"
```

### Other Updated Pages

- `app/parent-dashboard/children/page.tsx` - Lists children with Redux
- `components/parent/add-child-form.tsx` - Submits via Redux action
- `app/parent-dashboard/reports/page.tsx` - Fetches reports
- `app/teacher-dashboard/students/page.tsx` - Lists students
- `app/teacher-dashboard/schedule/page.tsx` - Manages schedules

## Usage Pattern

### In Components

```tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchSomeData } from "@/lib/store/slices/someSlice"

export default function MyComponent() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const { data, isLoading, error } = useAppSelector((state) => state.someSlice)

  // Auth check
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    // Fetch data
    dispatch(fetchSomeData())
  }, [isAuthenticated, dispatch])

  if (isLoading) return <Loading />
  if (error) return <Error message={error} />
  
  return <DataDisplay data={data} />
}
```

### Form Submission

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const result = await dispatch(someAction(formData))
  
  if (someAction.fulfilled.match(result)) {
    // Success handling
    router.push('/success-page')
  }
  // Error is automatically stored in state.error
}
```

## Running the Application

### 1. Start Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed  # Optional: seed test data
npm run dev
```

Backend runs on http://localhost:5000

### 2. Start Frontend

```bash
cd ..  # Back to frontend root
pnpm install
pnpm dev
```

Frontend runs on http://localhost:3000

### 3. Test Accounts

| Role    | Email              | Password    |
|---------|-------------------|-------------|
| Student | student@test.com  | password123 |
| Parent  | parent@test.com   | password123 |
| Teacher | teacher@test.com  | password123 |
| Admin   | admin@test.com    | password123 |

## Notes

1. **Mock Data Fallback**: Pages fall back to mock data if API calls fail, ensuring the UI is always functional.

2. **Type Safety**: Use `as any` for state destructuring where TypeScript has issues with union types.

3. **Error Handling**: All slices have error state that components can display.

4. **Token Storage**: JWT token is stored in localStorage and automatically attached to requests.

5. **Auto Logout**: 401 responses trigger automatic logout and redirect to login page.
