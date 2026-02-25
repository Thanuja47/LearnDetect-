import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { parentAPI, childrenAPI, reportAPI } from '../../api';

// Types
interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  grade: string;
  gender: string;
  progress: number;
  testsCompleted: number;
  averageScore: number;
  status: string;
  lastAssessment?: string;
}

interface Report {
  id: string;
  childId: string;
  title: string;
  type: string;
  content?: string;
  createdAt: string;
  childName?: string;
}

interface ParentState {
  dashboard: any | null;
  children: Child[];
  selectedChild: Child | null;
  progress: any | null;
  insights: any | null;
  reports: Report[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ParentState = {
  dashboard: null,
  children: [],
  selectedChild: null,
  progress: null,
  insights: null,
  reports: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchParentDashboard = createAsyncThunk(
  'parent/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await parentAPI.getDashboard();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const fetchChildren = createAsyncThunk(
  'parent/fetchChildren',
  async (params: { status?: string; search?: string } | undefined, { rejectWithValue }) => {
    try {
      const response = await childrenAPI.getAll(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch children');
    }
  }
);

export const fetchChildById = createAsyncThunk(
  'parent/fetchChildById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await childrenAPI.getById(id);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch child');
    }
  }
);

export const addChild = createAsyncThunk(
  'parent/addChild',
  async (data: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    grade: string;
    gender: string;
  }, { rejectWithValue }) => {
    try {
      const response = await childrenAPI.create(data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add child');
    }
  }
);

export const updateChild = createAsyncThunk(
  'parent/updateChild',
  async ({ id, data }: { id: string; data: Partial<Child> }, { rejectWithValue }) => {
    try {
      const response = await childrenAPI.update(id, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update child');
    }
  }
);

export const deleteChild = createAsyncThunk(
  'parent/deleteChild',
  async (id: string, { rejectWithValue }) => {
    try {
      await childrenAPI.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete child');
    }
  }
);

export const fetchParentProgress = createAsyncThunk(
  'parent/fetchProgress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await parentAPI.getProgress();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
);

export const fetchInsights = createAsyncThunk(
  'parent/fetchInsights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await parentAPI.getInsights();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch insights');
    }
  }
);

export const fetchReports = createAsyncThunk(
  'parent/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reportAPI.getAll();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports');
    }
  }
);

export const generateReport = createAsyncThunk(
  'parent/generateReport',
  async (data: { childId: string; title: string; type: string }, { rejectWithValue }) => {
    try {
      const response = await reportAPI.generate(data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate report');
    }
  }
);

// Slice
const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedChild: (state, action) => {
      state.selectedChild = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(fetchParentDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchParentDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchParentDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Children
      .addCase(fetchChildren.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChildren.fulfilled, (state, action) => {
        state.isLoading = false;
        state.children = action.payload;
      })
      .addCase(fetchChildren.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Child by ID
      .addCase(fetchChildById.fulfilled, (state, action) => {
        state.selectedChild = action.payload;
      })
      // Add Child
      .addCase(addChild.fulfilled, (state, action) => {
        state.children = [...state.children, action.payload];
      })
      // Update Child
      .addCase(updateChild.fulfilled, (state, action) => {
        state.children = state.children.map(c =>
          c.id === action.payload.id ? action.payload : c
        );
      })
      // Delete Child
      .addCase(deleteChild.fulfilled, (state, action) => {
        state.children = state.children.filter(c => c.id !== action.payload);
      })
      // Progress
      .addCase(fetchParentProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
      })
      // Insights
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.insights = action.payload;
      })
      // Reports
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.reports = [action.payload, ...state.reports];
      });
  },
});

export const { clearError, setSelectedChild, resetState } = parentSlice.actions;
export default parentSlice.reducer;
