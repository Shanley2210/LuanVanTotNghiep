import api from './api';

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
