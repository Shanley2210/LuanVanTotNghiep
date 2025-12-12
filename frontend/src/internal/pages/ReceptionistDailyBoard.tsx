import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Table, Button, Tag, Spin } from 'antd';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    SyncOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchReceptionistAppointments,
    selectAppointment,
    type IAppointment,
    type IAppointmentGroup
} from '@/shared/stores/appointmentSlice';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import Pagination from '../components/Pagination';
import { AiOutlineSchedule } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { checkInAppointment } from '@/shared/apis/receptionistService';
import LoadingCommon from '@/shared/components/LoadingCommon';

const defaultGroupData: IAppointmentGroup = {
    list: [],
    meta: { page: 1, limit: 10, totalRows: 0, totalPages: 0 },
    loading: false,
    error: null
};

export default function ReceptionistDailyBoard() {
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { groups } = useAppSelector(selectAppointment);
    const getGroup = (key: string) => groups[key] || defaultGroupData;
    const todayData = getGroup('today');
    const waitingData = getGroup('waiting');
    const examiningData = getGroup('examining');
    const completedData = getGroup('completed');
    const [isLoading, setIsLoading] = useState(false);
    const language = i18n.language;

    const fetchGroupData = (
        groupKey: string,
        status: string | undefined,
        page: number
    ) => {
        dispatch(
            fetchReceptionistAppointments({
                page,
                limit: 10,
                status,
                date: dayjs().format('YYYY-MM-DD'),
                groupKey
            })
        );
    };

    useEffect(() => {
        fetchGroupData('today', 'confirmed', 1);
        fetchGroupData('waiting', 'checked_in', 1);
        fetchGroupData('examining', 'examining', 1);
        fetchGroupData('completed', 'completed', 1);
    }, [dispatch]);

    const handleCheckin = async (appointmentId: number) => {
        try {
            setIsLoading(true);

            const res = await checkInAppointment(appointmentId);

            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
                fetchGroupData('today', 'confirmed', 1);
                fetchGroupData('waiting', 'checked_in', 1);
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (error) {
            console.error('Error checking in:', error);
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const getColumns = (groupKey: string): ColumnsType<IAppointment> => {
        const baseColumns: ColumnsType<IAppointment> = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 60
            },
            {
                title: 'Người đặt lịch',
                key: 'booking',
                render: (_: any, record: any) => (
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
                render: (_: any, record: any) => (
                    <div className='flex flex-col'>
                        <span className='font-semibold'>
                            {record.patientName}
                        </span>
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
                render: (_: any, record: any) => {
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
                render: (_: any, record: any) => {
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
                render: (_: any, record: any) => (
                    <div className='flex flex-col'>
                        <span>
                            Tổng:{' '}
                            {Number(record.finalPrice).toLocaleString('vi-VN')}{' '}
                            đ
                        </span>
                        <span className='text-xs text-green-600'>
                            Đã cọc:{' '}
                            {Number(record.deposited).toLocaleString('vi-VN')} đ
                        </span>
                    </div>
                )
            }
        ];

        if (groupKey === 'today') {
            baseColumns.push({
                title: 'Hành động',
                key: 'action',
                align: 'center' as const,
                render: (_: any, record: IAppointment) => (
                    <div className='flex gap-5 justify-center'>
                        <Button onClick={() => handleCheckin(record.id)}>
                            Check-in
                        </Button>
                    </div>
                )
            });
        }
        if (groupKey === 'waiting') {
            baseColumns.push({
                title: 'Số thứ tự',
                key: 'stt',
                align: 'center' as const,
                render: (_: any, record: IAppointment) => (
                    <div className='flex gap-5 justify-center text-2xl font-bold text-orange-500'>
                        {record.queue.number}
                    </div>
                )
            });
        }

        return baseColumns;
    };

    const renderTable = (
        data: IAppointmentGroup,
        groupKey: string,
        status?: string
    ) => (
        <Table
            loading={data.loading}
            rowKey='id'
            dataSource={data.list}
            columns={getColumns(groupKey)}
            showSorterTooltip={false}
            pagination={false}
            footer={() => (
                <Pagination
                    total={data.meta.totalRows}
                    pageSize={data.meta.limit}
                    current={data.meta.page}
                    onChange={(page) => fetchGroupData(groupKey, status, page)}
                    isDark={isDark}
                />
            )}
        />
    );

    const items = [
        {
            key: 'today',
            label: (
                <span className='flex items-center gap-2'>
                    <AiOutlineSchedule className='size-4' />
                    Chờ check-in ({todayData.meta.totalRows})
                </span>
            ),
            children: renderTable(todayData, 'today', undefined)
        },
        {
            key: 'waiting',
            label: (
                <span className='flex items-center gap-2'>
                    <ClockCircleOutlined />
                    Chờ khám ({waitingData.meta.totalRows})
                </span>
            ),
            children: renderTable(waitingData, 'waiting', 'waiting')
        },
        {
            key: 'examining',
            label: (
                <span className='flex items-center gap-2'>
                    <SyncOutlined spin={examiningData.meta.totalRows > 0} />
                    Đang khám ({examiningData.meta.totalRows})
                </span>
            ),
            children: renderTable(examiningData, 'examining', 'examining')
        },
        {
            key: 'completed',
            label: (
                <span className='flex items-center gap-2'>
                    <CheckCircleOutlined />
                    Hoàn tất ({completedData.meta.totalRows})
                </span>
            ),
            children: renderTable(completedData, 'completed', 'completed')
        }
    ];

    return (
        <div className='m-5 h-screen flex flex-col gap-5'>
            <div>
                <div
                    className={`text-2xl uppercase ${
                        isDark ? 'text-gray-100' : 'text-neutral-900'
                    }`}
                >
                    Điều phối hôm nay
                </div>
                <div
                    className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    {dayjs().format('dddd, DD [tháng] MM [năm] YYYY')}
                </div>
            </div>

            {isLoading ? (
                <LoadingCommon />
            ) : (
                <>
                    <div
                        className={`p-5 shadow-sm ${
                            isDark ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        <div className='flex justify-between gap-4'>
                            <div className='flex-1 border border-blue-500 py-2 text-center text-blue-500 flex flex-col gap-1'>
                                <span className='uppercase text-xs font-semibold'>
                                    Chờ check-in
                                </span>
                                <span className='text-2xl font-bold'>
                                    {todayData.meta.totalRows}
                                </span>
                            </div>
                            <div className='flex-1 border border-orange-500 py-2 text-center text-orange-500 flex flex-col gap-1'>
                                <span className='uppercase text-xs font-semibold'>
                                    Chờ khám
                                </span>
                                <span className='text-2xl font-bold'>
                                    {waitingData.meta.totalRows}
                                </span>
                            </div>
                            <div className='flex-1 border border-purple-500 py-2 text-center text-purple-500 flex flex-col gap-1'>
                                <span className='uppercase text-xs font-semibold'>
                                    Đang khám
                                </span>
                                <span className='text-2xl font-bold'>
                                    {examiningData.meta.totalRows}
                                </span>
                            </div>
                            <div className='flex-1 border border-green-500 py-2 text-center text-green-500 flex flex-col gap-1'>
                                <span className='uppercase text-xs font-semibold'>
                                    Hoàn tất
                                </span>
                                <span className='text-2xl font-bold'>
                                    {completedData.meta.totalRows}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`flex-1 p-5 shadow-sm flex flex-col ${
                            isDark ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        <div className='flex-1'>
                            <Tabs defaultActiveKey='today' items={items} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
