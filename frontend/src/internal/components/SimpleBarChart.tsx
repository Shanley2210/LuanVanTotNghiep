import React, { useContext } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import type { BookingTrendItem } from '../pages/DashBoard';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface Props {
    data: BookingTrendItem[];
}

const SimpleBarChart: React.FC<Props> = ({ data }) => {
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const formatCurrency = (amount: number | string): string =>
        new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
            style: 'currency',
            currency: language === 'vi' ? 'VND' : 'USD'
        }).format(Number(amount));

    const formatDate = (dateString: string): string => {
        const d = new Date(dateString);
        return `${d.getDate()}/${d.getMonth() + 1}`;
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload as BookingTrendItem;

            return (
                <div
                    className={`p-3 border shadow-lg text-sm ${
                        isDark
                            ? 'bg-[#1f1f1f] border-gray-700 text-gray-200'
                            : 'bg-white border-gray-200 text-gray-700'
                    }`}
                >
                    <p
                        className={`font-semibold mb-1 ${
                            isDark ? 'text-gray-100' : 'text-gray-700'
                        }`}
                    >
                        {t('reportPage.tooltipDate')}: {formatDate(data.date)}
                    </p>
                    <div className='space-y-1'>
                        <p className='text-blue-500 font-medium'>
                            {t('reportPage.tooltipAppointments')}:{' '}
                            <span
                                className={`font-bold ${
                                    isDark ? 'text-gray-200' : ''
                                }`}
                            >
                                {data.appointments}
                            </span>
                        </p>
                        <p
                            className={
                                isDark ? 'text-gray-400' : 'text-gray-500'
                            }
                        >
                            {t('reportPage.tooltipRevenue')}:{' '}
                            <span
                                className={`font-bold ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}
                            >
                                {formatCurrency(data.revenue)}
                            </span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    if (!data || data.length === 0) {
        return (
            <div
                className={`flex items-center justify-center h-full border border-dashed ${
                    isDark
                        ? 'text-gray-500 bg-[#141414] border-gray-700'
                        : 'text-gray-400 bg-gray-50 border-gray-200'
                }`}
            >
                {t('reportPage.chartNoData')}
            </div>
        );
    }

    return (
        <div
            className={`h-full w-full p-4 shadow-sm flex flex-col ${
                isDark ? 'bg-[#141414]' : 'bg-white'
            }`}
        >
            <div className='mb-4 shrink-0'>
                <h3
                    className={`text-sm font-semibold uppercase tracking-wide ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                    {t('reportPage.chartBookingTrend')}
                </h3>
            </div>

            <div className='flex-1 w-full min-h-0 text-xs'>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        data={data}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                        barSize={32}
                    >
                        <CartesianGrid
                            strokeDasharray='3 3'
                            vertical={false}
                            stroke={isDark ? '#303030' : '#f3f4f6'}
                        />

                        <XAxis
                            dataKey='date'
                            tickFormatter={formatDate}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: isDark ? '#9ca3af' : '#6b7280',
                                fontSize: 11
                            }}
                            dy={10}
                        />

                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: isDark ? '#9ca3af' : '#6b7280',
                                fontSize: 11
                            }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: isDark ? '#ffffff10' : '#f9fafb' }}
                        />

                        <Bar
                            dataKey='appointments'
                            fill='#3b82f6'
                            activeBar={{ fill: '#2563eb' }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SimpleBarChart;
