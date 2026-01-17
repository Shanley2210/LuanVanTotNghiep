import {
    createAsyncThunk,
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';
import api from '../apis/api';

export interface ISpecialty {
    id: number;
    name: string;
    description?: string;
    image?: string;
}

export interface IService {
    id: number;
    name: string;
    price: string;
    durationMinutes: number;
    description?: string;
}

export interface IDoctor {
    id: number;
    image: string;
    degree: string;
    price: string;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    specialty: {
        name: string;
    };
}

// export interface IAppointment {
//     id: number;
//     status: string;
//     date: string; // hoặc Date
//     time: string;
//     doctor: {
//         degree: string;
//         user: { name: string };
//     };
//     service: {
//         name: string;
//         price: string;
//     };
//     slot: {
//         time: string;
//     };
// }

// --- Interfaces cho Response & State ---

// interface IPaginationMeta {
//     page: number;
//     limit: number;
//     totalRows: number;
//     totalPages: number;
// }

// Cấu trúc response cho Public Search
interface IPublicSearchResponseData {
    doctors: { count: number; rows: IDoctor[] };
    specialties: { count: number; rows: ISpecialty[] };
    services: { count: number; rows: IService[] };
    meta: { page: number; limit: number };
}

// Cấu trúc response cho Appointment Search
// interface IAppointmentSearchResponseData {
//     list: IAppointment[];
//     meta: IPaginationMeta;
// }

interface ISearchState {
    // State cho Public Search (Tìm chung)
    publicResults: {
        doctors: IDoctor[];
        specialties: ISpecialty[];
        services: IService[];
        doctorCount: number;
        specialtyCount: number;
        serviceCount: number;
    };

    // State cho Appointment Search (Lịch sử khám)
    // appointmentResults: IAppointment[];

    // Meta data (Dùng chung hoặc tách biệt tùy logic UI, ở đây tách riêng để rõ ràng)
    currentPage: number;
    limit: number;
    totalRows: number; // Dùng chủ yếu cho appointment search
    totalPages: number; // Dùng chủ yếu cho appointment search

    loading: boolean;
    error: string | null;
}

const initialState: ISearchState = {
    publicResults: {
        doctors: [],
        specialties: [],
        services: [],
        doctorCount: 0,
        specialtyCount: 0,
        serviceCount: 0
    },
    // appointmentResults: [],
    currentPage: 1,
    limit: 10,
    totalRows: 0,
    totalPages: 0,
    loading: false,
    error: null
};

// --- Async Thunks ---

// 1. Thunk cho Public Search
export const searchPublic = createAsyncThunk<
    IPublicSearchResponseData,
    { q: string; page: number; limit: number },
    { rejectValue: string }
>('search/searchPublic', async (params, { rejectWithValue }) => {
    try {
        const { q, page, limit } = params;
        // Gọi API: /api/search/public?q=...&page=...&limit=...
        const response = await api.get(
            `/patient/search-public?q=${q}&page=${page}&limit=${limit}`
        );

        const { errCode, message, data } = response.data;

        if (errCode === 0) {
            return data as IPublicSearchResponseData;
        }

        return rejectWithValue(message || 'Failed to search public data');
    } catch (e: any) {
        const errMessage = e.response?.data?.message || 'Server error occurred';
        return rejectWithValue(errMessage);
    }
});

// 2. Thunk cho Patient Appointment Search
// export const searchAppointments = createAsyncThunk<
//     IAppointmentSearchResponseData,
//     { patientId: number; q: string; page: number; limit: number },
//     { rejectValue: string }
// >('search/searchAppointments', async (params, { rejectWithValue }) => {
//     try {
//         const { patientId, q, page, limit } = params;
//         // Gọi API: /api/search/appointments?patientId=...
//         const response = await api.get(
//             `/search/appointments?patientId=${patientId}&q=${q}&page=${page}&limit=${limit}`
//         );

//         const { errCode, message, data, meta } = response.data;

//         if (errCode === 0) {
//             return {
//                 list: data,
//                 meta: meta
//             } as IAppointmentSearchResponseData;
//         }
//         return rejectWithValue(message || 'Failed to search appointments');
//     } catch (e: any) {
//         const errMessage = e.response?.data?.message || 'Server error occurred';
//         return rejectWithValue(errMessage);
//     }
// });

// --- Slice ---

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetSearchState: (state) => {
            state.publicResults = initialState.publicResults;
            //state.appointmentResults = [];
            state.currentPage = 1;
            state.error = null;
            state.loading = false;
        },
        clearAppointmentResults: (state) => {
            // state.appointmentResults = [];
            state.totalRows = 0;
            state.totalPages = 0;
        }
    },
    extraReducers: (builder) => {
        // --- Handle Public Search ---
        builder
            .addCase(searchPublic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                searchPublic.fulfilled,
                (state, action: PayloadAction<IPublicSearchResponseData>) => {
                    const { doctors, specialties, services, meta } =
                        action.payload;
                    state.loading = false;

                    // Cập nhật kết quả Public
                    state.publicResults.doctors = doctors.rows;
                    state.publicResults.doctorCount = doctors.count;

                    state.publicResults.specialties = specialties.rows;
                    state.publicResults.specialtyCount = specialties.count;

                    state.publicResults.services = services.rows;
                    state.publicResults.serviceCount = services.count;

                    // Cập nhật meta cơ bản
                    state.currentPage = meta.page;
                    state.limit = meta.limit;
                }
            )
            .addCase(searchPublic.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Search failed';
                state.publicResults = initialState.publicResults;
            });

        // --- Handle Appointment Search ---
        // builder
        //     .addCase(searchAppointments.pending, (state) => {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(
        //         searchAppointments.fulfilled,
        //         (
        //             state,
        //             action: PayloadAction<IAppointmentSearchResponseData>
        //         ) => {
        //             const { list, meta } = action.payload;
        //             state.loading = false;

        //             state.appointmentResults = list;

        //             // Cập nhật phân trang chuẩn
        //             state.totalRows = meta.totalRows;
        //             state.totalPages = meta.totalPages;
        //             state.currentPage = meta.page;
        //             state.limit = meta.limit;
        //         }
        //     )
        //     .addCase(searchAppointments.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = (action.payload as string) || 'Search failed';
        //         state.appointmentResults = [];
        //     });
    }
});

export const { resetSearchState, clearAppointmentResults } =
    searchSlice.actions;

export const selectSearch = (state: { search: ISearchState }) => state.search;
export const selectPublicResults = (state: { search: ISearchState }) =>
    state.search.publicResults;
// export const selectAppointmentResults = (state: { search: ISearchState }) =>
//     state.search.appointmentResults;

export default searchSlice.reducer;
