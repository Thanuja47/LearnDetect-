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
    removeStudent: (id)=>api.delete(`/teachers/students/${id}`),
    generateClassReport: ()=>api.post('/teachers/reports/class')
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
    "generateClassReport",
    ()=>generateClassReport,
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
const generateClassReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$1_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('teacher/generateReport', async (_, { rejectWithValue })=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["teacherAPI"].generateClassReport();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to generate report');
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
"[project]/lib/translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        nav_doctors: "Doctors",
        nav_signin: "Sign In",
        nav_get_started: "Get Started",
        hero_badge: "AI-Powered Learning Detection",
        hero_title: "Detect Learning Difficulties Early",
        hero_description: "AI-powered speech analysis helps identify learning challenges in children before they fall behind, enabling targeted support when it matters most.",
        hero_cta_trial: "Start Free Trial",
        hero_cta_video: "Learn How It Works",
        features_title: "Comprehensive Learning Analysis",
        features_desc: "Our platform combines advanced speech recognition with AI analysis to provide detailed insights into each child's reading development.",
        testimonials_title: "Loved by Educators & Parents",
        testimonials_desc: "Real feedback from people transforming how we detect and support learning",
        roles_title: "Built for Everyone",
        roles_desc: "Tailored experiences for different users, all working toward the same goal: supporting every child's learning journey.",
        cta_title: "Ready to Make a Difference?",
        cta_desc: "Join educators and parents using LearnDetect to support every child's learning potential.",
        cta_button: "Start Your Free Trial",
        footer_rights: "© 2025 LearnDetect. All rights reserved.",
        // Auth
        auth_login_title: "Sign In",
        auth_login_desc: "Enter your credentials to access your account",
        auth_email: "Email",
        auth_password: "Password",
        auth_signin_button: "Sign In",
        auth_signin_loading: "Signing in...",
        auth_no_account: "Don't have an account?",
        auth_signup_link: "Sign up",
        auth_create_account_title: "Create Account",
        auth_create_account_desc: "Join LearnDetect to start supporting learning",
        auth_i_am_a: "I am a",
        auth_fullname: "Full Name",
        auth_signup_button: "Create Account",
        auth_signup_loading: "Creating account...",
        auth_already_account: "Already have an account?",
        auth_signin_link: "Sign in",
        role_student: "Student",
        role_parent: "Parent",
        role_teacher: "Teacher",
        label_grade: "Grade Level",
        label_age: "Age",
        label_subject: "Subject",
        label_class_name: "Class Name",
        placeholder_select_grade: "Select your grade",
        placeholder_select_subject: "Select your subject",
        placeholder_select_class: "Select your class",
        // Navigation
        nav_dashboard: "Dashboard",
        nav_children: "Children",
        nav_reports: "Reports",
        nav_progress: "Progress",
        nav_settings: "Settings",
        nav_students: "Students",
        nav_analytics: "Analytics",
        nav_schedule: "Schedule Assessment",
        nav_logout: "Logout",
        portal_parent: "Parent Portal",
        portal_teacher: "Teacher Portal",
        // Landing - Benefits
        benefits_section_title: "Proven Impact",
        benefits_section_desc: "See how LearnDetect transforms learning outcomes and reduces educator workload",
        benefit_title_0: "Early Detection",
        benefit_desc_0: "Identify learning difficulties before they impact academic performance",
        benefit_title_1: "Time Saved",
        benefit_desc_1: "Automated assessments replace time-consuming manual evaluations",
        benefit_title_2: "Improvement Rate",
        benefit_desc_2: "Targeted interventions increase reading improvement rates significantly",
        benefit_title_3: "Efficiency Boost",
        benefit_desc_3: "Consolidate assessment, tracking, and reporting into one solution",
        // Landing - FAQ
        faq_section_title: "Frequently Asked Questions",
        faq_section_desc: "Find answers to common questions about LearnDetect",
        faq_q_0: "How accurate is the speech recognition?",
        faq_a_0: "Our system uses Google Web Speech API with AI post-processing to achieve 95%+ accuracy for typical reading passages.",
        faq_q_1: "What age groups can use LearnDetect?",
        faq_a_1: "LearnDetect is designed for children ages 5-12, covering early elementary through middle school.",
        faq_q_2: "Is my data secure and private?",
        faq_a_2: "Yes, we are fully HIPAA compliant and FERPA certified. All data is encrypted in transit and at rest.",
        faq_q_3: "How often should assessments be taken?",
        faq_a_3: "We recommend monthly assessments to track progress and identify trends.",
        faq_q_4: "Can parents access their child's results?",
        faq_a_4: "Absolutely. Parents have a dedicated dashboard showing their child's performance and progress.",
        faq_q_5: "What support do educators get?",
        faq_a_5: "Educators receive comprehensive training, ongoing support, and access to best practices.",
        // Dashboard
        dash_overview: "Overview",
        dash_total_students: "Total Students",
        dash_avg_score: "Avg. Score",
        dash_tests_week: "Tests This Week",
        dash_need_support: "Need Support",
        dash_class_performance: "Class Performance",
        dash_performance_summary: "Performance Summary",
        dash_featured_students: "Featured Students",
        dash_view_all: "View All",
        dash_student_details: "Student Performance Details",
        dash_generate_report: "Generate Class Report",
        dash_schedule_assessment: "Schedule Assessment",
        dash_generating: "Generating...",
        // Parent Dashboard
        parent_dash_title: "Parent Dashboard",
        parent_dash_desc: "Monitor your children's reading progress and development",
        parent_total_children: "Total Children",
        parent_active_learners: "Active learners",
        parent_assessments_completed: "Assessments completed",
        parent_avg_progress: "Average Progress",
        parent_across_children: "Across all children",
        parent_your_children: "Your Children",
        parent_add_child: "Add Child",
        parent_progress_time: "Progress Over Time",
        parent_progress_desc: "Reading assessment scores for the last 4 months",
        parent_strengths: "Strengths",
        parent_areas_focus: "Areas of Focus",
        // Teacher Dashboard
        teacher_dash_title: "Teacher Dashboard",
        teacher_dash_desc: "Manage and track your class reading assessments",
        teacher_class_avg: "Class average",
        teacher_in_class: "In your class",
        teacher_completed: "Completed",
        teacher_students: "Students"
    },
    si: {
        nav_doctors: "වෛද්‍යවරුන්",
        nav_signin: "ඇතුල් වන්න",
        nav_get_started: "ආරම්භ කරන්න",
        hero_badge: "AI බලයෙන් ක්‍රියාත්මක වන ඉගෙනුම් හඳුනාගැනීම",
        hero_title: "ඉගෙනීමේ දුෂ්කරතා කල්තියා හඳුනාගන්න",
        hero_description: "AI බලයෙන් ක්‍රියාත්මක වන කථන විශ්ලේෂණය දරුවන්ගේ ඉගෙනීමේ අභියෝග කල්තියා හඳුනා ගැනීමට උපකාරී වේ, එමඟින් අවශ්ය සහාය ලබා දිය හැකිය.",
        hero_cta_trial: "නොමිලේ අත්හදා බලන්න",
        hero_cta_video: "ක්‍රියා කරන ආකාරය",
        features_title: "පරිපූර්ණ ඉගෙනුම් විශ්ලේෂණය",
        features_desc: "අපගේ වේදිකාව උසස් කථන හඳුනාගැනීම සහ AI විශ්ලේෂණය ඒකාබද්ධ කර දරුවාගේ කියවීමේ කුසලතා පිළිබඳ සවිස්තරාත්මක අවබෝධයක් ලබා දෙයි.",
        testimonials_title: "ගුරුවරුන් සහ දෙමාපියන්ගේ ඇගයීමට ලක්වූ",
        testimonials_desc: "ඉගෙනුම් හඳුනාගැනීම සහ සහාය ලබා දීම වෙනස් කරන පුද්ගලයින්ගෙන් සැබෑ ප්‍රතිචාර",
        roles_title: "සැමට ගැලපෙන ලෙස නිර්මාණය කර ඇත",
        roles_desc: "විවිධ පරිශීලකයින් සඳහා සකස් කරන ලද අත්දැකීම්, සියල්ල එකම අරමුණක් වෙනුවෙන්: සෑම දරුවෙකුගේම ඉගෙනුම් ගමනට සහාය වීම.",
        cta_title: "වෙනසක් කිරීමට සූදානම්ද?",
        cta_desc: "සෑම දරුවෙකුගේම ඉගෙනුම් විභවයට සහාය වීම සඳහා LearnDetect භාවිතා කරන ගුරුවරුන් සහ දෙමාපියන් සමඟ එක්වන්න.",
        cta_button: "ඔබේ නොමිලේ අත්හදා බැලීම ආරම්භ කරන්න",
        footer_rights: "© 2025 LearnDetect. සියලුම හිමිකම් ඇවිරිණි.",
        // Auth
        auth_login_title: "ඇතුල් වන්න",
        auth_login_desc: "ඔබගේ ගිණුමට පිවිසීමට ඔබගේ තොරතුරු ඇතුළත් කරන්න",
        auth_email: "විද්‍යුත් තැපෑල",
        auth_password: "මුරපදය",
        auth_signin_button: "ඇතුල් වන්න",
        auth_signin_loading: "ඇතුල් වෙමින්...",
        auth_no_account: "ගිණුමක් නැද්ද?",
        auth_signup_link: "ලියාපදිංචි වන්න",
        auth_create_account_title: "ගිණුමක් සාදන්න",
        auth_create_account_desc: "ඉගෙනීමට සහාය වීම සඳහා LearnDetect හා එක්වන්න",
        auth_i_am_a: "මම",
        auth_fullname: "සම්පූර්ණ නම",
        auth_signup_button: "ගිණුමක් සාදන්න",
        auth_signup_loading: "ගිණුමක් සාදමින්...",
        auth_already_account: "දැනටමත් ගිණුමක් තිබේද?",
        auth_signin_link: "ඇතුල් වන්න",
        role_student: "ශිෂ්‍යයා",
        role_parent: "දෙමාපියන්",
        role_teacher: "ගුරුවරයා",
        label_grade: "ශ්‍රේණිය",
        label_age: "වයස",
        label_subject: "විෂය",
        label_class_name: "පන්තියේ නම",
        placeholder_select_grade: "ඔබේ ශ්‍රේණිය තෝරන්න",
        placeholder_select_subject: "ඔබේ විෂය තෝරන්න",
        placeholder_select_class: "ඔබේ පන්තිය තෝරන්න",
        // Navigation
        nav_dashboard: "උ시ඛක පුවරුව",
        nav_children: "දරුවන්",
        nav_reports: "වාර්තා",
        nav_progress: "ප්‍රගතිය",
        nav_settings: "සැකසුම්",
        nav_students: "සිසුන්",
        nav_analytics: "විශ්ලේෂණ",
        nav_schedule: "ඇගයීම් කාලසටහන",
        nav_logout: "ඉවත් වන්න",
        portal_parent: "දෙමාපිය ද්වාරය",
        portal_teacher: "ගුරු ද්වාරය",
        // Landing - Benefits
        benefits_section_title: "තහවුරු කළ බලපෑම",
        benefits_section_desc: "LearnDetect ඉගෙනුම් ප්‍රතිඵල පරිවර්තනය කරන ආකාරය සහ අධ්‍යාපනඥයින්ගේ කාර්යभारය අඩු කරන ආකාරය බලන්න",
        benefit_title_0: "කල්තියා හඳුනාගැනීම",
        benefit_desc_0: "අධ්‍යාපනික ක්‍රියාකාරීත්වයට බලපෑම් කිරීමට පෙර ඉගෙනීමේ දුෂ්කරතා හඳුනාගන්න",
        benefit_title_1: "කාලය ඉතිරි කිරීම",
        benefit_desc_1: "ස්වයංක්‍රීය ඇගයීම් කාලය ගතවන අතින් කරන ඇගයීම් ප්‍රතිස්ථාපනය කරයි",
        benefit_title_2: "වැඩිදියුණු කිරීමේ අනුපාතය",
        benefit_desc_2: "ඉලක්කගත මැදිහත්වීම් කියවීමේ වැඩිදියුණු කිරීමේ අනුපාත සැලකිය යුතු ලෙස වැඩි කරයි",
        benefit_title_3: "කාර්යක්ෂමතාව වැඩි කිරීම",
        benefit_desc_3: "ඇගයීම, ලුහුබැඳීම සහ වාර්තා කිරීම එක් විසඳුමකට ඒකාබද්ධ කරන්න",
        // Landing - FAQ
        faq_section_title: "නිතර අසන ප්‍රශ්න",
        faq_section_desc: "LearnDetect ගැන නිතර අසන ප්‍රශ්නවලට පිළිතුරු සොයන්න",
        faq_q_0: "කථන හඳුනාගැනීම කොතරම් නිවැරදිද?",
        faq_a_0: "සාමාන්‍ය කියවීමේ කොටස් සඳහා 95%+ නිරවද්‍යතාවයක් ලබා ගැනීමට අපගේ පද්ධතිය AI පසු සැකසුම් සහිත Google Web Speech API භාවිතා කරයි.",
        faq_q_1: "LearnDetect භාවිතා කළ හැක්කේ කුමන වයස් කාණ්ඩවලටද?",
        faq_a_1: "LearnDetect වයස අවුරුදු 5-12 ළමයින් සඳහා නිර්මාණය කර ඇති අතර, මුල් ප්‍රාථමික සිට මධ්‍යම පාසල දක්වා ආවරණය කරයි.",
        faq_q_2: "මගේ දත්ත ආරක්ෂිතද?",
        faq_a_2: "ඔව්, අපි සම්පූර්ණයෙන්ම HIPAA අනුකූල සහ FERPA සහතික කර ඇත. සියලුම දත්ත සම්ප්‍රේෂණයේදී සහ ගබඩා කිරීමේදී සංකේතනය කර ඇත.",
        faq_q_3: "ඇගයීම් කොපමණ වාරයක් ගත යුතුද?",
        faq_a_3: "ප්‍රගතිය නිරීක්ෂණය කිරීමට සහ ප්‍රවණතා හඳුනා ගැනීමට මාසික ඇගයීම් අපි නිර්දේශ කරමු.",
        faq_q_4: "දෙමාපියන්ට තම දරුවාගේ ප්‍රතිඵල වෙත ප්‍රවේශ විය හැකිද?",
        faq_a_4: "අනිවාර්යයෙන්ම. දෙමාපියන්ට තම දරුවාගේ ක්‍රියාකාරීත්වය සහ ප්‍රගතිය පෙන්වන විශේෂ උපකරණ පුවරුවක් ඇත.",
        faq_q_5: "අධ්‍යාපනඥයින්ට ලැබෙන සහාය කුමක්ද?",
        faq_a_5: "අධ්‍යාපනඥයින්ට පුළුල් පුහුණුවක්, අඛණ්ඩ සහායක් සහ හොඳම භාවිතයන් වෙත ප්‍රවේශය ලැබේ.",
        // Dashboard
        dash_overview: "දළ විශ්ලේෂණය",
        dash_total_students: "මුළු සිසුන්",
        dash_avg_score: "සාමාන්‍ය ලකුණු",
        dash_tests_week: "මේ සතියේ පරීක්ෂණ",
        dash_need_support: "සහාය අවශ්‍යයි",
        dash_class_performance: "පන්ති කාර්ය සාධනය",
        dash_performance_summary: "කාර්ය සාධන සාරාංශය",
        dash_featured_students: "විශේෂාංගගත සිසුන්",
        dash_view_all: "සියල්ල බලන්න",
        dash_student_details: "ශිෂ්‍ය කාර්ය සාධන විස්තර",
        dash_generate_report: "පන්ති වාර්තාව උත්පාදනය කරන්න",
        dash_schedule_assessment: "ඇගයීමක් උපලේඛනගත කරන්න",
        dash_generating: "උත්පාදනය වෙමින් පවතී...",
        // Parent Dashboard
        parent_dash_title: "දෙමාපිය උපකරණ පුවරුව",
        parent_dash_desc: "ඔබේ දරුවන්ගේ කියවීමේ ප්‍රගතිය සහ සංවර්ධනය නිරීක්ෂණය කරන්න",
        parent_total_children: "මුළු ළමුන්",
        parent_active_learners: "ක්‍රියාකාරී ඉගෙන ගන්නන්",
        parent_assessments_completed: "සම්පූර්ණ කරන ලද ඇගයීම්",
        parent_avg_progress: "සාමාන්‍ය ප්‍රගතිය",
        parent_across_children: "සියලුම ළමුන් හරහා",
        parent_your_children: "ඔබේ දරුවන්",
        parent_add_child: "දරුවෙකු එකතු කරන්න",
        parent_progress_time: "කාලයත් සමඟ ප්‍රගතිය",
        parent_progress_desc: "පසුගිය මාස 4 සඳහා කියවීමේ ඇගයීම් ලකුණු",
        parent_strengths: "ශක්තීන්",
        parent_areas_focus: "අවධානය යොමු කළ යුතු අංශ",
        // Teacher Dashboard
        teacher_dash_title: "ගුරු උපකරණ පුවරුව",
        teacher_dash_desc: "ඔබේ පන්තියේ කියවීමේ ඇගයීම් කළමනාකරණය සහ ලුහුබැඳීම",
        teacher_class_avg: "පන්ති සාමාන්‍යය",
        teacher_in_class: "ඔබේ පන්තියේ",
        teacher_completed: "සම්පූර්ණ කරන ලදී",
        teacher_students: "සිසුන්"
    },
    ta: {
        nav_doctors: "மருத்துவர்கள்",
        nav_signin: "உள்நுழைக",
        nav_get_started: "தொடங்குங்கள்",
        hero_badge: "AI-இயங்கும் கற்றல் கண்டறிதல்",
        hero_title: "கற்றல் குறைபாடுகளை முன்கூட்டியே கண்டறியுங்கள்",
        hero_description: "AI-இயங்கும் பேச்சு பகுப்பாய்வு குழந்தைகள் பின் தங்குவதற்கு முன்பே கற்றல் சவால்களை கண்டறிய உதவுகிறது, இது தேவையான ஆதரவை வழங்க உதவுகிறது.",
        hero_cta_trial: "இலவசமாக முயற்சிக்கவும்",
        hero_cta_video: "எப்படி வேலை செய்கிறது",
        features_title: "விரிவான கற்றல் பகுப்பாய்வு",
        features_desc: "எங்கள் தளம் மேம்பட்ட பேச்சு அங்கீகாரம் மற்றும் AI பகுப்பாய்வை இணைத்து ஒவ்வொரு குழந்தையின் வாசிப்பு வளர்ச்சி குறித்த விரிவான நுண்ணறிவுகளை வழங்குகிறது.",
        testimonials_title: "கல்வியாளர்கள் மற்றும் பெற்றோர்களால் விரும்பப்படுகிறது",
        testimonials_desc: "கற்றல் கண்டறிதல் மற்றும் ஆதரவு வழங்குவதை மாற்றியமைக்கும் மக்களிடமிருந்து உண்மையான கருத்துக்கள்",
        roles_title: "அனைவருக்குமாக உருவாக்கப்பட்டது",
        roles_desc: "வெவ்வேறு பயனர்களுக்கன அனுபவங்கள், அனைத்தும் ஒரே குறிக்கோளை நோக்கி செயல்படுகின்றன: ஒவ்வொரு குழந்தையின் கற்றல் பயணத்திற்கும் ஆதரவளித்தல்.",
        cta_title: "மாற்றத்தை ஏற்படுத்தத் தயாரா?",
        cta_desc: "ஒவ்வொரு குழந்தையின் கற்றல் திறனுக்கும் ஆதரவளிக்க LearnDetect ஐப் பயன்படுத்தும் கல்வியாளர்கள் மற்றும் பெற்றோர்களுடன் இணையுங்கள்.",
        cta_button: "உங்கள் இலவச முயற்சியைத் தொடங்குங்கள்",
        footer_rights: "© 2025 LearnDetect. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
        // Auth
        auth_login_title: "உள்நுழைக",
        auth_login_desc: "உங்கள் கணக்கை அணுக உங்கள் சான்றுகளை உள்ளிடவும்",
        auth_email: "மின்னஞ்சல்",
        auth_password: "கடவுச்சொல்",
        auth_signin_button: "உள்நுழைக",
        auth_signin_loading: "உள்நுழைகிறது...",
        auth_no_account: "கணக்கு இல்லையா?",
        auth_signup_link: "பதிவு செய்க",
        auth_create_account_title: "கணக்கை உருவாக்கவும்",
        auth_create_account_desc: "கற்றலை ஆதரிக்க LearnDetect இல் ர இணையவும்",
        auth_i_am_a: "நான் ஒரு",
        auth_fullname: "முழு பெயர்",
        auth_signup_button: "கணக்கை உருவாக்கவும்",
        auth_signup_loading: "கணக்கை உருவாக்குகிறது...",
        auth_already_account: "ஏற்கனவே கணக்கு உள்ளதா?",
        auth_signin_link: "உள்நுழைக",
        role_student: "மாணவர்",
        role_parent: "பெற்றோர்",
        role_teacher: "ஆசிரியர்",
        label_grade: "வகுப்பு நிலை",
        label_age: "வயது",
        label_subject: "பாடம்",
        label_class_name: "வகுப்பு பெயர்",
        placeholder_select_grade: "உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்",
        placeholder_select_subject: "உங்கள் பாடத்தைத் தேர்ந்தெடுக்கவும்",
        placeholder_select_class: "உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்",
        // Navigation
        nav_dashboard: "முகப்பு",
        nav_children: "குழந்தைகள்",
        nav_reports: "அறிக்கைகள்",
        nav_progress: "முன்னேற்றம்",
        nav_settings: "அமைப்புகள்",
        nav_students: "மாணவர்கள்",
        nav_analytics: "பகுப்பாய்வு",
        nav_schedule: "மதிப்பீடு அட்டவணை",
        nav_logout: "வெளியேறு",
        portal_parent: "பெற்றோர் தளம்",
        portal_teacher: "ஆசிரியர் தளம்",
        // Landing - Benefits
        benefits_section_title: "நிரூபிக்கப்பட்ட தாக்கம்",
        benefits_section_desc: "LearnDetect எவ்வாறு கற்றல் விளைவுகளை மாற்றியமைக்கிறது மற்றும் கல்வியாளர்களின் பணிச்சுமையைக் குறைக்கிறது என்பதைப் பாருங்கள்",
        benefit_title_0: "முன்கூட்டியே கண்டறிதல்",
        benefit_desc_0: "கல்வி செயல்திறனைப் பாதிக்கும் முன் கற்றல் குறைபாடுகளைக் கண்டறியவும்",
        benefit_title_1: "நேரம் சேமிக்கப்பட்டது",
        benefit_desc_1: "தானியங்கு மதிப்பீடுகள் நேரத்தைச் செலவழிக்கும் கைமுறை மதிப்பீடுகளை மாற்றுகின்றன",
        benefit_title_2: "மேம்பாட்டு விகிதம்",
        benefit_desc_2: "இலக்கு வைக்கப்பட்ட தலையீடுகள் வாசிப்பு மேம்பாட்டு விகிதங்களை கணிசமாக அதிகரிக்கின்றன",
        benefit_title_3: "செயல்திறன் அதிகரிப்பு",
        benefit_desc_3: "மதிப்பீடு, கண்காணிப்பு மற்றும் அறிக்கையிடலை ஒரே தீர்வாக ஒருங்கிணைக்கவும்",
        // Landing - FAQ
        faq_section_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        faq_section_desc: "LearnDetect பற்றிய பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும்",
        faq_q_0: "பேச்சு அங்கீகாரத்தின் துல்லியம் எவ்வளவு?",
        faq_a_0: "எங்கள் அமைப்பு Google Web Speech API ஐ AI பிந்தைய செயலாக்கத்துடன் பயன்படுத்தி வழக்கமான வாசிப்புப் பகுதிகளுக்கு 95%+ துல்லியத்தை அடைகிறது.",
        faq_q_1: "LearnDetect ஐ எந்த வயதுக் குழுக்கள் பயன்படுத்தலாம்?",
        faq_a_1: "LearnDetect 5-12 வயதுடைய குழந்தைகளுக்காக வடிவமைக்கப்பட்டுள்ளது, இது ஆரம்ப தொடக்கப் பள்ளி முதல் நடுநிலைப் பள்ளி வரை உள்ளடக்கியது.",
        faq_q_2: "எனது தரவு பாதுகாப்பானது மற்றும் தனிப்பட்டதா?",
        faq_a_2: "ஆம், நாங்கள் முழுமையாக HIPAA இணக்கமானவர்கள் மற்றும் FERPA சான்றளிக்கப்பட்டவர்கள். அனைத்து தரவுகளும் போக்குவரத்திலும் ஓய்விலும் குறியாக்கம் செய்யப்படுகின்றன.",
        faq_q_3: "மதிப்பீடுகள் எவ்வளவு அடிக்கடி எடுக்கப்பட வேண்டும்?",
        faq_a_3: "முன்னேற்றத்தைக் கண்காணிக்கவும் போக்குகளைக் கண்டறியவும் மாதாந்திர மதிப்பீடுகளை நாங்கள் பரிந்துரைக்கிறோம்.",
        faq_q_4: "பெற்றோர்கள் தங்கள் குழந்தையின் முடிவுகளை அணுக முடியுமா?",
        faq_a_4: "நிச்சயமாக. பெற்றோர்களுக்கு தங்கள் குழந்தையின் செயல்திறன் மற்றும் முன்னேற்றத்தைக் காட்டும் ஒரு பிரத்யேக டாஷ்போர்டு உள்ளது.",
        faq_q_5: "கல்வியாளர்களுக்கு என்ன ஆதரவு கிடைக்கும்?",
        faq_a_5: "கல்வியாளர்களுக்கு விரிவான பயிற்சி, தொடர்ச்சியான ஆதரவு மற்றும் சிறந்த நடைமுறைகளுக்கான அணுகல் கிடைக்கும்."
    }
};
}),
"[project]/components/providers/language-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    // Optional: Persist language preference
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedLang = localStorage.getItem("language");
        if (savedLang && (savedLang === "en" || savedLang === "si" || savedLang === "ta")) {
            setLanguage(savedLang);
        }
    }, []);
    const handleSetLanguage = (lang)=>{
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };
    const t = (key)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][language][key] || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"]["en"][key] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage: handleSetLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/providers/language-provider.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ad0f2159._.js.map