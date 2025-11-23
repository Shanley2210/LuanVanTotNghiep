import api from './api';

export const postSchedules = async (id: number, data: Record<string, any>) => {
    return await api.post(`/admin/schedules/${id}`, data);
};

export const deleteSchedules = async (data: Record<string, any>) => {
    return await api.delete(`/admin/schedules`, { data });
};
