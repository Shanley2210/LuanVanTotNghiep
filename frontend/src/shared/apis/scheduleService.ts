import api from './api';

export const postSchedules = async (id: number, data: Record<string, any>) => {
    return await api.post(`/admin/schedules/${id}`, data);
};

export const deleteSchedules = async (data: Record<string, any>) => {
    return await api.delete(`/admin/schedules`, { data });
};

export const toggleSlot = async (id: number) => {
    return await api.put(`/doctor/toggle-slot/${id}`);
};

export const closeSlotDate = async (data: Record<string, any>) => {
    return await api.put(`/doctor/close-slots-date`, data);
};

export const openSlotDate = async (data: Record<string, any>) => {
    return await api.put(`/doctor/open-slots-date`, data);
};
