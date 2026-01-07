import api from './api';

type PeriodType = 'day' | 'week' | 'month';

export const getAdminDashboardStats = async (
    period: PeriodType,
    doctorId?: number | string,
    serviceId?: number | string
) => {
    return await api.get('/admin/stats/dashboard', {
        params: {
            period,
            doctorId,
            serviceId
        }
    });
};

export const exportAdminStats = async (
    period: PeriodType,
    doctorId?: number | string,
    serviceId?: number | string
) => {
    return await api.get('/admin/stats/export', {
        params: {
            period,
            doctorId,
            serviceId
        }
    });
};
