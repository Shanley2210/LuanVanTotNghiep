import {
    createAsyncThunk,
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';
import api from '../apis/api';
import type { RootState } from './store';

export interface ISpecialty {
    id: number;
    name: string;
    description: string;
    image: string;
    status: string;
    doctorCount: number;
    createdAt: string;
    updatedAt: string;
}

interface IPaginationMeta {
    page: number;
    limit: number;
    totalRows: number;
    totalPages: number;
}

interface IFetchSpecialtiesResponse {
    list: ISpecialty[];
    meta: IPaginationMeta;
}

interface ISpecialtyState {
    list: ISpecialty[];
    totalSpecialties: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: ISpecialtyState = {
    list: [],
    totalSpecialties: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    loading: false,
    error: null
};

export const fetchSpecialties = createAsyncThunk<
    IFetchSpecialtiesResponse,
    { page: number; limit: number },
    { rejectValue: string }
>('specialties/fetchSpecialties', async (params, { rejectWithValue }) => {
    try {
        const { page, limit } = params;
        const response = await api.get(
            `/specialty?page=${page}&limit=${limit}`
        );

        const { errCode, message, data, meta } = response.data;

        if (errCode === 0 && Array.isArray(data)) {
            return {
                list: data as ISpecialty[],
                meta: meta as IPaginationMeta
            };
        }

        return rejectWithValue(message || 'Failed to fetch specialties');
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const specialtiesSlice = createSlice({
    name: 'specialties',
    initialState,
    reducers: {
        resetSpecialtyState: (state) => {
            state.list = [];
            state.totalSpecialties = 0;
            state.currentPage = 1;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecialties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchSpecialties.fulfilled,
                (state, action: PayloadAction<IFetchSpecialtiesResponse>) => {
                    const { list, meta } = action.payload;
                    state.loading = false;
                    state.list = list;
                    state.error = null;

                    state.totalSpecialties = meta.totalRows;
                    state.currentPage = meta.page;
                    state.totalPages = meta.totalPages;
                    state.limit = meta.limit;
                }
            )
            .addCase(fetchSpecialties.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.totalSpecialties = 0;
                state.error =
                    (action.payload as string) || 'Failed to fetch specialties';
            });
    }
});

export const { resetSpecialtyState } = specialtiesSlice.actions;

export const selectSpecialty = (state: RootState) => state.specialties;

export default specialtiesSlice.reducer;
