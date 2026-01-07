import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import {
    Card,
    Row,
    Col,
    Select,
    Button,
    Spin,
    Result,
    Space,
    Divider
} from 'antd';
import {
    Calendar,
    Stethoscope,
    DollarSign,
    XCircle,
    UserX,
    FileSpreadsheet,
    AlertCircle,
    Briefcase
} from 'lucide-react';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import StatCard from '@/internal/components/StatCard';
import SimpleBarChart from '@/internal/components/SimpleBarChart';
import StatusBreakdownCard from '@/internal/components/StatusBreakdownCard';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';
import { fetchDoctors, selectDoctor } from '@/shared/stores/doctorSlice';
import {
    getAdminDashboardStats,
    exportAdminStats
} from '@/shared/apis/adminService';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

export interface BookingTrendItem {
    date: string;
    appointments: number;
    revenue: number | string;
}
export interface StatusDistribution {
    completed: number;
    checked_in: number;
    cancelled: number;
    pending: number;
}
export interface DashboardData {
    period: string;
    totalAppointments: number;
    totalRevenue: number;
    cancelRate: string;
    noshowRate: string;
    statusDistribution: StatusDistribution;
    bookingTrend: BookingTrendItem[];
}
type PeriodType = 'day' | 'week' | 'month';

const DashBoard: React.FC = () => {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const { list: serviceList, loading: loadingServices } =
        useAppSelector(selectServices);
    const { list: allDoctors, loading: loadingDoctors } =
        useAppSelector(selectDoctor);

    const [dateRange, setDateRange] = useState<PeriodType>('month');
    const [selectedDoctor, setSelectedDoctor] = useState<string | number>(
        'all'
    );
    const [selectedService, setSelectedService] = useState<string | number>(
        'all'
    );

    const [loading, setLoading] = useState<boolean>(true);
    const [exporting, setExporting] = useState<boolean>(false);
    const [data, setData] = useState<DashboardData | null>(null);

    const formatCurrency = (value: number): string =>
        new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
            style: 'currency',
            currency: language === 'vi' ? 'VND' : 'USD'
        }).format(value);

    const translateStatus = (status: string) => {
        switch (status) {
            case 'completed':
                return t('reportPage.statusCompleted');
            case 'checked_in':
                return t('reportPage.statusCheckedIn');
            case 'cancelled':
                return t('reportPage.statusCancelled');
            case 'pending':
                return t('reportPage.statusPending');
            default:
                return status;
        }
    };

    useEffect(() => {
        dispatch(fetchServices({ page: 1, limit: 100 }));
        dispatch(fetchDoctors({ page: 1, limit: 100, status: 'active' }));
    }, [dispatch]);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const doctorIdParam =
                    selectedDoctor === 'all' ? undefined : selectedDoctor;
                const serviceIdParam =
                    selectedService === 'all' ? undefined : selectedService;

                const res: any = await getAdminDashboardStats(
                    dateRange,
                    doctorIdParam,
                    serviceIdParam
                );

                if (res && res.data && res.data.errCode === 0) {
                    setData(res.data.data);
                } else {
                    setData(null);
                    toast.error(
                        res?.data?.errViMessage || t('reportPage.msgFetchError')
                    );
                }
            } catch (error) {
                console.error('Fetch dashboard error:', error);
                setData(null);
                toast.error(t('reportPage.msgServerError'));
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [dateRange, selectedDoctor, selectedService, t]);

    const handleExport = async () => {
        setExporting(true);
        try {
            const doctorIdParam =
                selectedDoctor === 'all' ? undefined : selectedDoctor;
            const serviceIdParam =
                selectedService === 'all' ? undefined : selectedService;

            const res: any = await exportAdminStats(
                dateRange,
                doctorIdParam,
                serviceIdParam
            );

            if (
                res &&
                res.data &&
                res.data.errCode === 0 &&
                Array.isArray(res.data.data)
            ) {
                const rawData = res.data.data;

                const excelData = rawData.map((item: any) => ({
                    ID: item.id,
                    [t('reportPage.tooltipDate')]: dayjs(item.createdAt).format(
                        'DD/MM/YYYY HH:mm'
                    ),
                    Name: item.patientName,
                    Gender:
                        item.patientGender === '1'
                            ? t('reportPage.genderMale')
                            : t('reportPage.genderFemale'),
                    DOB: dayjs(item.patientDob).format('DD/MM/YYYY'),
                    Phone: item.patientPhone,
                    [t('reportPage.labelDoctor')]:
                        item.doctor?.user?.name || 'N/A',
                    [t('reportPage.labelService')]:
                        item.type === 'service'
                            ? item.service?.name ||
                              t('reportPage.serviceSingle')
                            : t('reportPage.serviceDoctor'),
                    Status: translateStatus(item.status),
                    Price: parseInt(item.finalPrice || '0', 10),
                    Reason: item.reason
                }));

                const worksheet = XLSX.utils.json_to_sheet(excelData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

                XLSX.writeFile(
                    workbook,
                    `Report_${dayjs().format('DDMMYYYY')}.xlsx`
                );
                toast.success(t('reportPage.msgExportSuccess'));
            } else {
                toast.error(t('reportPage.msgNoDataExport'));
            }
        } catch (error) {
            console.error('Export error:', error);
            toast.error(t('reportPage.msgExportError'));
        } finally {
            setExporting(false);
        }
    };

    if (loading && !data) {
        return <Spin spinning fullscreen tip={t('reportPage.msgFetchError')} />;
    }

    if (!data) {
        return (
            <div className='p-5'>
                <Result
                    status='500'
                    title={t('reportPage.titleNoData')}
                    subTitle={t('reportPage.subNoData')}
                    extra={
                        <Button
                            type='primary'
                            onClick={() => window.location.reload()}
                        >
                            {t('reportPage.btnReload')}
                        </Button>
                    }
                />
            </div>
        );
    }

    const isEmpty = data.totalAppointments === 0;

    return (
        <div className='m-5'>
            <div
                className={`text-2xl uppercase pb-2 font-bold ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                {t('reportPage.title')}
            </div>

            <Card
                style={{
                    marginBottom: 24,
                    borderRadius: 0,
                    backgroundColor: isDark ? '#141414' : '#fff',
                    borderColor: isDark ? '#303030' : '#f0f0f0'
                }}
                styles={{ body: { padding: '16px 24px' } }}
                className={isDark ? 'dark-card' : ''}
            >
                <Row gutter={[16, 16]} align='middle' justify='space-between'>
                    <Col xs={24} md={18}>
                        <Space wrap size='middle'>
                            <Space direction='vertical' size={2}>
                                <span
                                    className={`text-xs font-semibold ${
                                        isDark
                                            ? 'text-gray-400'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    {t('reportPage.labelTime')}
                                </span>
                                <Space>
                                    <Calendar
                                        size={16}
                                        className='text-blue-500'
                                    />
                                    <Select
                                        value={dateRange}
                                        onChange={(val) =>
                                            setDateRange(val as PeriodType)
                                        }
                                        style={{ width: 130 }}
                                        disabled={loading}
                                        className={isDark ? 'dark-select' : ''}
                                        // SỬA LỖI: Quay về dùng popupClassName
                                        popupClassName={
                                            isDark ? 'dark-select-dropdown' : ''
                                        }
                                    >
                                        <Option value='day'>
                                            {t('reportPage.optToday')}
                                        </Option>
                                        <Option value='week'>
                                            {t('reportPage.optWeek')}
                                        </Option>
                                        <Option value='month'>
                                            {t('reportPage.optMonth')}
                                        </Option>
                                    </Select>
                                </Space>
                            </Space>

                            <Divider
                                type='vertical'
                                style={{
                                    height: '2em',
                                    borderColor: isDark ? '#424242' : '#e5e7eb'
                                }}
                            />

                            <Space direction='vertical' size={2}>
                                <span
                                    className={`text-xs font-semibold ${
                                        isDark
                                            ? 'text-gray-400'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    {t('reportPage.labelDoctor')}
                                </span>
                                <Space>
                                    <Stethoscope
                                        size={16}
                                        className='text-green-500'
                                    />
                                    <Select
                                        value={selectedDoctor}
                                        onChange={setSelectedDoctor}
                                        style={{ width: 180 }}
                                        loading={loadingDoctors}
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) =>
                                            (
                                                option?.children as unknown as string
                                            )
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        className={isDark ? 'dark-select' : ''}
                                        // SỬA LỖI: Quay về dùng popupClassName
                                        popupClassName={
                                            isDark ? 'dark-select-dropdown' : ''
                                        }
                                    >
                                        <Option value='all'>
                                            {t('reportPage.optAllDoctors')}
                                        </Option>
                                        {allDoctors &&
                                            allDoctors.map((doc: any) => (
                                                <Option
                                                    key={doc.id}
                                                    value={doc.id}
                                                >
                                                    {doc?.user?.name}
                                                </Option>
                                            ))}
                                    </Select>
                                </Space>
                            </Space>

                            <Divider
                                type='vertical'
                                style={{
                                    height: '2em',
                                    borderColor: isDark ? '#424242' : '#e5e7eb'
                                }}
                            />

                            <Space direction='vertical' size={2}>
                                <span
                                    className={`text-xs font-semibold ${
                                        isDark
                                            ? 'text-gray-400'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    {t('reportPage.labelService')}
                                </span>
                                <Space>
                                    <Briefcase
                                        size={16}
                                        className='text-orange-500'
                                    />
                                    <Select
                                        value={selectedService}
                                        onChange={setSelectedService}
                                        style={{ width: 180 }}
                                        loading={loadingServices}
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) =>
                                            (
                                                option?.children as unknown as string
                                            )
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        className={isDark ? 'dark-select' : ''}
                                        // SỬA LỖI: Quay về dùng popupClassName
                                        popupClassName={
                                            isDark ? 'dark-select-dropdown' : ''
                                        }
                                    >
                                        <Option value='all'>
                                            {t('reportPage.optAllServices')}
                                        </Option>
                                        {serviceList &&
                                            serviceList.map((service: any) => (
                                                <Option
                                                    key={service.id}
                                                    value={service.id}
                                                >
                                                    {service.name}
                                                </Option>
                                            ))}
                                    </Select>
                                </Space>
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={24} md={6} style={{ textAlign: 'right' }}>
                        <Button
                            type='primary'
                            icon={<FileSpreadsheet size={16} />}
                            loading={exporting}
                            onClick={handleExport}
                            disabled={isEmpty || loading}
                        >
                            {t('reportPage.btnExportExcel')}
                        </Button>
                    </Col>
                </Row>
            </Card>

            {isEmpty ? (
                <Result
                    icon={
                        <AlertCircle
                            size={64}
                            className={
                                isDark ? 'text-gray-600' : 'text-gray-300'
                            }
                        />
                    }
                    title={
                        <span className={isDark ? 'text-gray-200' : ''}>
                            {t('reportPage.titleNoReport')}
                        </span>
                    }
                    subTitle={
                        <span className={isDark ? 'text-gray-400' : ''}>
                            {t('reportPage.subNoReport')}
                        </span>
                    }
                />
            ) : (
                <Space
                    direction='vertical'
                    size='large'
                    style={{ width: '100%' }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={6}>
                            <StatCard
                                title={t('reportPage.statTotalAppointments')}
                                value={data.totalAppointments}
                                icon={<Calendar />}
                                color='#3b82f6'
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <StatCard
                                title={t('reportPage.statRevenue')}
                                value={formatCurrency(data.totalRevenue)}
                                icon={<DollarSign />}
                                color='#22c55e'
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <StatCard
                                title={t('reportPage.statCancelRate')}
                                value={`${data.cancelRate}%`}
                                icon={<XCircle />}
                                color='#f97316'
                                trend={
                                    parseFloat(data.cancelRate) > 20
                                        ? 'down'
                                        : 'up'
                                }
                                trendValue={
                                    parseFloat(data.cancelRate) > 20
                                        ? t('reportPage.trendHigh')
                                        : t('reportPage.trendGood')
                                }
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <StatCard
                                title={t('reportPage.statNoshow')}
                                value={`${data.noshowRate}%`}
                                icon={<UserX />}
                                color='#ef4444'
                            />
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <div
                                style={{
                                    height: 400,
                                    width: '100%',
                                    minWidth: 0
                                }}
                            >
                                <SimpleBarChart data={data.bookingTrend} />
                            </div>
                        </Col>
                        <Col xs={24} lg={8}>
                            <div
                                style={{
                                    height: 400,
                                    width: '100%',
                                    minWidth: 0
                                }}
                            >
                                <StatusBreakdownCard
                                    breakdown={data.statusDistribution}
                                />
                            </div>
                        </Col>
                    </Row>
                </Space>
            )}
        </div>
    );
};

export default DashBoard;
