import {
    Modal,
    Form,
    Select,
    DatePicker,
    Input,
    Button,
    Spin,
    Row,
    Col,
    Empty
} from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useEffect, useState, useMemo, useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchDoctors,
    fetchDoctorsByService,
    selectDoctor
} from '@/shared/stores/doctorSlice';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';
import { getSlotDoctor } from '@/shared/apis/doctorService';
import { updateAppointmentByReceptionist } from '@/shared/apis/receptionistService';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {
    open: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    appointmentData: any;
}

export default function EditAppointmentModal({
    open,
    onCancel,
    onSuccess,
    appointmentData
}: Props) {
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const [specialtyId, setSpecialtyId] = useState<string | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);
    const [slotData, setSlotData] = useState<any[]>([]);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const { list: serviceList } = useAppSelector(selectServices);
    const { list: allDoctors, listDoctorService } =
        useAppSelector(selectDoctor);

    // 1. Load danh sách dịch vụ
    useEffect(() => {
        if (open) dispatch(fetchServices({ page: 1, limit: 100 }));
    }, [open, dispatch]);

    // 2. Logic gọi API bác sĩ
    useEffect(() => {
        if (specialtyId === 'all' || !specialtyId) {
            dispatch(fetchDoctors({ page: 1, limit: 100, status: 'active' }));
        } else {
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

    useEffect(() => {
        if (open && appointmentData) {
            const currentServiceId =
                appointmentData.serviceId?.toString() || 'all';
            setSpecialtyId(currentServiceId);
            setDoctorId(appointmentData.doctorId);
            setSelectedSlotId(appointmentData.slotId);

            form.setFieldsValue({
                name:
                    appointmentData.patientName ||
                    appointmentData.patient?.user?.name,
                phone:
                    appointmentData.patientPhone ||
                    appointmentData.patient?.user?.phone,
                address:
                    appointmentData.patientAddress ||
                    appointmentData.patient?.user?.address,
                reason: appointmentData.reason,
                gender: appointmentData.patientGender,
                dob: appointmentData.patientDob
                    ? dayjs(appointmentData.patientDob)
                    : null,
                serviceId: currentServiceId,
                doctorId: appointmentData.doctorId,
                date: dayjs(appointmentData.date)
            });

            handleFetchSlots(
                appointmentData.doctorId,
                dayjs(appointmentData.date).format('YYYY-MM-DD')
            );
        }
    }, [open, appointmentData, form]);

    const handleFetchSlots = async (docId: number, dateString: string) => {
        if (!docId || !dateString) return;
        setLoadingSlots(true);
        try {
            const res = await getSlotDoctor(docId, dateString);
            if (res && res.data && res.data.data) {
                setSlotData(res.data.data);
            } else {
                setSlotData([]);
            }
        } catch (error) {
            console.error(error);
            setSlotData([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            if (!selectedSlotId) {
                toast.error(t('modalUpdate.toastReqSlot'));
                return;
            }
            const finalServiceId =
                values.serviceId === 'all' ? null : Number(values.serviceId);

            const payload = {
                doctorId: values.doctorId,
                serviceId: finalServiceId,
                slotId: selectedSlotId,
                date: values.date.format('YYYY-MM-DD'),
                bookingInfo: {
                    patientName: values.name,
                    patientPhone: values.phone,
                    patientAddress: values.address,
                    patientGender: values.gender,
                    patientDob: values.dob
                        ? values.dob.format('YYYY-MM-DD')
                        : null,
                    reason: values.reason
                }
            };

            setIsLoading(true);

            const res = await updateAppointmentByReceptionist(
                appointmentData.id,
                payload
            );

            if (res && res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
                onSuccess();
                onCancel();
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (error) {
            console.error('Lỗi:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredDoctors = useMemo(() => {
        if (specialtyId === 'all' || !specialtyId) {
            return allDoctors.map((doc) => ({
                id: doc.id,
                user: doc.user,
                finalPrice: doc.price
            }));
        }
        return listDoctorService.map((item) => ({
            id: item.doctor.id,
            user: item.doctor.user,
            finalPrice: item.price
        }));
    }, [specialtyId, allDoctors, listDoctorService]);

    const currentSelectedSlotInfo = useMemo(() => {
        return slotData.find((s) => s.id === selectedSlotId);
    }, [slotData, selectedSlotId]);

    return (
        <Modal
            title={t('modalUpdate.title')}
            open={open}
            onCancel={onCancel}
            width={900}
            maskClosable={false}
            footer={[
                <Button key='cancel' onClick={onCancel}>
                    {t('modalUpdate.btnCancel')}
                </Button>,
                <Button
                    key='submit'
                    type='primary'
                    loading={isLoading}
                    onClick={handleUpdate}
                >
                    {t('modalUpdate.btnSave')}
                </Button>
            ]}
        >
            <Form form={form} layout='vertical'>
                <Row gutter={24}>
                    <Col span={10}>
                        <div className='font-bold mb-4 text-blue-600 border-b pb-1'>
                            {t('modalUpdate.headerPatient')}
                        </div>
                        <Form.Item
                            name='name'
                            label={t('modalUpdate.labelName')}
                            rules={[{ required: true }]}
                        >
                            <Input placeholder={t('modalUpdate.phName')} />
                        </Form.Item>
                        <Form.Item
                            name='phone'
                            label={t('modalUpdate.labelPhone')}
                            rules={[{ required: true }]}
                        >
                            <Input placeholder={t('modalUpdate.phPhone')} />
                        </Form.Item>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item
                                    name='gender'
                                    label={t('modalUpdate.labelGender')}
                                >
                                    <Select>
                                        <Select.Option value='1'>
                                            {t('modalUpdate.genderMale')}
                                        </Select.Option>
                                        <Select.Option value='0'>
                                            {t('modalUpdate.genderFemale')}
                                        </Select.Option>
                                        <Select.Option value='2'>
                                            {t('modalUpdate.genderOther')}
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='dob'
                                    label={t('modalUpdate.labelDob')}
                                >
                                    <DatePicker
                                        format='DD/MM/YYYY'
                                        className='w-full'
                                        placeholder={t('modalUpdate.phDob')}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name='address'
                            label={t('modalUpdate.labelAddress')}
                        >
                            <Input placeholder={t('modalUpdate.phAddress')} />
                        </Form.Item>
                        <Form.Item
                            name='reason'
                            label={t('modalUpdate.labelReason')}
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea
                                rows={3}
                                placeholder={t('modalUpdate.phReason')}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={14}>
                        <div className='font-bold mb-4 text-orange-600 border-b pb-1'>
                            {t('modalUpdate.headerAppointment')}
                        </div>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item
                                    name='serviceId'
                                    label={t('modalUpdate.labelSpecialty')}
                                >
                                    <Select
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        onChange={(val) => {
                                            setSpecialtyId(val);
                                            setDoctorId(null);
                                            form.setFieldValue(
                                                'doctorId',
                                                null
                                            );
                                            setSlotData([]);
                                            setSelectedSlotId(null);
                                        }}
                                        options={[
                                            {
                                                value: 'all',
                                                label: t(
                                                    'modalUpdate.optAllDoctors'
                                                )
                                            },
                                            ...serviceList.map((s: any) => ({
                                                label: s.name,
                                                value: s.id.toString()
                                            }))
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='doctorId'
                                    label={t('modalUpdate.labelDoctor')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t(
                                                'modalUpdate.msgReqDoctor'
                                            )
                                        }
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        placeholder={t(
                                            'modalUpdate.phSelectDoctor'
                                        )}
                                        options={filteredDoctors.map(
                                            (d: any) => ({
                                                label: d.user?.name,
                                                value: d.id
                                            })
                                        )}
                                        onChange={(val) => {
                                            setDoctorId(val);
                                            const date =
                                                form.getFieldValue('date');
                                            if (date)
                                                handleFetchSlots(
                                                    val,
                                                    date.format('YYYY-MM-DD')
                                                );
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name='date'
                            label={t('modalUpdate.labelDate')}
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                format='DD/MM/YYYY'
                                className='w-full'
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf('day')
                                }
                                onChange={(date) => {
                                    if (date && doctorId)
                                        handleFetchSlots(
                                            doctorId,
                                            date.format('YYYY-MM-DD')
                                        );
                                }}
                            />
                        </Form.Item>

                        <div className='mb-2 font-semibold flex justify-between items-center h-6'>
                            <span>
                                {t('modalUpdate.labelTime')}{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                            {currentSelectedSlotInfo && (
                                <span className='text-sm text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200'>
                                    {dayjs(
                                        currentSelectedSlotInfo.startTime
                                    ).format('HH:mm')}{' '}
                                    -{' '}
                                    {dayjs(
                                        currentSelectedSlotInfo.endTime
                                    ).format('HH:mm')}
                                </span>
                            )}
                        </div>

                        <div
                            className={`border p-2 rounded min-h-[100px] ${
                                isDark
                                    ? 'border-gray-700 bg-gray-900'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                        >
                            {loadingSlots ? (
                                <div className='text-center py-4'>
                                    <Spin size='small' />
                                    <div className='mt-2 text-gray-500 text-sm'>
                                        {t('modalUpdate.loadingSchedule')}
                                    </div>
                                </div>
                            ) : slotData.length > 0 ? (
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar p-1'>
                                    {slotData.map((slot) => {
                                        const isAvailable =
                                            slot.status === 'available' ||
                                            slot.currentBooking <
                                                slot.maxBooking;
                                        const isCurrentSlotOfThisAppointment =
                                            appointmentData?.slotId === slot.id;
                                        const disabled =
                                            !isAvailable &&
                                            !isCurrentSlotOfThisAppointment;
                                        const isSelected =
                                            selectedSlotId === slot.id;

                                        return (
                                            <Button
                                                key={slot.id}
                                                disabled={disabled}
                                                htmlType='button'
                                                type='default'
                                                onClick={() =>
                                                    isSelected
                                                        ? null
                                                        : setSelectedSlotId(
                                                              slot.id
                                                          )
                                                }
                                                className={`
                                                    text-xs h-auto py-2 rounded-none transition-all duration-200 flex items-center justify-center gap-1
                                                    ${
                                                        isSelected
                                                            ? 'bg-blue-600! !text-white! border-blue-600! shadow-md transform scale-105 z-10 font-semibold'
                                                            : isDark
                                                            ? 'hover:border-blue-500! hover:text-blue-500! text-gray-300 bg-gray-800 border-gray-600'
                                                            : 'hover:border-blue-500! hover:text-blue-500! text-gray-600 bg-white'
                                                    }
                                                `}
                                            >
                                                {isSelected && (
                                                    <CheckCircleFilled />
                                                )}
                                                <span>
                                                    {dayjs(
                                                        slot.startTime
                                                    ).format('HH:mm')}{' '}
                                                    -{' '}
                                                    {dayjs(slot.endTime).format(
                                                        'HH:mm'
                                                    )}
                                                </span>
                                            </Button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <span
                                            className={
                                                isDark ? 'text-gray-400' : ''
                                            }
                                        >
                                            {doctorId
                                                ? t('modalUpdate.noSlots')
                                                : t(
                                                      'modalUpdate.msgSelectDoctorFirst'
                                                  )}
                                        </span>
                                    }
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
