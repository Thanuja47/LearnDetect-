import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { studentAPI, assessmentAPI } from '../../api';

// Types
interface Assessment {
  id: string;
  type: string;
  wordAccuracy: number;
  pronunciation: number;
  readingSpeed: number;
  fluency: number;
  comprehension: number;
  overallScore: number;
  createdAt: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface Schedule {
  id: string;
  title: string;
  type: string;
  scheduledDate: string;
  scheduledTime: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface StudentState {
  dashboard: any | null;
  profile: any | null;
  assessments: Assessment[];
  progress: any | null;
  achievements: Achievement[];
  stats: any | null;
  schedules: Schedule[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  dashboard: null,
  profile: null,
  assessments: [],
  progress: null,
  achievements: [],
  stats: null,
  schedules: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchDashboard = createAsyncThunk(
  'student/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getDashboard();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'student/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getProfile();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const fetchAssessments = createAsyncThunk(
  'student/fetchAssessments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getAssessments();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assessments');
    }
  }
);

export const fetchProgress = createAsyncThunk(
  'student/fetchProgress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getProgress();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
);

export const fetchAchievements = createAsyncThunk(
  'student/fetchAchievements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getAchievements();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch achievements');
    }
  }
);

export const fetchStats = createAsyncThunk(
  'student/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getStats();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const fetchStudentSchedules = createAsyncThunk(
  'student/fetchStudentSchedules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getSchedules();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedules');
    }
  }
);

export const submitAssessment = createAsyncThunk(
  'student/submitAssessment',
  async (data: {
    type: string;
    wordAccuracy: number;
    pronunciation: number;
    readingSpeed: number;
    fluency: number;
    comprehension: number;
    recognizedText?: string;
    feedback?: string[];
    suggestions?: string[];
  }, { rejectWithValue }) => {
    try {
      const response = await assessmentAPI.submit(data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit assessment');
    }
  }
);

// Slice
const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(fetchDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Profile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      // Assessments
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.assessments = action.payload;
      })
      // Progress
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
      })
      // Achievements
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload;
      })
      // Stats
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      // Schedules
      .addCase(fetchStudentSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
      })
      // Submit Assessment
      .addCase(submitAssessment.fulfilled, (state, action) => {
        state.assessments = [action.payload, ...state.assessments];
      });
  },
});

export const { clearError, resetState } = studentSlice.actions;
export default studentSlice.reducer;
