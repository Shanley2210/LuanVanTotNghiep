import {
    createAsyncThunk,
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';
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
    introduce: string;
    workExperience: string;
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

export interface IDoctorServiceItem {
    doctor: {
        id: number;
        introduce: string;
        price: number;
        degree: string;
        image: string;
        user: {
            name: string;
            email?: string;
            phone?: string;
        };
        specialty?: {
            id: number;
            name: string;
        } | null;
    };
    price: number;
}

interface IPaginationMeta {
    page: number;
    limit: number;
    totalRows: number;
    totalPages: number;
}

interface IFetchDoctorsResponse {
    list: IDoctor[];
    meta: IPaginationMeta;
}

interface IFetchDoctorsServiceResponse {
    listDoctorService: IDoctorServiceItem[];
    meta: IPaginationMeta;
}

interface IFetchDoctorsSpecialtyResponse {
    listDoctorSpecialty: IDoctor[];
    meta: IPaginationMeta;
}

interface IDoctorState {
    list: IDoctor[];
    listDoctorService: IDoctorServiceItem[];
    listDoctorSpecialty: IDoctor[];
    totalDoctors: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: IDoctorState = {
    list: [],
    listDoctorService: [],
    listDoctorSpecialty: [],
    totalDoctors: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    loading: false,
    error: null
};

export const fetchDoctors = createAsyncThunk<
    IFetchDoctorsResponse,
    { page: number; limit: number; status?: string },
    { rejectValue: string }
>('doctor/fetchDoctor', async (params, { rejectWithValue }) => {
    try {
        const { page, limit, status } = params;

        let url = `/doctor/all?page=${page}&limit=${limit}`;
        if (status) {
            url += `&status=${status}`;
        }
        const response = await api.get(url);

        const { errCode, message, data, meta } = response.data;

        if (errCode === 0 && Array.isArray(data)) {
            return {
                list: data as IDoctor[],
                meta: meta as IPaginationMeta
            };
        }

        return rejectWithValue(message || 'Failed to fetch doctors');
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const fetchDoctorsByService = createAsyncThunk<
    IFetchDoctorsServiceResponse,
    { serviceId: number; page: number; limit: number; status?: string },
    { rejectValue: string }
>('doctor/fetchDoctorsByService', async (params, { rejectWithValue }) => {
    try {
        const { serviceId, page, limit, status } = params;

        let url = `/doctor/doctor-service/${serviceId}?page=${page}&limit=${limit}`;
        if (status) {
            url += `&status=${status}`;
        }

        const response = await api.get(url);
        const { errCode, message, data, meta } = response.data;

        if (errCode === 0 && Array.isArray(data)) {
            return {
                listDoctorService: data as IDoctorServiceItem[],
                meta: meta as IPaginationMeta
            };
        }

        return rejectWithValue(message || 'Failed to fetch doctors by service');
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const fetchDoctorsBySpecialty = createAsyncThunk<
    IFetchDoctorsSpecialtyResponse,
    { specialtyId: number; page: number; limit: number; status?: string },
    { rejectValue: string }
>('doctor/fetchDoctorsBySpecialty', async (params, { rejectWithValue }) => {
    try {
        const { specialtyId, page, limit, status } = params;

        let url = `/doctor/specialty/${specialtyId}?page=${page}&limit=${limit}`;
        if (status) {
            url += `&status=${status}`;
        }

        const response = await api.get(url);
        const { errCode, message, data, meta } = response.data;

        if (errCode === 0 && Array.isArray(data)) {
            return {
                listDoctorSpecialty: data as IDoctor[],
                meta: meta as IPaginationMeta
            };
        }

        return rejectWithValue(
            message || 'Failed to fetch doctors by specialty'
        );
    } catch (e: any) {
        const errMessage =
            e.response?.data?.errMessage || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

export const doctorsSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        resetDoctorState: (state) => {
            state.list = [];
            state.listDoctorService = [];
            state.listDoctorSpecialty = [];
            state.totalDoctors = 0;
            state.currentPage = 1;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch All Doctors ---
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchDoctors.fulfilled,
                (state, action: PayloadAction<IFetchDoctorsResponse>) => {
                    const { list, meta } = action.payload;
                    state.loading = false;
                    state.list = list;
                    state.error = null;

                    state.totalDoctors = meta.totalRows;
                    state.totalPages = meta.totalPages;
                    state.currentPage = meta.page;
                    state.limit = meta.limit;
                }
            )
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.list = [];
                state.totalDoctors = 0;
                state.error = action.payload || 'Server error occurred';
            })

            // --- Fetch Doctors By Service ---
            .addCase(fetchDoctorsByService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchDoctorsByService.fulfilled,
                (
                    state,
                    action: PayloadAction<IFetchDoctorsServiceResponse>
                ) => {
                    const { listDoctorService, meta } = action.payload;
                    state.loading = false;
                    state.listDoctorService = listDoctorService;
                    state.error = null;

                    state.totalDoctors = meta.totalRows;
                    state.totalPages = meta.totalPages;
                    state.currentPage = meta.page;
                    state.limit = meta.limit;
                }
            )
            .addCase(fetchDoctorsByService.rejected, (state, action) => {
                state.loading = false;
                state.listDoctorService = [];
                state.totalDoctors = 0;
                state.error = action.payload || 'Server error occurred';
            })

            // --- Fetch Doctors By Specialty ---
            .addCase(fetchDoctorsBySpecialty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchDoctorsBySpecialty.fulfilled,
                (
                    state,
                    action: PayloadAction<IFetchDoctorsSpecialtyResponse>
                ) => {
                    const { listDoctorSpecialty, meta } = action.payload;
                    state.loading = false;
                    state.listDoctorSpecialty = listDoctorSpecialty;
                    state.error = null;

                    state.totalDoctors = meta.totalRows;
                    state.totalPages = meta.totalPages;
                    state.currentPage = meta.page;
                    state.limit = meta.limit;
                }
            )
            .addCase(fetchDoctorsBySpecialty.rejected, (state, action) => {
                state.loading = false;
                state.listDoctorSpecialty = [];
                state.totalDoctors = 0;
                state.error = action.payload || 'Server error occurred';
            });
    }
});

export const { resetDoctorState } = doctorsSlice.actions;
export const selectDoctor = (state: { doctors: IDoctorState }) => state.doctors;
export default doctorsSlice.reducer;
