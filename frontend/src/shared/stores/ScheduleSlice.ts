import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../apis/api';

export interface ISlot {
    id: number;
    startTime: string;
    endTime: string;
    capacity: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    appointments: IAppointment[];
}

interface IAppointment {
    id: number;
    patientName: string;
    patientGender: string;
    patientEmail: string;
    patientDob: string;
    patientEthnicity: string;
    patientAddress: string;
    reason: string;
    patientPhone: string;
}

export interface ISchedule {
    id: number;
    name: string;
    workDate: string;
    shift: string;
    slots: ISlot[];
}

interface IScheduleState {
    list: ISchedule[];
    loading: boolean;
    error: string | null;
}

const initialState: IScheduleState = {
    list: [],
    loading: false,
    error: null
};

export const fetchSchedulesForAdmin = createAsyncThunk<
    ISchedule[],
    number,
    { rejectValue: string }
>('schedules/fetchSchedulesForAdmin', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/schedules/${id}`);
        const { data } = response.data;
        return data;
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const fetchSchedulesForDoctor = createAsyncThunk<
    ISchedule[],
    { date?: string; start?: string; end?: string },
    { rejectValue: string }
>('schedules/fetchSchedulesForDoctor', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/doctor/schedules', { params });
        return response.data.data;
    } catch (e: any) {
        const errMessage =
            e.response?.data?.message || 'Lỗi khi tải lịch làm việc';
        return rejectWithValue(errMessage);
    }
});

export const schedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedulesForAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSchedulesForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchSchedulesForAdmin.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.error = action.payload || 'Server error occurred';
            })
            .addCase(fetchSchedulesForDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSchedulesForDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchSchedulesForDoctor.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.error = action.payload || 'Error';
            });
    }
});

export const selectSchedules = (state: { schedules: IScheduleState }) =>
    state.schedules;

export default schedulesSlice.reducer;
