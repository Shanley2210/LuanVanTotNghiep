import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { bookingAppointment } from '@/shared/apis/patientService';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchPatientProfile,
    selectPatient
} from '@/shared/stores/patientSlice';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCalendarOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    AddressSelector,
    type AddressValue
} from '../components/AddressSelector';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BookingAppointment() {
    const location = useLocation();
    const doctorInfo = location.state;
    const { isDark } = useContext(ThemeContext);
    const [mode, setMode] = useState('self');
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(selectPatient);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const navigate = useNavigate();

    const [addressData, setAddressData] = useState<AddressValue>({
        provinceCode: '',
        provinceName: '',
        wardCode: '',
        wardName: '',
        detail: ''
    });
    const [formData, setFormData] = useState({
        reason: '',
        patientName: '',
        patientGender: '',
        patientPhone: '',
        patientEmail: '',
        patientDob: '',
        patientEthnicity: '',
        patientAddress: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^[0-9]{10,11}$/;
        return re.test(phone);
    };

    const handleBooking = async () => {
        // ... (Giữ nguyên logic handleBooking)
        let payload = {};
        if (mode === 'self') {
            if (!formData.reason.trim()) {
                toast.error(
                    language === 'vi'
                        ? 'Vui lòng nhập lý do khám.'
                        : 'Please enter the reason for examination.'
                );
                return;
            }

            payload = {
                doctorId: doctorInfo?.doctorId,
                slotId: doctorInfo?.slotId,
                bookingFor: 'self',
                reason: formData.reason
            };
        } else {
            const {
                patientName,
                patientGender,
                patientPhone,
                patientEmail,
                patientDob,
                patientEthnicity,
                patientAddress,
                reason
            } = formData;

            if (
                !patientName ||
                !patientGender ||
                !patientPhone ||
                !patientEmail ||
                !patientDob ||
                !patientEthnicity ||
                !patientAddress ||
                !reason
            ) {
                toast.error(
                    language === 'vi'
                        ? 'Vui lòng điền đầy đủ thông tin bắt buộc.'
                        : 'Please fill in all required fields.'
                );
                return;
            }

            if (!validatePhone(patientPhone)) {
                toast.error(
                    language === 'vi'
                        ? 'Số điện thoại không hợp lệ.'
                        : 'Invalid phone number.'
                );
                return;
            }

            if (!validateEmail(patientEmail)) {
                toast.error(
                    language === 'vi'
                        ? 'Địa chỉ Email không hợp lệ.'
                        : 'Invalid email address.'
                );
                return;
            }

            payload = {
                doctorId: doctorInfo?.doctorId,
                slotId: doctorInfo?.slotId,
                bookingFor: 'relative',
                reason: formData.reason,
                patientName: formData.patientName,
                patientGender: formData.patientGender,
                patientPhone: formData.patientPhone,
                patientEmail: formData.patientEmail,
                patientDob: formData.patientDob,
                patientEthnicity: formData.patientEthnicity,
                patientAddress: formData.patientAddress
            };
        }

        try {
            setIsLoading(true);
            const res = await bookingAppointment(payload);
            if (res && res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
                navigate('/patient/my-appointment');
            } else {
                toast.error(
                    language === 'vi'
                        ? res?.data?.errViMessage || 'Có lỗi xảy ra'
                        : res?.data?.errEnMessage || 'An error occurred'
                );
            }
        } catch (error) {
            console.error(error);
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const formatDateDisplay = (isoDate: string) => {
        if (!isoDate) return '';
        return new Date(isoDate).toLocaleDateString('vi-VN');
    };

    const formatBookingDate = (dateStr: string) => {
        if (!dateStr) return '';
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) return dateStr;

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');

        if (language === 'vi') {
            return `${day}/${month}/${year}`;
        }
        return `${year}/${month}/${day}`;
    };

    const formatPrice = (price: any) => {
        if (!price) return '0 ₫';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(Number(price));
    };

    useEffect(() => {
        dispatch(fetchPatientProfile());
    }, [dispatch]);

    useEffect(() => {
        const addressParts = [
            addressData.detail,
            addressData.wardName,
            addressData.provinceName
        ].filter((part) => part && part.trim() !== '');

        const fullAddress = addressParts.join(', ');

        setFormData((prev) => ({
            ...prev,
            patientAddress: fullAddress
        }));
    }, [addressData]);

    return (
        <>
            {isLoading ? (
                <LoadingCommon />
            ) : (
                <div
                    className={`
                    px-4 lg:px-20 w-full py-5 my-5
                    ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
                `}
                >
                    <h1 className='text-2xl lg:text-3xl text-center pt-3 pb-6 font-bold'>
                        {t('bookingAppointment.bkbs')}
                    </h1>

                    {/* Responsive Container: Column on Mobile, Row on Desktop */}
                    <div className='flex flex-col lg:flex-row justify-between gap-6 lg:gap-10'>
                        {/* --- LEFT COLUMN: Doctor Info --- */}
                        <div className='flex flex-col w-full lg:w-1/3 gap-5'>
                            <h1 className='text-xl text-center font-semibold lg:p-5'>
                                {t('bookingAppointment.inbk')}
                            </h1>

                            {/* Doctor Card */}
                            <div className='flex border border-gray-200 p-4 lg:p-5 gap-4 lg:gap-5 items-center'>
                                <img
                                    src={
                                        BACKEND_URL + doctorInfo?.image ||
                                        'No data'
                                    }
                                    alt=''
                                    className='w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-full lg:rounded-none'
                                    // Lưu ý: Avatar thường để tròn cho đẹp, nhưng nếu bạn muốn rounded-none tuyệt đối thì xóa rounded-full
                                />
                                <div className='flex flex-col text-sm lg:text-base'>
                                    <div className='text-blue-500 font-medium'>
                                        <span>{doctorInfo?.degree}, </span>{' '}
                                        {t('bookingAppointment.bs')}:{' '}
                                        <span>{doctorInfo?.doctorName}</span>
                                    </div>
                                    <div className='text-gray-600'>
                                        {t('bookingAppointment.ck')}{' '}
                                        <span className='font-medium'>
                                            {doctorInfo?.specialty}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Blocks */}
                            <div className='flex flex-col border border-gray-200 p-4 lg:p-5 gap-2 text-sm lg:text-base'>
                                <div className='flex justify-between'>
                                    <span className='font-medium'>
                                        {t('bookingAppointment.ndl')}:
                                    </span>
                                    <span className='text-gray-600 font-bold'>
                                        {formatBookingDate(doctorInfo?.date)}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-medium'>
                                        {t('bookingAppointment.thgian')}:
                                    </span>
                                    <span className='text-gray-600'>
                                        {doctorInfo?.time}
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col border border-gray-200 p-4 lg:p-5 gap-2 text-sm lg:text-base'>
                                <div className='flex justify-between'>
                                    <span className='font-medium'>
                                        {t('bookingAppointment.gid')}:
                                    </span>
                                    <span className='text-gray-600'>
                                        {t('bookingAppointment.free')}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-medium'>
                                        {t('bookingAppointment.gkb')}:
                                    </span>
                                    <span className='text-gray-600'>
                                        {formatPrice(doctorInfo?.price)}
                                    </span>
                                </div>
                                <div className='border-t border-gray-100 my-1'></div>
                                <div className='flex justify-between text-base lg:text-lg'>
                                    <span className='font-bold'>
                                        {t('bookingAppointment.tc')}:
                                    </span>
                                    <span className='text-blue-600 font-bold'>
                                        {formatPrice(doctorInfo?.price)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: Form --- */}
                        <div className='flex flex-col w-full lg:w-3/5'>
                            <Card className='w-full p-4 lg:p-6 border rounded-none border-gray-200 shadow-none'>
                                <CardContent className='flex flex-col gap-4 lg:gap-6 p-0'>
                                    <RadioGroup
                                        defaultValue='self'
                                        onValueChange={(v) => setMode(v)}
                                        className='flex flex-col sm:flex-row gap-4 sm:gap-5 text-blue-500 mb-2'
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
                                                {t('bookingAppointment.self')}
                                            </Label>
                                        </div>

                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem
                                                value='other'
                                                id='other'
                                                className='data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer'
                                            />
                                            <Label
                                                htmlFor='other'
                                                className='cursor-pointer text-base'
                                            >
                                                {t('bookingAppointment.rela')}
                                            </Label>
                                        </div>
                                    </RadioGroup>

                                    {mode === 'self' && profile && (
                                        <div className='flex flex-col gap-4 lg:gap-5'>
                                            {/* Responsive Row: Name + Gender */}
                                            <div className='flex flex-col sm:flex-row gap-4 lg:gap-5'>
                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.htbn'
                                                        )}
                                                    </Label>
                                                    <Input
                                                        type='text'
                                                        value={
                                                            profile.user
                                                                ?.name || ''
                                                        }
                                                        readOnly
                                                        disabled
                                                        className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.gt'
                                                        )}
                                                    </Label>
                                                    <Select
                                                        value={profile.gender}
                                                        disabled
                                                    >
                                                        <SelectTrigger className='rounded-none border-gray-300 bg-gray-100 focus:ring-0'>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-white rounded-none border-none'>
                                                            <SelectItem value='1'>
                                                                {t(
                                                                    'bookingAppointment.na'
                                                                )}
                                                            </SelectItem>
                                                            <SelectItem value='0'>
                                                                {t(
                                                                    'bookingAppointment.fm'
                                                                )}
                                                            </SelectItem>
                                                            <SelectItem value='2'>
                                                                {t(
                                                                    'bookingAppointment.ot'
                                                                )}
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    {t(
                                                        'bookingAppointment.sdt'
                                                    )}
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.phone ||
                                                        ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>Email</Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.email ||
                                                        ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                />
                                            </div>

                                            {/* Responsive Row: DOB + Ethnicity */}
                                            <div className='flex flex-col sm:flex-row gap-4 lg:gap-5'>
                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.bd'
                                                        )}
                                                    </Label>
                                                    <Input
                                                        type='text'
                                                        value={formatDateDisplay(
                                                            profile.dob
                                                        )}
                                                        readOnly
                                                        disabled
                                                        className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.dt'
                                                        )}
                                                    </Label>
                                                    <Input
                                                        type='text'
                                                        value={
                                                            profile.ethnicity ||
                                                            ''
                                                        }
                                                        readOnly
                                                        disabled
                                                        className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    {t('bookingAppointment.ad')}
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.address || ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    {t(
                                                        'bookingAppointment.ldk'
                                                    )}{' '}
                                                    <span className='text-red-500'>
                                                        *
                                                    </span>
                                                </Label>
                                                <Textarea
                                                    value={formData.reason}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'reason',
                                                            e.target.value
                                                        )
                                                    }
                                                    className='rounded-none border-gray-300 focus-visible:ring-0'
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {mode === 'other' && profile && (
                                        <div className='flex flex-col gap-4 lg:gap-5'>
                                            <h1 className='text-center font-semibold uppercase text-lg'>
                                                {t('bookingAppointment.ttdt')}
                                            </h1>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    {t(
                                                        'bookingAppointment.nadl'
                                                    )}
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.name || ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    {t(
                                                        'bookingAppointment.sdtdl'
                                                    )}
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.phone ||
                                                        ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus-visible:ring-0'
                                                />
                                            </div>

                                            <h1 className='text-center font-semibold uppercase pt-5 text-lg'>
                                                {t('bookingAppointment.ttbn')}
                                            </h1>

                                            {/* Responsive Row: Name + Gender */}
                                            <div className='flex flex-col sm:flex-row gap-4 lg:gap-5'>
                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.htbn'
                                                        )}{' '}
                                                        <span className='text-red-500'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        type='text'
                                                        value={
                                                            formData.patientName
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'patientName',
                                                                e.target.value
                                                            )
                                                        }
                                                        className='rounded-none border-gray-300 focus-visible:ring-0'
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.gt'
                                                        )}{' '}
                                                        <span className='text-red-500'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Select
                                                        value={
                                                            formData.patientGender
                                                        }
                                                        onValueChange={(v) =>
                                                            handleInputChange(
                                                                'patientGender',
                                                                v
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger className='rounded-none border-gray-300 focus:ring-0'>
                                                            <SelectValue
                                                                placeholder={t(
                                                                    'bookingAppointment.cgt'
                                                                )}
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-white rounded-none border-none'>
                                                            <SelectItem value='1'>
                                                                {t(
                                                                    'bookingAppointment.na'
                                                                )}
                                                            </SelectItem>
                                                            <SelectItem value='0'>
                                                                {t(
                                                                    'bookingAppointment.fm'
                                                                )}
                                                            </SelectItem>
                                                            <SelectItem value='2'>
                                                                {t(
                                                                    'bookingAppointment.ot'
                                                                )}
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    {t(
                                                        'bookingAppointment.sdt'
                                                    )}{' '}
                                                    <span className='text-red-500'>
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        formData.patientPhone
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'patientPhone',
                                                            e.target.value
                                                        )
                                                    }
                                                    className='rounded-none border-gray-300 focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    Email{' '}
                                                    <span className='text-red-500'>
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        formData.patientEmail
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'patientEmail',
                                                            e.target.value
                                                        )
                                                    }
                                                    className='rounded-none border-gray-300 focus-visible:ring-0'
                                                />
                                            </div>

                                            {/* Responsive Row: DOB + Ethnicity */}
                                            <div className='flex flex-col sm:flex-row gap-4 lg:gap-5'>
                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.bd'
                                                        )}{' '}
                                                        <span className='text-red-500'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <div className='relative'>
                                                        <Input
                                                            type='date'
                                                            placeholder='dd/mm/yyyy'
                                                            value={
                                                                formData.patientDob
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    'patientDob',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className='rounded-none border-gray-300 focus-visible:ring-0'
                                                            id='nsinput'
                                                        />
                                                        <button
                                                            type='button'
                                                            className='absolute right-3 bottom-2 text-xl text-gray-500 cursor-pointer hover:text-blue-500'
                                                            onClick={() => {
                                                                (
                                                                    document.getElementById(
                                                                        'nsinput'
                                                                    ) as HTMLInputElement
                                                                )?.showPicker();
                                                            }}
                                                        >
                                                            <IoCalendarOutline />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                                                    <Label>
                                                        {t(
                                                            'bookingAppointment.dt'
                                                        )}{' '}
                                                        <span className='text-red-500'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        type='text'
                                                        value={
                                                            formData.patientEthnicity
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'patientEthnicity',
                                                                e.target.value
                                                            )
                                                        }
                                                        className='rounded-none border-gray-300 focus-visible:ring-0'
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <AddressSelector
                                                    label={t(
                                                        'bookingAppointment.ad'
                                                    )}
                                                    value={addressData}
                                                    onChange={(newAddress) =>
                                                        setAddressData(
                                                            newAddress
                                                        )
                                                    }
                                                    isDark={isDark}
                                                    inputClass='rounded-none border-gray-300 focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    {t(
                                                        'bookingAppointment.ldk'
                                                    )}{' '}
                                                    <span className='text-red-500'>
                                                        *
                                                    </span>
                                                </Label>
                                                <Textarea
                                                    value={formData.reason}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'reason',
                                                            e.target.value
                                                        )
                                                    }
                                                    className='rounded-none border-gray-300 focus-visible:ring-0'
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        className='w-full mt-4 border rounded-none text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300 h-12 text-base'
                                        onClick={handleBooking}
                                    >
                                        {t('bookingAppointment.xndl')}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
