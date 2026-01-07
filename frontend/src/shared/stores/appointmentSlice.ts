import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../apis/api';
import type { RootState } from './store';

interface ISimpleUser {
    name: string;
    email: string;
    phone: string;
}

interface ISimpleSpecialty {
    name: string;
    description: string;
    image: string;
}

interface IDoctor {
    id: number;
    image: string;
    user: ISimpleUser;
    specialty: ISimpleSpecialty;
}

interface IPatient {
    id: number;
    notePMH: string;
    user: ISimpleUser;
}

interface ISlot {
    id: number;
    doctorId: number;
    startTime: string;
    endTime: string;
}

interface IService {
    id: number;
    name: string;
    description: string;
    durationMinutes: number;
    price: string;
}

export interface IAppointment {
    id: number;
    doctorId: number;
    patientId: number;
    slotId: number;
    queueId: number | null;
    serviceId: number;
    status: string;
    deposit: string;
    deposited: string;
    type: string;
    finalPrice: string;
    bookingFor: string;
    patientName: string;
    patientGender: string;
    patientPhone: string;
    patientEmail: string;
    patientDob: string;
    patientEthnicity: string;
    patientAddress: string;
    reason: string;
    createdAt: string;
    updatedAt: string;
    doctor: IDoctor;
    patient: IPatient;
    slot: ISlot;
    queue: any | null;
    service: IService;
    record: any | null;
    payment: any | null;
}

interface IPaginationMeta {
    page: number;
    limit: number;
    totalRows: number;
    totalPages: number;
}

export interface IAppointmentGroup {
    list: IAppointment[];
    meta: IPaginationMeta;
    loading: boolean;
    error: string | null;
}

interface IFetchAppointmentsResponse {
    list: IAppointment[];
    meta: IPaginationMeta;
}

interface IAppointmentState {
    list: IAppointment[];
    totalAppointments: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    loading: boolean;
    error: string | null;

    groups: Record<string, IAppointmentGroup>;
}

const initialGroupState: IAppointmentGroup = {
    list: [],
    meta: {
        page: 1,
        limit: 10,
        totalRows: 0,
        totalPages: 0
    },
    loading: false,
    error: null
};

const initialState: IAppointmentState = {
    list: [],
    totalAppointments: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    loading: false,
    error: null,
    groups: {}
};

export const fetchAppointments = createAsyncThunk<
    IFetchAppointmentsResponse,
    { page: number; limit: number },
    { rejectValue: string }
>('appointments/fetchAppointments', async (params, { rejectWithValue }) => {
    try {
        const { page, limit } = params;
        const response = await api.get(
            `/patient/appointments?page=${page}&limit=${limit}`
        );
        const { errCode, message, data, meta } = response.data;
        if (errCode === 0 && Array.isArray(data)) {
            return {
                list: data as IAppointment[],
                meta: meta as IPaginationMeta
            };
        }
        return rejectWithValue(message || 'Failed to fetch appointments');
    } catch (e: any) {
        return rejectWithValue(
            e.response?.data?.errMessage || 'Server error occurred'
        );
    }
});

export const fetchReceptionistAppointments = createAsyncThunk<
    IFetchAppointmentsResponse,
    {
        page: number;
        limit: number;
        status?: string;
        date?: string;
        groupKey: string;
    },
    { rejectValue: string }
>('appointments/fetchNewAppointments', async (params, { rejectWithValue }) => {
    try {
        const { page, limit, status, date } = params;

        const response = await api.get('/receptionist/appointments', {
            params: {
                page,
                limit,
                status,
                date
            }
        });

        const { errCode, message, data, pagination } = response.data;

        if (errCode === 0 && Array.isArray(data)) {
            const meta: IPaginationMeta = {
                page: pagination.currentPage,
                limit: pagination.limit,
                totalRows: pagination.totalItems,
                totalPages: pagination.totalPages
            };
            return {
                list: data as IAppointment[],
                meta: meta
            };
        }
        return rejectWithValue(message || 'Failed to fetch new appointments');
    } catch (e: any) {
        return rejectWithValue(
            e.response?.data?.errMessage || 'Server error occurred'
        );
    }
});

export const fetchDoctorAppointments = createAsyncThunk<
    IFetchAppointmentsResponse,
    {
        page: number;
        limit: number;
        status?: string;
        date?: string;
        groupKey: string;
    },
    { rejectValue: string }
>(
    'appointments/fetchDoctorAppointments',
    async (params, { rejectWithValue }) => {
        try {
            const { page, limit, status, date } = params;

            const response = await api.get('/doctor/appointments', {
                params: {
                    page,
                    limit,
                    status,
                    date
                }
            });

            const { errCode, message, data, meta } = response.data;

            if (errCode === 0 && Array.isArray(data)) {
                return {
                    list: data as IAppointment[],
                    meta: meta as IPaginationMeta
                };
            }

            return rejectWithValue(
                message || 'Failed to fetch doctor appointments'
            );
        } catch (e: any) {
            console.error('Redux Thunk Error:', e);

            if (e.response && e.response.data && e.response.data.errMessage) {
                return rejectWithValue(e.response.data.errMessage);
            }
            return rejectWithValue(
                'Server error occurred (Check Network/Console)'
            );
        }
    }
);

export const fetchAdminAppointments = createAsyncThunk<
    IFetchAppointmentsResponse,
    {
        page: number;
        limit: number;
        groupKey: string;
    },
    { rejectValue: string }
>(
    'appointments/fetchAdminAppointments',
    async (params, { rejectWithValue }) => {
        try {
            const { page, limit } = params;

            const response = await api.get('/admin/appointments', {
                params: {
                    page,
                    limit
                }
            });

            const { errCode, message, data, pagination } = response.data;

            if (errCode === 0 && Array.isArray(data)) {
                const meta: IPaginationMeta = {
                    page: pagination.page,
                    limit: pagination.limit,
                    totalRows: pagination.totalRows,
                    totalPages: pagination.totalPages
                };

                return {
                    list: data as IAppointment[],
                    meta: meta
                };
            }

            return rejectWithValue(
                message || 'Failed to fetch admin appointments'
            );
        } catch (e: any) {
            console.error('Redux Thunk Error:', e);
            if (e.response && e.response.data && e.response.data.errMessage) {
                return rejectWithValue(e.response.data.errMessage);
            }
            return rejectWithValue(
                'Server error occurred (Check Network/Console)'
            );
        }
    }
);

export const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        resetAppointmentState: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Patient Appointments ---
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                const { list, meta } = action.payload;
                state.loading = false;
                state.list = list;
                state.totalAppointments = meta.totalRows;
                state.currentPage = meta.page;
                state.totalPages = meta.totalPages;
                state.limit = meta.limit;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Error';
            })

            // --- Receptionist Appointments ---
            .addCase(fetchReceptionistAppointments.pending, (state, action) => {
                const { groupKey } = action.meta.arg;

                if (!state.groups[groupKey]) {
                    state.groups[groupKey] = { ...initialGroupState };
                }
                state.groups[groupKey].loading = true;
                state.groups[groupKey].error = null;
            })
            .addCase(
                fetchReceptionistAppointments.fulfilled,
                (state, action) => {
                    const { groupKey } = action.meta.arg;
                    const { list, meta } = action.payload;

                    state.groups[groupKey] = {
                        list,
                        meta,
                        loading: false,
                        error: null
                    };
                }
            )
            .addCase(
                fetchReceptionistAppointments.rejected,
                (state, action) => {
                    const { groupKey } = action.meta.arg;
                    if (state.groups[groupKey]) {
                        state.groups[groupKey].loading = false;
                        state.groups[groupKey].error =
                            (action.payload as string) || 'Error';
                    }
                }
            )
            // --- Doctor Appointments ---
            .addCase(fetchDoctorAppointments.pending, (state, action) => {
                const { groupKey } = action.meta.arg;
                if (!state.groups[groupKey]) {
                    state.groups[groupKey] = { ...initialGroupState };
                }
                state.groups[groupKey].loading = true;
                state.groups[groupKey].error = null;
            })
            .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
                const { groupKey } = action.meta.arg;
                const { list, meta } = action.payload;

                state.groups[groupKey] = {
                    list,
                    meta,
                    loading: false,
                    error: null
                };
            })
            .addCase(fetchDoctorAppointments.rejected, (state, action) => {
                const { groupKey } = action.meta.arg;
                if (state.groups[groupKey]) {
                    state.groups[groupKey].loading = false;
                    state.groups[groupKey].error =
                        (action.payload as string) || 'Error';
                }
            })
            // --- Admin Appointments ---
            .addCase(fetchAdminAppointments.pending, (state, action) => {
                const { groupKey } = action.meta.arg;
                if (!state.groups[groupKey]) {
                    state.groups[groupKey] = { ...initialGroupState };
                }
                state.groups[groupKey].loading = true;
                state.groups[groupKey].error = null;
            })
            .addCase(fetchAdminAppointments.fulfilled, (state, action) => {
                const { groupKey } = action.meta.arg;
                const { list, meta } = action.payload;

                state.groups[groupKey] = {
                    list,
                    meta,
                    loading: false,
                    error: null
                };
            })
            .addCase(fetchAdminAppointments.rejected, (state, action) => {
                const { groupKey } = action.meta.arg;
                if (state.groups[groupKey]) {
                    state.groups[groupKey].loading = false;
                    state.groups[groupKey].error =
                        (action.payload as string) || 'Error';
                }
            });
    }
});

export const { resetAppointmentState } = appointmentsSlice.actions;

export const selectAppointment = (state: RootState) => state.appointments;

export default appointmentsSlice.reducer;
