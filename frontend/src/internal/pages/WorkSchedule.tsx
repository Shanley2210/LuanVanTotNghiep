import { useState, useMemo, useContext, useEffect } from 'react';
import { Button, Modal, Tooltip, Tag, message, Typography } from 'antd';
import { CiClock2 } from 'react-icons/ci';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { MoreVertical } from 'lucide-react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import {
    fetchSchedulesForDoctor,
    selectSchedules,
    type ISlot
} from '@/shared/stores/ScheduleSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { LiaUserInjuredSolid } from 'react-icons/lia';
import {
    toggleSlot,
    closeSlotDate,
    openSlotDate
} from '@/shared/apis/scheduleService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const { Text } = Typography;

interface DetailedAppointment {
    id: number;
    patientName: string;
    patientGender: string;
    patientPhone: string;
    patientEmail: string;
    patientDob: string;
    patientEthnicity: string;
    patientAddress: string;
    reason: string;
}
interface ProcessedSlot extends Omit<ISlot, 'appointments'> {
    date: string;
    type: string;
    patientName: string;
    note: string;
    appointments: DetailedAppointment[];
}
interface ConfirmModalState {
    isOpen: boolean;
    action: 'OPEN' | 'CLOSE';
    scope: 'SLOT' | 'DAY';
    date: string;
    time?: string;
    currentSlot?: ProcessedSlot;
}
interface DayMenuState {
    isOpen: boolean;
    date: Date | null;
}

interface DetailModalState {
    isOpen: boolean;
    slot: ProcessedSlot | null;
}

const SHIFT_SETTINGS = [
    {
        id: 'morning',
        label: 'workSchedule.shiftMorning',
        slots: ['08:00', '08:45', '09:30', '10:15', '11:00']
    },
    {
        id: 'afternoon',
        label: 'workSchedule.shiftAfternoon',
        slots: ['13:00', '13:45', '14:30', '15:15', '16:00']
    },
    {
        id: 'evening',
        label: 'workSchedule.shiftEvening',
        slots: ['18:00', '18:45', '19:30', '20:15', '21:00']
    }
];

// --- HELPER FUNCTIONS XỬ LÝ TIMEZONE (QUAN TRỌNG) ---

// 1. Format giờ từ UTC string (Giữ nguyên số giờ, không cộng múi giờ)
// VD: 18:00Z -> "18:00" (Thay vì bị +7 thành 01:00)
const formatTimeFromUTC = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

// 2. Format ngày từ UTC string (Giữ nguyên ngày gốc, không cộng múi giờ)
// VD: 2026-01-18T18:00:00Z -> "2026-01-18" (Thay vì bị +7 thành 19/01)
const formatDateFromUTC = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 3. Format ngày địa phương (Dùng cho Date Object của JS)
const formatDateToLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getWeekDates = (baseDate: Date): Date[] => {
    const date = new Date(baseDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));

    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(monday);
        nextDay.setDate(monday.getDate() + i);
        week.push(nextDay);
    }
    return week;
};

// Tính toán thời gian kết thúc dựa trên chuỗi giờ "HH:mm" (cộng 30 phút)
const calculateEndTime = (startTime: string): string => {
    const [h, m] = startTime.split(':').map(Number);
    let newH = h;
    let newM = m + 30;

    if (newM >= 60) {
        newH += 1;
        newM -= 60;
    }

    return `${newH.toString().padStart(2, '0')}:${newM
        .toString()
        .padStart(2, '0')}`;
};

const getGenderLabel = (genderVal: string, t: any) => {
    if (genderVal === '1') return t('common.female', 'Nữ');
    if (genderVal === '0') return t('common.male', 'Nam');
    return t('common.other', 'Khác');
};

export default function WorkSchedule() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const { list: schedules } = useAppSelector(selectSchedules);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
        isOpen: false,
        action: 'OPEN',
        scope: 'SLOT',
        date: '',
        time: ''
    });

    const [dayMenuModal, setDayMenuModal] = useState<DayMenuState>({
        isOpen: false,
        date: null
    });

    const [detailModal, setDetailModal] = useState<DetailModalState>({
        isOpen: false,
        slot: null
    });

    const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

    // --- LOGIC XỬ LÝ SLOT ĐÃ ĐƯỢC FIX ---
    const processedSlots: ProcessedSlot[] = useMemo(() => {
        return schedules.flatMap((schedule) =>
            schedule.slots.map((slot) => {
                // FIX 1: Lấy ngày trực tiếp từ UTC để tránh bị nhảy ngày
                const dateStr = formatDateFromUTC(slot.startTime);

                // FIX 2: Lấy giờ trực tiếp từ UTC
                const timeStr = formatTimeFromUTC(slot.startTime);
                const endTimeStr = formatTimeFromUTC(slot.endTime);

                const appointments = (slot.appointments ||
                    []) as unknown as DetailedAppointment[];

                const patientName =
                    appointments.length > 0 ? appointments[0].patientName : '';

                return {
                    ...slot,
                    date: dateStr, // Sử dụng ngày đã fix
                    startTime: timeStr, // Sử dụng giờ đã fix
                    endTime: endTimeStr, // Sử dụng giờ đã fix
                    type: schedule.shift,
                    patientName: patientName,
                    note: '',
                    appointments: appointments
                } as ProcessedSlot;
            })
        );
    }, [schedules]);

    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const prevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const goToToday = () => setCurrentDate(new Date());

    const handleSlotClick = (
        dateStr: string,
        time: string,
        slot?: ProcessedSlot
    ) => {
        console.log(slot);

        if (slot && slot.status === 'full') {
            setDetailModal({
                isOpen: true,
                slot: slot
            });
            return;
        }

        let action: 'OPEN' | 'CLOSE' = 'OPEN';
        if (slot) {
            if (slot.status === 'available') action = 'CLOSE';
            else if (slot.status === 'close') action = 'OPEN';
        }

        setConfirmModal({
            isOpen: true,
            action,
            scope: 'SLOT',
            date: dateStr,
            time,
            currentSlot: slot
        });
    };

    const handleDayHeaderClick = (date: Date) => {
        setDayMenuModal({ isOpen: true, date: date });
    };

    const handleSelectDayAction = (action: 'OPEN' | 'CLOSE') => {
        if (!dayMenuModal.date) return;
        const dateStr = formatDateToLocal(dayMenuModal.date); // Dùng helper local
        setDayMenuModal({ isOpen: false, date: null });
        setConfirmModal({
            isOpen: true,
            action: action,
            scope: 'DAY',
            date: dateStr,
            time: ''
        });
    };

    const handleConfirmAction = async () => {
        const { currentSlot, scope, date, action } = confirmModal;
        setIsLoading(true);

        try {
            let res;
            if (scope === 'SLOT' && currentSlot?.id) {
                res = await toggleSlot(Number(currentSlot.id));
            } else if (scope === 'DAY') {
                const payload = { date: date };
                if (action === 'OPEN') {
                    res = await openSlotDate(payload);
                } else {
                    res = await closeSlotDate(payload);
                }
            }

            if (res && res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
            } else if (res) {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (error) {
            console.error(error);
            message.error(t('workSchedule.error'));
        } finally {
            setIsLoading(false);
            dispatch(
                fetchSchedulesForDoctor({
                    start: formatDateToLocal(weekDates[0]),
                    end: formatDateToLocal(weekDates[6])
                })
            );
            setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
    };

    const getSlotData = (
        dateStr: string,
        time: string
    ): ProcessedSlot | undefined => {
        return processedSlots.find(
            (s) => s.date === dateStr && s.startTime === time
        );
    };

    const getSlotStyles = (status: string) => {
        if (isDark) {
            switch (status) {
                case 'full':
                    return 'bg-blue-900/30 border-blue-700 hover:bg-blue-900/50 text-blue-300';
                case 'available':
                    return 'bg-green-900/30 border-green-700 hover:bg-green-900/50 text-green-300';
                case 'close':
                    return 'bg-gray-800 border-gray-600 text-gray-500 hover:bg-gray-700';
                case 'pending':
                    return 'bg-orange-900/30 border-orange-700 hover:bg-orange-900/50 text-orange-300';
                default:
                    return 'bg-gray-900';
            }
        }

        switch (status) {
            case 'full':
                return 'bg-blue-50 border-blue-500 hover:bg-blue-100';
            case 'available':
                return 'bg-green-50 border-green-500 hover:bg-green-100';
            case 'close':
                return 'bg-gray-100 border-gray-400 text-gray-400 hover:bg-gray-200';
            case 'pending':
                return 'bg-orange-50 border-orange-500 hover:bg-orange-100';
            default:
                return 'bg-gray-50';
        }
    };

    useEffect(() => {
        dispatch(
            fetchSchedulesForDoctor({
                start: formatDateToLocal(weekDates[0]),
                end: formatDateToLocal(weekDates[6])
            })
        );
    }, [dispatch, currentDate, weekDates]);

    return (
        <div className='h-[calc(100vh-80px)] flex flex-col mr-5'>
            <div className='shrink-0 py-2 w-full'>
                <div
                    className={`flex flex-col sm:flex-row justify-between items-center p-3 shadow-sm border ${
                        isDark
                            ? 'bg-[#141414] border-gray-700'
                            : 'bg-white border-gray-200'
                    }`}
                >
                    <div className='flex items-center gap-4'>
                        <Button type='primary' ghost onClick={goToToday}>
                            {t('workSchedule.navCurrentWeek')}
                        </Button>
                        <div className='flex items-center gap-2'>
                            <Button type='primary' onClick={prevWeek}>
                                <MdKeyboardArrowLeft />
                            </Button>
                            <span
                                className={`px-4 font-semibold w-auto text-center select-none text-base ${
                                    isDark ? 'text-gray-200' : 'text-gray-700'
                                }`}
                            >
                                {t('workSchedule.navWeekRange', {
                                    start: dayjs(weekDates[0]).format('DD/MM'),
                                    end: dayjs(weekDates[6]).format('DD/MM')
                                })}
                            </span>
                            <Button type='primary' onClick={nextWeek}>
                                <MdKeyboardArrowRight />
                            </Button>
                        </div>
                    </div>
                    <span
                        className={`px-4 font-semibold w-48 text-center select-none text-base ${
                            isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                        {t('workSchedule.navMonthYear', {
                            month: currentDate.getMonth() + 1,
                            year: currentDate.getFullYear()
                        })}
                    </span>
                    <div
                        className={`flex items-center gap-4 text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        <div className='flex items-center gap-1.5'>
                            <div
                                className={`w-3 h-3 border border-dashed ${
                                    isDark
                                        ? 'bg-[#1f1f1f] border-gray-600'
                                        : 'bg-white border-gray-400'
                                }`}
                            ></div>
                            <span>{t('workSchedule.legendEmpty')}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <div
                                className={`w-3 h-3 border ${
                                    isDark
                                        ? 'bg-green-900 border-green-700'
                                        : 'bg-green-100 border-green-500'
                                }`}
                            ></div>
                            <span>{t('workSchedule.legendAvailable')}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <div
                                className={`w-3 h-3 border ${
                                    isDark
                                        ? 'bg-blue-900 border-blue-700'
                                        : 'bg-blue-100 border-green-500'
                                }`}
                            ></div>
                            <span>{t('workSchedule.legendBooked')}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <div
                                className={`w-3 h-3 border ${
                                    isDark
                                        ? 'bg-gray-800 border-gray-600'
                                        : 'bg-gray-100 border-gray-400'
                                }`}
                            ></div>
                            <span>{t('workSchedule.legendClosed')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex-1 min-h-0 w-full mt-2'>
                <div
                    className={`shadow border h-full overflow-y-auto relative custom-scrollbar ${
                        isDark
                            ? 'bg-[#141414] border-gray-700'
                            : 'bg-white border-gray-200'
                    }`}
                >
                    <div
                        className={`grid grid-cols-8 border-b sticky top-0 z-30 ${
                            isDark
                                ? 'border-gray-700 bg-[#1f1f1f]'
                                : 'border-gray-200 bg-gray-50'
                        }`}
                    >
                        <div
                            className={`p-4 border-r flex items-center justify-center font-medium ${
                                isDark
                                    ? 'border-gray-700 bg-[#1f1f1f] text-gray-500'
                                    : 'border-gray-200 bg-gray-50 text-gray-400'
                            }`}
                        >
                            <CiClock2 size={20} />
                        </div>
                        {weekDates.map((date, index) => {
                            const isToday =
                                formatDateToLocal(date) ===
                                formatDateToLocal(new Date());
                            return (
                                <Tooltip
                                    key={index}
                                    title={t('workSchedule.tooltipManageDay')}
                                >
                                    <div
                                        className={`relative p-3 text-center border-r last:border-r-0 cursor-pointer group transition duration-200 ${
                                            isDark
                                                ? isToday
                                                    ? 'bg-blue-900/30 border-gray-700'
                                                    : 'bg-[#1f1f1f] border-gray-700 hover:bg-gray-800'
                                                : isToday
                                                  ? 'bg-blue-100 border-gray-200'
                                                  : 'bg-gray-50 border-gray-200 hover:bg-blue-50'
                                        }`}
                                        onClick={() =>
                                            handleDayHeaderClick(date)
                                        }
                                    >
                                        <Text
                                            strong
                                            className={`uppercase text-xs block mb-1 ${
                                                isDark ? 'text-gray-300' : ''
                                            }`}
                                        >
                                            {dayjs(date).format('ddd')}{' '}
                                            {/* Thứ */}
                                        </Text>
                                        <Text
                                            className={`font-bold text-lg ${
                                                isToday
                                                    ? isDark
                                                        ? 'text-blue-400'
                                                        : 'text-blue-600'
                                                    : isDark
                                                      ? 'text-gray-200'
                                                      : ''
                                            }`}
                                        >
                                            {dayjs(date).format('DD')}
                                        </Text>
                                    </div>
                                </Tooltip>
                            );
                        })}
                    </div>

                    <div>
                        {SHIFT_SETTINGS.map((shift) => (
                            <div key={shift.id}>
                                <div
                                    className={`sticky left-0 z-20 px-4 py-2 text-sm font-bold uppercase tracking-wider border-y flex items-center gap-2 ${
                                        isDark
                                            ? 'bg-gray-800 text-blue-400 border-gray-700'
                                            : 'bg-blue-50 text-blue-700 border-blue-100'
                                    }`}
                                >
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            isDark
                                                ? 'bg-blue-400'
                                                : 'bg-blue-600'
                                        }`}
                                    ></div>
                                    {t(shift.label)}
                                </div>

                                {shift.slots.map((startTime) => {
                                    const endTime = calculateEndTime(startTime);

                                    return (
                                        <div
                                            key={startTime}
                                            className={`grid grid-cols-8 border-b last:border-b-0 min-h-[70px] ${
                                                isDark
                                                    ? 'border-gray-800'
                                                    : 'border-gray-100'
                                            }`}
                                        >
                                            <div
                                                className={`p-2 border-r text-xs font-medium text-center flex flex-col justify-center items-center sticky left-0 z-10 ${
                                                    isDark
                                                        ? 'bg-[#141414] border-gray-700 text-gray-400'
                                                        : 'bg-white border-gray-200 text-gray-500'
                                                }`}
                                            >
                                                <span>{startTime}</span>
                                                <span className='text-[10px] opacity-60 my-0.5'>
                                                    -
                                                </span>
                                                <span>{endTime}</span>
                                            </div>

                                            {weekDates.map((date) => {
                                                const dateStr =
                                                    formatDateToLocal(date);
                                                const slotData = getSlotData(
                                                    dateStr,
                                                    startTime
                                                );

                                                return (
                                                    <div
                                                        key={`${dateStr}-${startTime}`}
                                                        className={`border-r last:border-r-0 relative p-1 transition-all duration-200 ${
                                                            isDark
                                                                ? 'border-gray-800'
                                                                : 'border-gray-100'
                                                        } ${
                                                            !slotData
                                                                ? isDark
                                                                    ? 'bg-[#1a1a1a] hover:bg-gray-800'
                                                                    : 'bg-gray-50/20 hover:bg-gray-100'
                                                                : ''
                                                        }`}
                                                        onClick={() =>
                                                            handleSlotClick(
                                                                dateStr,
                                                                startTime,
                                                                slotData
                                                            )
                                                        }
                                                    >
                                                        {slotData && (
                                                            <div
                                                                className={`h-full w-full p-2 text-xs flex flex-col gap-1 shadow-sm border-l-4 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ${getSlotStyles(
                                                                    slotData.status
                                                                )}`}
                                                            >
                                                                <div className='flex justify-between items-start'>
                                                                    <span
                                                                        className={`font-bold ${
                                                                            isDark
                                                                                ? 'text-gray-300'
                                                                                : 'text-slate-700'
                                                                        }`}
                                                                    >
                                                                        {
                                                                            slotData.startTime
                                                                        }{' '}
                                                                        -{' '}
                                                                        {
                                                                            slotData.endTime
                                                                        }
                                                                    </span>
                                                                </div>

                                                                {slotData.status ===
                                                                    'close' && (
                                                                    <div className='text-gray-500 font-medium italic mt-auto'>
                                                                        {t(
                                                                            'workSchedule.slotClosed'
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {slotData.status ===
                                                                    'full' && (
                                                                    <div className='flex items-center gap-1'>
                                                                        <LiaUserInjuredSolid className='size-4' />
                                                                        <Tag
                                                                            color={
                                                                                isDark
                                                                                    ? 'green-inverse'
                                                                                    : 'success'
                                                                            }
                                                                            className={`mr-0 w-fit text-[10px] leading-tight px-1 py-0.5 border-0 ${
                                                                                isDark
                                                                                    ? 'bg-green-900 text-green-300'
                                                                                    : 'bg-green-200 text-green-800'
                                                                            }`}
                                                                        >
                                                                            {slotData.patientName
                                                                                ? slotData.patientName
                                                                                : t(
                                                                                      'workSchedule.slotNoDeposit'
                                                                                  )}
                                                                        </Tag>
                                                                    </div>
                                                                )}

                                                                {slotData.status ===
                                                                    'pending' && (
                                                                    <div
                                                                        className={`${
                                                                            isDark
                                                                                ? 'text-orange-400'
                                                                                : 'text-orange-700'
                                                                        } font-medium italic mt-auto flex items-center gap-1`}
                                                                    >
                                                                        <MoreVertical
                                                                            size={
                                                                                10
                                                                            }
                                                                        />
                                                                        <span>
                                                                            {t(
                                                                                'workSchedule.slotPending'
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                title={t('workSchedule.dayMenuTitle', {
                    date: dayMenuModal.date
                        ? dayjs(dayMenuModal.date).format('DD/MM/YYYY')
                        : ''
                })}
                open={dayMenuModal.isOpen}
                onCancel={() => setDayMenuModal({ isOpen: false, date: null })}
                footer={null}
                width={400}
                centered
            >
                <div className='flex flex-col gap-3 py-2'>
                    <p
                        className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                        {t('workSchedule.dayMenuQuestion')}
                    </p>
                    <div className='flex gap-3 justify-center'>
                        <Button
                            type='primary'
                            className='bg-green-600 hover:bg-green-500'
                            onClick={() => handleSelectDayAction('OPEN')}
                        >
                            {t('workSchedule.dayMenuOpenAll')}
                        </Button>
                        <Button
                            type='primary'
                            danger
                            onClick={() => handleSelectDayAction('CLOSE')}
                        >
                            {t('workSchedule.dayMenuCloseAll')}
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                title={
                    confirmModal.scope === 'DAY'
                        ? confirmModal.action === 'OPEN'
                            ? t('workSchedule.confirmTitleOpenDay')
                            : t('workSchedule.confirmTitleCloseDay')
                        : confirmModal.action === 'OPEN'
                          ? t('workSchedule.confirmTitleOpenSlot')
                          : t('workSchedule.confirmTitleCloseSlot')
                }
                open={confirmModal.isOpen}
                confirmLoading={isLoading}
                onOk={handleConfirmAction}
                onCancel={() =>
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }))
                }
                okText={
                    confirmModal.scope === 'DAY'
                        ? t('workSchedule.confirmBtnAgree')
                        : confirmModal.action === 'OPEN'
                          ? t('workSchedule.confirmBtnOpen')
                          : t('workSchedule.confirmBtnClose')
                }
                cancelText={t('workSchedule.confirmBtnCancel')}
                okButtonProps={{
                    danger: confirmModal.action === 'CLOSE',
                    type: 'primary',
                    className:
                        confirmModal.action === 'OPEN' &&
                        confirmModal.scope === 'DAY'
                            ? 'bg-green-600 hover:bg-green-500'
                            : ''
                }}
            >
                <div className={isDark ? 'text-gray-200' : ''}>
                    {confirmModal.scope === 'DAY' ? (
                        <p>
                            {t('workSchedule.confirmTextPrefix')}
                            <span
                                className={`font-bold ${
                                    confirmModal.action === 'OPEN'
                                        ? ' text-green-600'
                                        : ' text-red-600'
                                }`}
                            >
                                {confirmModal.action === 'OPEN'
                                    ? t('workSchedule.confirmActionOpen')
                                    : t('workSchedule.confirmActionClose')}
                            </span>
                            {t('workSchedule.confirmTextAll')}
                            {t('workSchedule.confirmTextSuffixDay')}
                            <span className='font-bold text-blue-600'>
                                {' '}
                                {dayjs(confirmModal.date).format(
                                    'DD/MM/YYYY'
                                )}{' '}
                            </span>
                            {t('workSchedule.confirmTextEnd')}
                            <br />
                            <span className='text-xs text-gray-500 italic'>
                                {confirmModal.action === 'OPEN'
                                    ? t('workSchedule.confirmNoteOpenDay')
                                    : t('workSchedule.confirmNoteCloseDay')}
                            </span>
                        </p>
                    ) : (
                        <>
                            <p>
                                {t('workSchedule.confirmTextPrefix')}
                                <span className='font-bold'>
                                    {confirmModal.action === 'OPEN'
                                        ? t('workSchedule.confirmActionOpen')
                                        : t('workSchedule.confirmActionClose')}
                                </span>
                                {t('workSchedule.confirmTextSuffixSlot')}
                                <span className='font-bold text-blue-600'>
                                    {' '}
                                    {confirmModal.time}{' '}
                                </span>
                                {t('workSchedule.confirmTextOnDay')}
                                <span className='font-bold text-blue-600'>
                                    {' '}
                                    {dayjs(confirmModal.date).format(
                                        'DD/MM/YYYY'
                                    )}{' '}
                                </span>
                                {t('workSchedule.confirmTextEnd')}
                            </p>
                        </>
                    )}
                </div>
            </Modal>

            <Modal
                title={
                    <span className='text-blue-600 font-bold text-lg'>
                        {t('workSchedule.detailTitle', 'Chi tiết lịch hẹn')}
                    </span>
                }
                open={detailModal.isOpen}
                onCancel={() => setDetailModal({ isOpen: false, slot: null })}
                footer={[
                    <Button
                        key='close'
                        onClick={() =>
                            setDetailModal({ isOpen: false, slot: null })
                        }
                    >
                        {t('common.close', 'Đóng')}
                    </Button>
                ]}
                centered
                width={600}
            >
                {detailModal.slot &&
                detailModal.slot.appointments &&
                detailModal.slot.appointments.length > 0 ? (
                    (() => {
                        const appt = detailModal.slot.appointments[0];
                        return (
                            <div
                                className={`flex flex-col gap-3 py-2 text-base ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}
                            >
                                <div
                                    className={`flex justify-between items-center pb-3 border-b ${
                                        isDark
                                            ? 'border-gray-700'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <Tag
                                        color='green'
                                        className='text-sm px-3 py-1'
                                    >
                                        {t(
                                            'workSchedule.statusBooked',
                                            'Đã đặt lịch'
                                        )}
                                    </Tag>
                                    <span className='font-semibold text-lg'>
                                        {detailModal.slot.startTime} -{' '}
                                        {detailModal.slot.endTime} |{' '}
                                        {dayjs(detailModal.slot.date).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </span>
                                </div>

                                <div className='grid grid-cols-2 gap-4 mt-2'>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.fullName', 'Họ và tên')}
                                        </span>
                                        <span className='font-bold text-blue-600 text-lg'>
                                            {appt.patientName}
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.gender', 'Giới tính')}
                                        </span>
                                        <span className='font-medium'>
                                            {getGenderLabel(
                                                appt.patientGender,
                                                t
                                            )}
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.dob', 'Ngày sinh')}
                                        </span>
                                        <span className='font-medium'>
                                            {appt.patientDob
                                                ? dayjs(appt.patientDob).format(
                                                      'DD/MM/YYYY'
                                                  )
                                                : '---'}
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.ethnicity', 'Dân tộc')}
                                        </span>
                                        <span className='font-medium'>
                                            {appt.patientEthnicity || '---'}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className={`mt-2 pt-3 border-t grid grid-cols-2 gap-4 ${
                                        isDark
                                            ? 'border-gray-700'
                                            : 'border-gray-100'
                                    }`}
                                >
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.phone', 'Số điện thoại')}
                                        </span>
                                        <span className='font-medium'>
                                            {appt.patientPhone || '---'}
                                        </span>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.email', 'Email')}
                                        </span>
                                        <span className='font-medium'>
                                            {appt.patientEmail || '---'}
                                        </span>
                                    </div>
                                    <div className='col-span-2 flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.address', 'Địa chỉ')}
                                        </span>
                                        <span className='font-medium'>
                                            {appt.patientAddress || '---'}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className={`mt-2 pt-3 border-t ${
                                        isDark
                                            ? 'border-gray-700'
                                            : 'border-gray-100'
                                    }`}
                                >
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-sm opacity-70'>
                                            {t('common.reason', 'Lý do khám')}
                                        </span>
                                        <div
                                            className={`p-3 rounded-md mt-1 ${
                                                isDark
                                                    ? 'bg-gray-800'
                                                    : 'bg-gray-50'
                                            }`}
                                        >
                                            {appt.reason ||
                                                t(
                                                    'common.noReason',
                                                    'Không có lý do cụ thể'
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                ) : (
                    <div className='text-center py-4 text-gray-500'>
                        {t(
                            'workSchedule.noInfo',
                            'Không có thông tin chi tiết'
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
