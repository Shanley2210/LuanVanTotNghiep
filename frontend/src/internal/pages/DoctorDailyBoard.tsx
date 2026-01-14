import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Table, Tag, Button, Tooltip, Spin } from 'antd'; // Thêm Spin
import { Users, Clock, Calendar } from 'lucide-react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { BiArrowFromLeft, BiUser } from 'react-icons/bi';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
  fetchDoctorAppointments,
  selectAppointment,
  type IAppointment,
  type IAppointmentGroup
} from '@/shared/stores/appointmentSlice';
import Pagination from '../components/Pagination';
import { getAppointmentDetail } from '@/shared/apis/doctorService'; // Import API
import { toast } from 'react-toastify'; // Import toast
import MedicalRecordModal from '../components/MedicalRecordModal'; // Import Modal

const TimeAgo = ({ targetTime, t }: { targetTime: string; t: any }) => {
  const [timeNode, setTimeNode] = useState<React.ReactNode>('--');

  useEffect(() => {
    const updateTime = () => {
      if (!targetTime) return;

      const now = dayjs();
      const target = dayjs(targetTime);
      const diffInMinutes = target.diff(now, 'minute');

      if (diffInMinutes < 0) {
        setTimeNode(
          <Tag color='error' className='m-0 font-bold border-red-200'>
            {t('doctorDaily.late') || 'Trễ'} {Math.abs(diffInMinutes)}p
          </Tag>
        );
      } else if (diffInMinutes <= 15) {
        setTimeNode(
          <Tag
            color='warning'
            className='m-0 animate-pulse font-bold border-orange-200'
          >
            {t('doctorDaily.in') || 'Còn'} {diffInMinutes}p
          </Tag>
        );
      } else {
        const hours = Math.floor(diffInMinutes / 60);
        const mins = diffInMinutes % 60;
        setTimeNode(
          <span className='text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-xs'>
            {t('doctorDaily.in') || 'Còn'}{' '}
            {hours > 0 ? `${hours}h ${mins}p` : `${mins}p`}
          </span>
        );
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, [targetTime, t]);

  return <div>{timeNode}</div>;
};

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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<number | null>(null); 
  const { groups } = useAppSelector(selectAppointment);
  const getGroup = (key: string) => groups[key] || defaultGroupData;
  const queueData = getGroup('doctor-queue');
  const historyData = getGroup('doctor-history');

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

  // Hàm xử lý xem chi tiết phiếu khám
  const handleViewRecord = async (appointmentId: number) => {
    setIsLoadingDetail(appointmentId);
    try {
      const res = await getAppointmentDetail(appointmentId);

      if (res && res.data.errCode === 0) {
        setAppointmentData(res.data.data);
        setIsModalOpen(true);
      } else {
        toast.error(res.data.message || 'Không tìm thấy thông tin lịch hẹn');
      }
    } catch (error) {
      console.error('Error fetching appointment detail:', error);
      toast.error('Lỗi kết nối đến server');
    } finally {
      setIsLoadingDetail(null);
    }
  };

  const commonColumns = [
    {
      title: t('doctorDaily.colId'),
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (text: any) => (
        <span className='font-mono text-gray-500'>#{text}</span>
      )
    },
    {
      title: t('doctorDaily.colTime'),
      key: 'time',
      width: 160,
      render: (_: any, record: IAppointment) => {
        const start = dayjs(record.slot?.startTime);
        const end = dayjs(record.slot?.endTime);
        return (
          <div className='flex flex-col'>
            <div className='flex items-center gap-1 font-semibold text-blue-600'>
              <Clock size={14} />
              {start.isValid() ? start.format('HH:mm') : '--:--'} -{' '}
              {end.isValid() ? end.format('HH:mm') : '--:--'}
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
      title: t('doctorDaily.colBooker'),
      key: 'booking',
      render: (_: any, record: IAppointment) => (
        <div className='flex flex-col'>
          <span className='font-medium flex items-center gap-1'>
            <BiUser />
            {record.patient?.user?.name || t('doctorDaily.guest')}
          </span>
          <span className='text-xs text-gray-500 pl-4'>
            {record.patient?.user?.phone || 'N/A'}
          </span>
        </div>
      )
    },
    {
      title: t('doctorDaily.colPatient'),
      key: 'patient',
      render: (_: any, record: IAppointment) => (
        <div className='flex flex-col'>
          <span className='font-bold text-base text-gray-800 dark:text-gray-200'>
            {record.patientName}
          </span>
          <div className='text-xs text-gray-500'>
            <span>
              {record.patientGender === '1'
                ? t('doctorDaily.male')
                : t('doctorDaily.female')}
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
              {t('doctorDaily.reason')}: {record.reason}
            </div>
          )}
        </div>
      )
    },
    {
      title: t('doctorDaily.colServiceType'),
      key: 'info',
      render: (_: any, record: IAppointment) => {
        if (record.type === 'doctor') {
          return <Tag color='blue'>{t('doctorDaily.typeDoctor')}</Tag>;
        }
        return (
          <div>
            <Tag color='green'>{t('doctorDaily.typeService')}</Tag>
            <span className='text-xs mt-1'>{record.service?.name}</span>
          </div>
        );
      }
    }
  ];

  const columnsQueue = [
    ...commonColumns,

    {
      title: t('doctorDaily.colTimeLeft') || 'Dự kiến',
      key: 'timeLeft',
      width: 130,
      render: (_: any, record: IAppointment) => (
        <TimeAgo targetTime={record.slot?.startTime} t={t} />
      )
    },
    {
      title: t('doctorDaily.colAction'),
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: IAppointment) => (
        <Tooltip title={t('doctorDaily.tooltipStart')}>
          <div
            className='flex justify-center cursor-pointer'
            onClick={() => {
              navigate(`/doctor/exam/${record.id}`);
            }}
          >
            <BiArrowFromLeft className='text-xl text-blue-500 hover:text-blue-600 transition-colors' />
          </div>
        </Tooltip>
      )
    }
  ];

  const columnsHistory = [
    ...commonColumns,
    {
      title: t('doctorDaily.colOperation'),
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: IAppointment) => (
        <div className='flex gap-3 justify-center'>
          <Tooltip title={t('doctorDaily.tooltipView')}>
            <div
              className='cursor-pointer flex items-center justify-center'
              onClick={() => handleViewRecord(record.id)}
            >
              {isLoadingDetail === record.id ? (
                <Spin size='small' />
              ) : (
                <MdOutlineRemoveRedEye className='text-xl text-blue-500 hover:text-blue-600 transition-colors' />
              )}
            </div>
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
            {t('doctorDaily.title')}
          </div>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {dayjs().format(t('doctorDaily.dateFormat'))}
          </div>
        </div>
        <div className='flex gap-2'>
          <Button
            onClick={() => fetchGroupData('doctor-queue', 'checked_in', 1)}
          >
            {t('doctorDaily.refresh')}
          </Button>
        </div>
      </div>

      <div className={`p-5 shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className='flex justify-between gap-4'>
          <div className='flex-1 border-r border-gray-100 last:border-0 text-center'>
            <div className='text-xs text-gray-500 uppercase font-semibold mb-1'>
              {t('doctorDaily.statQueue')}
            </div>
            <div className='text-3xl font-bold text-orange-500'>
              {queueData.meta.totalRows}
            </div>
          </div>
          <div className='flex-1 border-r border-gray-100 last:border-0 text-center'>
            <div className='text-xs text-gray-500 uppercase font-semibold mb-1'>
              {t('doctorDaily.statCompleted')}
            </div>
            <div className='text-3xl font-bold text-green-500'>
              {historyData.meta.totalRows}
            </div>
          </div>
        </div>
      </div>

      {/* Bảng Hàng đợi */}
      <div
        className={`shadow-sm border overflow-hidden ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
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
            <Users className='text-blue-600' size={20} />{' '}
            {t('doctorDaily.queueTitle')}
          </h2>
        </div>

        <Table
          loading={queueData.loading}
          rowKey='id'
          dataSource={queueData.list}
          columns={columnsQueue}
          pagination={false}
          locale={{ emptyText: t('doctorDaily.queueEmpty') }}
          rowClassName={(_, index) =>
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
                  fetchGroupData('doctor-queue', 'checked_in', page)
                }
                isDark={isDark}
              />
            </div>
          )}
        />
      </div>

      {/* Bảng Lịch sử */}
      <div
        className={`shadow-sm border overflow-hidden ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
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
            <Clock className='text-green-600' size={20} />{' '}
            {t('doctorDaily.historyTitle')}
          </h2>
        </div>

        <Table
          loading={historyData.loading}
          rowKey='id'
          dataSource={historyData.list}
          columns={columnsHistory}
          pagination={false}
          locale={{ emptyText: t('doctorDaily.historyEmpty') }}
          footer={() => (
            <div className='flex justify-end'>
              <Pagination
                total={historyData.meta.totalRows}
                pageSize={historyData.meta.limit}
                current={historyData.meta.page}
                onChange={(page) =>
                  fetchGroupData('doctor-history', 'completed', page)
                }
                isDark={isDark}
              />
            </div>
          )}
        />
      </div>

      {/* Modal hiển thị chi tiết phiếu khám */}
      <MedicalRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={appointmentData}
      />
    </div>
  );
}
