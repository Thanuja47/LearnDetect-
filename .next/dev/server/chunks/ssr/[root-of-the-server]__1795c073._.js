module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminAPI",
    ()=>adminAPI,
    "appointmentAPI",
    ()=>appointmentAPI,
    "assessmentAPI",
    ()=>assessmentAPI,
    "authAPI",
    ()=>authAPI,
    "childrenAPI",
    ()=>childrenAPI,
    "default",
    ()=>__TURBOPACK__default__export__,
    "doctorAPI",
    ()=>doctorAPI,
    "materialsAPI",
    ()=>materialsAPI,
    "parentAPI",
    ()=>parentAPI,
    "reportAPI",
    ()=>reportAPI,
    "scheduleAPI",
    ()=>scheduleAPI,
    "studentAPI",
    ()=>studentAPI,
    "teacherAPI",
    ()=>teacherAPI,
    "userAPI",
    ()=>userAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || 'http://localhost:5000/api';
// Create axios instance
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Request interceptor to add auth token
api.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return config;
}, (error)=>Promise.reject(error));
// Response interceptor for error handling
api.interceptors.response.use((response)=>response, (error)=>{
    if (error.response?.status === 401) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    return Promise.reject(error);
});
const authAPI = {
    login: (email, password)=>api.post('/auth/login', {
            email,
            password
        }),
    register: (data)=>api.post('/auth/register', data),
    getMe: ()=>api.get('/auth/me'),
    changePassword: (currentPassword, newPassword)=>api.put('/auth/change-password', {
            currentPassword,
            newPassword
        })
};
const studentAPI = {
    getDashboard: ()=>api.get('/students/dashboard'),
    getProfile: ()=>api.get('/students/profile'),
    updateProfile: (data)=>api.put('/students/profile', data),
    getAssessments: (params)=>api.get('/students/assessments', {
            params
        }),
    getProgress: ()=>api.get('/students/progress'),
    getAchievements: ()=>api.get('/students/achievements'),
    getStats: ()=>api.get('/students/stats'),
    getSchedules: ()=>api.get('/students/schedules')
};
const assessmentAPI = {
    submit: (data)=>api.post('/assessments', data),
    getById: (id)=>api.get(`/assessments/${id}`),
    getAll: (params)=>api.get('/assessments', {
            params
        }),
    submitForChild: (childId, data)=>api.post(`/assessments/child/${childId}`, data)
};
const materialsAPI = {
    getAll: (params)=>api.get('/materials', {
            params
        }),
    getByType: (type)=>api.get(`/materials/type/${type}`),
    getById: (id)=>api.get(`/materials/${id}`),
    create: (data)=>api.post('/materials', data),
    update: (id, data)=>api.put(`/materials/${id}`, data),
    delete: (id)=>api.delete(`/materials/${id}`),
    seed: ()=>api.post('/materials/seed')
};
const parentAPI = {
    getDashboard: ()=>api.get('/parents/dashboard'),
    getProgress: ()=>api.get('/parents/progress'),
    getInsights: ()=>api.get('/parents/insights')
};
const childrenAPI = {
    getAll: (params)=>api.get('/children', {
            params
        }),
    getById: (id)=>api.get(`/children/${id}`),
    create: (data)=>api.post('/children', data),
    update: (id, data)=>api.put(`/children/${id}`, data),
    delete: (id)=>api.delete(`/children/${id}`),
    getAssessments: (id)=>api.get(`/children/${id}/assessments`),
    getProgress: (id)=>api.get(`/children/${id}/progress`)
};
const teacherAPI = {
    getDashboard: ()=>api.get('/teachers/dashboard'),
    getPerformance: ()=>api.get('/teachers/performance'),
    getStudents: (params)=>api.get('/teachers/students', {
            params
        }),
    getStudentById: (id)=>api.get(`/teachers/students/${id}`),
    addStudent: (data)=>api.post('/teachers/students', data),
    updateStudent: (id, data)=>api.put(`/teachers/students/${id}`, data),
    removeStudent: (id)=>api.delete(`/teachers/students/${id}`)
};
const scheduleAPI = {
    getAll: (params)=>api.get('/schedules', {
            params
        }),
    getById: (id)=>api.get(`/schedules/${id}`),
    create: (data)=>api.post('/schedules', data),
    update: (id, data)=>api.put(`/schedules/${id}`, data),
    delete: (id)=>api.delete(`/schedules/${id}`)
};
const reportAPI = {
    getAll: ()=>api.get('/reports'),
    getByChild: (childId)=>api.get(`/reports/child/${childId}`),
    getById: (id)=>api.get(`/reports/${id}`),
    generate: (data)=>api.post('/reports', data),
    delete: (id)=>api.delete(`/reports/${id}`)
};
const adminAPI = {
    getDashboard: ()=>api.get('/admin/dashboard'),
    getUsers: (params)=>api.get('/admin/users', {
            params
        }),
    getAnalytics: ()=>api.get('/admin/analytics'),
    getAuditLogs: ()=>api.get('/admin/audit-logs')
};
const userAPI = {
    getAll: (params)=>api.get('/users', {
            params
        }),
    getById: (id)=>api.get(`/users/${id}`),
    update: (id, data)=>api.put(`/users/${id}`, data),
    delete: (id)=>api.delete(`/users/${id}`),
    resetPassword: (id, newPassword)=>api.post(`/users/${id}/reset-password`, {
            newPassword
        })
};
const doctorAPI = {
    getAll: (params)=>api.get('/doctors', {
            params
        }),
    getById: (id)=>api.get(`/doctors/${id}`),
    create: (data)=>api.post('/doctors', data),
    update: (id, data)=>api.put(`/doctors/${id}`, data),
    delete: (id)=>api.delete(`/doctors/${id}`),
    getReviews: (id, params)=>api.get(`/doctors/${id}/reviews`, {
            params
        }),
    addReview: (id, data)=>api.post(`/doctors/${id}/reviews`, data)
};
const appointmentAPI = {
    getAll: (params)=>api.get('/appointments', {
            params
        }),
    getById: (id)=>api.get(`/appointments/${id}`),
    create: (data)=>api.post('/appointments', data),
    update: (id, data)=>api.put(`/appointments/${id}`, data),
    cancel: (id)=>api.put(`/appointments/${id}/cancel`),
    delete: (id)=>api.delete(`/appointments/${id}`)
};
const __TURBOPACK__default__export__ = api;
}),
"[project]/lib/store/slices/authSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getMe",
    ()=>getMe,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "register",
    ()=>register,
    "setUser",
    ()=>setUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.1_react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1__react@19.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
;
;
// Initial state
const initialState = {
    user: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null,
    token: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null,
    isLoading: false,
    error: null,
    isAuthenticated: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : false
};
const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/login', async ({ email, password }, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].login(email, password);
        const { user, token, redirectPath } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return {
            user,
            token,
            redirectPath
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});
const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/register', async (data, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].register(data);
        const { user, token } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return {
            user,
            token
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});
const getMe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/getMe', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authAPI"].getMe();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to get user');
    }
});
// Slice
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        clearError: (state)=>{
            state.error = null;
        },
        setUser: (state, action)=>{
            state.user = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder// Login
        .addCase(login.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        }).addCase(login.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Register
        .addCase(register.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        }).addCase(register.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Get Me
        .addCase(getMe.fulfilled, (state, action)=>{
            state.user = action.payload;
        });
    }
});
const { logout, clearError, setUser } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/lib/store/slices/studentSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchAchievements",
    ()=>fetchAchievements,
    "fetchAssessments",
    ()=>fetchAssessments,
    "fetchDashboard",
    ()=>fetchDashboard,
    "fetchProfile",
    ()=>fetchProfile,
    "fetchProgress",
    ()=>fetchProgress,
    "fetchStats",
    ()=>fetchStats,
    "fetchStudentSchedules",
    ()=>fetchStudentSchedules,
    "resetState",
    ()=>resetState,
    "submitAssessment",
    ()=>submitAssessment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.1_react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1__react@19.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
;
;
const initialState = {
    dashboard: null,
    profile: null,
    assessments: [],
    progress: null,
    achievements: [],
    stats: null,
    schedules: [],
    isLoading: false,
    error: null
};
const fetchDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/fetchDashboard', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentAPI"].getDashboard();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
});
const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/fetchProfile', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentAPI"].getProfile();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
});
const fetchAssessments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/fetchAssessments', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentAPI"].getAssessments();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch assessments');
    }
});
const fetchProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/fetchProgress', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentAPI"].getProgress();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
});
const fetchAchievements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/fetchAchievements', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentAPI"].getAchievements();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch achievements');
    }
});
const fetchStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/fetchStats', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentAPI"].getStats();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
});
const fetchStudentSchedules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/fetchStudentSchedules', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["studentAPI"].getSchedules();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedules');
    }
});
const submitAssessment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('student/submitAssessment', async (data, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assessmentAPI"].submit(data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to submit assessment');
    }
});
// Slice
const studentSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'student',
    initialState,
    reducers: {
        clearError: (state)=>{
            state.error = null;
        },
        resetState: ()=>initialState
    },
    extraReducers: (builder)=>{
        builder// Dashboard
        .addCase(fetchDashboard.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchDashboard.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.dashboard = action.payload;
        }).addCase(fetchDashboard.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Profile
        .addCase(fetchProfile.fulfilled, (state, action)=>{
            state.profile = action.payload;
        })// Assessments
        .addCase(fetchAssessments.fulfilled, (state, action)=>{
            state.assessments = action.payload;
        })// Progress
        .addCase(fetchProgress.fulfilled, (state, action)=>{
            state.progress = action.payload;
        })// Achievements
        .addCase(fetchAchievements.fulfilled, (state, action)=>{
            state.achievements = action.payload;
        })// Stats
        .addCase(fetchStats.fulfilled, (state, action)=>{
            state.stats = action.payload;
        })// Schedules
        .addCase(fetchStudentSchedules.fulfilled, (state, action)=>{
            state.schedules = action.payload;
        })// Submit Assessment
        .addCase(submitAssessment.fulfilled, (state, action)=>{
            state.assessments = [
                action.payload,
                ...state.assessments
            ];
        });
    }
});
const { clearError, resetState } = studentSlice.actions;
const __TURBOPACK__default__export__ = studentSlice.reducer;
}),
"[project]/lib/store/slices/parentSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addChild",
    ()=>addChild,
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteChild",
    ()=>deleteChild,
    "fetchChildById",
    ()=>fetchChildById,
    "fetchChildren",
    ()=>fetchChildren,
    "fetchInsights",
    ()=>fetchInsights,
    "fetchParentDashboard",
    ()=>fetchParentDashboard,
    "fetchParentProgress",
    ()=>fetchParentProgress,
    "fetchReports",
    ()=>fetchReports,
    "generateReport",
    ()=>generateReport,
    "resetState",
    ()=>resetState,
    "setSelectedChild",
    ()=>setSelectedChild,
    "updateChild",
    ()=>updateChild
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.1_react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1__react@19.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
;
;
const initialState = {
    dashboard: null,
    children: [],
    selectedChild: null,
    progress: null,
    insights: null,
    reports: [],
    isLoading: false,
    error: null
};
const fetchParentDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/fetchDashboard', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAPI"].getDashboard();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
});
const fetchChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/fetchChildren', async (params, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["childrenAPI"].getAll(params);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch children');
    }
});
const fetchChildById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/fetchChildById', async (id, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["childrenAPI"].getById(id);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch child');
    }
});
const addChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/addChild', async (data, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["childrenAPI"].create(data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add child');
    }
});
const updateChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/updateChild', async ({ id, data }, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["childrenAPI"].update(id, data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update child');
    }
});
const deleteChild = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/deleteChild', async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["childrenAPI"].delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete child');
    }
});
const fetchParentProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/fetchProgress', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAPI"].getProgress();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
});
const fetchInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/fetchInsights', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAPI"].getInsights();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch insights');
    }
});
const fetchReports = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/fetchReports', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reportAPI"].getAll();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports');
    }
});
const generateReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('parent/generateReport', async (data, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reportAPI"].generate(data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to generate report');
    }
});
// Slice
const parentSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'parent',
    initialState,
    reducers: {
        clearError: (state)=>{
            state.error = null;
        },
        setSelectedChild: (state, action)=>{
            state.selectedChild = action.payload;
        },
        resetState: ()=>initialState
    },
    extraReducers: (builder)=>{
        builder// Dashboard
        .addCase(fetchParentDashboard.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchParentDashboard.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.dashboard = action.payload;
        }).addCase(fetchParentDashboard.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Children
        .addCase(fetchChildren.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchChildren.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.children = action.payload;
        }).addCase(fetchChildren.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Child by ID
        .addCase(fetchChildById.fulfilled, (state, action)=>{
            state.selectedChild = action.payload;
        })// Add Child
        .addCase(addChild.fulfilled, (state, action)=>{
            state.children = [
                ...state.children,
                action.payload
            ];
        })// Update Child
        .addCase(updateChild.fulfilled, (state, action)=>{
            state.children = state.children.map((c)=>c.id === action.payload.id ? action.payload : c);
        })// Delete Child
        .addCase(deleteChild.fulfilled, (state, action)=>{
            state.children = state.children.filter((c)=>c.id !== action.payload);
        })// Progress
        .addCase(fetchParentProgress.fulfilled, (state, action)=>{
            state.progress = action.payload;
        })// Insights
        .addCase(fetchInsights.fulfilled, (state, action)=>{
            state.insights = action.payload;
        })// Reports
        .addCase(fetchReports.fulfilled, (state, action)=>{
            state.reports = action.payload;
        }).addCase(generateReport.fulfilled, (state, action)=>{
            state.reports = [
                action.payload,
                ...state.reports
            ];
        });
    }
});
const { clearError, setSelectedChild, resetState } = parentSlice.actions;
const __TURBOPACK__default__export__ = parentSlice.reducer;
}),
"[project]/lib/store/slices/teacherSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTeacherStudent",
    ()=>addTeacherStudent,
    "clearError",
    ()=>clearError,
    "createSchedule",
    ()=>createSchedule,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteSchedule",
    ()=>deleteSchedule,
    "fetchPerformance",
    ()=>fetchPerformance,
    "fetchSchedules",
    ()=>fetchSchedules,
    "fetchTeacherDashboard",
    ()=>fetchTeacherDashboard,
    "fetchTeacherStudents",
    ()=>fetchTeacherStudents,
    "removeTeacherStudent",
    ()=>removeTeacherStudent,
    "resetState",
    ()=>resetState,
    "setSelectedStudent",
    ()=>setSelectedStudent,
    "updateSchedule",
    ()=>updateSchedule,
    "updateTeacherStudent",
    ()=>updateTeacherStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.1_react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1__react@19.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
;
;
const initialState = {
    dashboard: null,
    students: [],
    selectedStudent: null,
    schedules: [],
    performance: null,
    isLoading: false,
    error: null
};
const fetchTeacherDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/fetchDashboard', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["teacherAPI"].getDashboard();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
});
const fetchTeacherStudents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/fetchStudents', async (params, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["teacherAPI"].getStudents(params);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
});
const addTeacherStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/addStudent', async (data, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["teacherAPI"].addStudent(data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add student');
    }
});
const updateTeacherStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/updateStudent', async ({ id, data }, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["teacherAPI"].updateStudent(id, data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update student');
    }
});
const removeTeacherStudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/removeStudent', async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["teacherAPI"].removeStudent(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove student');
    }
});
const fetchSchedules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/fetchSchedules', async (params, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduleAPI"].getAll(params);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedules');
    }
});
const createSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/createSchedule', async (data, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduleAPI"].create(data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create schedule');
    }
});
const updateSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/updateSchedule', async ({ id, data }, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduleAPI"].update(id, data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update schedule');
    }
});
const deleteSchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/deleteSchedule', async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scheduleAPI"].delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete schedule');
    }
});
const fetchPerformance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/fetchPerformance', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["teacherAPI"].getPerformance();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch performance');
    }
});
// Slice
const teacherSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'teacher',
    initialState,
    reducers: {
        clearError: (state)=>{
            state.error = null;
        },
        setSelectedStudent: (state, action)=>{
            state.selectedStudent = action.payload;
        },
        resetState: ()=>initialState
    },
    extraReducers: (builder)=>{
        builder// Dashboard
        .addCase(fetchTeacherDashboard.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchTeacherDashboard.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.dashboard = action.payload;
        }).addCase(fetchTeacherDashboard.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Students
        .addCase(fetchTeacherStudents.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchTeacherStudents.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.students = action.payload;
        }).addCase(fetchTeacherStudents.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Add Student
        .addCase(addTeacherStudent.fulfilled, (state, action)=>{
            state.students = [
                ...state.students,
                action.payload
            ];
        })// Update Student
        .addCase(updateTeacherStudent.fulfilled, (state, action)=>{
            state.students = state.students.map((s)=>s.id === action.payload.id ? action.payload : s);
        })// Remove Student
        .addCase(removeTeacherStudent.fulfilled, (state, action)=>{
            state.students = state.students.filter((s)=>s.id !== action.payload);
        })// Schedules
        .addCase(fetchSchedules.fulfilled, (state, action)=>{
            state.schedules = action.payload;
        }).addCase(createSchedule.fulfilled, (state, action)=>{
            state.schedules = [
                action.payload,
                ...state.schedules
            ];
        }).addCase(updateSchedule.fulfilled, (state, action)=>{
            state.schedules = state.schedules.map((s)=>s.id === action.payload.id ? action.payload : s);
        }).addCase(deleteSchedule.fulfilled, (state, action)=>{
            state.schedules = state.schedules.filter((s)=>s.id !== action.payload);
        })// Performance
        .addCase(fetchPerformance.fulfilled, (state, action)=>{
            state.performance = action.payload;
        });
    }
});
const { clearError, setSelectedStudent, resetState } = teacherSlice.actions;
const __TURBOPACK__default__export__ = teacherSlice.reducer;
}),
"[project]/lib/store/slices/adminSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteUser",
    ()=>deleteUser,
    "fetchAdminDashboard",
    ()=>fetchAdminDashboard,
    "fetchAnalytics",
    ()=>fetchAnalytics,
    "fetchAuditLogs",
    ()=>fetchAuditLogs,
    "fetchUsers",
    ()=>fetchUsers,
    "resetState",
    ()=>resetState,
    "resetUserPassword",
    ()=>resetUserPassword,
    "updateUser",
    ()=>updateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.1_react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1__react@19.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
;
;
const initialState = {
    dashboard: null,
    users: [],
    analytics: null,
    auditLogs: [],
    pagination: null,
    isLoading: false,
    error: null
};
const fetchAdminDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('admin/fetchDashboard', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminAPI"].getDashboard();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
});
const fetchUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('admin/fetchUsers', async (params, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminAPI"].getUsers(params);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
});
const fetchAnalytics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('admin/fetchAnalytics', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminAPI"].getAnalytics();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics');
    }
});
const fetchAuditLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('admin/fetchAuditLogs', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminAPI"].getAuditLogs();
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch audit logs');
    }
});
const deleteUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('admin/deleteUser', async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userAPI"].delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
});
const updateUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('admin/updateUser', async ({ id, data }, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userAPI"].update(id, data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
});
const resetUserPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('admin/resetPassword', async ({ id, newPassword }, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userAPI"].resetPassword(id, newPassword);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
});
// Slice
const adminSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'admin',
    initialState,
    reducers: {
        clearError: (state)=>{
            state.error = null;
        },
        resetState: ()=>initialState
    },
    extraReducers: (builder)=>{
        builder// Dashboard
        .addCase(fetchAdminDashboard.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchAdminDashboard.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.dashboard = action.payload;
        }).addCase(fetchAdminDashboard.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Users
        .addCase(fetchUsers.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.users = action.payload.users;
            state.pagination = action.payload.pagination;
        }).addCase(fetchUsers.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Analytics
        .addCase(fetchAnalytics.fulfilled, (state, action)=>{
            state.analytics = action.payload;
        })// Audit Logs
        .addCase(fetchAuditLogs.fulfilled, (state, action)=>{
            state.auditLogs = action.payload;
        })// Delete User
        .addCase(deleteUser.fulfilled, (state, action)=>{
            state.users = state.users.filter((u)=>u.id !== action.payload);
        })// Update User
        .addCase(updateUser.fulfilled, (state, action)=>{
            const index = state.users.findIndex((u)=>u.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        });
    }
});
const { clearError, resetState } = adminSlice.actions;
const __TURBOPACK__default__export__ = adminSlice.reducer;
}),
"[project]/lib/store/slices/doctorSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "clearFilters",
    ()=>clearFilters,
    "clearSelectedDoctor",
    ()=>clearSelectedDoctor,
    "createDoctor",
    ()=>createDoctor,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteDoctor",
    ()=>deleteDoctor,
    "fetchDoctorById",
    ()=>fetchDoctorById,
    "fetchDoctors",
    ()=>fetchDoctors,
    "resetState",
    ()=>resetState,
    "setFilters",
    ()=>setFilters,
    "updateDoctor",
    ()=>updateDoctor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.1_react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1__react@19.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
;
;
const initialState = {
    doctors: [],
    selectedDoctor: null,
    filters: {},
    pagination: null,
    isLoading: false,
    error: null
};
const fetchDoctors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('doctor/fetchDoctors', async (params, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doctorAPI"].getAll(params);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
    }
});
const fetchDoctorById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('doctor/fetchDoctorById', async (id, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doctorAPI"].getById(id);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctor details');
    }
});
const createDoctor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('doctor/createDoctor', async (data, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doctorAPI"].create(data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create doctor');
    }
});
const updateDoctor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('doctor/updateDoctor', async ({ id, data }, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doctorAPI"].update(id, data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update doctor');
    }
});
const deleteDoctor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('doctor/deleteDoctor', async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doctorAPI"].delete(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete doctor');
    }
});
// Slice
const doctorSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'doctor',
    initialState,
    reducers: {
        setFilters: (state, action)=>{
            state.filters = {
                ...state.filters,
                ...action.payload
            };
        },
        clearFilters: (state)=>{
            state.filters = {};
        },
        clearError: (state)=>{
            state.error = null;
        },
        clearSelectedDoctor: (state)=>{
            state.selectedDoctor = null;
        },
        resetState: ()=>initialState
    },
    extraReducers: (builder)=>{
        builder// Fetch Doctors
        .addCase(fetchDoctors.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchDoctors.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.doctors = action.payload.doctors || action.payload;
            state.pagination = action.payload.pagination || null;
        }).addCase(fetchDoctors.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Fetch Doctor By ID
        .addCase(fetchDoctorById.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchDoctorById.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.selectedDoctor = action.payload;
        }).addCase(fetchDoctorById.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Create Doctor
        .addCase(createDoctor.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(createDoctor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.doctors.unshift(action.payload);
        }).addCase(createDoctor.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Update Doctor
        .addCase(updateDoctor.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(updateDoctor.fulfilled, (state, action)=>{
            state.isLoading = false;
            const index = state.doctors.findIndex((d)=>d.id === action.payload.id);
            if (index !== -1) {
                state.doctors[index] = action.payload;
            }
            if (state.selectedDoctor?.id === action.payload.id) {
                state.selectedDoctor = action.payload;
            }
        }).addCase(updateDoctor.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Delete Doctor
        .addCase(deleteDoctor.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(deleteDoctor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.doctors = state.doctors.filter((d)=>d.id !== action.payload);
        }).addCase(deleteDoctor.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});
const { setFilters, clearFilters, clearError, clearSelectedDoctor, resetState } = doctorSlice.actions;
const __TURBOPACK__default__export__ = doctorSlice.reducer;
}),
"[project]/lib/store/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reduxjs+toolkit@2.11.1_react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1__react@19.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/slices/authSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$studentSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/slices/studentSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$parentSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/slices/parentSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$teacherSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/slices/teacherSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$adminSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/slices/adminSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$doctorSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/slices/doctorSlice.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        student: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$studentSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        parent: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$parentSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$teacherSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        admin: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$adminSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        doctor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$slices$2f$doctorSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        })
});
}),
"[project]/components/providers/redux-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReduxProvider",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-redux@9.2.0_@types+react@19.2.7_react@19.2.0_redux@5.0.1/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store/index.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function ReduxProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/components/providers/redux-provider.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1795c073._.js.map