import React, { useContext, useMemo } from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { StatusDistribution } from '@/internal/pages/DashBoard'; // Đảm bảo đường dẫn import đúng
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface Props {
    breakdown: StatusDistribution;
}

const StatusBreakdownCard: React.FC<Props> = ({ breakdown }) => {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();

    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    const percent = (v: number): string =>
        total ? ((v / total) * 100).toFixed(1) : '0';

    const chartData = useMemo(() => {
        // Định nghĩa Config bên trong useMemo để reactivity với ngôn ngữ (t)
        const STATUS_CONFIG: Record<string, { label: string; color: string }> =
            {
                completed: {
                    label: t('reportPage.statusCompleted'),
                    color: '#22c55e'
                },
                checked_in: {
                    label: t('reportPage.statusCheckedIn'),
                    color: '#3b82f6'
                },
                pending: {
                    label: t('reportPage.statusPending'),
                    color: '#eab308'
                },
                cancelled: {
                    label: t('reportPage.statusCancelled'),
                    color: '#ef4444'
                }
            };

        // Map an toàn: Kiểm tra xem config có tồn tại cho key đó không
        return Object.keys(breakdown)
            .map((key) => {
                const config = STATUS_CONFIG[key];
                // Nếu backend trả về status lạ không có trong config, bỏ qua để tránh crash
                if (!config) return null;

                return {
                    name: config.label,
                    value: breakdown[key as keyof StatusDistribution],
                    color: config.color,
                    key: key
                };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null); // Lọc bỏ giá trị null
    }, [breakdown, t]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div
                    className={`p-3 border shadow-xl z-50 ${
                        isDark
                            ? 'bg-[#1f1f1f] border-gray-700'
                            : 'bg-white border-gray-200'
                    }`}
                >
                    <p className='font-medium' style={{ color: data.color }}>
                        {data.name}
                    </p>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {t('reportPage.chartCount')}:{' '}
                        <span
                            className={`font-semibold ${
                                isDark ? 'text-gray-100' : 'text-gray-900'
                            }`}
                        >
                            {data.value}
                        </span>
                    </p>
                    <p
                        className={`text-sm ${
                            isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}
                    >
                        {t('reportPage.chartRatio')}: {percent(data.value)}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div
            className={`h-full w-full p-4 shadow-sm flex flex-col ${
                isDark ? 'bg-[#141414]' : 'bg-white'
            }`}
        >
            <div className='flex items-center gap-2 shrink-0 mb-2'>
                <PieChartIcon
                    size={20}
                    className={isDark ? 'text-gray-400' : 'text-gray-600'}
                />
                <h3
                    className={`text-sm font-semibold uppercase tracking-wide ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                    {t('reportPage.chartStatusBreakdown')}
                </h3>
            </div>

            {total === 0 ? (
                <div
                    className={`flex-1 flex items-center justify-center ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}
                >
                    {t('reportPage.titleNoData')}
                </div>
            ) : (
                <div className='flex-1 flex items-center gap-4 min-h-0'>
                    {/* Pie Chart Section */}
                    <div className='w-1/2 h-full relative group'>
                        <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                            <span
                                className={`text-3xl font-bold ${
                                    isDark ? 'text-gray-200' : 'text-gray-800'
                                }`}
                            >
                                {total}
                            </span>
                            <span
                                className={`text-xs uppercase ${
                                    isDark ? 'text-gray-500' : 'text-gray-500'
                                }`}
                            >
                                {t('reportPage.chartTotal')}
                            </span>
                        </div>

                        <ResponsiveContainer width='100%' height='100%'>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx='50%'
                                    cy='50%'
                                    innerRadius={60}
                                    outerRadius={85}
                                    paddingAngle={2}
                                    dataKey='value'
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            stroke={isDark ? '#141414' : '#fff'}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={false}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend Section */}
                    <div className='w-1/2 flex flex-col justify-center gap-3 pr-2'>
                        {chartData.map((item) => (
                            <div
                                key={item.key}
                                className='flex items-center justify-between text-sm'
                            >
                                <div className='flex items-center gap-2'>
                                    <div
                                        className='w-3 h-3 rounded-full shrink-0'
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span
                                        className={`truncate font-medium ${
                                            isDark
                                                ? 'text-gray-300'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                                <div
                                    className={`font-semibold shrink-0 pl-2 ${
                                        isDark
                                            ? 'text-gray-100'
                                            : 'text-gray-900'
                                    }`}
                                >
                                    {item.value}{' '}
                                    <span
                                        className={`font-normal text-xs ${
                                            isDark
                                                ? 'text-gray-500'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        ({percent(item.value)}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusBreakdownCard;
