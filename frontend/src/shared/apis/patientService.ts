import api from './api';

export const changePassword = async (data: Record<string, any>) => {
    return await api.post('/auth/change-password', data);
};

export const forgotPassword = async (data: Record<string, any>) => {
    return await api.post('/auth/forgot-password', data);
};

export const resetPassword = async (data: Record<string, any>) => {
    return await api.post('/auth/reset-password', data);
};

export const registerPatient = async (data: Record<string, any>) => {
    return await api.post('/auth/register', data);
};

export const verifyEmail = async (data: Record<string, any>) => {
    return await api.post('/auth/verify-email', data);
};

export const resendOtp = async (data: Record<string, any>) => {
    return await api.post('/auth/resend-otp', data);
};

export const createProfile = async (data: Record<string, any>) => {
    return await api.post('/patient/profile', data);
};

export const updateProfile = async (data: Record<string, any>) => {
    return await api.put('/patient/profile', data);
};

export const bookingAppointment = async (data: Record<string, any>) => {
    return await api.post('/patient/appointments', data);
};

export const fakePayment = async (id: number) => {
    return await api.post(`/patient/fake-payment/${id}`);
};

export const updateAppointment = async (
    id: number,
    data: Record<string, any>
) => {
    return await api.put(`/patient/appointments/${id}`, data);
};

export const cancelAppointment = async (id: number) => {
    return await api.delete(`/patient/appointments/${id}`);
};

export const paymentWithVNPAY = async (data: Record<string, any>) => {
    return await api.post('/payment/vnpay/create-payment', data);
};

export const paymentVNPAYReturn = async () => {
    return await api.get('/payment/vnpay/return');
};

export const paymentVNPAYDetail = async (txnRef: string) => {
    return await api.get(`/payment/vnpay/${txnRef}`);
};

export const getRecordById = async (id: number) => {
    return await api.get(`/patient/record/${id}`);
};

export const downloadRecordPdf = async (id: number) => {
    const res = await api.get(`/patient/record/${id}/download`, {
        responseType: 'blob'
    });

    const blob = new Blob([res.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;

    a.download = `record-${id}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
};
