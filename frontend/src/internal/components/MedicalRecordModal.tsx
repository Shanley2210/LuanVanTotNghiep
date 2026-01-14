import { Modal, Descriptions, Button, Tag, Divider } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface MedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function MedicalRecordModal({
  isOpen,
  onClose,
  data
}: MedicalRecordModalProps) {
  const { t } = useTranslation();

  if (!data) return null;

  const { record, slot } = data;

  return (
    <Modal
      title={
        <span className='text-xl font-bold text-blue-600 uppercase'>
          {t('doctorHistory.modalTitle') || 'Chi tiết phiếu khám bệnh'}
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      width={900}
      footer={[
        <Button key='close' onClick={onClose}>
          {t('doctorHistory.btnClose') || 'Đóng'}
        </Button>,
        <Button key='print' type='primary' onClick={() => window.print()}>
          {t('doctorHistory.btnPrint') || 'In phiếu'}
        </Button>
      ]}
      className='medical-record-modal'
    >
      {/* 1. Thông tin hành chính */}
      <Divider orientation='left' className='text-blue-500! border-blue-200!'>
        {t('doctorHistory.sectionAdmin') || 'I. Thông tin hành chính'}
      </Divider>
      <Descriptions
        bordered
        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        size='small'
      >
        <Descriptions.Item
          label={t('doctorHistory.labelPatientName') || 'Họ tên bệnh nhân'}
        >
          <span className='font-semibold'>{data.patientName}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label={t('doctorHistory.labelRecordId') || 'Mã hồ sơ'}
        >
          #{data.id}
        </Descriptions.Item>

        <Descriptions.Item
          label={t('doctorHistory.labelGender') || 'Giới tính'}
        >
          {data.patientGender === '1'
            ? t('doctorHistory.genderMale') || 'Nam'
            : t('doctorHistory.genderFemale') || 'Nữ'}
        </Descriptions.Item>
        <Descriptions.Item label={t('doctorHistory.labelDob') || 'Ngày sinh'}>
          {dayjs(data.patientDob).format('DD/MM/YYYY')}
        </Descriptions.Item>

        <Descriptions.Item
          label={t('doctorHistory.labelPhone') || 'Số điện thoại'}
        >
          {data.patientPhone}
        </Descriptions.Item>
        <Descriptions.Item label={t('doctorHistory.labelEmail') || 'Email'}>
          {data.patientEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={t('doctorHistory.labelEthnicity') || 'Dân tộc'}
        >
          {data.patientEthnicity}
        </Descriptions.Item>
        <Descriptions.Item label={t('doctorHistory.labelAddress') || 'Địa chỉ'}>
          {data.patientAddress}
        </Descriptions.Item>
      </Descriptions>

      {/* 2. Thông tin khám */}
      <Divider
        orientation='left'
        className='text-blue-500! border-blue-200! mt-6!'
      >
        {t('doctorHistory.sectionExam') || 'II. Thông tin khám'}
      </Divider>
      <Descriptions bordered column={2} size='small'>
        <Descriptions.Item
          label={t('doctorHistory.labelExamDate') || 'Ngày khám'}
        >
          {dayjs(slot?.startTime).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item
          label={t('doctorHistory.labelExamTime') || 'Giờ khám'}
        >
          {dayjs(slot?.startTime).format('HH:mm')} -{' '}
          {dayjs(slot?.endTime).format('HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item
          label={t('doctorHistory.labelReason') || 'Lý do khám'}
          span={2}
        >
          {data.reason}
        </Descriptions.Item>
      </Descriptions>

      {/* 3. Kết quả khám (QUAN TRỌNG) */}
      <Divider
        orientation='left'
        className='text-blue-500! border-blue-200! mt-6!'
      >
        {t('doctorHistory.sectionResult') || 'III. Kết quả & Điều trị'}
      </Divider>
      {record ? (
        <Descriptions
          bordered
          column={1}
          layout='vertical'
          className='whitespace-pre-line'
        >
          <Descriptions.Item
            label={
              <span className='font-semibold'>
                {t('doctorHistory.labelSymptoms') || 'Triệu chứng lâm sàng'}
              </span>
            }
          >
            {record.symptoms ||
              t('doctorHistory.valNoNote') ||
              'Không ghi nhận'}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='font-semibold'>
                {t('doctorHistory.labelPhysicalExam') || 'Khám thực thể'}
              </span>
            }
          >
            {record.physicalExam ||
              t('doctorHistory.valNoNote') ||
              'Không ghi nhận'}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='font-semibold text-red-600'>
                {t('doctorHistory.labelDiagnosis') || 'Chẩn đoán'}
              </span>
            }
          >
            <Tag color='red' className='text-base px-3 py-1'>
              {record.diagnosis ||
                t('doctorHistory.valNoDiagnosis') ||
                'Chưa có chẩn đoán'}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='font-semibold'>
                {t('doctorHistory.labelTreatment') || 'Hướng điều trị'}
              </span>
            }
          >
            {record.treatment || '---'}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='font-semibold'>
                {t('doctorHistory.labelPrescription') || 'Đơn thuốc'}
              </span>
            }
          >
            <div className='bg-gray-50 p-3 border border-gray-200 font-mono text-sm'>
              {record.prescription ||
                t('doctorHistory.valNoPrescription') ||
                'Không có đơn thuốc'}
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='font-semibold'>
                {t('doctorHistory.labelReExam') || 'Hẹn tái khám'}
              </span>
            }
          >
            {record.reExamDate ? (
              <span className='text-blue-600 font-bold'>
                {dayjs(record.reExamDate).format('DD/MM/YYYY')}
              </span>
            ) : (
              t('doctorHistory.valNoReExam') || 'Không hẹn tái khám'
            )}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <div className='text-center py-10 text-gray-400 italic border border-dashed rounded'>
          {t('doctorHistory.msgNoData') ||
            'Chưa có dữ liệu bệnh án chi tiết cho lịch hẹn này.'}
        </div>
      )}
    </Modal>
  );
}
