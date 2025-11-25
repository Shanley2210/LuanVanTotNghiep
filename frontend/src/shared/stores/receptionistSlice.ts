import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../apis/api';

export interface IReceptionist {
    id: number;
    userId: number;
    dob: string;
    gender: string;
    ethnicity: string;
    address: string;
    degree: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

interface IReceptionistState {
    list: IReceptionist[];
    loading: boolean;
    error: string | null;
}

const initialState: IReceptionistState = {
    list: [],
    loading: false,
    error: null
};

export const fetchReceptionists = createAsyncThunk<
    IReceptionist[],
    void,
    { rejectValue: string }
>('receptionist/fetchReceptionist', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/admin/receptionists');
        const { data } = response.data;
        return data;
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const receptionistsSlice = createSlice({
    name: 'receptionist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceptionists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReceptionists.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchReceptionists.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.error = action.payload || 'Server error occurred';
            });
    }
});

export const selectReceptionist = (state: {
    receptionists: IReceptionistState;
}) => state.receptionists;

export default receptionistsSlice.reducer;
