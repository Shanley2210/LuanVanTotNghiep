import { Button } from '@/components/ui/button';
import { downloadRecordPdf, getRecordById } from '@/shared/apis/patientService';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { Separator } from '@radix-ui/react-select';
import {
    Calendar,
    Download,
    Loader2,
    MapPin,
    Pill,
    ShieldCheck,
    Stethoscope,
    User,
    UserCheck
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

interface PatientInfo {
    address: string;
    user: UserInfo;
}

interface AppointmentInfo {
    patientName: string;
    patientGender: string;
    patientPhone: string;
    patientDob: string;
    patientAddress: string;
}

interface MedicalRecordData {
    id: number;
    doctorId: number;
    patientId: number;
    appointmentId: number;
    symptoms: string;
    physicalExam: string;
    diagnosis: string;
    treatment: string;
    prescription: string;
    reExamDate: string;
    createdAt: string;
    updatedAt: string;
    patient: PatientInfo;
    appointment: AppointmentInfo;
}

interface BackendResponse {
    errCode: number;
    enMessage: string;
    viMessage: string;
    data: MedicalRecordData;
}

const DOCTOR_INFO = {
    fullName: 'BS. TRẦN THỊ BÌNH',
    specialty: 'Nội Tổng Quát'
};

export default function MedicalRecord() {
    // 2. Ép kiểu params
    const { id } = useParams<{ id: string }>();
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const navigate = useNavigate();

    // 3. KHAI BÁO STATE VỚI TYPE
    const [record, setRecord] = useState<MedicalRecordData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    useEffect(() => {
        const fetchRecord = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                // Gọi API, dùng any tạm thời để bỏ qua lớp vỏ Axios hoặc định nghĩa type AxiosResponse<BackendResponse>
                const res: any = await getRecordById(Number(id));

                // Truy cập vào 'data' của Axios để lấy dữ liệu backend thực tế
                const backendData = res.data as BackendResponse;

                // Kiểm tra errCode từ backendData
                if (backendData && backendData.errCode === 0) {
                    // Dữ liệu record nằm trong backendData.data
                    setRecord(backendData.data);
                } else {
                    toast.error(
                        language === 'vi'
                            ? backendData.viMessage
                            : backendData.enMessage
                    );
                }

                console.log('Backend Data:', backendData);
            } catch (error) {
                console.error('Error fetching record:', error);
                toast.error(t('recordPage.fetchError'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecord();
    }, [id, language, t]);

    const handleDownloadPDF = async () => {
        if (!id) return;
        setIsDownloading(true);
        try {
            await downloadRecordPdf(Number(id));
            toast.success(t('recordPage.downloadSuccess'));
        } catch (error) {
            console.error('Download error:', error);
            toast.error(t('recordPage.downloadError'));
        } finally {
            setIsDownloading(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        // Tự động định dạng ngày theo ngôn ngữ hiện tại
        const locale = language === 'vi' ? 'vi-VN' : 'en-US';
        return new Date(dateString).toLocaleDateString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
            </div>
        );
    }

    if (!record) {
        return (
            <div className='flex flex-col items-center justify-center w-screen h-[50vh] gap-4'>
                <p className='text-lg font-medium'>
                    {t('recordPage.notFound')}
                </p>
                <Button onClick={() => navigate(-1)}>
                    {t('recordPage.back')}
                </Button>
            </div>
        );
    }

    return (
        <div
            className={`
                    flex flex-col px-4 lg:px-20 w-screen py-5 my-5 gap-5 font-sans
                    ${
                        isDark
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-50 text-slate-900'
                    }
                `}
        >
            {/* Breadcrumb */}
            <div className='flex items-center gap-1'>
                <AiOutlineHome
                    className='text-xl cursor-pointer text-blue-500'
                    onClick={() => navigate('/')}
                />
                <IoIosArrowForward />
                <span className='text-blue-500 cursor-pointer'>Lịch hẹn</span>
                <IoIosArrowForward />
                <span className='line-clamp-1'>
                    {t('recordPage.headerTitle')}
                </span>
            </div>

            <div
                className={`max-w-5xl mx-auto w-full shadow-sm border ${
                    isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-300'
                }`}
            >
                {/* Header Section */}
                <div
                    className={`flex justify-between items-center border-b px-8 py-4 ${
                        isDark
                            ? 'bg-gray-900/50 border-gray-700'
                            : 'bg-slate-50 border-slate-800'
                    }`}
                >
                    <div>
                        <div className='flex flex-col gap-1'>
                            <span className='uppercase text-xs font-bold tracking-widest text-slate-500'>
                                {t('recordPage.headerSub')}
                            </span>
                            <div className='flex items-baseline gap-3'>
                                <h1
                                    className={`text-xl font-black uppercase ${
                                        isDark ? 'text-white' : 'text-black'
                                    }`}
                                >
                                    {t('recordPage.headerTitle')}
                                </h1>
                                <span
                                    className={`text-xl font-black uppercase ${
                                        isDark ? 'text-white' : 'text-black'
                                    }`}
                                >
                                    #{record.id}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`mt-2 text-sm font-medium ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            {t('recordPage.createdDate')}:{' '}
                            {formatDate(record.createdAt)}
                        </div>
                    </div>

                    <div>
                        <Button
                            onClick={handleDownloadPDF}
                            disabled={isDownloading}
                            className={`
                                    border rounded-none transition-colors cursor-pointer flex items-center gap-2
                                    ${
                                        isDark
                                            ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                            : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                                    }
                                    `}
                        >
                            {isDownloading ? (
                                <Loader2 className='w-4 h-4 animate-spin' />
                            ) : (
                                <Download className='w-4 h-4' />
                            )}
                            {isDownloading
                                ? t('recordPage.downloading')
                                : t('recordPage.exportPdf')}
                        </Button>
                    </div>
                </div>

                {/* Booker Info Section */}
                <div
                    className={`px-8 py-6 border-b ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                >
                    <div className='flex items-center gap-2 mb-4'>
                        <UserCheck size={16} className='text-blue-500' />
                        <h3
                            className={`text-sm font-bold uppercase tracking-widest ${
                                isDark ? 'text-white' : 'text-slate-900'
                            }`}
                        >
                            {t('recordPage.bookerTitle')}
                        </h3>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div>
                            <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                {t('recordPage.bookerName')}
                            </span>
                            <p
                                className={`font-bold uppercase ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                }`}
                            >
                                {record.patient?.user?.name}
                            </p>
                        </div>
                        <div>
                            <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                {t('recordPage.bookerPhone')}
                            </span>
                            <p
                                className={`font-mono font-bold ${
                                    isDark ? 'text-gray-200' : 'text-slate-700'
                                }`}
                            >
                                {record.patient?.user?.phone}
                            </p>
                        </div>
                        <div>
                            <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                {t('recordPage.bookerEmail')}
                            </span>
                            <p
                                className={`font-medium ${
                                    isDark ? 'text-gray-300' : 'text-slate-700'
                                }`}
                            >
                                {record.patient?.user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Patient & Doctor Info */}
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 border-b ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                >
                    {/* Patient Column */}
                    <div
                        className={`p-8 border-r ${
                            isDark ? 'border-gray-700' : 'border-gray-200'
                        }`}
                    >
                        <div className='flex items-center gap-2 mb-6'>
                            <User size={16} className='text-blue-500' />

                            <h3
                                className={`text-sm font-bold uppercase tracking-widest ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                }`}
                            >
                                {t('recordPage.patientTitle')}
                            </h3>
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <p
                                    className={`text-xl font-black uppercase leading-none ${
                                        isDark ? 'text-white' : 'text-slate-900'
                                    }`}
                                >
                                    {record.appointment?.patientName}
                                </p>
                            </div>

                            <div className='grid grid-cols-2 gap-4 text-sm'>
                                <div>
                                    <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                        {t('recordPage.patientId')}
                                    </span>
                                    <span
                                        className={`font-mono font-bold py-1 block w-fit ${
                                            isDark
                                                ? 'text-gray-100'
                                                : 'text-slate-700'
                                        }`}
                                    >
                                        {record.patientId}
                                    </span>
                                </div>
                                <div>
                                    <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                        {t('recordPage.patientGender')}
                                    </span>
                                    <span
                                        className={`font-bold ${
                                            isDark
                                                ? 'text-gray-200'
                                                : 'text-slate-700'
                                        }`}
                                    >
                                        {record.appointment?.patientGender ===
                                        '1'
                                            ? t('recordPage.genderFemale')
                                            : t('recordPage.genderMale')}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                    {t('recordPage.patientAddress')}
                                </span>
                                <p
                                    className={`text-sm flex items-start gap-2 font-medium ${
                                        isDark
                                            ? 'text-gray-300'
                                            : 'text-slate-700'
                                    }`}
                                >
                                    <MapPin
                                        size={14}
                                        className='shrink-0 mt-0.5 text-blue-500'
                                    />{' '}
                                    {record.appointment?.patientAddress}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Column */}
                    <div className='p-8'>
                        <div className='flex items-center gap-2 mb-6'>
                            <Stethoscope size={16} className='text-blue-500' />

                            <h3
                                className={`text-sm font-bold uppercase tracking-widest ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                }`}
                            >
                                {t('recordPage.doctorTitle')}
                            </h3>
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <p
                                    className={`text-xl font-bold uppercase border-b-2 border-blue-500 inline-block pb-1 ${
                                        isDark ? 'text-white' : 'text-slate-900'
                                    }`}
                                >
                                    {DOCTOR_INFO.fullName}
                                </p>
                            </div>

                            <div className='grid grid-cols-1 gap-4 text-sm'>
                                <div>
                                    <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                        {t('recordPage.doctorSpecialty')}
                                    </span>
                                    <span
                                        className={`font-bold uppercase tracking-tight ${
                                            isDark
                                                ? 'text-blue-400'
                                                : 'text-blue-700'
                                        }`}
                                    >
                                        {DOCTOR_INFO.specialty}
                                    </span>
                                </div>
                                <div>
                                    <span className='block text-xs text-slate-400 uppercase font-semibold mb-1'>
                                        {t('recordPage.appointmentCode')}
                                    </span>
                                    <span className='font-mono text-slate-500'>
                                        APP-{record.appointmentId}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medical Details */}
                <div className='p-8 space-y-8'>
                    {/* Clinical Info Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {/* Symptoms */}
                        <div
                            className={`border p-0 ${
                                isDark ? 'border-gray-700' : 'border-slate-200'
                            }`}
                        >
                            <h4
                                className={`px-4 py-3 text-xs font-bold uppercase border-b ${
                                    isDark
                                        ? 'bg-gray-800 text-gray-200 border-gray-700'
                                        : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                            >
                                {t('recordPage.sectionSymptoms')}
                            </h4>
                            <div
                                className={`p-5 text-sm leading-relaxed whitespace-pre-line ${
                                    isDark ? 'text-gray-300' : 'text-slate-700'
                                }`}
                            >
                                {record.symptoms}
                            </div>
                        </div>

                        {/* Physical Exam */}
                        <div
                            className={`border p-0 ${
                                isDark ? 'border-gray-700' : 'border-slate-200'
                            }`}
                        >
                            <h4
                                className={`px-4 py-3 text-xs font-bold uppercase border-b ${
                                    isDark
                                        ? 'bg-gray-800 text-gray-200 border-gray-700'
                                        : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                            >
                                {t('recordPage.sectionPhysical')}
                            </h4>
                            <div
                                className={`p-5 text-sm leading-relaxed whitespace-pre-line ${
                                    isDark ? 'text-gray-300' : 'text-slate-700'
                                }`}
                            >
                                {record.physicalExam}
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis & Treatment */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {/* Diagnosis */}
                        <div
                            className={`p-6 ${
                                isDark ? 'bg-red-900/10' : 'bg-red-50'
                            }`}
                        >
                            <h4
                                className={`text-xs font-bold uppercase mb-3 tracking-widest ${
                                    isDark ? 'text-red-400' : 'text-red-800'
                                }`}
                            >
                                {t('recordPage.sectionDiagnosis')}
                            </h4>
                            <p
                                className={`text-sm leading-relaxed whitespace-pre-line font-medium ${
                                    isDark ? 'text-gray-300' : 'text-slate-800'
                                }`}
                            >
                                {record.diagnosis}
                            </p>
                        </div>

                        {/* Plan */}
                        <div
                            className={`p-6 ${
                                isDark ? 'bg-blue-900/10' : 'bg-blue-50'
                            }`}
                        >
                            <h4
                                className={`text-xs font-bold uppercase mb-3 tracking-widest ${
                                    isDark ? 'text-blue-400' : 'text-blue-800'
                                }`}
                            >
                                {t('recordPage.sectionTreatment')}
                            </h4>
                            <div
                                className={`text-sm leading-relaxed whitespace-pre-line font-medium ${
                                    isDark ? 'text-gray-300' : 'text-slate-800'
                                }`}
                            >
                                {record.treatment}
                            </div>
                        </div>
                    </div>

                    <Separator
                        className={`h-px my-4 ${
                            isDark ? 'bg-gray-700' : 'bg-slate-200'
                        }`}
                    />

                    {/* Prescription Section */}
                    <div>
                        <div
                            className={`flex items-center justify-between mb-4 border-b-2 pb-2 ${
                                isDark ? 'border-white' : 'border-black'
                            }`}
                        >
                            <h4
                                className={`text-xl font-black uppercase flex items-center gap-2 ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                }`}
                            >
                                <Pill className='w-6 h-6' />{' '}
                                {t('recordPage.prescriptionTitle')}
                            </h4>
                            <span className='text-xs font-medium text-slate-500 uppercase'>
                                {t('recordPage.prescriptionSub')}
                            </span>
                        </div>

                        <div
                            className={`p-8 shadow-sm font-mono text-sm relative ${
                                isDark
                                    ? 'bg-black border border-gray-700 text-gray-200'
                                    : 'bg-slate-900 text-slate-50'
                            }`}
                        >
                            {/* Decorative line */}
                            <div className='absolute left-0 top-0 bottom-0 w-2 bg-yellow-500'></div>

                            <div className='relative z-10 whitespace-pre-line leading-loose pl-4'>
                                {record.prescription}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Signature */}
                    <div className='pt-10 flex flex-col md:flex-row justify-between items-end gap-12'>
                        {/* Follow up box */}
                        <div
                            className={`w-full md:w-auto border-2 p-3 min-w-[200px] ${
                                isDark
                                    ? 'border-gray-700 bg-gray-900/50'
                                    : 'border-slate-200'
                            }`}
                        >
                            <div className='flex items-center gap-5'>
                                <Calendar className='text-blue-600 w-5 h-5 mt-1' />
                                <div>
                                    <p className='text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1'>
                                        {t('recordPage.reExamDate')}
                                    </p>
                                    <p
                                        className={`text-xl font-bold ${
                                            isDark
                                                ? 'text-white'
                                                : 'text-slate-900'
                                        }`}
                                    >
                                        {record.reExamDate
                                            ? formatDate(record.reExamDate)
                                            : t('recordPage.homeMonitoring')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Signature Block */}
                        <div className='text-center w-full md:w-64 relative pb-4'>
                            {/* Seal */}
                            <div className='absolute top-0 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none'>
                                <div className='w-32 h-32 border-4 border-red-600 rounded-full flex items-center justify-center -rotate-12 mask-image-grunge'>
                                    <div className='w-28 h-28 border border-red-600 rounded-full flex items-center justify-center p-2 text-center'>
                                        <span className='text-red-600 font-black text-[10px] uppercase leading-tight whitespace-pre-line'>
                                            {t('recordPage.stampChecked')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-1 relative z-10 mt-14'>
                                <p
                                    className={`font-bold text-lg uppercase ${
                                        isDark ? 'text-white' : 'text-slate-900'
                                    }`}
                                >
                                    {DOCTOR_INFO.fullName}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document Footer */}
                <div className='bg-slate-900 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest'>
                    <div className='flex items-center gap-2'>
                        <ShieldCheck size={14} className='text-yellow-500' />
                        <span>{t('recordPage.securityInfo')}</span>
                    </div>
                    <div className='opacity-60'>© 2026 Shanley</div>
                </div>
            </div>
        </div>
    );
}
