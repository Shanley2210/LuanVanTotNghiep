import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { fakePayment } from '@/shared/apis/patientService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import {
    fetchAppointments,
    selectAppointment
} from '@/shared/stores/appointmentSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { useContext, useEffect, useState } from 'react';
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

const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(Number(amount));
};
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
};
const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default function PatientAppointment() {
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');
    const dispatch = useAppDispatch();
    const { list } = useAppSelector(selectAppointment);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const handlePaymentDeposit = async (item: any) => {
        try {
            const res = await fakePayment(Number(item.id));
            if (res && res.data && res.data.errCode === 0) {
                toast.success('Thanh toán thành công');
                dispatch(fetchAppointments({ page: 1, limit: 10 }));
            } else {
                toast.error('Thanh toán thất bại');
            }
            console.log(res);
        } catch (e: any) {
            console.log(e);
        }
    };

    useEffect(() => {
        dispatch(fetchAppointments({ page: 1, limit: 10 }));
    }, [dispatch]);

    return (
        <>
            <div
                className={`
                    flex flex-col px-4 lg:px-20 w-screen py-5 my-5
                    ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
                `}
            >
                <div className='flex items-center gap-1'>
                    <AiOutlineHome
                        className='text-xl cursor-pointer text-blue-500'
                        onClick={() => navigate('/')}
                    />
                    <IoIosArrowForward />
                    <span className='line-clamp-1'>Lịch hẹn</span>
                </div>

                <div className='flex flex-col gap-5 pt-5'>
                    <div className='border border-gray-200 p-5 gap-1 flex flex-col'>
                        <h1 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-0'>
                            Lịch hẹn của tôi
                        </h1>
                        <div className='flex gap-5 flex-wrap p-5 border-b border-blue-300'>
                            <Button
                                className={getTabClass('upcoming')}
                                onClick={() => setActiveTab('upcoming')}
                            >
                                Sắp tới
                            </Button>
                            <Button
                                className={getTabClass('cancelled')}
                                onClick={() => setActiveTab('cancelled')}
                            >
                                Đã hủy
                            </Button>
                            <Button
                                className={getTabClass('completed')}
                                onClick={() => setActiveTab('completed')}
                            >
                                Hoàn thành
                            </Button>
                        </div>

                        <div className='p-5 flex flex-col gap-4'>
                            {activeTab === 'upcoming' &&
                                list.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className='grid grid-cols-1 lg:grid-cols-12 gap-4 w-full border border-blue-500 p-3 items-center'
                                    >
                                        <div className='lg:col-span-4 flex gap-2'>
                                            <img
                                                src={
                                                    item.doctor?.image ||
                                                    'https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-06.jpg'
                                                }
                                                alt='Doctor'
                                                className='w-15 h-15 object-cover rounded'
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
                                            {item.status === 'pending' && (
                                                <>
                                                    <MdOutlineEdit className='text-xl cursor-pointer text-yellow-500 hover:text-yellow-700 transition-colors' />
                                                    <MdOutlineCancel className='text-xl cursor-pointer text-red-500 hover:text-red-700 transition-colors' />
                                                </>
                                            )}
                                        </div>

                                        <div className='lg:col-span-3 flex gap-3 items-center justify-between lg:justify-end'>
                                            <div className='flex flex-col text-sm text-gray-600 items-start lg:items-end'>
                                                <span className='text-blue-600 font-semibold'>
                                                    {item.status === 'pending'
                                                        ? 'Chờ đặt cọc'
                                                        : item.status}
                                                </span>
                                                <span className='text-sm'>
                                                    {formatCurrency(
                                                        item.finalPrice
                                                    )}
                                                </span>
                                            </div>
                                            <Button
                                                className='cursor-pointer border rounded-3xl border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-colors bg-transparent h-8 text-sm px-3'
                                                onClick={() =>
                                                    handlePaymentDeposit(item)
                                                }
                                            >
                                                Thanh toán
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                            {activeTab === 'cancelled' && (
                                <p>Danh sách các lịch hẹn đã bị hủy.</p>
                            )}
                            {activeTab === 'completed' && (
                                <p>Lịch sử các cuộc hẹn đã hoàn tất.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-none'>
                    <DialogHeader>
                        <DialogTitle>Chi tiết cuộc hẹn</DialogTitle>
                        <DialogDescription>
                            Mã cuộc hẹn: #{selectedAppointment?.id}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedAppointment && (
                        <div className='grid gap-4 py-4'>
                            <div className='border-b pb-4'>
                                <h3 className='font-semibold text-lg mb-2 text-blue-600'>
                                    Thông tin Bác sĩ
                                </h3>
                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                    <p>
                                        <span className='font-medium'>
                                            Họ tên:
                                        </span>{' '}
                                        {selectedAppointment.doctor?.user?.name}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Chuyên khoa:
                                        </span>{' '}
                                        {
                                            selectedAppointment.doctor
                                                ?.specialty?.name
                                        }
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Email:
                                        </span>{' '}
                                        {
                                            selectedAppointment.doctor?.user
                                                ?.email
                                        }
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            SĐT:
                                        </span>{' '}
                                        {
                                            selectedAppointment.doctor?.user
                                                ?.phone
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className='border-b pb-4'>
                                <h3 className='font-semibold text-lg mb-2 text-blue-600'>
                                    Thông tin Bệnh nhân
                                </h3>
                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                    <p>
                                        <span className='font-medium'>
                                            Người khám:
                                        </span>{' '}
                                        {selectedAppointment.patientName}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Ngày sinh:
                                        </span>{' '}
                                        {formatDate(
                                            selectedAppointment.patientDob
                                        )}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Giới tính:
                                        </span>{' '}
                                        {selectedAppointment.patientGender ===
                                        '1'
                                            ? 'Nữ'
                                            : 'Nam'}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Dân tộc:
                                        </span>{' '}
                                        {selectedAppointment.patientEthnicity}
                                    </p>
                                    <p className='col-span-2'>
                                        <span className='font-medium'>
                                            Địa chỉ:
                                        </span>{' '}
                                        {selectedAppointment.patientAddress}
                                    </p>
                                    <p className='col-span-2'>
                                        <span className='font-medium'>
                                            Lý do khám:
                                        </span>{' '}
                                        {selectedAppointment.reason}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className='font-semibold text-lg mb-2 text-blue-600'>
                                    Chi tiết Lịch hẹn
                                </h3>
                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                    <p>
                                        <span className='font-medium'>
                                            Ngày khám:
                                        </span>{' '}
                                        {formatDate(
                                            selectedAppointment.slot?.startTime
                                        )}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Giờ khám:
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
                                            Loại dịch vụ:
                                        </span>{' '}
                                        {selectedAppointment.service
                                            ? selectedAppointment.service.name
                                            : 'Khám bác sĩ'}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Trạng thái:
                                        </span>{' '}
                                        {selectedAppointment.status}
                                    </p>
                                    <p>
                                        <span className='font-medium'>
                                            Tiền đặt cọc:
                                        </span>{' '}
                                        {formatCurrency(
                                            selectedAppointment.deposit
                                        )}
                                    </p>
                                    <p>
                                        <span className='font-medium text-red-600'>
                                            Tổng tiền:
                                        </span>{' '}
                                        <span className='font-bold text-red-600'>
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
        </>
    );
}
