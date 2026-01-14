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
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
  fetchPatientProfile,
  selectPatient
} from '@/shared/stores/patientSlice';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegHandPointUp } from 'react-icons/fa';
import { PiCalendarDots } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);
  const [slotData, setSlotData] = useState<ScheduleSlot[]>([]);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(selectPatient);

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
    if (!profile) {
      toast.error(
        language === 'vi'
          ? 'Vui lòng đăng nhập và tạo hồ sơ để đặt lịch'
          : 'Please login and create a profile to book an appointment'
      );
      return;
    }

    const timeString = `${formatTime(slot.startTime)} - ${formatTime(
      slot.endTime
    )}`;
    const bookingState = {
      doctorId,
      degree,
      doctorName,
      specialty,
      price,
      date: selectedDate,
      time: timeString,
      slotId: slot.id,
      image,
      ...(service && {
        serviceId,
        serviceName,
        durationMinutes
      })
    };
    navigate(service ? '/booking-service' : '/booking-appointment', {
      state: bookingState
    });
  };

  useEffect(() => {
    const arr: string[] = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
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

  const groupedSlots = useMemo(() => {
    const groups = {
      morning: [] as ScheduleSlot[],
      afternoon: [] as ScheduleSlot[],
      evening: [] as ScheduleSlot[]
    };

    slotData.forEach((slot) => {
      const date = new Date(slot.startTime);
      const hour = date.getHours();

      if (hour >= 8 && hour <= 12) {
        groups.morning.push(slot);
      } else if (hour >= 13 && hour <= 17) {
        groups.afternoon.push(slot);
      } else if (hour >= 18 && hour <= 23) {
        groups.evening.push(slot);
      }
    });

    return groups;
  }, [slotData]);

  useEffect(() => {
    dispatch(fetchPatientProfile());
  }, [dispatch]);

  const renderShiftRow = (label: string, slots: ScheduleSlot[]) => {
    return (
      <div className='flex flex-col md:flex-row items-start md:items-center py-4 border-b border-dashed border-gray-200 last:border-0 gap-4'>
        <div className='w-full md:w-24 font-bold whitespace-nowrap shrink-0 flex items-center gap-2'>
          <span className='text-blue-500'>•</span> {label}
        </div>
        <div className='flex flex-wrap gap-3 flex-1'>
          {slots.map((slot, index) => {
            const isAvailable = slot.status === 'available';
            return (
              <div
                key={slot.id || index}
                onClick={() => {
                  if (isAvailable) handleBooking(slot);
                }}
                className={`
                                    px-4 py-2 text-sm text-center transition-all duration-200 font-medium
                                    ${
                                      isAvailable
                                        ? 'cursor-pointer border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white shadow-sm'
                                        : 'cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400'
                                    }
                                `}
              >
                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
                flex flex-col px-4 w-full py-5 my-5 border border-gray-200 shadow-sm
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
    >
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
        <Select value={selectedDate} onValueChange={(v) => setSelectedDate(v)}>
          <SelectTrigger className='rounded-none w-full md:w-60 h-10 border-blue-200 bg-blue-50 text-blue-600 font-bold uppercase cursor-pointer focus:ring-blue-500'>
            <SelectValue placeholder={t('common.selectDate') || 'Chọn ngày'} />
          </SelectTrigger>
          <SelectContent
            className={`border-none ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white'
            }`}
          >
            <SelectGroup>
              {dates.map((d) => (
                <SelectItem
                  className={`cursor-pointer ${
                    isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
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

        <div className='flex items-center gap-2 text-gray-600'>
          <PiCalendarDots className='text-2xl text-blue-600' />
          <span className='uppercase font-bold text-sm md:text-base'>
            {t('detalDoctor.lk')}
          </span>
        </div>
      </div>

      <div className='flex flex-col'>
        {slotData.length > 0 ? (
          <>
            {groupedSlots.morning.length > 0 &&
              renderShiftRow(t('detalDoctor.sa'), groupedSlots.morning)}

            {groupedSlots.afternoon.length > 0 &&
              renderShiftRow(t('detalDoctor.ch'), groupedSlots.afternoon)}

            {groupedSlots.evening.length > 0 &&
              renderShiftRow(t('detalDoctor.to'), groupedSlots.evening)}
          </>
        ) : (
          <div className='py-10 text-center text-gray-500 italic bg-gray-50'>
            {t('detalDoctor.nlk')}
          </div>
        )}
      </div>

      <div className='pt-6 flex items-center gap-2 border-t border-gray-400 mt-2'>
        <FaRegHandPointUp className='text-lg text-blue-500 animate-bounce' />
        <span className='text-sm font-medium text-gray-500'>
          {t('detalDoctor.cdt')}
        </span>
      </div>
    </div>
  );
}
