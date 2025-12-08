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
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    AddressSelector,
    type AddressValue
} from '../components/AddressSelector';

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
        patientNationality: '',
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
                patientNationality,
                patientAddress,
                reason
            } = formData;

            if (
                !patientName ||
                !patientGender ||
                !patientPhone ||
                !patientEmail ||
                !patientDob ||
                !patientNationality ||
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
                patientNationality: formData.patientNationality,
                patientAddress: formData.patientAddress
            };
        }

        try {
            setIsLoading(true);

            const res = await bookingAppointment(payload);

            console.log(res);

            if (res && res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
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
                    px-4 lg:px-20 w-screen py-5 my-5
                    ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
                `}
                >
                    <h1 className='text-3xl text-center pt-3 pb-6'>Booking</h1>
                    <div className='flex justify-between gap-10'>
                        <div className='flex flex-col w-1/3 gap-5'>
                            <h1 className='text-xl text-center p-5'>
                                Booking Summary
                            </h1>
                            <div className='flex border border-gray-200 p-5 gap-5 items-center'>
                                <img
                                    src='https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-02.jpg'
                                    alt=''
                                    className='w-20'
                                />
                                <div className='flex flex-col'>
                                    <div className='text-blue-500'>
                                        <span>{doctorInfo?.degree}, </span>Bác
                                        sĩ <span>{doctorInfo?.doctorName}</span>
                                    </div>
                                    <div>
                                        Chuyen khoa:{' '}
                                        <span>{doctorInfo?.specialty}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col border border-gray-200 p-5 gap-1'>
                                <div className='flex'>
                                    <span className='flex-1'>
                                        Booking Date:
                                    </span>
                                    <span className='flex-1 text-gray-600'>
                                        {doctorInfo?.date}
                                    </span>
                                </div>

                                <div className='flex'>
                                    <span className='flex-1'>
                                        Booking Time:
                                    </span>
                                    <span className='flex-1 text-gray-600'>
                                        {doctorInfo?.time}
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col border border-gray-200 p-5 gap-1'>
                                <div className='flex'>
                                    <span className='flex-1'>Booking fee:</span>
                                    <span className='flex-1 text-gray-600'>
                                        free
                                    </span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>
                                        Examination fee:
                                    </span>
                                    <span className='flex-1 text-gray-600'>
                                        {doctorInfo?.price} VND
                                    </span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>Total:</span>
                                    <span className='flex-1 text-gray-600'>
                                        {doctorInfo?.price} VND
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col w-3/5'>
                            <Card className='w-full p-6 border rounded-none border-gray-200'>
                                <CardContent className='flex flex-col gap-6'>
                                    <RadioGroup
                                        defaultValue='self'
                                        onValueChange={(v) => setMode(v)}
                                        className='flex gap-5 text-blue-500'
                                    >
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem
                                                value='self'
                                                id='self'
                                                className='data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer'
                                            />
                                            <Label
                                                htmlFor='self'
                                                className='cursor-pointer'
                                            >
                                                Đặt cho bản thân
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
                                                className='cursor-pointer'
                                            >
                                                Đặt cho người thân
                                            </Label>
                                        </div>
                                    </RadioGroup>

                                    {mode === 'self' && profile && (
                                        <div className='flex flex-col gap-5'>
                                            <div className='flex gap-5'>
                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>Họ tên</Label>
                                                    <Input
                                                        type='text'
                                                        value={
                                                            profile.user
                                                                ?.name || ''
                                                        }
                                                        readOnly
                                                        disabled
                                                        className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>Giới tính</Label>
                                                    <Select
                                                        value={profile.gender}
                                                        disabled
                                                    >
                                                        <SelectTrigger className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-white rounded-none border-none'>
                                                            <SelectItem value='1'>
                                                                Nam
                                                            </SelectItem>
                                                            <SelectItem value='0'>
                                                                Nu
                                                            </SelectItem>
                                                            <SelectItem value='2'>
                                                                Khác
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>Số điện thoại</Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.phone ||
                                                        ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>Địa chỉ Email</Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.email ||
                                                        ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex gap-5'>
                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>Ngày sinh</Label>
                                                    <Input
                                                        type='text'
                                                        value={formatDateDisplay(
                                                            profile.dob
                                                        )}
                                                        readOnly
                                                        disabled
                                                        className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                    />
                                                </div>

                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>Dân tộc</Label>
                                                    <Input
                                                        type='text'
                                                        value={
                                                            profile.ethnicity ||
                                                            ''
                                                        }
                                                        readOnly
                                                        disabled
                                                        className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>Địa chỉ</Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.address || ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    Lý do khám{' '}
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
                                                    className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {mode === 'other' && profile && (
                                        <div className='flex flex-col gap-5'>
                                            <h1 className='text-center font-semibold uppercase'>
                                                Thông tin người đặt lịch
                                            </h1>
                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    Họ tên người đặt lịch
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.name || ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    Số điện thoại người đặt lịch
                                                </Label>
                                                <Input
                                                    type='text'
                                                    value={
                                                        profile.user?.phone ||
                                                        ''
                                                    }
                                                    readOnly
                                                    disabled
                                                    className='rounded-none border-gray-300 bg-gray-100 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>

                                            <h1 className='text-center font-semibold uppercase pt-5'>
                                                Thông tin bệnh nhân
                                            </h1>

                                            <div className='flex gap-5'>
                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>
                                                        Họ tên bệnh nhân{' '}
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
                                                        className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>
                                                        Giới tính{' '}
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
                                                        <SelectTrigger className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'>
                                                            <SelectValue placeholder='Chọn giới tính' />
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-white rounded-none border-none'>
                                                            <SelectItem
                                                                value='1'
                                                                className='cursor-pointer hover:bg-gray-200 rounded-none'
                                                            >
                                                                Nam
                                                            </SelectItem>
                                                            <SelectItem
                                                                value='0'
                                                                className='cursor-pointer hover:bg-gray-200 rounded-none'
                                                            >
                                                                Nữ
                                                            </SelectItem>
                                                            <SelectItem
                                                                value='2'
                                                                className='cursor-pointer hover:bg-gray-200 rounded-none'
                                                            >
                                                                Khác
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    Số điện thoại{' '}
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
                                                    className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    Địa chỉ Email{' '}
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
                                                    className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex gap-5'>
                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>
                                                        Ngày sinh{' '}
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
                                                            className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
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

                                                <div className='flex flex-col gap-2 w-1/2'>
                                                    <Label>
                                                        Dân tộc{' '}
                                                        <span className='text-red-500'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        type='text'
                                                        value={
                                                            formData.patientNationality
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'patientNationality',
                                                                e.target.value
                                                            )
                                                        }
                                                        className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <AddressSelector
                                                    label='Địa chỉ'
                                                    value={addressData}
                                                    onChange={(newAddress) =>
                                                        setAddressData(
                                                            newAddress
                                                        )
                                                    }
                                                    isDark={isDark}
                                                    inputClass='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label>
                                                    Lý do khám{' '}
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
                                                    className='rounded-none border-gray-300 focus:outline-none focus-visible:ring-0'
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        className='w-full mt-4 border rounded-none text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300'
                                        onClick={handleBooking}
                                    >
                                        Xác nhận đặt lịch
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
