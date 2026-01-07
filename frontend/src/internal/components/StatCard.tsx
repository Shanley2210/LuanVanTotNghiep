import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useContext, type ReactElement } from 'react';

export interface StatCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon: ReactElement;
    trend?: 'up' | 'down';
    trendValue?: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    subtext,
    icon,
    trend,
    trendValue,
    color
}) => {
    const { isDark } = useContext(ThemeContext);

    return (
        <div
            className={`h-full p-5 border shadow-sm hover:shadow-md transition-shadow duration-300 ${
                isDark
                    ? 'bg-[#141414] border-gray-700'
                    : 'bg-white border-gray-200'
            }`}
        >
            <div className='flex justify-center items-start'>
                <div
                    className='p-3 rounded-lg text-white flex items-center justify-center'
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>

                {trend && trendValue && (
                    <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                            trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {trend === 'up' ? (
                            <ArrowUp size={14} />
                        ) : (
                            <ArrowDown size={14} />
                        )}
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>

            <div className='mt-4'>
                <p
                    className={`text-xs text-center font-semibold uppercase tracking-wide ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                    {title}
                </p>
                <h3
                    className={`text-2xl text-center font-bold mt-1 ${
                        isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}
                >
                    {value}
                </h3>
                {subtext && (
                    <p
                        className={`text-sm text-center mt-1 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    >
                        {subtext}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
