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
