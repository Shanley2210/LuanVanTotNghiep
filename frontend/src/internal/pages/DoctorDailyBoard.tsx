import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { Table, Tag, Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Users, Clock, Calendar } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiPencilLine } from 'react-icons/ri';
import { BiArrowFromLeft, BiUser } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchDoctorAppointments,
    selectAppointment,
    type IAppointment,
    type IAppointmentGroup
} from '@/shared/stores/appointmentSlice';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

const defaultGroupData: IAppointmentGroup = {
    list: [],
    meta: { page: 1, limit: 10, totalRows: 0, totalPages: 0 },
    loading: false,
    error: null
};

export default function DoctorDailyBoard() {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { groups } = useAppSelector(selectAppointment);
    const getGroup = (key: string) => groups[key] || defaultGroupData;
    const queueData = getGroup('doctor-queue');
    const historyData = getGroup('doctor-history');
    const navigate = useNavigate();

    const fetchGroupData = (
        groupKey: string,
        status: string | undefined,
        page: number
    ) => {
        dispatch(
            fetchDoctorAppointments({
                page,
                limit: 10,
                status,
                date: dayjs().format('YYYY-MM-DD'),
                groupKey
            })
        );
    };

    useEffect(() => {
        fetchGroupData('doctor-queue', 'checked_in', 1);
        fetchGroupData('doctor-history', 'completed', 1);
    }, [dispatch]);

    const commonColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            render: (text: any) => (
                <span className='font-mono text-gray-500'>#{text}</span>
            )
        },
        {
            title: 'Thời gian',
            key: 'time',
            width: 160,
            render: (_: any, record: IAppointment) => {
                const start = dayjs(record.slot?.startTime);
                const end = dayjs(record.slot?.endTime);
                return (
                    <div className='flex flex-col'>
                        <div className='flex items-center gap-1 font-semibold text-blue-600'>
                            <Clock size={14} />
                            {start.isValid()
                                ? start.format('HH:mm')
                                : '--:--'}{' '}
                            - {end.isValid() ? end.format('HH:mm') : '--:--'}
                        </div>
                        <div className='flex items-center gap-1 text-xs text-gray-500'>
                            <Calendar size={12} />
                            {start.isValid() ? start.format('DD/MM/YYYY') : ''}
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Người đặt',
            key: 'booking',
            render: (_: any, record: IAppointment) => (
                <div className='flex flex-col'>
                    <span className='font-medium flex items-center gap-1'>
                        <BiUser />
                        {record.patient?.user?.name || 'Khách vãng lai'}
                    </span>
                    <span className='text-xs text-gray-500 pl-4'>
                        {record.patient?.user?.phone || 'N/A'}
                    </span>
                </div>
            )
        },
        {
            title: 'Bệnh nhân',
            key: 'patient',
            render: (_: any, record: IAppointment) => (
                <div className='flex flex-col'>
                    <span className='font-bold text-base text-gray-800 dark:text-gray-200'>
                        {record.patientName}
                    </span>
                    <div className='text-xs text-gray-500'>
                        <span>
                            {record.patientGender === '1' ? 'Nam' : 'Nữ'}
                        </span>
                        <span className='mx-1'>•</span>
                        <span>
                            {record.patientDob
                                ? dayjs(record.patientDob).format('DD/MM/YYYY')
                                : 'N/A'}
                        </span>
                    </div>

                    {record.reason && (
                        <div className='mt-1 text-xs text-red-500 bg-red-50 px-2 py-0.5 w-fit'>
                            Lý do: {record.reason}
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'Dịch vụ / Loại',
            key: 'info',
            render: (_: any, record: IAppointment) => {
                if (record.type === 'doctor') {
                    return <Tag color='blue'>Khám Bác sĩ</Tag>;
                }
                return (
                    <div>
                        <Tag color='green'>Dịch vụ</Tag>
                        <span className='text-xs mt-1'>
                            {record.service?.name}
                        </span>
                    </div>
                );
            }
        }
    ];

    const columnsQueue = [
        ...commonColumns,
        {
            title: 'Hành động',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IAppointment) => (
                <Tooltip title='Bắt đầu khám'>
                    <div
                        className='flex justify-center cursor-pointer'
                        onClick={() => {
                            navigate(`/doctor/exam/${record.id}`);
                        }}
                    >
                        <BiArrowFromLeft className='text-xl text-blue-500' />
                    </div>
                </Tooltip>
            )
        }
    ];

    const columnsHistory = [
        ...commonColumns,
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IAppointment) => (
                <div className='flex gap-3 justify-center'>
                    <Tooltip title='Xem chi tiết'>
                        <MdOutlineRemoveRedEye className='text-xl text-blue-500 cursor-pointer' />
                    </Tooltip>
                    <Tooltip title='Chỉnh sửa hồ sơ'>
                        <RiPencilLine className='text-xl text-yellow-500 cursor-pointer' />
                    </Tooltip>
                </div>
            )
        }
    ];

    return (
        <div className='m-5 min-h-screen flex flex-col gap-5 pb-10'>
            <div className='flex justify-between items-end'>
                <div>
                    <div
                        className={`text-2xl uppercase font-bold ${
                            isDark ? 'text-gray-100' : 'text-blue-900'
                        }`}
                    >
                        Lịch khám hôm nay
                    </div>
                    <div
                        className={`${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    >
                        {dayjs().format('dddd, DD [tháng] MM [năm] YYYY')}
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Button
                        onClick={() =>
                            fetchGroupData('doctor-queue', 'checked_in', 1)
                        }
                    >
                        Làm mới
                    </Button>
                </div>
            </div>

            <div
                className={`p-5 shadow-sm ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                }`}
            >
                <div className='flex justify-between gap-4'>
                    <div className='flex-1 border-r border-gray-100 last:border-0 text-center'>
                        <div className='text-xs text-gray-500 uppercase font-semibold mb-1'>
                            Hàng đợi (Checked-in)
                        </div>
                        <div className='text-3xl font-bold text-orange-500'>
                            {queueData.meta.totalRows}
                        </div>
                    </div>
                    <div className='flex-1 border-r border-gray-100 last:border-0 text-center'>
                        <div className='text-xs text-gray-500 uppercase font-semibold mb-1'>
                            Đã hoàn thành
                        </div>
                        <div className='text-3xl font-bold text-green-500'>
                            {historyData.meta.totalRows}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`shadow-sm border overflow-hidden ${
                    isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                }`}
            >
                <div
                    className={`px-6 py-4 border-b flex justify-between items-center ${
                        isDark
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-100 bg-blue-50'
                    }`}
                >
                    <h2
                        className={`font-bold text-lg flex items-center gap-2 ${
                            isDark ? 'text-gray-200' : 'text-blue-800'
                        }`}
                    >
                        <Users className='text-blue-600' size={20} /> Danh sách
                        chờ khám
                    </h2>
                </div>

                <Table
                    loading={queueData.loading}
                    rowKey='id'
                    dataSource={queueData.list}
                    columns={columnsQueue}
                    pagination={false}
                    locale={{ emptyText: 'Chưa có bệnh nhân check-in' }}
                    rowClassName={(record, index) =>
                        index % 2 === 0
                            ? isDark
                                ? 'bg-gray-800'
                                : 'bg-white'
                            : isDark
                            ? 'bg-gray-800'
                            : 'bg-gray-50'
                    }
                    footer={() => (
                        <div className='flex justify-end'>
                            <Pagination
                                total={queueData.meta.totalRows}
                                pageSize={queueData.meta.limit}
                                current={queueData.meta.page}
                                onChange={(page) =>
                                    fetchGroupData(
                                        'doctor-queue',
                                        'checked_in',
                                        page
                                    )
                                }
                                isDark={isDark}
                            />
                        </div>
                    )}
                />
            </div>

            <div
                className={`shadow-sm border overflow-hidden ${
                    isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                }`}
            >
                <div
                    className={`px-6 py-4 border-b flex justify-between items-center ${
                        isDark
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-100 bg-gray-50'
                    }`}
                >
                    <h2
                        className={`font-bold text-lg flex items-center gap-2 ${
                            isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                        <Clock className='text-green-600' size={20} /> Lịch sử
                        khám hôm nay
                    </h2>
                </div>

                <Table
                    loading={historyData.loading}
                    rowKey='id'
                    dataSource={historyData.list}
                    columns={columnsHistory}
                    pagination={false}
                    locale={{ emptyText: 'Chưa có lượt khám nào hoàn thành' }}
                    footer={() => (
                        <div className='flex justify-end'>
                            <Pagination
                                total={historyData.meta.totalRows}
                                pageSize={historyData.meta.limit}
                                current={historyData.meta.page}
                                onChange={(page) =>
                                    fetchGroupData(
                                        'doctor-history',
                                        'completed',
                                        page
                                    )
                                }
                                isDark={isDark}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
