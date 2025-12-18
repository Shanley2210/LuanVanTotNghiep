import { useEffect, useState } from 'react';
import {
    X,
    Calendar as CalendarIcon,
    Clock,
    Stethoscope,
    User
} from 'lucide-react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FaRegHandPointUp } from 'react-icons/fa';
import { PiCalendarDots } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';
import {
    fetchDoctors,
    fetchDoctorsByService,
    selectDoctor
} from '@/shared/stores/doctorSlice';
import { getSlotDoctor } from '@/shared/apis/doctorService';
import { updateAppointment } from '@/shared/apis/patientService';
import { useTranslation } from 'react-i18next';

interface EditAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointmentData: any;
    currentUserId?: string | number;
    onSuccess: () => void;
}

const EditAppointmentModal = ({
    isOpen,
    onClose,
    appointmentData,
    onSuccess
}: EditAppointmentModalProps) => {
    const dispatch = useAppDispatch();
    const { list: serviceList } = useAppSelector(selectServices);
    const { list: allDoctors } = useAppSelector(selectDoctor);
    const [isLoading, setIsLoading] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState('all');
    const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
    const [dates, setDates] = useState<string[]>([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [slotData, setSlotData] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const localeStr = language === 'vi' ? 'vi-VN' : 'en-US';

    const [bookingFor, setBookingFor] = useState('self');
    const [formData, setFormData] = useState({
        reason: '',
        patientName: '',
        patientPhone: '',
        patientGender: '1',
        patientAddress: '',
        patientEmail: '',
        patientDob: ''
    });

    useEffect(() => {
        if (appointmentData) {
            setSelectedDoctorId(appointmentData.doctorId?.toString() || '');
            setSelectedDate(
                appointmentData.date
                    ? dayjs(appointmentData.date).format('YYYY-MM-DD')
                    : dayjs().format('YYYY-MM-DD')
            );
            setBookingFor(appointmentData.bookingFor || 'self');

            setFormData({
                reason: appointmentData.reason || '',
                patientName: appointmentData.patientName || '',
                patientPhone: appointmentData.patientPhone || '',
                patientGender: appointmentData.patientGender || '1',
                patientAddress: appointmentData.patientAddress || '',
                patientEmail: appointmentData.patientEmail || '',
                patientDob: appointmentData.patientDob || ''
            });

            setIsRescheduling(false);
            setSelectedSlot(null);
            setSlotData([]);
        }
    }, [appointmentData, isOpen]);

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
        dispatch(fetchServices({ page: 1, limit: 100 }));
        dispatch(fetchDoctors({ page: 1, limit: 100, status: 'active' }));
    }, [dispatch]);

    useEffect(() => {
        if (!serviceList || !allDoctors) return;

        if (selectedServiceId && selectedServiceId !== 'all') {
            dispatch(
                fetchDoctorsByService({
                    serviceId: Number(selectedServiceId),
                    page: 1,
                    limit: 100
                })
            );
            const doctorsInService = allDoctors.filter(
                (d: any) =>
                    d.specialty?.id === Number(selectedServiceId) ||
                    d.serviceId === Number(selectedServiceId)
            );
            setFilteredDoctors(doctorsInService);
        } else {
            setFilteredDoctors(allDoctors);
        }
    }, [selectedServiceId, allDoctors, dispatch]);

    useEffect(() => {
        if (isRescheduling && selectedDoctorId && selectedDate) {
            setLoadingSlots(true);
            getSlotDoctor(Number(selectedDoctorId), selectedDate)
                .then((res) => {
                    if (res && res.data && res.data.data) {
                        setSlotData(res.data.data);
                    } else {
                        setSlotData([]);
                    }
                })
                .catch(() => {
                    setSlotData([]);
                })
                .finally(() => {
                    setLoadingSlots(false);
                });
        }
    }, [isRescheduling, selectedDoctorId, selectedDate]);

    const formatDateLabel = (dateString: string) => {
        const date = new Date(dateString);
        const formatted = new Intl.DateTimeFormat(localeStr, {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
        return (
            formatted.charAt(0).toUpperCase() +
            formatted.slice(1).replace(',', ' -')
        );
    };

    const formatTime = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat(localeStr, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
    };

    const formatPrice = (price: any) => {
        return new Intl.NumberFormat(localeStr, {
            style: 'currency',
            currency: 'VND'
        }).format(Number(price) || 0);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdate = async () => {
        if (!formData.reason.trim()) {
            toast.error(t('updateAppointment.toastReasonRequired'));
            return;
        }
        if (bookingFor === 'relative') {
            if (!formData.patientName || !formData.patientPhone) {
                toast.error(t('updateAppointment.toastInfoRequired'));
                return;
            }
        }
        if (isRescheduling && !selectedSlot) {
            toast.error(t('updateAppointment.toastSlotRequired'));
            return;
        }

        setIsLoading(true);

        const payload = {
            id: appointmentData.id,
            doctorId: isRescheduling
                ? Number(selectedDoctorId)
                : appointmentData.doctorId,
            date: isRescheduling ? selectedDate : appointmentData.date,
            slotId: isRescheduling ? selectedSlot.id : appointmentData.slotId,

            bookingInfo: {
                bookingFor: bookingFor,
                ...formData
            }
        };

        try {
            const res = await updateAppointment(appointmentData.id, payload);
            if (res && res.data.errCode === 0) {
                toast.success(t('updateAppointment.toastSuccess'));
                onSuccess();
                onClose();
            } else {
                toast.error(
                    res.data.message || t('updateAppointment.toastFail')
                );
            }
        } catch (e) {
            toast.error(t('updateAppointment.toastServerError'));
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !appointmentData) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
            <div className='bg-white w-full flex flex-col max-h-[90vh] overflow-hidden rounded-none shadow-none border border-gray-200'>
                <div className='flex items-center justify-between p-5 border-b border-gray-400 h-16'>
                    <div>
                        <h2 className='text-xl font-bold text-gray-800 uppercase'>
                            {t('updateAppointment.title', {
                                id: appointmentData.id
                            })}
                        </h2>
                    </div>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={onClose}
                        className='rounded-none hover:bg-gray-100 cursor-pointer'
                    >
                        <X className='h-5 w-5' />
                    </Button>
                </div>

                <div className='flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar'>
                    <section className='space-y-4'>
                        <div className='flex items-center gap-2 mb-4'>
                            <User className='text-blue-500' size={20} />
                            <h3 className='font-semibold text-lg uppercase'>
                                {t('updateAppointment.patientInfoTitle')}
                            </h3>
                        </div>

                        <div className='p-4 border border-gray-200 dark:border-gray-700 rounded-none'>
                            <RadioGroup
                                value={bookingFor}
                                onValueChange={setBookingFor}
                                className='flex flex-row gap-6 mb-6 text-blue-500'
                            >
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='self'
                                        id='self'
                                        className='data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer'
                                    />
                                    <Label
                                        htmlFor='self'
                                        className='cursor-pointer text-base'
                                    >
                                        {t('updateAppointment.bookingTypeSelf')}
                                    </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='relative'
                                        id='relative'
                                        className='data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer'
                                    />
                                    <Label
                                        htmlFor='relative'
                                        className='cursor-pointer text-base'
                                    >
                                        {t(
                                            'updateAppointment.bookingTypeRelative'
                                        )}
                                    </Label>
                                </div>
                            </RadioGroup>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label>
                                        {t(
                                            'updateAppointment.labelPatientName'
                                        )}{' '}
                                        <span className='text-red-500'>*</span>
                                    </Label>
                                    <Input
                                        value={formData.patientName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'patientName',
                                                e.target.value
                                            )
                                        }
                                        disabled={bookingFor === 'self'}
                                        className='rounded-none border-gray-300 bg-white dark:bg-gray-900 focus-visible:ring-0'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label>
                                        {t('updateAppointment.labelPhone')}{' '}
                                        <span className='text-red-500'>*</span>
                                    </Label>
                                    <Input
                                        value={formData.patientPhone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'patientPhone',
                                                e.target.value
                                            )
                                        }
                                        disabled={bookingFor === 'self'}
                                        className='rounded-none border-gray-300 bg-white dark:bg-gray-900 focus-visible:ring-0'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label>
                                        {t('updateAppointment.labelGender')}
                                    </Label>
                                    <Select
                                        value={formData.patientGender}
                                        onValueChange={(v) =>
                                            handleInputChange(
                                                'patientGender',
                                                v
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            className='rounded-none border-gray-300 bg-white dark:bg-gray-900 focus:ring-0'
                                            disabled={bookingFor === 'self'}
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className='rounded-none bg-white dark:bg-gray-900 border-none'>
                                            <SelectItem
                                                value='1'
                                                className='cursor-pointer hover:bg-gray-200 rounded-none'
                                            >
                                                {t(
                                                    'updateAppointment.genderMale'
                                                )}
                                            </SelectItem>
                                            <SelectItem
                                                value='0'
                                                className='cursor-pointer hover:bg-gray-200 rounded-none'
                                            >
                                                {t(
                                                    'updateAppointment.genderFemale'
                                                )}
                                            </SelectItem>
                                            <SelectItem
                                                value='2'
                                                className='cursor-pointer hover:bg-gray-200 rounded-none'
                                            >
                                                {t(
                                                    'updateAppointment.genderOther'
                                                )}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label>
                                        {t('updateAppointment.labelAddress')}
                                    </Label>
                                    <Input
                                        value={formData.patientAddress}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'patientAddress',
                                                e.target.value
                                            )
                                        }
                                        disabled={bookingFor === 'self'}
                                        className='rounded-none border-gray-300 bg-white dark:bg-gray-900 focus-visible:ring-0'
                                    />
                                </div>
                                <div className='md:col-span-2 space-y-2'>
                                    <Label>
                                        {t('updateAppointment.labelReason')}{' '}
                                        <span className='text-red-500'>*</span>
                                    </Label>
                                    <Textarea
                                        value={formData.reason}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'reason',
                                                e.target.value
                                            )
                                        }
                                        className='rounded-none border-gray-300 bg-white dark:bg-gray-900 min-h-20 focus-visible:ring-0'
                                        placeholder={t(
                                            'updateAppointment.placeholderReason'
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className='border-gray-100 dark:border-gray-800' />

                    <section className='space-y-4'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-2'>
                                <PiCalendarDots className='text-blue-500 text-2xl' />
                                <h3 className='font-semibold text-lg uppercase'>
                                    {t('updateAppointment.scheduleInfoTitle')}
                                </h3>
                            </div>

                            <div className='flex items-center space-x-2 border-none px-3 py-2 border rounded-none'>
                                <Switch
                                    id='reschedule-mode'
                                    checked={isRescheduling}
                                    onCheckedChange={setIsRescheduling}
                                    className='data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300 border-2 border-transparent'
                                />
                                <Label
                                    htmlFor='reschedule-mode'
                                    className='cursor-pointer font-medium text-blue-500 dark:text-blue-300 select-none'
                                >
                                    {t('updateAppointment.switchReschedule')}
                                </Label>
                            </div>
                        </div>

                        {!isRescheduling && (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-none opacity-80'>
                                <div className='flex items-start gap-3'>
                                    <div className='bg-white dark:bg-gray-700 p-2 shadow-sm rounded-none'>
                                        <Stethoscope
                                            size={18}
                                            className='text-gray-500'
                                        />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>
                                            {t(
                                                'updateAppointment.labelCurrentDoctor'
                                            )}
                                        </p>
                                        <p className='font-medium'>
                                            {allDoctors.find(
                                                (d) =>
                                                    d.id ===
                                                    appointmentData.doctorId
                                            )?.user?.name || '---'}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <div className='bg-white dark:bg-gray-700 p-2 shadow-sm rounded-none'>
                                        <Clock
                                            size={18}
                                            className='text-gray-500'
                                        />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>
                                            {t(
                                                'updateAppointment.labelCurrentTime'
                                            )}
                                        </p>
                                        <p className='font-medium'>
                                            {appointmentData.timeType} -{' '}
                                            {appointmentData.date
                                                ? dayjs(
                                                      appointmentData.date
                                                  ).format('DD/MM/YYYY')
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isRescheduling && (
                            <div className='space-y-6 animate-in slide-in-from-top-2 duration-300'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <Label className='flex items-center gap-1'>
                                            {t(
                                                'updateAppointment.labelService'
                                            )}
                                            <span className='text-xs text-gray-400 font-normal'>
                                                {t(
                                                    'updateAppointment.hintService'
                                                )}
                                            </span>
                                        </Label>
                                        <Select
                                            value={selectedServiceId}
                                            onValueChange={(val) => {
                                                setSelectedServiceId(val);
                                                setSelectedDoctorId('');
                                            }}
                                        >
                                            <SelectTrigger className='h-11 rounded-none border-none focus:ring-0 bg-white dark:bg-gray-900 cursor-pointer'>
                                                <SelectValue
                                                    placeholder={t(
                                                        'updateAppointment.placeholderAllServices'
                                                    )}
                                                />
                                            </SelectTrigger>
                                            <SelectContent className='rounded-none bg-white border-none max-h-[300px] overflow-y-auto z-50'>
                                                <SelectItem
                                                    value='all'
                                                    className='cursor-pointer hover:bg-gray-200 rounded-none'
                                                >
                                                    {t(
                                                        'updateAppointment.optionAll'
                                                    )}
                                                </SelectItem>
                                                {serviceList.map((service) => (
                                                    <SelectItem
                                                        key={service.id}
                                                        value={service.id.toString()}
                                                        className='cursor-pointer hover:bg-gray-200 rounded-none'
                                                    >
                                                        {service.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='space-y-2'>
                                        <Label>
                                            {t(
                                                'updateAppointment.labelNewDoctor'
                                            )}
                                        </Label>
                                        <Select
                                            value={selectedDoctorId}
                                            onValueChange={setSelectedDoctorId}
                                            disabled={!filteredDoctors.length}
                                        >
                                            <SelectTrigger className='h-11 rounded-none border-none focus:ring-0 bg-white dark:bg-gray-900 cursor-pointer'>
                                                <SelectValue
                                                    placeholder={t(
                                                        'updateAppointment.placeholderSelectDoctor'
                                                    )}
                                                />
                                            </SelectTrigger>
                                            <SelectContent className='rounded-none bg-white border-none max-h-[300px] overflow-y-auto z-50'>
                                                {filteredDoctors.length > 0 ? (
                                                    filteredDoctors.map(
                                                        (doc) => (
                                                            <SelectItem
                                                                key={doc.id}
                                                                value={doc.id.toString()}
                                                                className='cursor-pointer hover:bg-gray-200 rounded-none'
                                                            >
                                                                <div className='flex flex-col text-left'>
                                                                    <span className='font-medium'>
                                                                        {
                                                                            doc
                                                                                .user
                                                                                ?.name
                                                                        }
                                                                    </span>
                                                                    <span className='text-xs text-gray-500'>
                                                                        {formatPrice(
                                                                            doc.price
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                        )
                                                    )
                                                ) : (
                                                    <div className='p-2 text-sm text-gray-500 text-center'>
                                                        {t(
                                                            'updateAppointment.noDoctor'
                                                        )}
                                                    </div>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {selectedDoctorId && (
                                    <div className='border border-gray-200 dark:border-gray-700 p-4 rounded-none bg-white dark:bg-gray-900'>
                                        <div className='mb-5'>
                                            <Select
                                                value={selectedDate}
                                                onValueChange={(v) => {
                                                    setSelectedDate(v);
                                                    setSelectedSlot(null);
                                                }}
                                            >
                                                <SelectTrigger className='w-60 rounded-none border-none text-blue-500 font-bold uppercase cursor-pointer pl-0 focus:ring-0 shadow-none bg-transparent'>
                                                    <div className='flex items-center gap-2'>
                                                        <CalendarIcon className='w-5 h-5' />
                                                        <SelectValue
                                                            placeholder={t(
                                                                'updateAppointment.placeholderSelectDate'
                                                            )}
                                                        />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent className='border-none rounded-none bg-white dark:bg-gray-900 max-h-[300px] overflow-y-auto z-50 shadow-lg'>
                                                    <SelectGroup>
                                                        {dates.map((d) => (
                                                            <SelectItem
                                                                key={d}
                                                                value={d}
                                                                className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
                                                            >
                                                                {formatDateLabel(
                                                                    d
                                                                )}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <div className='border-b border-gray-200 dark:border-gray-800 w-full mt-2'></div>
                                        </div>

                                        {/* SLOTS GRID */}
                                        <div className='flex items-center gap-1 py-3'>
                                            <PiCalendarDots className='text-xl' />
                                            <span className='uppercase font-bold text-sm'>
                                                {t(
                                                    'updateAppointment.labelScheduleGrid'
                                                )}
                                            </span>
                                        </div>

                                        {loadingSlots ? (
                                            <div className='flex items-center gap-2 text-sm text-gray-500 py-4'>
                                                <div className='animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent'></div>
                                                {t(
                                                    'updateAppointment.loadingSlots'
                                                )}
                                            </div>
                                        ) : (
                                            <div className='grid grid-cols-4 text-sm md:text-base md:grid-cols-6 lg:grid-cols-8 gap-3'>
                                                {slotData.length > 0 ? (
                                                    slotData.map(
                                                        (slot, index) => {
                                                            const isAvailable =
                                                                slot.status ===
                                                                'available';
                                                            const isSelected =
                                                                selectedSlot?.id ===
                                                                slot.id;

                                                            return (
                                                                <div
                                                                    key={index}
                                                                    onClick={() => {
                                                                        if (
                                                                            isAvailable
                                                                        )
                                                                            setSelectedSlot(
                                                                                slot
                                                                            );
                                                                    }}
                                                                    className={`
                                                                    border p-2 text-center transition-colors duration-300 text-xs sm:text-sm font-medium rounded-none
                                                                    ${
                                                                        isAvailable
                                                                            ? 'cursor-pointer hover:bg-blue-50'
                                                                            : 'cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                                                                    }
                                                                    ${
                                                                        isSelected
                                                                            ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                                                                            : isAvailable
                                                                            ? 'border-gray-300 text-black dark:text-white'
                                                                            : ''
                                                                    }
                                                                `}
                                                                >
                                                                    {formatTime(
                                                                        slot.startTime
                                                                    )}{' '}
                                                                    -{' '}
                                                                    {formatTime(
                                                                        slot.endTime
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div className='col-span-full text-gray-500 italic text-sm'>
                                                        {t(
                                                            'updateAppointment.noSlots'
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className='pt-5 flex items-center gap-1'>
                                            <FaRegHandPointUp className='text-lg text-blue-500' />
                                            <span className='text-xs sm:text-sm'>
                                                {t(
                                                    'updateAppointment.clickToBook'
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>

                <div className='p-5 border-t bg-gray-50 border-gray-400 flex justify-end gap-3'>
                    <Button
                        variant='outline'
                        onClick={onClose}
                        disabled={isLoading}
                        className='rounded-none border-gray-300 cursor-pointer'
                    >
                        {t('updateAppointment.btnCancel')}
                    </Button>
                    <Button
                        onClick={handleUpdate}
                        disabled={isLoading}
                        className='bg-blue-500 hover:bg-blue-600 text-white rounded-none min-w-[120px] border border-blue-500 cursor-pointer'
                    >
                        {isLoading && (
                            <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2'></div>
                        )}
                        {t('updateAppointment.btnSave')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditAppointmentModal;
