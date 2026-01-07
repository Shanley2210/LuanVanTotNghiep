import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { Button, Select, Table, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchReceptionistAppointments,
    selectAppointment,
    type IAppointment
} from '@/shared/stores/appointmentSlice';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { confirmAppointment } from '@/shared/apis/receptionistService';
import LoadingCommon from '@/shared/components/LoadingCommon';

const GROUP_KEY = 'new_appointments';

export default function NewApointment() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
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
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    const handleConfirmAppointment = async (appointmentId: number) => {
        try {
            setIsLoading(true);

            const res = await confirmAppointment(appointmentId);

            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );

                dispatch(
                    fetchReceptionistAppointments({
                        page: currentPage,
                        limit: pageSize,
                        status: 'deposited',
                        groupKey: GROUP_KEY
                    })
                );
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            console.error('Error confirming appointment:', e);
            toast.error(t('repNew.errServer'));
        } finally {
            setIsLoading(false);
        }
    };

    const columns = [
        {
            title: t('repNew.colId'),
            dataIndex: 'id',
            key: 'id',
            width: 60
        },
        {
            title: t('repNew.colBooker'),
            key: 'book',
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
            title: t('repNew.colPatientInfo'),
            key: 'patient',
            render: (_: any, record: any) => (
                <div className='flex flex-col'>
                    <span className='font-semibold'>{record.patientName}</span>
                    <span className='text-xs text-gray-500'>
                        {record.patientPhone}
                    </span>
                    <span className='text-xs text-gray-400'>
                        {record.patientGender === '1'
                            ? t('repNew.genderMale')
                            : t('repNew.genderFemale')}{' '}
                        - {dayjs(record.patientDob).format('DD/MM/YYYY')}
                    </span>
                </div>
            )
        },
        {
            title: t('repNew.colType'),
            key: 'info',
            render: (_: any, record: any) => {
                if (record.type === 'doctor') {
                    return (
                        <div className='flex flex-col'>
                            <span className='text-blue-600 font-medium'>
                                {t('repNew.typeDoctor')}
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
                            {t('repNew.typeService')}
                        </span>
                        <span>{record.service?.name}</span>
                    </div>
                );
            }
        },
        {
            title: t('repNew.colTime'),
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
            title: t('repNew.colPayment'),
            key: 'payment',
            align: 'center' as const,
            render: (_: any, record: any) => (
                <div className='flex flex-col'>
                    <span>
                        {t('repNew.paymentTotal')}:{' '}
                        {Number(record.finalPrice).toLocaleString('vi-VN')} đ
                    </span>
                    <span className='text-xs text-green-600'>
                        {t('repNew.paymentDeposited')}:{' '}
                        {Number(record.deposited).toLocaleString('vi-VN')} đ
                    </span>
                </div>
            )
        },
        {
            title: t('repNew.colStatus'),
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (status: string) => {
                let color = status === 'deposited' ? 'processing' : 'default';
                let text =
                    status === 'deposited'
                        ? t('repNew.statusDeposited')
                        : status;
                return <Tag color={color}>{text}</Tag>;
            }
        },
        {
            title: t('repNew.colAction'),
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IAppointment) => (
                <div className='flex gap-5 justify-center'>
                    <Button onClick={() => handleConfirmAppointment(record.id)}>
                        {t('repNew.btnConfirm')}
                    </Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        dispatch(
            fetchReceptionistAppointments({
                page: currentPage,
                limit: pageSize,
                status: 'deposited',
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
                {t('repNew.title')}
            </div>

            {isLoading ? (
                <LoadingCommon />
            ) : (
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
                            {t('repNew.itemsPerPage')}
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
            )}
        </div>
    );
}
