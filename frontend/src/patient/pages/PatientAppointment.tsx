import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { cancelAppointment, fakePayment } from '@/shared/apis/patientService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import {
    fetchAppointments,
    selectAppointment
} from '@/shared/stores/appointmentSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import {
    MdOutlineCancel,
    MdOutlineDateRange,
    MdOutlineEdit,
    MdOutlineEmail,
    MdOutlineLocalPhone,
    MdOutlineRemoveRedEye
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditAppointmentModal from '../containers/EditAppointmentModal';
import LoadingCommon from '@/shared/components/LoadingCommon';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const STATUS_GROUPS = {
    UPCOMING: [
        'pending',
        'deposited',
        'confirm',
        'confirmed',
        'checked_in',
        'check_in'
    ],
    COMPLETED: ['completed', 'complete', 'checked_out', 'check_out'],
    CANCELLED: ['cancelled', 'cancel']
};

const getStatusColorClass = (status: string) => {
    const normalizedStatus = status?.toLowerCase()?.trim();
    switch (normalizedStatus) {
        case 'pending':
            return 'text-amber-500';
        case 'deposited':
            return 'text-cyan-500';
        case 'confirmed':
            return 'text-blue-500';
        case 'checked_in':
            return 'text-purple-500';
        case 'completed':
        case 'complete':
            return 'text-green-500';
        case 'checked_out':
            return 'text-gray-600';
        case 'cancelled':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
};

export default function PatientAppointment() {
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');
    const dispatch = useAppDispatch();
    const { list } = useAppSelector(selectAppointment);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const [isLoading, setIsLoading] = useState(false);
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
    const [itemToCancel, setItemToCancel] = useState<any>(null);

    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat(currentLang === 'en' ? 'en-US' : 'vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(Number(amount));
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(
            currentLang === 'en' ? 'en-US' : 'vi-VN'
        );
    };

    const formatTime = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getStatusLabel = (status: string) => {
        const normalizedStatus = status?.toLowerCase()?.trim();
        switch (normalizedStatus) {
            case 'pending':
                return t('patientAppointment.statusPending');
            case 'deposited':
                return t('patientAppointment.statusDeposited');
            case 'confirmed':
                return t('patientAppointment.statusConfirmed');
            case 'checked_in':
                return t('patientAppointment.statusCheckedIn');
            case 'checked_out':
                return t('patientAppointment.statusCheckedOut');
            case 'completed':
                return t('patientAppointment.statusCompleted');
            case 'cancelled':
                return t('patientAppointment.statusCancelled');
            default:
                return status;
        }
    };

    const getTabClass = (tabName: string) => {
        const baseClass =
            'border w-35 rounded-none text-center border-blue-500 px-5 py-1 cursor-pointer transition-colors';
        const activeClass = 'bg-blue-500 text-white';
        const inactiveClass = 'text-blue-500 hover:bg-blue-100';

        return `${baseClass} ${
            activeTab === tabName ? activeClass : inactiveClass
        }`;
    };

    const handleViewDetail = (item: any) => {
        setSelectedAppointment(item);
        setIsDialogOpen(true);
    };
    const handleUpdateAppointment = (item: any) => {
        setSelectedAppointment(item);
        setIsEditModalOpen(true);
    };
    const handleEditSuccess = () => {
        dispatch(fetchAppointments({ page: 1, limit: 10 }));
    };
    const handleCancelAppointment = async (id: number) => {
        setItemToCancel(id);
        setIsCancelConfirmOpen(true);
    };

    const handleConfirmCancel = async () => {
        if (itemToCancel) {
            try {
                setIsLoading(true);
                const res = await cancelAppointment(itemToCancel);
                if (res && res.data && res.data.errCode === 0) {
                    toast.success(
                        currentLang === 'vi'
                            ? res.data.viMessage
                            : res.data.enMessage
                    );
                    dispatch(fetchAppointments({ page: 1, limit: 10 }));
                } else {
                    toast.error(
                        currentLang === 'vi'
                            ? res?.data?.errViMessage || 'Có lỗi xảy ra'
                            : res?.data?.errEnMessage || 'An error occurred'
                    );
                }
            } catch (e: any) {
                console.log(e);
                toast.error(
                    currentLang === 'vi' ? 'Lỗi server' : 'Server error'
                );
            } finally {
                setIsLoading(false);
                setIsCancelConfirmOpen(false);
            }
        }
    };
    const handlePaymentDeposit = async (item: any) => {
        try {
            const res = await fakePayment(Number(item.id));
            if (res && res.data && res.data.errCode === 0) {
                toast.success(t('patientAppointment.paymentSuccess'));
                dispatch(fetchAppointments({ page: 1, limit: 10 }));
            } else {
                toast.error(t('patientAppointment.paymentFailed'));
            }
        } catch (e: any) {
            console.log(e);
        }
    };

    useEffect(() => {
        dispatch(fetchAppointments({ page: 1, limit: 10 }));
    }, [dispatch]);

    const filteredList =
        list?.filter((item: any) => {
            if (!item.status) return false;
            const status = item.status.toLowerCase().trim();

            if (activeTab === 'upcoming') {
                return STATUS_GROUPS.UPCOMING.includes(status);
            }
            if (activeTab === 'cancelled') {
                return STATUS_GROUPS.CANCELLED.includes(status);
            }
            if (activeTab === 'completed') {
                return STATUS_GROUPS.COMPLETED.includes(status);
            }
            return false;
        }) || [];

    return (
        <>
            <div
                className={`
                    flex flex-col px-4 lg:px-20 w-screen py-5 my-5
                    ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
                `}
            >
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <AiOutlineHome
                            className='text-xl cursor-pointer text-blue-500'
                            onClick={() => navigate('/')}
                        />
                        <IoIosArrowForward />
                        <span className='line-clamp-1'>
                            {t('patientAppointment.breadcrumb')}
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-5 pt-5'>
                    <div className='border border-gray-200 p-5 gap-1 flex flex-col'>
                        <h1 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-0'>
                            {t('patientAppointment.title')}
                        </h1>
                        <div className='flex gap-5 flex-wrap p-5 border-b border-blue-300'>
                            <Button
                                className={getTabClass('upcoming')}
                                onClick={() => setActiveTab('upcoming')}
                            >
                                {t('patientAppointment.tabUpcoming')}
                            </Button>
                            <Button
                                className={getTabClass('cancelled')}
                                onClick={() => setActiveTab('cancelled')}
                            >
                                {t('patientAppointment.tabCancelled')}
                            </Button>
                            <Button
                                className={getTabClass('completed')}
                                onClick={() => setActiveTab('completed')}
                            >
                                {t('patientAppointment.tabCompleted')}
                            </Button>
                        </div>

                        <div
                            className='p-5 flex flex-col gap-4'
                            key={activeTab}
                        >
                            {filteredList.length > 0 ? (
                                filteredList.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className='grid grid-cols-1 lg:grid-cols-12 gap-4 w-full border border-blue-500 p-3 items-center'
                                    >
                                        <div className='lg:col-span-4 flex gap-2'>
                                            <img
                                                src={
                                                    item.doctor?.image
                                                        ? BACKEND_URL +
                                                          item.doctor.image
                                                        : 'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-06.jpg'
                                                }
                                                alt='Doctor'
                                                className='w-15 h-15 object-cover'
                                            />
                                            <div className='flex items-center'>
                                                <div className='flex flex-col'>
                                                    <span className='font-medium line-clamp-1'>
                                                        BS.{' '}
                                                        {
                                                            item.doctor?.user
                                                                ?.name
                                                        }
                                                    </span>
                                                    <span className='text-blue-500 text-xs line-clamp-1'>
                                                        {
                                                            item.doctor
                                                                ?.specialty
                                                                ?.name
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='lg:col-span-2 flex flex-col text-sm text-gray-600'>
                                            <div className='flex items-center gap-2'>
                                                <MdOutlineEmail />
                                                <span className='truncate'>
                                                    {item.patientEmail}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <MdOutlineLocalPhone />
                                                <span>{item.patientPhone}</span>
                                            </div>
                                        </div>

                                        <div className='lg:col-span-2 flex flex-col text-sm text-gray-600'>
                                            <div className='flex items-center gap-2'>
                                                <MdOutlineDateRange />
                                                <span>
                                                    {formatDate(
                                                        item.slot?.startTime
                                                    )}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <FiClock />
                                                <span>
                                                    {formatTime(
                                                        item.slot?.startTime
                                                    )}{' '}
                                                    -{' '}
                                                    {formatTime(
                                                        item.slot?.endTime
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className='lg:col-span-1 flex gap-2 items-center justify-start lg:justify-center'>
                                            <MdOutlineRemoveRedEye
                                                className='size-6 cursor-pointer text-blue-500 hover:text-blue-700 transition-colors'
                                                onClick={() =>
                                                    handleViewDetail(item)
                                                }
                                            />
                                            {(item.status === 'pending' ||
                                                item.status ===
                                                    'deposited') && (
                                                <>
                                                    <MdOutlineEdit
                                                        className='text-xl cursor-pointer text-yellow-500 hover:text-yellow-700 transition-colors'
                                                        onClick={() =>
                                                            handleUpdateAppointment(
                                                                item
                                                            )
                                                        }
                                                    />
                                                    <MdOutlineCancel
                                                        className='text-xl cursor-pointer text-red-500 hover:text-red-700 transition-colors'
                                                        onClick={() =>
                                                            handleCancelAppointment(
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>

                                        <div className='lg:col-span-3 flex gap-3 items-center justify-between lg:justify-end'>
                                            <div className='flex flex-col text-sm text-gray-600 items-start lg:items-end'>
                                                <span
                                                    className={`font-semibold ${getStatusColorClass(
                                                        item.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(
                                                        item.status
                                                    )}
                                                </span>
                                                <span className='text-sm'>
                                                    {formatCurrency(
                                                        item.finalPrice
                                                    )}
                                                </span>
                                            </div>
                                            {item.status === 'pending' && (
                                                <Button
                                                    className='cursor-pointer border rounded-3xl border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-colors bg-transparent h-8 text-sm px-3'
                                                    onClick={() =>
                                                        handlePaymentDeposit(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {t(
                                                        'patientAppointment.actionPayment'
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='text-center text-gray-500'>
                                    {t('patientAppointment.noData')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent
                    className={`
                        sm:max-w-[600px] max-h-screen overflow-y-auto rounded-none!
                        ${
                            isDark
                                ? 'bg-gray-900 text-white border-gray-700'
                                : 'bg-white text-black'
                        }
                    `}
                >
                    <DialogHeader>
                        <DialogTitle className={isDark ? 'text-white' : ''}>
                            {t('patientAppointment.dialogTitle')}
                        </DialogTitle>
                        <DialogDescription
                            className={
                                isDark ? 'text-gray-400' : 'text-gray-500'
                            }
                        >
                            {t('patientAppointment.dialogId')}: #
                            {selectedAppointment?.id}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedAppointment && (
                        <div className='grid gap-4 py-4'>
                            <div
                                className={`border-b pb-4 ${
                                    isDark
                                        ? 'border-gray-700'
                                        : 'border-gray-200'
                                }`}
                            >
                                <h3
                                    className={`font-semibold text-lg mb-2 ${
                                        isDark
                                            ? 'text-blue-400'
                                            : 'text-blue-600'
                                    }`}
                                >
                                    {t('patientAppointment.doctorInfoTitle')}
                                </h3>
                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                    <p>
                                        <span className='font-medium'>
                                            {t('patientAppointment.labelName')}
                                        </span>{' '}
                                        {selectedAppointment.doctor?.user?.name}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelSpecialty'
                                            )}
                                        </span>{' '}
                                        {
                                            selectedAppointment.doctor
                                                ?.specialty?.name
                                        }
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t('patientAppointment.labelEmail')}
                                        </span>{' '}
                                        {
                                            selectedAppointment.doctor?.user
                                                ?.email
                                        }
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t('patientAppointment.labelPhone')}
                                        </span>{' '}
                                        {
                                            selectedAppointment.doctor?.user
                                                ?.phone
                                        }
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`border-b pb-4 ${
                                    isDark
                                        ? 'border-gray-700'
                                        : 'border-gray-200'
                                }`}
                            >
                                <h3
                                    className={`font-semibold text-lg mb-2 ${
                                        isDark
                                            ? 'text-blue-400'
                                            : 'text-blue-600'
                                    }`}
                                >
                                    {t('patientAppointment.patientInfoTitle')}
                                </h3>
                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                    <p>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelPatientName'
                                            )}
                                        </span>{' '}
                                        {selectedAppointment.patientName}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t('patientAppointment.labelDob')}
                                        </span>{' '}
                                        {formatDate(
                                            selectedAppointment.patientDob
                                        )}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelGender'
                                            )}
                                        </span>{' '}
                                        {selectedAppointment.patientGender ===
                                        '1'
                                            ? t(
                                                  'patientAppointment.genderFemale'
                                              )
                                            : t(
                                                  'patientAppointment.genderMale'
                                              )}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelEthnicity'
                                            )}
                                        </span>{' '}
                                        {selectedAppointment.patientEthnicity}
                                    </p>
                                    <p className='col-span-2'>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelAddress'
                                            )}
                                        </span>{' '}
                                        {selectedAppointment.patientAddress}
                                    </p>
                                    <p className='col-span-2'>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelReason'
                                            )}
                                        </span>{' '}
                                        {selectedAppointment.reason}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3
                                    className={`font-semibold text-lg mb-2 ${
                                        isDark
                                            ? 'text-blue-400'
                                            : 'text-blue-600'
                                    }`}
                                >
                                    {t(
                                        'patientAppointment.appointmentDetailsTitle'
                                    )}
                                </h3>
                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                    <p>
                                        <span className='font-medium'>
                                            {t('patientAppointment.labelDate')}
                                        </span>{' '}
                                        {formatDate(
                                            selectedAppointment.slot?.startTime
                                        )}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t('patientAppointment.labelTime')}
                                        </span>{' '}
                                        {formatTime(
                                            selectedAppointment.slot?.startTime
                                        )}{' '}
                                        -{' '}
                                        {formatTime(
                                            selectedAppointment.slot?.endTime
                                        )}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelService'
                                            )}
                                        </span>{' '}
                                        {selectedAppointment.service
                                            ? selectedAppointment.service.name
                                            : t(
                                                  'patientAppointment.defaultService'
                                              )}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelStatus'
                                            )}
                                        </span>{' '}
                                        <span
                                            className={getStatusColorClass(
                                                selectedAppointment.status
                                            )}
                                        >
                                            {getStatusLabel(
                                                selectedAppointment.status
                                            )}
                                        </span>
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            {t(
                                                'patientAppointment.labelDeposit'
                                            )}
                                        </span>{' '}
                                        {formatCurrency(
                                            selectedAppointment.deposit
                                        )}
                                    </p>
                                    <p>
                                        <span
                                            className={`font-medium ${
                                                isDark
                                                    ? 'text-red-400'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {t('patientAppointment.labelTotal')}
                                        </span>{' '}
                                        <span
                                            className={`font-bold ${
                                                isDark
                                                    ? 'text-red-400'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {formatCurrency(
                                                selectedAppointment.finalPrice
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {selectedAppointment && (
                <EditAppointmentModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    appointmentData={selectedAppointment}
                    onSuccess={handleEditSuccess}
                />
            )}

            {isLoading ? (
                <LoadingCommon />
            ) : (
                <Dialog
                    open={isCancelConfirmOpen}
                    onOpenChange={setIsCancelConfirmOpen}
                >
                    <DialogContent
                        className={`rounded-none! ${
                            isDark
                                ? 'bg-gray-900 text-white border-gray-700'
                                : 'bg-white text-black'
                        }`}
                    >
                        <DialogHeader>
                            <DialogTitle className='text-red-500 font-bold'>
                                {currentLang === 'vi'
                                    ? 'Xác nhận hủy lịch hẹn'
                                    : 'Confirm Cancellation'}
                            </DialogTitle>
                            <DialogDescription
                                className={
                                    isDark ? 'text-gray-300' : 'text-gray-600'
                                }
                            >
                                <div className='flex flex-col gap-2 mt-2'>
                                    <p>
                                        {currentLang === 'vi'
                                            ? 'Bạn có chắc chắn muốn hủy lịch hẹn này không?'
                                            : 'Are you sure you want to cancel this appointment?'}
                                    </p>

                                    <div className='p-3 bg-red-100 border border-red-200 text-red-700 text-sm font-semibold'>
                                        {currentLang === 'vi'
                                            ? 'LƯU Ý QUAN TRỌNG: Nếu hủy lịch hẹn, bạn sẽ KHÔNG được hoàn lại số tiền cọc đã thanh toán.'
                                            : 'IMPORTANT: If you cancel, your deposit will NOT be refunded.'}
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className='flex gap-2 justify-end mt-4'>
                            <Button
                                onClick={() => setIsCancelConfirmOpen(false)}
                                className={`border rounded-none cursor-pointer ${
                                    isDark
                                        ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                                        : ''
                                }`}
                            >
                                {currentLang === 'vi' ? 'Đóng' : 'Close'}
                            </Button>
                            <Button
                                onClick={handleConfirmCancel}
                                className='bg-red-600 hover:bg-red-700 cursor-pointer text-white border-none rounded-none'
                            >
                                {currentLang === 'vi'
                                    ? 'Vẫn hủy'
                                    : 'Confirm Cancel'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
