import api from './api';

export const postService = async (data: Record<string, any>) => {
    return await api.post(`/admin/services`, data);
};

export const deleteService = async (id: number) => {
    return await api.delete(`/admin/services/${id}`);
};

export const updateService = async (id: number, data: Record<string, any>) => {
    return await api.put(`/admin/services/${id}`, data);
};

export const setPriceService = async (
    id: number,
    data: Record<string, any>
) => {
    return await api.post(`/admin/service-price/${id}`, data);
};

export const getDetailService = async (id: number) => {
    return await api.get(`/service/detail/${id}`);
};
