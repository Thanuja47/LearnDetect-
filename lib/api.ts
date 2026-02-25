import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: {
    email: string;
    password: string;
    name: string;
    role: string;
    grade?: string;
    age?: number;
    subject?: string;
    className?: string;
  }) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/change-password', { currentPassword, newPassword }),
};

// Student API
export const studentAPI = {
  getDashboard: () => api.get('/students/dashboard'),
  getProfile: () => api.get('/students/profile'),
  updateProfile: (data: { age?: number; grade?: string }) =>
    api.put('/students/profile', data),
  getAssessments: (params?: { type?: string; page?: number; limit?: number }) =>
    api.get('/students/assessments', { params }),
  getProgress: () => api.get('/students/progress'),
  getAchievements: () => api.get('/students/achievements'),
  getStats: () => api.get('/students/stats'),
  getSchedules: () => api.get('/students/schedules'),
};

// Assessment API
export const assessmentAPI = {
  submit: (data: {
    type: string;
    wordAccuracy: number;
    pronunciation: number;
    readingSpeed: number;
    fluency: number;
    comprehension: number;
    recognizedText?: string;
    feedback?: string[];
    suggestions?: string[];
  }) => api.post('/assessments', data),
  getById: (id: string) => api.get(`/assessments/${id}`),
  getAll: (params?: { type?: string; page?: number; limit?: number }) =>
    api.get('/assessments', { params }),
  submitForChild: (childId: string, data: {
    type: string;
    wordAccuracy: number;
    pronunciation: number;
    readingSpeed: number;
    fluency: number;
    comprehension: number;
  }) => api.post(`/assessments/child/${childId}`, data),
};

// Assessment Materials API
export const materialsAPI = {
  getAll: (params?: { type?: string; grade?: string; difficulty?: string }) =>
    api.get('/materials', { params }),
  getByType: (type: string) => api.get(`/materials/type/${type}`),
  getById: (id: string) => api.get(`/materials/${id}`),
  create: (data: {
    title: string;
    type: string;
    content: string;
    difficulty?: string;
    grade?: string;
    duration?: number;
  }) => api.post('/materials', data),
  update: (id: string, data: {
    title?: string;
    type?: string;
    content?: string;
    difficulty?: string;
    grade?: string;
    duration?: number;
    isActive?: boolean;
  }) => api.put(`/materials/${id}`, data),
  delete: (id: string) => api.delete(`/materials/${id}`),
  seed: () => api.post('/materials/seed'),
};

// Parent API
export const parentAPI = {
  getDashboard: () => api.get('/parents/dashboard'),
  getProgress: () => api.get('/parents/progress'),
  getInsights: () => api.get('/parents/insights'),
};

// Children API
export const childrenAPI = {
  getAll: (params?: { status?: string; search?: string }) =>
    api.get('/children', { params }),
  getById: (id: string) => api.get(`/children/${id}`),
  create: (data: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    grade: string;
    gender: string;
  }) => api.post('/children', data),
  update: (id: string, data: Partial<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    grade: string;
    gender: string;
  }>) => api.put(`/children/${id}`, data),
  delete: (id: string) => api.delete(`/children/${id}`),
  getAssessments: (id: string) => api.get(`/children/${id}/assessments`),
  getProgress: (id: string) => api.get(`/children/${id}/progress`),
};

// Teacher API
export const teacherAPI = {
  getDashboard: () => api.get('/teachers/dashboard'),
  getPerformance: () => api.get('/teachers/performance'),
  getStudents: (params?: { status?: string; search?: string }) =>
    api.get('/teachers/students', { params }),
  getStudentById: (id: string) => api.get(`/teachers/students/${id}`),
  addStudent: (data: { name: string; studentCode: string }) =>
    api.post('/teachers/students', data),
  updateStudent: (id: string, data: { name?: string; score?: number; status?: string; trend?: number }) =>
    api.put(`/teachers/students/${id}`, data),
  removeStudent: (id: string) => api.delete(`/teachers/students/${id}`),
  generateClassReport: () => api.post('/teachers/reports/class'),
};

// Schedule API
export const scheduleAPI = {
  getAll: (params?: { upcoming?: boolean }) =>
    api.get('/schedules', { params }),
  getById: (id: string) => api.get(`/schedules/${id}`),
  create: (data: {
    date: string;
    time: string;
    duration: number;
    type: string;
    notes?: string;
    studentIds?: string[];
  }) => api.post('/schedules', data),
  update: (id: string, data: Partial<{
    date: string;
    time: string;
    duration: number;
    type: string;
    notes: string;
    studentIds: string[];
  }>) => api.put(`/schedules/${id}`, data),
  delete: (id: string) => api.delete(`/schedules/${id}`),
};

// Report API
export const reportAPI = {
  getAll: () => api.get('/reports'),
  getByChild: (childId: string) => api.get(`/reports/child/${childId}`),
  getById: (id: string) => api.get(`/reports/${id}`),
  generate: (data: { childId: string; title: string; type: string }) =>
    api.post('/reports', data),
  delete: (id: string) => api.delete(`/reports/${id}`),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params?: { role?: string; search?: string; page?: number; limit?: number }) =>
    api.get('/admin/users', { params }),
  getAnalytics: () => api.get('/admin/analytics'),
  getAuditLogs: () => api.get('/admin/audit-logs'),
};

// User API
export const userAPI = {
  getAll: (params?: { role?: string; search?: string; page?: number; limit?: number }) =>
    api.get('/users', { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: { name?: string; email?: string; role?: string }) =>
    api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
  resetPassword: (id: string, newPassword: string) =>
    api.post(`/users/${id}/reset-password`, { newPassword }),
};

// Doctor API
export const doctorAPI = {
  getAll: (params?: {
    specialty?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    search?: string;
    isAvailable?: boolean;
    page?: number;
    limit?: number;
  }) => api.get('/doctors', { params }),
  getById: (id: string) => api.get(`/doctors/${id}`),
  create: (data: {
    name: string;
    specialty: string;
    qualifications: string[];
    experience: number;
    price: number;
    contactDetails: {
      phone: string;
      email: string;
      address?: string;
    };
    availability?: any[];
    bio: string;
    image?: string;
    isActive?: boolean;
  }) => api.post('/doctors', data),
  update: (id: string, data: Partial<{
    name: string;
    specialty: string;
    qualifications: string[];
    experience: number;
    price: number;
    contactDetails: {
      phone: string;
      email: string;
      address?: string;
    };
    availability: any[];
    bio: string;
    image: string;
    isActive: boolean;
  }>) => api.put(`/doctors/${id}`, data),
  delete: (id: string) => api.delete(`/doctors/${id}`),
  getReviews: (id: string, params?: { page?: number; limit?: number }) =>
    api.get(`/doctors/${id}/reviews`, { params }),
  addReview: (id: string, data: { rating: number; comment: string }) =>
    api.post(`/doctors/${id}/reviews`, data),
};

// Appointment API
export const appointmentAPI = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get('/appointments', { params }),
  getById: (id: string) => api.get(`/appointments/${id}`),
  create: (data: {
    doctorId: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    appointmentDate: string;
    appointmentTime: string;
    notes?: string;
  }) => api.post('/appointments', data),
  update: (id: string, data: Partial<{
    appointmentDate: string;
    appointmentTime: string;
    status: string;
    notes: string;
  }>) => api.put(`/appointments/${id}`, data),
  cancel: (id: string) => api.put(`/appointments/${id}/cancel`),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};

export default api;
