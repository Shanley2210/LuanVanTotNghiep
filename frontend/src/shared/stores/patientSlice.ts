import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../apis/api';

export interface IPatient {
    id: number;
    userId: number;
    dob: string;
    gender: string;
    ethnicity: string;
    address: string;
    insuranceTerm: string;
    insuranceNumber: string;
    familyAddress: string;
    notePMH: string;
    createdAt: string;
    updatedAt: string;

    user: {
        name: string;
        email: string;
        phone: string;
    };
}

interface IPatientState {
    list: IPatient[];
    loading: boolean;
    error: string | null;
}

const initialState: IPatientState = {
    list: [],
    loading: false,
    error: null
};

export const fetchPatients = createAsyncThunk<
    IPatient[],
    void,
    { rejectValue: string }
>('patient/fetchPatients', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/admin/patients');
        const { data } = response.data;
        return data;
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.error = action.payload || 'Server error occurred';
            });
    }
});

export const selectPatient = (state: { patients: IPatientState }) =>
    state.patients;

export default patientSlice.reducer;
