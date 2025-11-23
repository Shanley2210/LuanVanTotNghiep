import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../apis/api';

export interface IDoctor {
    id: number;
    userId: number;
    dob: string;
    gender: string;
    ethnicity: string;
    address: string;
    degree: string;
    room: string;
    image: string;
    price: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    specialty: {
        id: number;
        name: string | null;
    } | null;
}

interface IDoctorState {
    list: IDoctor[];
    loading: boolean;
    error: string | null;
}

const initialState: IDoctorState = {
    list: [],
    loading: false,
    error: null
};

export const fetchDoctors = createAsyncThunk<
    IDoctor[],
    void,
    { rejectValue: string }
>('doctor/fetchDoctor', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/doctor/all');
        const { data } = response.data;
        return data;
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const doctorsSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.error = action.payload || 'Server error occurred';
            });
    }
});

export const selectDoctor = (state: { doctors: IDoctorState }) => state.doctors;

export default doctorsSlice.reducer;
