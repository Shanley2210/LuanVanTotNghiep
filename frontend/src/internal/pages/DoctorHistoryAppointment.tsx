import { ThemeContext } from '@/shared/contexts/ThemeContext';
import {
  fetchDoctorAppointments,
  selectAppointment,
  type IAppointment
} from '@/shared/stores/appointmentSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { Button, Select, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Pagination from '../components/Pagination';
import { getAppointmentDetail } from '@/shared/apis/doctorService';
import { toast } from 'react-toastify'; // Import component vừa tạo (nhớ chỉnh đường dẫn đúng)
import MedicalRecordModal from '../components/MedicalRecordModal';

const GROUP_KEY = 'doctor_history_appointments';

export default function DoctorHistoryAppointment() {
  const { isDark } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { groups } = useAppSelector(selectAppointment);
  const currentGroupData = groups[GROUP_KEY] || {
    list: [],
    meta: { totalRows: 0, limit: 10, page: 1, totalPages: 0 },
    loading: false
  };
  const { list: appointments, loading: tableLoading, meta } = currentGroupData;
  const totalAppointments = meta.totalRows;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State mở modal

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const handleViewRecord = async (appointmentId: number) => {
    setIsLoading(true);
    try {
      const res = await getAppointmentDetail(appointmentId);

      if (res && res.data.errCode === 0) {
        setAppointmentData(res.data.data);
        setIsModalOpen(true); // Mở modal khi lấy dữ liệu thành công
      } else {
        toast.error(res.data.message || 'Không tìm thấy thông tin lịch hẹn');
      }
    } catch (error) {
      console.error('Error fetching appointment detail:', error);
      toast.error('Lỗi kết nối đến server');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: t('doctorHistory.colId') || 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60
    },
    {
      title: t('doctorHistory.colBooker') || 'Người đặt',
      key: 'book',
      render: (_: any, record: IAppointment) => (
        <div className='flex flex-col'>
          <span className='font-semibold'>{record.patient.user.name}</span>
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
      title: t('doctorHistory.colPatientInfo') || 'Bệnh nhân',
      key: 'patient',
      render: (_: any, record: IAppointment) => (
        <div className='flex flex-col'>
          <span className='font-semibold'>{record.patientName}</span>
          <span className='text-xs text-gray-500'>{record.patientPhone}</span>
          <span className='text-xs text-gray-400'>
            {record.patientGender === '1'
              ? t('doctorHistory.genderMale') || 'Nam'
              : t('doctorHistory.genderFemale') || 'Nữ'}{' '}
            - {dayjs(record.patientDob).format('DD/MM/YYYY')}
          </span>
        </div>
      )
    },
    {
      title: t('doctorHistory.colType') || 'Loại khám',
      key: 'info',
      render: (_: any, record: IAppointment) => {
        if (record.type === 'doctor') {
          return (
            <div className='flex flex-col'>
              <span className='text-blue-600 font-medium'>
                {t('doctorHistory.typeDoctor') || 'Khám bác sĩ'}
              </span>
              <span className='text-xs text-gray-500'>
                {record.doctor?.specialty?.name}
              </span>
            </div>
          );
        }
        return (
          <div className='flex flex-col'>
            <span className='text-green-600 font-medium'>
              {t('doctorHistory.typeService') || 'Dịch vụ'}
            </span>
            <span>{record.service?.name}</span>
          </div>
        );
      }
    },
    {
      title: t('doctorHistory.colTime') || 'Thời gian',
      key: 'time',
      align: 'center' as const,
      width: 150,
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
      title: t('doctorHistory.colStatus') || 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      render: (status: string) => {
        let color = 'default';
        let text = status;
        switch (status) {
          case 'completed':
            color = 'success';
            text = t('doctorHistory.completed') || 'Hoàn thành';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: t('doctorHistory.action') || 'Hành động',
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: IAppointment) => (
        <Button
          type='primary'
          ghost
          loading={isLoading && appointmentData?.id === record.id} // Chỉ loading đúng nút đang bấm
          onClick={() => handleViewRecord(record.id)}
        >
          {t('doctorHistory.viewRecord') || 'Xem phiếu khám'}
        </Button>
      )
    }
  ];

  useEffect(() => {
    dispatch(
      fetchDoctorAppointments({
        page: currentPage,
        limit: pageSize,
        status: 'completed',
        date: undefined,
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
        {t('doctorHistory.title') || 'Lịch sử khám bệnh'}
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
            {t('doctorHistory.itemsPerPage') || 'Bản ghi / trang'}
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

      <MedicalRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={appointmentData}
      />
    </div>
  );
}
