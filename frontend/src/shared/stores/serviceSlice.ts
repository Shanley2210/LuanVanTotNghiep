import {
    createAsyncThunk,
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';
import api from '../apis/api';

export interface IService {
    id: number;
    name: string;
    description: string;
    durationMinutes: number;
    price: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface IServiceState {
    list: IService[];
    loading: boolean;
    error: string | null;
}

const initialState: IServiceState = {
    list: [],
    loading: false,
    error: null
};

export const fetchServices = createAsyncThunk<
    IService[],
    void,
    { rejectValue: string }
>('services/fetchServices', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/service');
        const { errCode, message, data } = response.data;
        if (errCode === 0 && Array.isArray(data)) {
            return data as IService[];
        }

        return rejectWithValue(message || 'Failed to fetch services');
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchServices.fulfilled,
                (state, action: PayloadAction<IService[]>) => {
                    state.loading = false;
                    state.list = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.error =
                    (action.payload as string) || 'Failed to fetch services';
            });
    }
});

export const selectServices = (state: { services: IServiceState }) =>
    state.services;

export default servicesSlice.reducer;
