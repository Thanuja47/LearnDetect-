import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doctorAPI } from '../../api';
import { Doctor, DoctorFilters } from '../../types/doctor';
import { mockDoctors } from '../../mockDoctors';

// Types
interface DoctorState {
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    filters: DoctorFilters;
    pagination: {
        page: number;
        limit: number;
        total: number;
    } | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: DoctorState = {
    doctors: [],
    selectedDoctor: null,
    filters: {},
    pagination: null,
    isLoading: false,
    error: null,
};

// Async thunks
export const fetchDoctors = createAsyncThunk(
    'doctor/fetchDoctors',
    async (params: DoctorFilters | undefined, { rejectWithValue }) => {
        try {
            const response = await doctorAPI.getAll(params);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
        }
    }
);

export const fetchDoctorById = createAsyncThunk(
    'doctor/fetchDoctorById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await doctorAPI.getById(id);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctor details');
        }
    }
);

export const createDoctor = createAsyncThunk(
    'doctor/createDoctor',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await doctorAPI.create(data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create doctor');
        }
    }
);

export const updateDoctor = createAsyncThunk(
    'doctor/updateDoctor',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await doctorAPI.update(id, data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update doctor');
        }
    }
);

export const deleteDoctor = createAsyncThunk(
    'doctor/deleteDoctor',
    async (id: string, { rejectWithValue }) => {
        try {
            await doctorAPI.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete doctor');
        }
    }
);

// Slice
const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {};
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedDoctor: (state) => {
            state.selectedDoctor = null;
        },
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Fetch Doctors
            .addCase(fetchDoctors.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctors = action.payload.doctors || action.payload;
                state.pagination = action.payload.pagination || null;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch Doctor By ID
            .addCase(fetchDoctorById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDoctorById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedDoctor = action.payload;
            })
            .addCase(fetchDoctorById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create Doctor
            .addCase(createDoctor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctors.unshift(action.payload);
            })
            .addCase(createDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Update Doctor
            .addCase(updateDoctor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.doctors.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.doctors[index] = action.payload;
                }
                if (state.selectedDoctor?.id === action.payload.id) {
                    state.selectedDoctor = action.payload;
                }
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Delete Doctor
            .addCase(deleteDoctor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctors = state.doctors.filter(d => d.id !== action.payload);
            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setFilters, clearFilters, clearError, clearSelectedDoctor, resetState } = doctorSlice.actions;
export default doctorSlice.reducer;
