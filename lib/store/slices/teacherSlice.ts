import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { teacherAPI, scheduleAPI } from '../../api';

// Types
interface ClassStudent {
  id: string;
  name: string;
  studentCode: string;
  score: number;
  status: string;
  trend: number;
  lastAssessment?: string;
}

interface Schedule {
  id: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  notes?: string;
  studentIds: string[];
}

interface TeacherState {
  dashboard: any | null;
  students: ClassStudent[];
  selectedStudent: ClassStudent | null;
  schedules: Schedule[];
  performance: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  dashboard: null,
  students: [],
  selectedStudent: null,
  schedules: [],
  performance: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchTeacherDashboard = createAsyncThunk(
  'teacher/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getDashboard();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const fetchTeacherStudents = createAsyncThunk(
  'teacher/fetchStudents',
  async (params: { status?: string; search?: string } | undefined, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getStudents(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);

export const addTeacherStudent = createAsyncThunk(
  'teacher/addStudent',
  async (data: { name: string; studentCode: string }, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.addStudent(data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add student');
    }
  }
);

export const updateTeacherStudent = createAsyncThunk(
  'teacher/updateStudent',
  async ({ id, data }: { id: string; data: Partial<ClassStudent> }, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.updateStudent(id, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update student');
    }
  }
);

export const removeTeacherStudent = createAsyncThunk(
  'teacher/removeStudent',
  async (id: string, { rejectWithValue }) => {
    try {
      await teacherAPI.removeStudent(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove student');
    }
  }
);

export const fetchSchedules = createAsyncThunk(
  'teacher/fetchSchedules',
  async (params: { upcoming?: boolean } | undefined, { rejectWithValue }) => {
    try {
      const response = await scheduleAPI.getAll(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedules');
    }
  }
);

export const createSchedule = createAsyncThunk(
  'teacher/createSchedule',
  async (data: {
    date: string;
    time: string;
    duration: number;
    type: string;
    notes?: string;
    studentIds?: string[];
  }, { rejectWithValue }) => {
    try {
      const response = await scheduleAPI.create(data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create schedule');
    }
  }
);

export const updateSchedule = createAsyncThunk(
  'teacher/updateSchedule',
  async ({ id, data }: { id: string; data: Partial<Schedule> }, { rejectWithValue }) => {
    try {
      const response = await scheduleAPI.update(id, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update schedule');
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  'teacher/deleteSchedule',
  async (id: string, { rejectWithValue }) => {
    try {
      await scheduleAPI.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete schedule');
    }
  }
);

export const fetchPerformance = createAsyncThunk(
  'teacher/fetchPerformance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getPerformance();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch performance');
    }
  }
);

export const generateClassReport = createAsyncThunk(
  'teacher/generateReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.generateClassReport();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate report');
    }
  }
);

// Slice
const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(fetchTeacherDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeacherDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchTeacherDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Students
      .addCase(fetchTeacherStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeacherStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchTeacherStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add Student
      .addCase(addTeacherStudent.fulfilled, (state, action) => {
        state.students = [...state.students, action.payload];
      })
      // Update Student
      .addCase(updateTeacherStudent.fulfilled, (state, action) => {
        state.students = state.students.map(s =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      // Remove Student
      .addCase(removeTeacherStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(s => s.id !== action.payload);
      })
      // Schedules
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.schedules = [action.payload, ...state.schedules];
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.map(s =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter(s => s.id !== action.payload);
      })
      // Performance
      .addCase(fetchPerformance.fulfilled, (state, action) => {
        state.performance = action.payload;
      });
  },
});

export const { clearError, setSelectedStudent, resetState } = teacherSlice.actions;
export default teacherSlice.reducer;
