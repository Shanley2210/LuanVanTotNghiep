import { useContext, useEffect, useState, useMemo } from 'react';
import {
    Card,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Row,
    Col,
    Typography,
    Space,
    Empty,
    Spin,
    Divider,
    Avatar
} from 'antd';
import {
    UserOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    CheckCircleFilled,
    MedicineBoxOutlined,
    FileTextOutlined,
    MailOutlined,
    IdcardOutlined,
    CalendarOutlined,
    TeamOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';
import {
    fetchDoctors,
    fetchDoctorsByService,
    selectDoctor
} from '@/shared/stores/doctorSlice';
import { getSlotDoctor } from '@/shared/apis/doctorService';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createAppointmentByReceptionist } from '@/shared/apis/receptionistService';

const { Text } = Typography;
const { TextArea } = Input;

export default function CreateAppointmentAntd() {
    // Lấy biến isDark từ Context
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const localeStr = language === 'vi' ? 'vi-VN' : 'en-US';
    const dispatch = useAppDispatch();
    const { list: serviceList, loading: loadingServices } =
        useAppSelector(selectServices);

    const {
        list: allDoctors,
        listDoctorService,
        loading: loadingDoctors
    } = useAppSelector(selectDoctor);

    const [formPatient] = Form.useForm();
    const [formBooking] = Form.useForm();
    const [specialtyId, setSpecialtyId] = useState<string | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [slotData, setSlotData] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
    const [loadingSlots, setLoadingSlots] = useState(false);

    useEffect(() => {
        dispatch(fetchServices({ page: 1, limit: 100 }));
        dispatch(fetchDoctors({ page: 1, limit: 100, status: 'active' }));
    }, [dispatch]);

    useEffect(() => {
        if (specialtyId && specialtyId !== 'all') {
            setDoctorId(null);
            dispatch(
                fetchDoctorsByService({
                    serviceId: Number(specialtyId),
                    page: 1,
                    limit: 100,
                    status: 'active'
                })
            );
        }
    }, [specialtyId, dispatch]);

    const unifiedDoctors = useMemo(() => {
        if (!specialtyId || specialtyId === 'all') {
            return allDoctors.map((doc) => ({
                ...doc,
                finalPrice: doc.price
            }));
        }
        return listDoctorService.map((item) => ({
            ...item.doctor,
            finalPrice: item.price
        }));
    }, [specialtyId, allDoctors, listDoctorService]);

    const handleFetchSlots = async (docId: number, dateString: string) => {
        if (!docId || !dateString) return;
        setLoadingSlots(true);
        setSelectedSlot(null);
        try {
            const res = await getSlotDoctor(docId, dateString);
            if (res && res.data && res.data.data) {
                setSlotData(res.data.data);
            } else {
                setSlotData([]);
            }
        } catch (error) {
            console.error('Error fetching slots', error);
            setSlotData([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const onDateChange = (date: dayjs.Dayjs | null) => {
        if (date && doctorId) {
            handleFetchSlots(doctorId, date.format('YYYY-MM-DD'));
        } else {
            setSlotData([]);
        }
    };

    const onDoctorSelect = (docId: number) => {
        setDoctorId(docId);
        const currentDate = formBooking.getFieldValue('date');
        if (currentDate) {
            handleFetchSlots(docId, currentDate.format('YYYY-MM-DD'));
        }
    };

    const handleSubmitBooking = async () => {
        try {
            const patientValues = await formPatient.validateFields();
            if (!doctorId || !selectedSlot) {
                toast.error(
                    t(
                        'createAppointment.createAppointmentToastMissingInfo',
                        'Vui lòng chọn Bác sĩ và Giờ khám'
                    )
                );
                return;
            }

            const payload = {
                email: patientValues.email,
                name: patientValues.name,
                phone: patientValues.phone,
                address: patientValues.address,
                gender: patientValues.gender,
                dob: patientValues.dob
                    ? patientValues.dob.format('YYYY-MM-DD')
                    : null,

                ethnicity: patientValues.ethnicity || null,
                insuranceNumber: patientValues.insuranceNumber || null,
                insuranceTerm: patientValues.insuranceTerm
                    ? patientValues.insuranceTerm.format('YYYY-MM-DD')
                    : null,

                doctorId: doctorId,
                slotId: selectedSlot.id,
                serviceId:
                    specialtyId && specialtyId !== 'all' ? specialtyId : null,
                reason: patientValues.reason,

                familyAddress: null,
                notePMH: null
            };

            setIsLoading(true);
            try {
                const res = await createAppointmentByReceptionist(payload);

                if (res && res.data.errCode === 0) {
                    toast.success(
                        language === 'vi'
                            ? res.data.viMessage
                            : res.data.enMessage
                    );
                } else {
                    toast.error(
                        language === 'vi'
                            ? res.data.errViMessage
                            : res.data.errEnMessage
                    );
                }
            } catch (error) {
                console.error('Error creating appointment:', error);
                toast.error(
                    t(
                        'createAppointment.createAppointmentToastServerError',
                        'Lỗi phía server'
                    )
                );
            } finally {
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error('Validation Failed:', error);
            toast.error(
                t(
                    'createAppointment.createAppointmentToastFormInvalid',
                    'Vui lòng điền đầy đủ thông tin bắt buộc (Email, SĐT, Tên).'
                )
            );
        }
    };

    const formatPrice = (price: any) => {
        return new Intl.NumberFormat(localeStr, {
            style: 'currency',
            currency: 'VND'
        }).format(Number(price) || 0);
    };

    const formatTimeSlot = (time: string) => {
        if (!time) return '';
        const date = new Date(time);
        return new Intl.DateTimeFormat(localeStr, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
    };

    return (
        <div className='m-5 animate-in fade-in duration-500 h-[calc(100vh-40px)] flex flex-col'>
            <div
                className={`text-2xl uppercase pb-4 font-bold shrink-0 ${
                    isDark ? 'text-gray-100' : 'text-neutral-800'
                }`}
            >
                {t(
                    'createAppointment.createAppointmentTitle',
                    'Tạo lịch hẹn tại quầy'
                )}
            </div>

            <Row gutter={[24, 24]} className='flex-1 min-h-0'>
                {/* --- CỘT TRÁI: THÔNG TIN BỆNH NHÂN --- */}
                <Col xs={24} lg={10} className='h-full'>
                    <Card
                        title={
                            <Space>
                                <UserOutlined className='text-blue-600' />
                                <span className={isDark ? 'text-gray-100' : ''}>
                                    {t(
                                        'createAppointment.createAppointmentPatientInfoTitle',
                                        'Thông tin Khách hàng'
                                    )}
                                </span>
                            </Space>
                        }
                        className={`shadow-sm h-full rounded-none border-t-4 border-t-blue-500 ${
                            isDark ? 'border-gray-700' : ''
                        }`}
                        style={{ display: 'flex', flexDirection: 'column' }}
                        // Cập nhật Styles cho Card Header và Body dựa trên isDark
                        styles={{
                            header: {
                                background: isDark ? '#1f1f1f' : '#fafafa',
                                borderRadius: 0,
                                flexShrink: 0,
                                borderBottom: isDark
                                    ? '1px solid #303030'
                                    : undefined,
                                color: isDark ? '#fff' : undefined
                            },
                            body: {
                                background: isDark ? '#141414' : '#ffffff',
                                borderRadius: 0,
                                flex: 1,
                                overflowY: 'auto',
                                padding: '24px'
                            }
                        }}
                    >
                        {/* Note Box: Chỉnh màu nền và màu chữ cho dark mode */}
                        <div
                            className={`mb-4 text-sm italic border-l-4 pl-3 py-2 ${
                                isDark
                                    ? 'bg-blue-900/20 border-blue-700 text-gray-400'
                                    : 'bg-blue-50 border-blue-300 text-gray-500'
                            }`}
                        >
                            {t(
                                'createAppointment.createAppointmentAutoSearchNote',
                                'Hệ thống sẽ tự động tìm kiếm theo SĐT. Nếu chưa có, tài khoản mới sẽ được tạo.'
                            )}
                        </div>

                        <Form
                            form={formPatient}
                            layout='vertical'
                            className='animate-in slide-in-from-left-2 duration-300'
                        >
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        name='phone'
                                        label={t(
                                            'createAppointment.createAppointmentPhoneLabel',
                                            'Số điện thoại'
                                        )}
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'createAppointment.createAppointmentPhoneRequired',
                                                    'Nhập SĐT'
                                                )
                                            }
                                        ]}
                                    >
                                        <Input
                                            prefix={
                                                <PhoneOutlined className='text-gray-400' />
                                            }
                                            placeholder={t(
                                                'createAppointment.createAppointmentPhonePlaceholder',
                                                '09xxxxxxx'
                                            )}
                                            className='rounded-none'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='email'
                                        label={t(
                                            'createAppointment.createAppointmentEmailLabel',
                                            'Email'
                                        )}
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'createAppointment.createAppointmentEmailRequired',
                                                    'Bắt buộc'
                                                )
                                            },
                                            {
                                                type: 'email',
                                                message: t(
                                                    'createAppointment.createAppointmentEmailInvalid',
                                                    'Email không hợp lệ'
                                                )
                                            }
                                        ]}
                                    >
                                        <Input
                                            prefix={
                                                <MailOutlined className='text-gray-400' />
                                            }
                                            placeholder={t(
                                                'createAppointment.createAppointmentEmailPlaceholder',
                                                'email@example.com'
                                            )}
                                            className='rounded-none'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name='name'
                                label={t(
                                    'createAppointment.createAppointmentNameLabel',
                                    'Họ và tên'
                                )}
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'createAppointment.createAppointmentNameRequired',
                                            'Nhập họ tên'
                                        )
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined className='text-gray-400' />
                                    }
                                    placeholder={t(
                                        'createAppointment.createAppointmentNamePlaceholder',
                                        'Nguyễn Văn A'
                                    )}
                                    className='rounded-none'
                                />
                            </Form.Item>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        name='dob'
                                        label={t(
                                            'createAppointment.createAppointmentDobLabel',
                                            'Ngày sinh'
                                        )}
                                    >
                                        <DatePicker
                                            format='DD/MM/YYYY'
                                            className='w-full rounded-none'
                                            placeholder={t(
                                                'createAppointment.createAppointmentDatePlaceholder',
                                                'Chọn ngày'
                                            )}
                                            disabledDate={(current) =>
                                                current &&
                                                current > dayjs().endOf('day')
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='gender'
                                        label={t(
                                            'createAppointment.createAppointmentGenderLabel',
                                            'Giới tính'
                                        )}
                                        initialValue='1'
                                    >
                                        <Select>
                                            <Select.Option value='1'>
                                                {t(
                                                    'createAppointment.createAppointmentGenderMale',
                                                    'Nam'
                                                )}
                                            </Select.Option>
                                            <Select.Option value='0'>
                                                {t(
                                                    'createAppointment.createAppointmentGenderFemale',
                                                    'Nữ'
                                                )}
                                            </Select.Option>
                                            <Select.Option value='2'>
                                                {t(
                                                    'createAppointment.createAppointmentGenderOther',
                                                    'Khác'
                                                )}
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        name='ethnicity'
                                        label={t(
                                            'createAppointment.createAppointmentEthnicityLabel',
                                            'Dân tộc'
                                        )}
                                    >
                                        <Input
                                            prefix={
                                                <TeamOutlined className='text-gray-400' />
                                            }
                                            placeholder={t(
                                                'createAppointment.createAppointmentEthnicityPlaceholder',
                                                'Kinh'
                                            )}
                                            className='rounded-none'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='insuranceNumber'
                                        label={t(
                                            'createAppointment.createAppointmentInsuranceNumberLabel',
                                            'Số BHYT'
                                        )}
                                    >
                                        <Input
                                            prefix={
                                                <IdcardOutlined className='text-gray-400' />
                                            }
                                            placeholder={t(
                                                'createAppointment.createAppointmentInsuranceNumberPlaceholder',
                                                'DN479...'
                                            )}
                                            className='rounded-none'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        name='insuranceTerm'
                                        label={t(
                                            'createAppointment.createAppointmentInsuranceTermLabel',
                                            'Hạn BHYT'
                                        )}
                                    >
                                        <DatePicker
                                            format='DD/MM/YYYY'
                                            className='w-full rounded-none'
                                            placeholder={t(
                                                'createAppointment.createAppointmentInsuranceTermPlaceholder',
                                                'Chọn hạn'
                                            )}
                                            suffixIcon={<CalendarOutlined />}
                                            disabledDate={(current) =>
                                                current &&
                                                current < dayjs().startOf('day')
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name='address'
                                label={t(
                                    'createAppointment.createAppointmentAddressLabel',
                                    'Địa chỉ'
                                )}
                            >
                                <Input
                                    prefix={
                                        <EnvironmentOutlined className='text-gray-400' />
                                    }
                                    placeholder={t(
                                        'createAppointment.createAppointmentAddressPlaceholder',
                                        'Số nhà, đường...'
                                    )}
                                    className='rounded-none'
                                />
                            </Form.Item>

                            <Divider
                                dashed
                                className={`border-gray-300 ${
                                    isDark ? 'border-gray-600' : ''
                                }`}
                            >
                                <span className={isDark ? 'text-gray-400' : ''}>
                                    {t(
                                        'createAppointment.createAppointmentExamInfoDivider',
                                        'Thông tin khám'
                                    )}
                                </span>
                            </Divider>

                            <Form.Item
                                name='reason'
                                label={
                                    <span className='font-semibold text-blue-600'>
                                        <FileTextOutlined />{' '}
                                        {t(
                                            'createAppointment.createAppointmentReasonLabel',
                                            'Lý do khám / Triệu chứng'
                                        )}
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: t(
                                            'createAppointment.createAppointmentReasonRequired',
                                            'Vui lòng nhập lý do khám'
                                        )
                                    }
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder={t(
                                        'createAppointment.createAppointmentReasonPlaceholder',
                                        'VD: Đau đầu, chóng mặt, sốt cao...'
                                    )}
                                    showCount
                                    maxLength={300}
                                    // Điều chỉnh màu nền TextArea khi dark mode
                                    className={`rounded-none ${
                                        isDark
                                            ? 'bg-gray-800 border-gray-600 text-gray-200'
                                            : 'bg-blue-50/50'
                                    }`}
                                />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                {/* --- CỘT PHẢI: CHỌN LỊCH KHÁM --- */}
                <Col xs={24} lg={14} className='h-full'>
                    <Card
                        title={
                            <Space>
                                <MedicineBoxOutlined className='text-blue-600' />{' '}
                                <span className={isDark ? 'text-gray-100' : ''}>
                                    {t(
                                        'createAppointment.createAppointmentSelectScheduleTitle',
                                        'Chọn Lịch Khám'
                                    )}
                                </span>
                            </Space>
                        }
                        className={`shadow-sm rounded-none border-t-4 border-t-orange-500 h-full ${
                            isDark ? 'border-gray-700' : ''
                        }`}
                        style={{ display: 'flex', flexDirection: 'column' }}
                        // Styles cho Card bên phải
                        styles={{
                            header: {
                                background: isDark ? '#1f1f1f' : '#fafafa',
                                borderRadius: 0,
                                flexShrink: 0,
                                borderBottom: isDark
                                    ? '1px solid #303030'
                                    : undefined,
                                color: isDark ? '#fff' : undefined
                            },
                            body: {
                                background: isDark ? '#141414' : '#ffffff',
                                flex: 1,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '12px'
                            }
                        }}
                    >
                        <div className='flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-1'>
                            <Form
                                form={formBooking}
                                layout='vertical'
                                initialValues={{ date: dayjs() }}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label={t(
                                                'createAppointment.createAppointmentServiceLabel',
                                                'Dịch vụ / Chuyên khoa'
                                            )}
                                        >
                                            <Select
                                                placeholder={t(
                                                    'createAppointment.createAppointmentServicePlaceholder',
                                                    'Chọn dịch vụ'
                                                )}
                                                loading={loadingServices}
                                                showSearch
                                                optionFilterProp='children'
                                                onChange={(val) => {
                                                    setSpecialtyId(val);
                                                    setDoctorId(null);
                                                    setSlotData([]);
                                                    setSelectedSlot(null);
                                                }}
                                                allowClear
                                            >
                                                <Select.Option
                                                    value='all'
                                                    className='rounded-none'
                                                >
                                                    {t(
                                                        'createAppointment.createAppointmentAllOption',
                                                        'Tất cả'
                                                    )}
                                                </Select.Option>
                                                {serviceList?.map(
                                                    (service: any) => (
                                                        <Select.Option
                                                            key={service.id}
                                                            value={service.id.toString()}
                                                            className='rounded-none'
                                                        >
                                                            {service.name}
                                                        </Select.Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>

                                        <div className='mb-4'>
                                            <Text
                                                strong
                                                className={`mb-2 block ${
                                                    isDark
                                                        ? 'text-gray-200'
                                                        : ''
                                                }`}
                                            >
                                                {t(
                                                    'createAppointment.createAppointmentDoctorLabel',
                                                    'Chọn Bác sĩ'
                                                )}{' '}
                                                <span className='text-red-500'>
                                                    *
                                                </span>
                                            </Text>
                                            {/* Doctor List Container */}
                                            <div
                                                className={`flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar border p-1 rounded-none ${
                                                    isDark
                                                        ? 'border-gray-700 bg-gray-900'
                                                        : 'border-gray-200'
                                                }`}
                                            >
                                                {loadingDoctors ? (
                                                    <div className='text-center py-4'>
                                                        <Spin />
                                                    </div>
                                                ) : unifiedDoctors.length >
                                                  0 ? (
                                                    unifiedDoctors.map(
                                                        (doc: any) => (
                                                            <div
                                                                key={doc.id}
                                                                onClick={() =>
                                                                    onDoctorSelect(
                                                                        doc.id
                                                                    )
                                                                }
                                                                // Doctor List Item styling logic
                                                                className={`
                                                                flex items-center gap-3 p-3 border cursor-pointer transition-all duration-200 rounded-none
                                                                ${
                                                                    doctorId ===
                                                                    doc.id
                                                                        ? isDark
                                                                            ? 'border-blue-500 bg-blue-900/30 ring-1 ring-blue-500' // Selected Dark
                                                                            : 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' // Selected Light
                                                                        : isDark
                                                                        ? 'border-gray-700 hover:bg-gray-800' // Normal Dark
                                                                        : 'border-gray-100 hover:bg-gray-50' // Normal Light
                                                                }
                                                            `}
                                                            >
                                                                <Avatar
                                                                    shape='square'
                                                                    src={
                                                                        doc.image
                                                                    }
                                                                    icon={
                                                                        <UserOutlined />
                                                                    }
                                                                    className='rounded-none'
                                                                />
                                                                <div className='flex-1'>
                                                                    <div
                                                                        className={`font-medium ${
                                                                            isDark
                                                                                ? 'text-gray-200'
                                                                                : ''
                                                                        }`}
                                                                    >
                                                                        {doc
                                                                            .user
                                                                            ?.name ||
                                                                            t(
                                                                                'createAppointment.createAppointmentDefaultDoctorName',
                                                                                'Bác sĩ'
                                                                            )}
                                                                    </div>
                                                                    <div
                                                                        className={`text-xs flex justify-between mt-1 ${
                                                                            isDark
                                                                                ? 'text-gray-400'
                                                                                : 'text-gray-500'
                                                                        }`}
                                                                    >
                                                                        <span>
                                                                            {doc
                                                                                .specialty
                                                                                ?.name ||
                                                                                t(
                                                                                    'createAppointment.createAppointmentDefaultSpecialty',
                                                                                    'General'
                                                                                )}
                                                                        </span>
                                                                        <span className='font-bold text-orange-600'>
                                                                            {formatPrice(
                                                                                doc.finalPrice
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {doctorId ===
                                                                    doc.id && (
                                                                    <CheckCircleFilled className='text-blue-600' />
                                                                )}
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <Empty
                                                        image={
                                                            Empty.PRESENTED_IMAGE_SIMPLE
                                                        }
                                                        description={
                                                            <span
                                                                className={
                                                                    isDark
                                                                        ? 'text-gray-400'
                                                                        : ''
                                                                }
                                                            >
                                                                {t(
                                                                    'createAppointment.createAppointmentNoDoctor',
                                                                    'Chưa có bác sĩ'
                                                                )}
                                                            </span>
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name='date'
                                            label={t(
                                                'createAppointment.createAppointmentExamDateLabel',
                                                'Ngày khám'
                                            )}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t(
                                                        'createAppointment.createAppointmentDateRequired',
                                                        'Chọn ngày'
                                                    )
                                                }
                                            ]}
                                        >
                                            <DatePicker
                                                format='DD/MM/YYYY'
                                                className='w-full rounded-none'
                                                disabledDate={(current) =>
                                                    current &&
                                                    current <
                                                        dayjs().startOf('day')
                                                }
                                                onChange={onDateChange}
                                            />
                                        </Form.Item>

                                        <div className='mb-2'>
                                            <Text
                                                strong
                                                className={`mb-2 block ${
                                                    isDark
                                                        ? 'text-gray-200'
                                                        : ''
                                                }`}
                                            >
                                                {t(
                                                    'createAppointment.createAppointmentTimeSlotLabel',
                                                    'Giờ khám'
                                                )}{' '}
                                                <span className='text-red-500'>
                                                    *
                                                </span>
                                            </Text>
                                            {!doctorId ? (
                                                <div
                                                    className={`text-gray-400 italic text-sm border border-dashed p-8 text-center rounded-none ${
                                                        isDark
                                                            ? 'bg-gray-800 border-gray-600'
                                                            : 'bg-gray-50'
                                                    }`}
                                                >
                                                    {t(
                                                        'createAppointment.createAppointmentSelectDoctorFirst',
                                                        'Vui lòng chọn bác sĩ trước'
                                                    )}
                                                </div>
                                            ) : loadingSlots ? (
                                                <div className='text-center py-8 flex flex-col items-center justify-center'>
                                                    <Spin />
                                                    <div className='mt-2 text-gray-500 text-sm'>
                                                        {t(
                                                            'createAppointment.createAppointmentLoadingSchedule',
                                                            'Đang tải lịch...'
                                                        )}
                                                    </div>
                                                </div>
                                            ) : slotData.length > 0 ? (
                                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                                                    {slotData.map(
                                                        (slot: any) => {
                                                            const isAvailable =
                                                                slot.status ===
                                                                    'available' ||
                                                                slot.currentBooking <
                                                                    slot.maxBooking;
                                                            const isSelected =
                                                                selectedSlot?.id ===
                                                                slot.id;
                                                            return (
                                                                <Button
                                                                    key={
                                                                        slot.id
                                                                    }
                                                                    htmlType='button'
                                                                    disabled={
                                                                        !isAvailable
                                                                    }
                                                                    type='default'
                                                                    onClick={() =>
                                                                        isAvailable &&
                                                                        setSelectedSlot(
                                                                            slot
                                                                        )
                                                                    }
                                                                    // Time Slot Styling Logic
                                                                    className={`
                                                                    text-xs h-auto py-2 rounded-none transition-all duration-200 flex items-center justify-center gap-1
                                                                    ${
                                                                        isSelected
                                                                            ? 'bg-blue-600! !text-white! border-blue-600! shadow-md transform scale-105 z-10 font-semibold'
                                                                            : isDark
                                                                            ? 'hover:border-blue-500! hover:text-blue-500! text-gray-300 bg-gray-800 border-gray-600'
                                                                            : 'hover:border-blue-500! hover:text-blue-500! text-gray-600'
                                                                    }
                                                                `}
                                                                >
                                                                    {isSelected && (
                                                                        <CheckCircleFilled />
                                                                    )}
                                                                    <span>
                                                                        {formatTimeSlot(
                                                                            slot.startTime
                                                                        )}{' '}
                                                                        -{' '}
                                                                        {formatTimeSlot(
                                                                            slot.endTime
                                                                        )}
                                                                    </span>
                                                                </Button>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            ) : (
                                                <Empty
                                                    image={
                                                        Empty.PRESENTED_IMAGE_SIMPLE
                                                    }
                                                    description={
                                                        <span
                                                            className={
                                                                isDark
                                                                    ? 'text-gray-400'
                                                                    : ''
                                                            }
                                                        >
                                                            {t(
                                                                'createAppointment.createAppointmentNoSlotsAvailable',
                                                                'Không có lịch trống'
                                                            )}
                                                        </span>
                                                    }
                                                />
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>

                        <Divider
                            className={`my-1 ${
                                isDark ? 'border-gray-700' : ''
                            }`}
                        />

                        <div className='shrink-0'>
                            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                                <div>
                                    <Text
                                        type='secondary'
                                        className={
                                            isDark ? 'text-gray-400' : ''
                                        }
                                    >
                                        {t(
                                            'createAppointment.createAppointmentTotalPriceLabel',
                                            'Tổng tiền khám:'
                                        )}
                                    </Text>
                                    <div className='text-3xl font-bold text-red-600 leading-none mt-1'>
                                        {formatPrice(
                                            unifiedDoctors.find(
                                                (d: any) => d.id === doctorId
                                            )?.finalPrice
                                        )}
                                    </div>
                                </div>
                                <Space size='middle'>
                                    <Button
                                        size='large'
                                        onClick={() => window.location.reload()}
                                        className='rounded-none'
                                    >
                                        {t(
                                            'createAppointment.createAppointmentCancelButton',
                                            'Hủy'
                                        )}
                                    </Button>
                                    <Button
                                        type='primary'
                                        size='large'
                                        onClick={handleSubmitBooking}
                                        className='bg-blue-600 hover:bg-blue-500 min-w-[200px] h-12 text-lg font-semibold shadow-lg shadow-blue-500/30 rounded-none'
                                    >
                                        {isLoading ? (
                                            <Spin />
                                        ) : (
                                            t(
                                                'createAppointment.createAppointmentBookButton',
                                                'Đặt lịch'
                                            )
                                        )}
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
