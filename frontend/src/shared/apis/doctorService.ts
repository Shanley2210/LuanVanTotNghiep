import api from './api';

export const postDoctor = async (data: FormData) => {
    return await api.post(`/admin/doctors`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateDoctor = async (id: number, data: FormData) => {
    return await api.put(`/admin/doctors/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const setPriceDoctor = async (id: number, data: Record<string, any>) => {
    return await api.post(`/admin/doctor-price/${id}`, data);
};

export const getDetailDoctor = async (id: number) => {
    return await api.get(`/doctor/detail/${id}`);
};

export const getSlotDoctor = async (id: number, date: string) => {
    return await api.get(`/doctor/slots/${id}?date=${date}`);
};

export const getAppointmentDetail = async (id: number) => {
    return await api.get(`/doctor/appointment-detail/${id}`);
};

export const completeExam = async (data: Record<string, any>) => {
    return await api.post(`/doctor/complete-exam`, data);
};
