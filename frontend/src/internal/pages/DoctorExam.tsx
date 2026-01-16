import {
  completeExam,
  getAppointmentDetail
} from '@/shared/apis/doctorService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { Button, Input, Spin, Modal, Tag, DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  Save,
  Users,
  ArrowLeft,
  MapPin,
  CreditCard,
  Stethoscope,
  CalendarClock,
  Pill,
  Timer
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs, { type Dayjs } from 'dayjs';
import { toast } from 'react-toastify';

const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().endOf('day');
};

interface SoapState {
  s: string;
  o: string;
  a: string;
  p: string;
}

export default function DoctorExam() {
  const { isDark } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);

  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const [soap, setSoap] = useState<SoapState>({
    s: '',
    o: '',
    a: '',
    p: ''
  });

  const [prescription, setPrescription] = useState('');
  const [reExamDate, setReExamDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (id) {
      fetchAppointmentDetail(id);
    }
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 300) return 'text-red-600 bg-red-50 border-red-200';
    if (timeLeft <= 900)
      return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const fetchAppointmentDetail = async (appointmentId: string | number) => {
    setLoading(true);
    try {
      const res = await getAppointmentDetail(Number(appointmentId));

      if (res && res.data.errCode === 0) {
        setAppointmentData(res.data.data);
      } else {
        toast.error(res.data.message || t('doctorExam.toastNotFound'));
      }
    } catch (error) {
      console.error('Error fetching appointment detail:', error);
      toast.error(t('doctorExam.toastServerError'));
    } finally {
      setLoading(false);
    }
  };

  const handleSoapChange = (field: string, value: string) => {
    setSoap((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    if (soap.s || soap.o || soap.a || soap.p || prescription) {
      Modal.confirm({
        title: t('doctorExam.modalUnsavedTitle'),
        content: t('doctorExam.modalUnsavedContent'),
        okText: t('doctorExam.btnLeave'),
        cancelText: t('doctorExam.btnStay'),
        onOk: () => navigate('/doctor/dailyboard'),
        className:
          '[&_.ant-modal-content]:!rounded-none [&_.ant-btn]:!rounded-none'
      });
    } else {
      navigate('/doctor/dailyboard');
    }
  };

  const handleSave = async () => {
    if (!soap.a || !soap.p) {
      toast.warning(t('doctorExam.toastMissingFields'));
      return;
    }

    try {
      setLoading(true);

      const payload = {
        appointmentId: Number(id),
        s: soap.s,
        o: soap.o,
        a: soap.a,
        p: soap.p,
        prescription: prescription,
        reExamDate: reExamDate ? reExamDate.toDate() : null
      };

      console.log('Sending payload:', payload);

      const res = await completeExam(payload);

      if (res && res.data && res.data.errCode === 0) {
        toast.success(
          language === 'vi' ? res.data.viMessage : res.data.enMessage
        );
        navigate('/doctor/dailyboard');
      } else {
        toast.error(
          language === 'vi' ? res.data.errViMessage : res.data.errEnMessage
        );
      }
    } catch (error: any) {
      console.error('Save exam error:', error);
      const msg =
        error.response?.data?.errMessage || t('doctorExam.toastServerError');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !appointmentData) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className='m-5 h-screen flex flex-col gap-5'>
      <div className='flex justify-between items-end border-b border-gray-300 pb-4'>
        <div>
          <div
            className={`text-2xl uppercase font-bold ${
              isDark ? 'text-gray-100' : 'text-blue-900'
            }`}
          >
            {t('doctorExam.title')}
          </div>
          {appointmentData && (
            <div className='text-gray-500 text-sm mt-1 flex items-center gap-2'>
              {t('doctorExam.labelPatient')}:
              <span className='font-bold text-blue-600 uppercase text-base'>
                {appointmentData.patientName}
              </span>
              <span className='text-gray-400'>|</span>
              <span>
                {appointmentData.patientGender === '1'
                  ? t('doctorExam.genderFemale')
                  : t('doctorExam.genderMale')}
              </span>
              <span className='text-gray-400'>|</span>
              <span>
                {dayjs(appointmentData.patientDob).format('DD/MM/YYYY')} (
                {dayjs().diff(dayjs(appointmentData.patientDob), 'year')}{' '}
                {t('doctorExam.age')})
              </span>
            </div>
          )}
        </div>

        <div className='flex items-center gap-4'>
          <div
            className={`flex items-center gap-2 px-4 py-1 border font-mono font-bold text-xl transition-colors duration-300 ${getTimerColor()}`}
          >
            <Timer className={timeLeft <= 300 ? 'animate-pulse' : ''} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <Button
            icon={<ArrowLeft size={16} />}
            onClick={handleBack}
            className='rounded-none!'
          >
            {t('doctorExam.btnBack')}
          </Button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='grid grid-cols-12 gap-6 pb-10'>
          <div className='col-span-12 md:col-span-4 space-y-6'>
            <div
              className={`p-4 shadow-sm border ${
                isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`font-semibold mb-3 flex items-center gap-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                <Users size={18} /> {t('doctorExam.sectionMedicalInfo')}
              </h3>

              <div className='space-y-4 text-sm'>
                <div>
                  <span className='text-gray-500 block text-xs uppercase font-semibold'>
                    {t('doctorExam.labelReason')}:
                  </span>
                  <p className='font-medium text-red-600 bg-red-50 p-2.5 mt-1 border border-red-100 wrap-break-word break-all whitespace-pre-wrap max-h-40 overflow-y-auto'>
                    {appointmentData?.reason || t('doctorExam.valNoNote')}
                  </p>
                </div>

                <div>
                  <span className='text-gray-500 block text-xs uppercase font-semibold'>
                    {t('doctorExam.labelPMH')}:
                  </span>
                  <p
                    className={`font-medium mt-1 p-2 border wrap-break-word break-all whitespace-pre-wrap max-h-32 overflow-y-auto ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'bg-gray-50 border-gray-100 text-gray-800'
                    }`}
                  >
                    {appointmentData?.patient?.notePMH ||
                      t('doctorExam.valNoPMH')}
                  </p>
                </div>

                <div className='pt-2 border-t border-gray-100 flex flex-col gap-2'>
                  <div className='flex items-start gap-2 text-gray-600'>
                    <MapPin size={14} className='mt-0.5' />
                    <span>{appointmentData?.patientAddress}</span>
                  </div>

                  {appointmentData?.patient?.insuranceNumber && (
                    <div className='flex items-center gap-2 text-blue-600'>
                      <CreditCard size={14} />
                      <span className='font-semibold'>
                        {t('doctorExam.labelInsurance')}:{' '}
                        {appointmentData.patient.insuranceNumber}
                      </span>
                    </div>
                  )}

                  <div className='flex items-center gap-2 text-purple-600'>
                    <Stethoscope size={14} />
                    <span className='font-semibold'>
                      {t('doctorExam.labelService')}:{' '}
                      {appointmentData?.service?.name ||
                        t('doctorExam.valNone')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-blue-50 p-4 border border-blue-100'>
              <h4 className='font-semibold text-blue-800 mb-2 text-sm'>
                {t('doctorExam.sectionNoteDoctor')}
              </h4>
              <ul className='list-disc list-inside text-sm text-blue-700 space-y-1'>
                <li>{t('doctorExam.noteAllergy')}</li>
                <li>
                  {t('doctorExam.noteInsuranceDate')}:{' '}
                  {appointmentData?.patient?.insuranceTerm || 'N/A'}
                </li>
              </ul>
            </div>
          </div>

          <div className='col-span-12 md:col-span-8 flex flex-col gap-4'>
            <div
              className={`shadow-sm border flex-1 flex flex-col overflow-hidden ${
                isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className='bg-gray-100 px-4 py-3 border-b border-gray-200 font-semibold text-gray-700 flex justify-between items-center'>
                <span>{t('doctorExam.sectionRecords')}</span>
                <Tag color='processing' className='rounded-none!'>
                  {t('doctorExam.statusTyping')}
                </Tag>
              </div>

              <div className='p-6 grid grid-cols-2 gap-6 flex-1'>
                <div className='col-span-2 md:col-span-1'>
                  <label className='block text-sm font-bold text-blue-700 mb-2'>
                    {t('doctorExam.labelS')}
                  </label>
                  <TextArea
                    rows={4}
                    placeholder={t('doctorExam.placeholderS')}
                    value={soap.s}
                    onChange={(e) => handleSoapChange('s', e.target.value)}
                    className='w-full'
                  />
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='block text-sm font-bold text-blue-700 mb-2'>
                    {t('doctorExam.labelO')}
                  </label>
                  <TextArea
                    rows={4}
                    placeholder={t('doctorExam.placeholderO')}
                    value={soap.o}
                    onChange={(e) => handleSoapChange('o', e.target.value)}
                    className='w-full '
                  />
                </div>

                <div className='col-span-2'>
                  <label className='block text-sm font-bold text-blue-700 mb-2'>
                    {t('doctorExam.labelA')}
                  </label>
                  <Input
                    placeholder={t('doctorExam.placeholderA')}
                    value={soap.a}
                    onChange={(e) => handleSoapChange('a', e.target.value)}
                    className='w-full py-2 font-semibold'
                  />
                </div>

                <div className='col-span-2'>
                  <label className='block text-sm font-bold text-blue-700 mb-2'>
                    {t('doctorExam.labelP')}
                  </label>
                  <TextArea
                    rows={3}
                    placeholder={t('doctorExam.placeholderP')}
                    value={soap.p}
                    onChange={(e) => handleSoapChange('p', e.target.value)}
                    className='w-full'
                  />
                </div>

                <div className='col-span-2 border-t border-gray-200 my-2'></div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-bold text-green-700 mb-2 flex items-center gap-2'>
                    <Pill size={16} /> {t('doctorExam.labelPrescription')}
                  </label>
                  <TextArea
                    rows={4}
                    placeholder={t('doctorExam.placeholderPrescription')}
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    className='w-full bg-green-50'
                  />
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label className='text-sm font-bold text-purple-700 mb-2 flex items-center gap-2'>
                    <CalendarClock size={16} /> {t('doctorExam.labelReExam')}
                  </label>
                  <div className='flex flex-col gap-2'>
                    <DatePicker
                      format='DD/MM/YYYY'
                      placeholder={t('doctorExam.placeholderReExam')}
                      className='w-full py-2'
                      value={reExamDate}
                      onChange={(date) => setReExamDate(date)}
                      disabledDate={disabledDate}
                    />
                    {reExamDate && (
                      <span className='text-xs text-purple-600'>
                        {t('doctorExam.noteReExam')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className='p-4 bg-gray-50 border-t border-gray-200 flex justify-end items-center'>
                <Button
                  type='primary'
                  className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 h-10 px-6'
                  onClick={handleSave}
                  loading={loading}
                >
                  <Save size={18} />
                  {t('doctorExam.btnComplete')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
