import { ThemeContext } from '@/shared/contexts/ThemeContext';
import {
    fetchReceptionistAppointments,
    selectAppointment,
    type IAppointment
} from '@/shared/stores/appointmentSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { Select, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

const GROUP_KEY = 'history_appointments';

export default function HistoryAppointment() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();

    // Lấy data từ Redux store theo group key
    const { groups } = useAppSelector(selectAppointment);
    const currentGroupData = groups[GROUP_KEY] || {
        list: [],
        meta: { totalRows: 0, limit: 10, page: 1, totalPages: 0 },
        loading: false
    };

    const {
        list: appointments,
        loading: tableLoading,
        meta
    } = currentGroupData;

    const totalAppointments = meta.totalRows;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60
        },
        {
            title: 'Người đặt lịch',
            key: 'book',
            render: (_: any, record: IAppointment) => (
                <div className='flex flex-col'>
                    <span className='font-semibold'>
                        {record.patient.user.name}
                    </span>
                    <span className='text-xs text-gray-500'>
                        {record.patient.user.phone}
                    </span>
                    <span className='text-xs text-gray-500'>
                        {record.patient.user.email}
                    </span>
                </div>
            )
        },
        {
            title: 'Thông tin bệnh nhân',
            key: 'patient',
            render: (_: any, record: IAppointment) => (
                <div className='flex flex-col'>
                    <span className='font-semibold'>{record.patientName}</span>
                    <span className='text-xs text-gray-500'>
                        {record.patientPhone}
                    </span>
                    <span className='text-xs text-gray-400'>
                        {record.patientGender === '1' ? 'Nam' : 'Nữ'} -{' '}
                        {dayjs(record.patientDob).format('DD/MM/YYYY')}
                    </span>
                </div>
            )
        },
        {
            title: 'Loại lịch hẹn',
            key: 'info',
            render: (_: any, record: IAppointment) => {
                if (record.type === 'doctor') {
                    return (
                        <div className='flex flex-col'>
                            <span className='text-blue-600 font-medium'>
                                Khám bác sĩ
                            </span>
                            <span>{record.doctor?.user?.name}</span>
                            <span className='text-xs text-gray-500'>
                                {record.doctor?.specialty?.name}
                            </span>
                        </div>
                    );
                }
                return (
                    <div className='flex flex-col'>
                        <span className='text-green-600 font-medium'>
                            Dịch vụ
                        </span>
                        <span>{record.service?.name}</span>
                    </div>
                );
            }
        },
        {
            title: 'Thời gian khám',
            key: 'time',
            align: 'center' as const,
            width: 180,
            render: (_: any, record: IAppointment) => {
                const start = dayjs(record.slot.startTime);
                const end = dayjs(record.slot.endTime);
                return (
                    <div className='flex flex-col'>
                        <span className='font-bold text-base'>
                            {start.format('HH:mm')} - {end.format('HH:mm')}
                        </span>
                        <span>{start.format('DD/MM/YYYY')}</span>
                    </div>
                );
            }
        },
        {
            title: 'Thanh toán',
            key: 'payment',
            align: 'center' as const,
            render: (_: any, record: IAppointment) => (
                <div className='flex flex-col'>
                    <span>
                        Tổng:{' '}
                        {Number(record.finalPrice).toLocaleString('vi-VN')} đ
                    </span>
                    <span className='text-xs text-green-600'>
                        Đã cọc:{' '}
                        {Number(record.deposited).toLocaleString('vi-VN')} đ
                    </span>
                </div>
            )
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (status: string) => {
                let color = 'default';
                let text = status;

                switch (status) {
                    case 'pending':
                        color = 'yellow';
                        text = 'Chờ đặt cọc';
                        break;
                    case 'deposited':
                        color = 'processing';
                        text = 'Đã đặt cọc';
                        break;
                    case 'confirmed':
                        color = 'blue';
                        text = 'Đã xác nhận';
                        break;
                    case 'checked_in':
                        color = 'warning';
                        text = 'Chờ khám';
                        break;
                    case 'examining':
                        color = 'purple';
                        text = 'Đang khám';
                        break;
                    case 'completed':
                        color = 'success';
                        text = 'Hoàn tất';
                        break;
                    case 'cancelled':
                        color = 'error';
                        text = 'Đã hủy';
                        break;
                }
                return <Tag color={color}>{text}</Tag>;
            }
        }
    ];

    useEffect(() => {
        dispatch(
            fetchReceptionistAppointments({
                page: currentPage,
                limit: pageSize,
                status: undefined, // QUAN TRỌNG: undefined để lấy tất cả trạng thái
                date: undefined, // QUAN TRỌNG: undefined để lấy tất cả ngày
                groupKey: GROUP_KEY
            })
        );
    }, [dispatch, currentPage, pageSize]);

    return (
        <div className='m-5 h-screen'>
            <div
                className={`text-2xl uppercase pb-2 ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                Lịch sử cuộc hẹn
            </div>

            <div className={`p-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='flex gap-5 mb-5'>
                    <Select
                        defaultValue={pageSize.toString()}
                        style={{ width: 70 }}
                        options={[
                            { value: '10', label: '10' },
                            { value: '25', label: '25' },
                            { value: '50', label: '50' },
                            { value: '100', label: '100' }
                        ]}
                        onChange={handlePageSizeChange}
                    />
                    <div
                        className={`flex items-center text-base text-center ${
                            isDark ? 'text-gray-100' : 'text-neutral-900'
                        }`}
                    >
                        Số mục mỗi trang
                    </div>
                </div>

                <div className={isDark ? 'text-black' : 'text-blue-500'}>
                    <Table
                        loading={tableLoading}
                        rowKey='id'
                        dataSource={appointments}
                        columns={columns}
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={totalAppointments}
                                pageSize={pageSize}
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                isDark={isDark}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
