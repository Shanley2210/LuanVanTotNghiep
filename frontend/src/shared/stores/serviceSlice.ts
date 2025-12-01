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

interface IPaginationMeta {
    page: number;
    limit: number;
    totalRows: number;
    totalPages: number;
}

interface IFetchServicesResponse {
    list: IService[];
    meta: IPaginationMeta;
}

interface IServiceState {
    list: IService[];
    totalServices: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: IServiceState = {
    list: [],
    totalServices: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    loading: false,
    error: null
};

export const fetchServices = createAsyncThunk<
    IFetchServicesResponse,
    { page: number; limit: number },
    { rejectValue: string }
>('services/fetchServices', async (params, { rejectWithValue }) => {
    try {
        const { page, limit } = params;

        const response = await api.get(`/service?page=${page}&limit=${limit}`);

        const { errCode, message, data, meta } = response.data;

        if (errCode === 0 && Array.isArray(data)) {
            return {
                list: data as IService[],
                meta: meta as IPaginationMeta
            };
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
    reducers: {
        resetServiceState: (state) => {
            state.list = [];
            state.totalServices = 0;
            state.currentPage = 1;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchServices.fulfilled,
                (state, action: PayloadAction<IFetchServicesResponse>) => {
                    const { list, meta } = action.payload;
                    state.loading = false;
                    state.list = list;
                    state.error = null;

                    state.totalServices = meta.totalRows;
                    state.totalPages = meta.totalPages;
                    state.currentPage = meta.page;
                    state.limit = meta.limit;
                }
            )
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.totalServices = 0;
                state.error =
                    (action.payload as string) || 'Failed to fetch services';
            });
    }
});

export const { resetServiceState } = servicesSlice.actions;

export const selectServices = (state: { services: IServiceState }) =>
    state.services;

export default servicesSlice.reducer;
