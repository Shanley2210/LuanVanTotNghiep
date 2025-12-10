import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { getSlotDoctor } from '@/shared/apis/doctorService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegHandPointUp } from 'react-icons/fa';
import { PiCalendarDots } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

interface ScheduleSlot {
    id: number;
    startTime: string;
    endTime: string;
    [key: string]: any;
}

interface ExaminationScheduleProps {
    doctorId: number;
    degree: string;
    doctorName: string;
    specialty: string;
    price: number;
    service?: boolean;
    serviceId?: number;
    serviceName?: string;
    durationMinutes?: number;
    image?: string;
}

export default function ExaminationSchedule({
    doctorId,
    degree,
    doctorName,
    specialty,
    price,
    service = false,
    serviceId = 0,
    serviceName = '',
    durationMinutes = 0,
    image
}: ExaminationScheduleProps) {
    const { isDark } = useContext(ThemeContext);
    const todayStr = new Date().toISOString().split('T')[0];
    const [dates, setDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(todayStr);
    const [slotData, setSlotData] = useState<ScheduleSlot[]>([]);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const navigate = useNavigate();

    const formatDateLabel = (dateString: string) => {
        const date = new Date(dateString);

        if (language === 'vi') {
            const formatted = new Intl.DateTimeFormat('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(date);

            return (
                formatted.charAt(0).toUpperCase() +
                formatted.slice(1).replace(',', ' -')
            );
        } else {
            return new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
                .format(date)
                .replace(',', ' -');
        }
    };
    const formatTime = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);

        return new Intl.DateTimeFormat('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
    };

    const handleBooking = (slot: ScheduleSlot) => {
        const timeString = `${formatTime(slot.startTime)} - ${formatTime(
            slot.endTime
        )}`;

        if (service) {
            navigate('/booking-service', {
                state: {
                    serviceId: serviceId,
                    serviceName: serviceName,
                    durationMinutes: durationMinutes,
                    doctorId: doctorId,
                    degree: degree,
                    doctorName: doctorName,
                    specialty: specialty,
                    price: price,
                    date: selectedDate,
                    time: timeString,
                    slotId: slot.id,
                    image: image
                }
            });
        } else {
            navigate('/booking-appointment', {
                state: {
                    doctorId: doctorId,
                    degree: degree,
                    doctorName: doctorName,
                    specialty: specialty,
                    price: price,
                    date: selectedDate,
                    time: timeString,
                    slotId: slot.id,
                    image: image
                }
            });
        }
    };

    useEffect(() => {
        const arr: string[] = [];
        const today = new Date();

        for (let i = 0; i <= 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            arr.push(d.toISOString().split('T')[0]);
        }

        setDates(arr);
    }, []);

    useEffect(() => {
        if (!selectedDate) return;

        getSlotDoctor(doctorId, selectedDate)
            .then((res) => {
                setSlotData(res.data.data);
            })
            .catch(() => {
                setSlotData([]);
            });
    }, [selectedDate, doctorId]);

    return (
        <div
            className={`
                flex flex-col px-4 w-full py-5 my-5 border border-gray-200
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
        >
            <Select
                value={selectedDate}
                onValueChange={(v) => setSelectedDate(v)}
            >
                <SelectTrigger className='w-60 rounded-none border-none text-blue-500 font-bold uppercase cursor-pointer'>
                    <SelectValue
                        placeholder={t('common.selectDate') || 'Chọn ngày'}
                    />
                </SelectTrigger>
                <SelectContent
                    className={`border-none rounded-none ${
                        isDark ? 'bg-gray-900 text-white' : 'bg-white'
                    }`}
                >
                    <SelectGroup>
                        {dates.map((d) => (
                            <SelectItem
                                className={`cursor-pointer ${
                                    isDark
                                        ? 'hover:bg-gray-800'
                                        : 'hover:bg-gray-100'
                                }`}
                                key={d}
                                value={d}
                            >
                                {formatDateLabel(d)}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className='flex items-center gap-1 py-5'>
                <PiCalendarDots className='text-2xl' />
                <span className='uppercase font-bold'>
                    {t('detalDoctor.lk')}
                </span>
            </div>

            <div className='grid grid-cols-4 text-sm md:text-base md:grid-cols-8 gap-3'>
                {slotData.length > 0 ? (
                    slotData.map((slot, index) => {
                        const isAvailable = slot.status === 'available';

                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    if (isAvailable) {
                                        handleBooking(slot);
                                    }
                                }}
                                className={`
                                    border p-2 text-center transition-colors duration-300
                                    ${
                                        isAvailable
                                            ? 'cursor-pointer border-blue-500 hover:bg-blue-300'
                                            : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                                    }
                                `}
                            >
                                {formatTime(slot.startTime)} -{' '}
                                {formatTime(slot.endTime)}
                            </div>
                        );
                    })
                ) : (
                    <div className='col-span-full text-gray-500 italic'>
                        {t('detalDoctor.nlk')}
                    </div>
                )}
            </div>

            <div className='pt-5 flex items-center gap-1'>
                <FaRegHandPointUp className='text-xl text-blue-500' />
                <span className='text-sm'>{t('detalDoctor.cdt')}</span>
            </div>
        </div>
    );
}
