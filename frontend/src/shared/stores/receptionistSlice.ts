import {
    createAsyncThunk,
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';
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

interface IPaginationMeta {
    page: number;
    limit: number;
    totalRows: number;
    totalPages: number;
}

interface IFetchReceptionistsResponse {
    list: IReceptionist[];
    meta: IPaginationMeta;
}

interface IReceptionistState {
    list: IReceptionist[];
    totalReceptionists: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: IReceptionistState = {
    list: [],
    totalReceptionists: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    loading: false,
    error: null
};

// Cập nhật tham số đầu vào: page, limit, status, q
export const fetchReceptionists = createAsyncThunk<
    IFetchReceptionistsResponse,
    { page: number; limit: number; status?: string; q?: string },
    { rejectValue: string }
>('receptionist/fetchReceptionist', async (params, { rejectWithValue }) => {
    try {
        const { page, limit, status, q } = params;

        let url = `/admin/receptionists?page=${page}&limit=${limit}`;

        if (status) {
            url += `&status=${status}`;
        }

        if (q) {
            url += `&q=${encodeURIComponent(q)}`;
        }

        const response = await api.get(url);

        const { errCode, message, data, meta } = response.data;

        if (errCode === 0 && Array.isArray(data)) {
            return {
                list: data as IReceptionist[],
                meta: meta as IPaginationMeta
            };
        }

        return rejectWithValue(message || 'Failed to fetch receptionists');
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const receptionistsSlice = createSlice({
    name: 'receptionist',
    initialState,
    reducers: {
        resetReceptionistState: (state) => {
            state.list = [];
            state.totalReceptionists = 0;
            state.currentPage = 1;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceptionists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchReceptionists.fulfilled,
                (state, action: PayloadAction<IFetchReceptionistsResponse>) => {
                    const { list, meta } = action.payload;
                    state.loading = false;
                    state.list = list;
                    state.error = null;

                    // Cập nhật Meta Pagination
                    state.totalReceptionists = meta.totalRows;
                    state.totalPages = meta.totalPages;
                    state.currentPage = meta.page;
                    state.limit = meta.limit;
                }
            )
            .addCase(fetchReceptionists.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.totalReceptionists = 0;
                state.error =
                    (action.payload as string) || 'Server error occurred';
            });
    }
});

export const { resetReceptionistState } = receptionistsSlice.actions;

export const selectReceptionist = (state: {
    receptionists: IReceptionistState;
}) => state.receptionists;

export default receptionistsSlice.reducer;
