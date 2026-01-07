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
    Segmented,
    message,
    Typography,
    Space,
    Empty,
    Spin,
    Divider,
    Avatar,
    Tag
} from 'antd';
import {
    UserOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    SaveOutlined,
    CheckCircleFilled,
    MedicineBoxOutlined,
    SearchOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';
import { fetchDoctors, selectDoctor } from '@/shared/stores/doctorSlice';
import { getSlotDoctor } from '@/shared/apis/doctorService';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
const { TextArea } = Input;

export default function CreateAppointmentAntd() {
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const localeStr = language === 'vi' ? 'vi-VN' : 'en-US';

    const dispatch = useAppDispatch();
    const { list: serviceList, loading: loadingServices } =
        useAppSelector(selectServices);
    const { list: allDoctors, loading: loadingDoctors } =
        useAppSelector(selectDoctor);

    const [formPatient] = Form.useForm();
    const [formBooking] = Form.useForm();

    const [patientMode, setPatientMode] = useState<'find' | 'create'>('find');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchingPatient, setIsSearchingPatient] = useState(false);
    const [foundPatientId, setFoundPatientId] = useState<number | null>(null);

    const [specialtyId, setSpecialtyId] = useState<string | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);

    const [slotData, setSlotData] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
    const [loadingSlots, setLoadingSlots] = useState(false);

    useEffect(() => {
        dispatch(fetchServices({ page: 1, limit: 100 }));
        dispatch(fetchDoctors({ page: 1, limit: 100, status: 'active' }));
    }, [dispatch]);

    const filteredDoctors = useMemo(() => {
        if (!allDoctors) return [];
        if (specialtyId && specialtyId !== 'all') {
            return allDoctors.filter(
                (d: any) =>
                    d.specialty?.id === Number(specialtyId) ||
                    d.serviceId === Number(specialtyId)
            );
        }
        return allDoctors;
    }, [specialtyId, allDoctors]);

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

    const handleSearchPatient = async (value: string) => {
        if (!value) return;
        setIsSearchingPatient(true);
        setFoundPatientId(null);
        formPatient.resetFields();

        try {
            setTimeout(() => {
                if (value === '0909123456') {
                    const foundData = {
                        id: 999,
                        name: 'Nguyễn Văn Bệnh Nhân',
                        phone: '0909123456',
                        dob: dayjs('1990-01-01'),
                        gender: '1',
                        address: '123 Đường ABC, Quận 1, TP.HCM',
                        reason: ''
                    };
                    formPatient.setFieldsValue(foundData);
                    setFoundPatientId(foundData.id);
                    message.success('Đã tìm thấy bệnh nhân.');
                } else {
                    message.info(
                        'Không tìm thấy. Vui lòng nhập thông tin mới.'
                    );
                }
                setIsSearchingPatient(false);
            }, 500);
        } catch (error) {
            message.error('Lỗi khi tìm kiếm');
            setIsSearchingPatient(false);
        }
    };

    const handleSubmitBooking = async () => {
        try {
            const patientValues = await formPatient.validateFields();
            const bookingValues = await formBooking.validateFields();

            if (!doctorId || !selectedSlot) {
                message.error('Vui lòng chọn Bác sĩ và Giờ khám');
                return;
            }

            const payload = {
                doctorId: doctorId,
                date: bookingValues.date.format('YYYY-MM-DD'),
                slotId: selectedSlot.id,
                timeType: selectedSlot.timeType,
                bookingInfo: {
                    patientId: foundPatientId || null,
                    name: patientValues.name,
                    phone: patientValues.phone,
                    gender: patientValues.gender,
                    address: patientValues.address,
                    dob: patientValues.dob
                        ? patientValues.dob.format('YYYY-MM-DD')
                        : null,
                    reason: patientValues.reason,
                    bookingFor: 'self'
                }
            };

            console.log('✅ DỮ LIỆU SẴN SÀNG:', payload);
            message.success('Đã lấy dữ liệu thành công! Kiểm tra Console.');
        } catch (error: any) {
            console.error('Validation Failed:', error);
            message.error('Vui lòng điền đầy đủ thông tin bắt buộc.');
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
        // 1. SET CHIỀU CAO CỐ ĐỊNH CHO CONTAINER CHÍNH (Full viewport trừ margin)
        <div className='m-5 animate-in fade-in duration-500 h-[calc(100vh-40px)] flex flex-col'>
            <div
                className={`text-2xl uppercase pb-4 font-bold shrink-0 ${
                    isDark ? 'text-gray-100' : 'text-neutral-800'
                }`}
            >
                {t('createAppointment.title', 'Tạo lịch hẹn tại quầy')}
            </div>

            {/* 2. ROW PHẢI CÓ FLEX-1 ĐỂ CHIẾM HẾT CHIỀU CAO CÒN LẠI */}
            <Row gutter={[24, 24]} className='flex-1 min-h-0'>
                {/* --- CỘT TRÁI --- */}
                <Col xs={24} lg={10} className='h-full'>
                    <Card
                        title={
                            <Space>
                                <UserOutlined className='text-blue-600' /> Thông
                                tin & Lý do khám
                            </Space>
                        }
                        className='shadow-sm h-full rounded-none border-t-4 border-t-blue-500'
                        // Card là flex container để body giãn ra
                        style={{ display: 'flex', flexDirection: 'column' }}
                        headStyle={{
                            background: isDark ? '#1f1f1f' : '#fafafa',
                            borderRadius: 0,
                            flexShrink: 0
                        }}
                        bodyStyle={{
                            borderRadius: 0,
                            flex: 1, // Body chiếm hết không gian còn lại
                            overflowY: 'auto', // Scroll nội dung nếu quá dài
                            padding: '24px' // Antd default padding
                        }}
                    >
                        <Segmented
                            block
                            options={[
                                {
                                    label: 'Tìm kiếm',
                                    value: 'find',
                                    icon: <SearchOutlined />
                                },
                                {
                                    label: 'Tạo mới',
                                    value: 'create',
                                    icon: <UserOutlined />
                                }
                            ]}
                            value={patientMode}
                            onChange={(val) => {
                                setPatientMode(val as any);
                                setFoundPatientId(null);
                                setSearchQuery('');
                                formPatient.resetFields();
                            }}
                            className='mb-3! rounded-none'
                            style={{ borderRadius: 0 }}
                        />

                        {patientMode === 'find' && (
                            <div className='mb-6'>
                                <Input.Search
                                    placeholder='Nhập SĐT (VD: 0909123456)'
                                    enterButton={
                                        <Button
                                            type='primary'
                                            className='rounded-none'
                                        >
                                            Tìm & Điền
                                        </Button>
                                    }
                                    size='large'
                                    loading={isSearchingPatient}
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    onSearch={handleSearchPatient}
                                    className='rounded-none'
                                    style={{ borderRadius: 0 }}
                                />
                                <div className='text-xs text-gray-400 mt-1 italic'>
                                    *Nếu tìm thấy, thông tin sẽ tự động điền bên
                                    dưới.
                                </div>
                            </div>
                        )}

                        <Form
                            form={formPatient}
                            layout='vertical'
                            className='animate-in slide-in-from-left-2 duration-300'
                        >
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        name='phone'
                                        label='Số điện thoại'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập SĐT'
                                            }
                                        ]}
                                    >
                                        <Input
                                            prefix={
                                                <PhoneOutlined className='text-gray-400' />
                                            }
                                            placeholder='09xxxxxxx'
                                            className='rounded-none'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='name'
                                        label='Họ và tên'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập họ tên'
                                            }
                                        ]}
                                    >
                                        <Input
                                            prefix={
                                                <UserOutlined className='text-gray-400' />
                                            }
                                            placeholder='Nguyễn Văn A'
                                            className='rounded-none'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item name='dob' label='Ngày sinh'>
                                        <DatePicker
                                            format='DD/MM/YYYY'
                                            className='w-full rounded-none'
                                            placeholder='Chọn ngày'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='gender'
                                        label='Giới tính'
                                        initialValue='1'
                                    >
                                        <Select
                                            className='rounded-none'
                                            dropdownStyle={{ borderRadius: 0 }}
                                        >
                                            <Select.Option
                                                value='1'
                                                className='rounded-none'
                                            >
                                                Nam
                                            </Select.Option>
                                            <Select.Option
                                                value='0'
                                                className='rounded-none'
                                            >
                                                Nữ
                                            </Select.Option>
                                            <Select.Option
                                                value='2'
                                                className='rounded-none'
                                            >
                                                Khác
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item name='address' label='Địa chỉ'>
                                <Input
                                    prefix={
                                        <EnvironmentOutlined className='text-gray-400' />
                                    }
                                    placeholder='Số nhà, đường...'
                                    className='rounded-none'
                                />
                            </Form.Item>

                            <Divider dashed className='border-gray-300'>
                                Thông tin khám
                            </Divider>

                            <Form.Item
                                name='reason'
                                label={
                                    <span className='font-semibold text-blue-600'>
                                        <FileTextOutlined /> Lý do khám / Triệu
                                        chứng
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập lý do khám'
                                    }
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder='VD: Đau đầu, chóng mặt, sốt cao...'
                                    showCount
                                    maxLength={300}
                                    className='bg-blue-50/50 rounded-none'
                                />
                            </Form.Item>
                        </Form>

                        {foundPatientId && (
                            <div className='mt-2 text-right'>
                                <Tag
                                    color='green'
                                    className='rounded-none mr-0'
                                >
                                    Đã liên kết hồ sơ ID: {foundPatientId}
                                </Tag>
                            </div>
                        )}
                    </Card>
                </Col>

                <Col xs={24} lg={14} className='h-full'>
                    <Card
                        title={
                            <Space>
                                <MedicineBoxOutlined className='text-blue-600' />{' '}
                                Chọn Lịch Khám
                            </Space>
                        }
                        className='shadow-sm rounded-none border-t-4 border-t-orange-500 h-full'
                        style={{ display: 'flex', flexDirection: 'column' }}
                        styles={{
                            body: {
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
                                        <Form.Item label='Chuyên khoa'>
                                            <Select
                                                placeholder='Chọn chuyên khoa'
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
                                                className='rounded-none'
                                            >
                                                <Select.Option
                                                    value='all'
                                                    className='rounded-none'
                                                >
                                                    Tất cả
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
                                            <Text strong className='mb-2 block'>
                                                Chọn Bác sĩ{' '}
                                                <span className='text-red-500'>
                                                    *
                                                </span>
                                            </Text>
                                            <div className='flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar border border-gray-200 dark:border-gray-700 p-1 rounded-none'>
                                                {loadingDoctors ? (
                                                    <div className='text-center py-4'>
                                                        <Spin />
                                                    </div>
                                                ) : filteredDoctors.length >
                                                  0 ? (
                                                    filteredDoctors.map(
                                                        (doc: any) => (
                                                            <div
                                                                key={doc.id}
                                                                onClick={() =>
                                                                    onDoctorSelect(
                                                                        doc.id
                                                                    )
                                                                }
                                                                className={`
                                                                flex items-center gap-3 p-3 border cursor-pointer transition-all duration-200 rounded-none
                                                                ${
                                                                    doctorId ===
                                                                    doc.id
                                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500'
                                                                        : 'border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
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
                                                                    <div className='font-medium'>
                                                                        {doc
                                                                            .user
                                                                            ?.name ||
                                                                            'Bác sĩ'}
                                                                    </div>
                                                                    <div className='text-xs text-gray-500 flex justify-between mt-1'>
                                                                        <span>
                                                                            {doc
                                                                                .specialty
                                                                                ?.name ||
                                                                                'Đa khoa'}
                                                                        </span>
                                                                        <span className='font-bold text-orange-600'>
                                                                            {formatPrice(
                                                                                doc.price
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
                                                        description='Chưa có bác sĩ'
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name='date'
                                            label='Ngày khám'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Chọn ngày'
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
                                            <Text strong className='mb-2 block'>
                                                Giờ khám{' '}
                                                <span className='text-red-500'>
                                                    *
                                                </span>
                                            </Text>
                                            {!doctorId ? (
                                                <div className='text-gray-400 italic text-sm border border-dashed p-8 text-center rounded-none bg-gray-50'>
                                                    Vui lòng chọn bác sĩ trước
                                                </div>
                                            ) : loadingSlots ? (
                                                <div className='text-center py-8'>
                                                    <Spin tip='Đang tải lịch...' />
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
                                                                    type={
                                                                        isSelected
                                                                            ? 'primary'
                                                                            : 'default'
                                                                    }
                                                                    onClick={() =>
                                                                        isAvailable &&
                                                                        setSelectedSlot(
                                                                            slot
                                                                        )
                                                                    }
                                                                    className={`text-xs h-auto py-2 rounded-none ${
                                                                        isSelected
                                                                            ? 'bg-blue-600'
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    {formatTimeSlot(
                                                                        slot.startTime
                                                                    )}{' '}
                                                                    -{' '}
                                                                    {formatTimeSlot(
                                                                        slot.endTime
                                                                    )}
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
                                                    description='Không có lịch trống'
                                                />
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>

                        <Divider className='my-1' />

                        <div className='shrink-0'>
                            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                                <div>
                                    <Text type='secondary'>
                                        Tổng tiền khám:
                                    </Text>
                                    <div className='text-3xl font-bold text-red-600 leading-none mt-1'>
                                        {formatPrice(
                                            allDoctors.find(
                                                (d: any) => d.id === doctorId
                                            )?.price
                                        )}
                                    </div>
                                </div>
                                <Space size='middle'>
                                    <Button
                                        size='large'
                                        onClick={() => window.location.reload()}
                                        className='rounded-none'
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        type='primary'
                                        size='large'
                                        icon={<SaveOutlined />}
                                        onClick={handleSubmitBooking}
                                        className='bg-blue-600 hover:bg-blue-500 min-w-[200px] h-[48px] text-lg font-semibold shadow-lg shadow-blue-500/30 rounded-none'
                                    >
                                        Xác nhận đặt lịch
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
