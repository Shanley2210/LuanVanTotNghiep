import api from './api';

export const postReceptionist = async (data: FormData) => {
    return await api.post(`/admin/receptionists`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateReceptionist = async (id: number, data: FormData) => {
    return await api.put(`/admin/receptionists/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const confirmAppointment = async (id: number) => {
    return await api.put(`/receptionist/appointments/confirm/${id}`);
};

export const checkInAppointment = async (id: number) => {
    return await api.post(`/receptionist/appointments/checkin/${id}`);
};

export const createAppointmentByReceptionist = async (
    data: Record<string, any>
) => {
    return await api.post(`/receptionist/appointments`, data);
};

export const updateAppointmentByReceptionist = async (
    id: number,
    data: Record<string, any>
) => {
    return await api.put(`/receptionist/appointments/${id}`, data);
};
