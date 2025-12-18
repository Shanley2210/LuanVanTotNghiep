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

const { Text } = Typography;

interface ProcessedSlot extends ISlot {
    date: string;
    type: string;
    patientName: string;
    note: string;
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

const WORK_HOURS = { start: 8, end: 22 };

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

const formatDateAPI = (date: Date): string => {
    return date.toLocaleDateString('sv-SE');
};

const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let h = WORK_HOURS.start; h < WORK_HOURS.end; h++) {
        slots.push(`${h.toString().padStart(2, '0')}:00`);
        slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
};

export default function WorkSchedule() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const { list: schedules } = useAppSelector(selectSchedules);
    const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 11, 8));
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

    const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);
    const timeSlots = useMemo(() => generateTimeSlots(), []);

    const processedSlots: ProcessedSlot[] = useMemo(() => {
        return schedules.flatMap((schedule) =>
            schedule.slots.map((slot) => {
                const slotDateObj = new Date(slot.startTime);
                const dateStr = slotDateObj.toLocaleDateString('sv-SE');
                const timeStr = slotDateObj.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const patientName =
                    slot.appointments && slot.appointments.length > 0
                        ? slot.appointments[0].patientName
                        : '';

                return {
                    ...slot,
                    date: dateStr,
                    startTime: timeStr,
                    endTime: new Date(slot.endTime).toLocaleTimeString(
                        'en-GB',
                        { hour: '2-digit', minute: '2-digit' }
                    ),
                    type: schedule.shift,
                    patientName: patientName,
                    note: ''
                };
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

    const goToToday = () => setCurrentDate(new Date(2025, 11, 8));

    const handleSlotClick = (
        dateStr: string,
        time: string,
        slot?: ProcessedSlot
    ) => {
        if (!slot) return;

        let action: 'OPEN' | 'CLOSE' = 'OPEN';
        if (slot.status === 'available' || slot.status === 'full') {
            action = 'CLOSE';
        } else if (slot.status === 'close') {
            action = 'OPEN';
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
        setDayMenuModal({
            isOpen: true,
            date: date
        });
    };

    const handleSelectDayAction = (action: 'OPEN' | 'CLOSE') => {
        if (!dayMenuModal.date) return;

        const dateStr = formatDateAPI(dayMenuModal.date);

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
            message.error('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setIsLoading(false);
            dispatch(
                fetchSchedulesForDoctor({
                    start: formatDateAPI(weekDates[0]),
                    end: formatDateAPI(weekDates[6])
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
                start: formatDateAPI(weekDates[0]),
                end: formatDateAPI(weekDates[6])
            })
        );
    }, [dispatch, currentDate, weekDates]);

    return (
        <div className='h-[calc(100vh-80px)] flex flex-col mr-5'>
            <div className='shrink-0 py-2 w-full'>
                <div className='flex flex-col sm:flex-row justify-between items-center bg-white p-3 shadow-sm border border-gray-200'>
                    <div className='flex items-center gap-4'>
                        <Button type='primary' ghost onClick={goToToday}>
                            Tuần này
                        </Button>
                        <div className='flex items-center gap-2'>
                            <Button type='primary' onClick={prevWeek}>
                                <MdKeyboardArrowLeft />
                            </Button>
                            <span className='px-4 font-semibold text-gray-700 w-auto text-center select-none text-base'>
                                Tuần từ{' '}
                                {weekDates[0].toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit'
                                })}{' '}
                                đến{' '}
                                {weekDates[6].toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit'
                                })}
                            </span>
                            <Button type='primary' onClick={nextWeek}>
                                <MdKeyboardArrowRight />
                            </Button>
                        </div>
                    </div>
                    <span className='px-4 font-semibold text-gray-700 w-48 text-center select-none text-base'>
                        Tháng {currentDate.getMonth() + 1} Năm{' '}
                        {currentDate.getFullYear()}
                    </span>
                    <div className='flex items-center gap-4 text-sm text-gray-600'>
                        <div className='flex items-center gap-1.5'>
                            <div className='w-3 h-3 bg-white border border-dashed border-gray-400'></div>
                            <span>Trống</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <div className='w-3 h-3 bg-green-100 border border-green-500'></div>
                            <span>Có lịch</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <div className='w-3 h-3 bg-blue-100 border border-green-500'></div>
                            <span>Đã đặt lịch</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <div className='w-3 h-3 bg-gray-100 border border-gray-400'></div>
                            <span>Đã đóng</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex-1 min-h-0 w-full mt-2'>
                <div className='bg-white shadow border border-gray-200 h-full overflow-y-auto relative custom-scrollbar'>
                    <div className='grid grid-cols-8 border-b border-gray-200 bg-gray-50 sticky top-0 z-30'>
                        <div className='p-4 border-r border-gray-200 flex items-center justify-center text-gray-400 font-medium bg-gray-50'>
                            <CiClock2 size={20} />
                        </div>
                        {weekDates.map((date, index) => {
                            const isToday =
                                formatDateAPI(date) ===
                                formatDateAPI(new Date(2025, 11, 8));
                            return (
                                <Tooltip
                                    key={index}
                                    title='Nhấn để quản lý lịch ngày này'
                                >
                                    <div
                                        className={`relative p-3 text-center border-r border-gray-200 last:border-r-0 cursor-pointer group hover:bg-blue-50 transition duration-200 ${
                                            isToday
                                                ? 'bg-blue-100'
                                                : 'bg-gray-50'
                                        }`}
                                        onClick={() =>
                                            handleDayHeaderClick(date)
                                        }
                                    >
                                        <Text
                                            strong
                                            className='uppercase text-xs block mb-1'
                                        >
                                            {new Intl.DateTimeFormat('vi-VN', {
                                                weekday: 'short'
                                            }).format(date)}
                                        </Text>
                                        <Text
                                            className={`font-bold text-lg ${
                                                isToday ? 'text-blue-600' : ''
                                            }`}
                                        >
                                            {date.getDate()}
                                        </Text>
                                    </div>
                                </Tooltip>
                            );
                        })}
                    </div>

                    <div>
                        {timeSlots.map((time, timeIndex) => (
                            <div
                                key={timeIndex}
                                className='grid grid-cols-8 border-b border-gray-100 last:border-b-0 min-h-[70px]'
                            >
                                <div className='p-2 border-r border-gray-200 text-xs text-gray-500 font-medium text-center flex flex-col justify-start pt-3 bg-white sticky left-0 z-10'>
                                    {time}
                                </div>
                                {weekDates.map((date) => {
                                    const dateStr = formatDateAPI(date);
                                    const slotData = getSlotData(dateStr, time);

                                    return (
                                        <div
                                            key={`${dateStr}-${time}`}
                                            className={`border-r border-gray-100 last:border-r-0 relative p-1 transition-all duration-200 ${
                                                !slotData
                                                    ? 'bg-gray-50/20 hover:bg-gray-100'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                handleSlotClick(
                                                    dateStr,
                                                    time,
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
                                                        <span className='font-bold text-slate-700'>
                                                            {slotData.startTime}{' '}
                                                            - {slotData.endTime}
                                                        </span>
                                                    </div>

                                                    {slotData.status ===
                                                        'close' && (
                                                        <div className='text-gray-500 font-medium italic mt-auto'>
                                                            Đã đóng
                                                        </div>
                                                    )}

                                                    {slotData.status ===
                                                        'full' && (
                                                        <div className='flex items-center gap-1'>
                                                            <LiaUserInjuredSolid className='size-4' />
                                                            <Tag
                                                                color='success'
                                                                className='mr-0 w-fit text-[10px] leading-tight px-1 py-0.5 border-0 bg-green-200 text-green-800'
                                                            >
                                                                {slotData.patientName
                                                                    ? slotData.patientName
                                                                    : 'Chưa đặt cọc'}
                                                            </Tag>
                                                        </div>
                                                    )}
                                                    {slotData.status ===
                                                        'pending' && (
                                                        <div className='text-orange-700 font-medium italic mt-auto flex items-center gap-1'>
                                                            <MoreVertical
                                                                size={10}
                                                            />
                                                            <span>
                                                                Chờ duyệt
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                title={`Tùy chọn ngày ${
                    dayMenuModal.date
                        ? dayMenuModal.date.toLocaleDateString('vi-VN')
                        : ''
                }`}
                open={dayMenuModal.isOpen}
                onCancel={() => setDayMenuModal({ isOpen: false, date: null })}
                footer={null}
                width={400}
                centered
            >
                <div className='flex flex-col gap-3 py-2'>
                    <p className='text-gray-600 mb-2'>
                        Bạn muốn thực hiện hành động gì cho ngày này?
                    </p>
                    <div className='flex gap-3 justify-center'>
                        <Button
                            type='primary'
                            className='bg-green-600 hover:bg-green-500'
                            onClick={() => handleSelectDayAction('OPEN')}
                        >
                            Mở lịch cả ngày
                        </Button>
                        <Button
                            type='primary'
                            danger
                            onClick={() => handleSelectDayAction('CLOSE')}
                        >
                            Đóng lịch cả ngày
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                title={
                    confirmModal.scope === 'DAY'
                        ? confirmModal.action === 'OPEN'
                            ? 'Xác nhận mở cả ngày'
                            : 'Xác nhận đóng cả ngày'
                        : confirmModal.action === 'OPEN'
                        ? 'Mở lịch khám'
                        : 'Đóng lịch khám'
                }
                open={confirmModal.isOpen}
                confirmLoading={isLoading}
                onOk={handleConfirmAction}
                onCancel={() =>
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }))
                }
                okText={
                    confirmModal.scope === 'DAY'
                        ? 'Đồng ý'
                        : confirmModal.action === 'OPEN'
                        ? 'Mở lịch'
                        : 'Đóng lịch'
                }
                cancelText='Hủy'
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
                {confirmModal.scope === 'DAY' ? (
                    <p>
                        Bạn có chắc chắn muốn
                        <span
                            className={`font-bold ${
                                confirmModal.action === 'OPEN'
                                    ? ' text-green-600'
                                    : ' text-red-600'
                            }`}
                        >
                            {confirmModal.action === 'OPEN' ? ' MỞ ' : ' ĐÓNG '}
                            TẤT CẢ
                        </span>
                        lịch khám trong ngày
                        <span className='font-bold text-blue-600'>
                            {' '}
                            {confirmModal.date}{' '}
                        </span>
                        không?
                        <br />
                        <span className='text-xs text-gray-500 italic'>
                            {confirmModal.action === 'OPEN'
                                ? '*Hành động này sẽ mở lại toàn bộ các slot đã đóng trong ngày.'
                                : '*Hành động này sẽ đóng toàn bộ các slot đang mở trong ngày.'}
                        </span>
                    </p>
                ) : (
                    <>
                        <p>
                            Bạn có chắc chắn muốn
                            <span className='font-bold'>
                                {confirmModal.action === 'OPEN'
                                    ? ' MỞ '
                                    : ' ĐÓNG '}
                            </span>
                            lịch khám vào lúc
                            <span className='font-bold text-blue-600'>
                                {' '}
                                {confirmModal.time}{' '}
                            </span>
                            ngày
                            <span className='font-bold text-blue-600'>
                                {' '}
                                {confirmModal.date}{' '}
                            </span>
                            không?
                        </p>
                        {confirmModal.action === 'CLOSE' &&
                            confirmModal.currentSlot?.patientName && (
                                <p className='text-red-500 mt-2 text-sm italic'>
                                    * Lưu ý: Slot này đang có bệnh nhân đặt
                                    lịch.
                                </p>
                            )}
                    </>
                )}
            </Modal>
        </div>
    );
}
