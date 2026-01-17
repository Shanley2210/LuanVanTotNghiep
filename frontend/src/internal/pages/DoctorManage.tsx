import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { Button, Calendar, Select, Table, Input, Form } from 'antd';
import { useContext, useEffect, useState } from 'react';
import AdminModal from '../components/AdminModal';
import Pagination from '../components/Pagination';
import {
    fetchDoctors,
    selectDoctor,
    type IDoctor
} from '@/shared/stores/doctorSlice';
import { GoPencil } from 'react-icons/go';
import { AiOutlineSchedule } from 'react-icons/ai';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { IoPricetagsOutline } from 'react-icons/io5';
import ToggleSwitch from '../components/ToggleSwitch';
import type { filterConfig } from '../components/AdminFilter';
import AdminFilter from '../components/AdminFilter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
    fetchSpecialties,
    selectSpecialty
} from '@/shared/stores/specialtySlice';
import {
    postDoctor,
    setPriceDoctor,
    updateDoctor,
    getDoctorServices,
    createDoctorServices,
    updateDoctorServices
} from '@/shared/apis/doctorService';
import dayjs, { Dayjs } from 'dayjs';
import LoadingCommon from '@/shared/components/LoadingCommon';
import {
    LoadingOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import {
    fetchSchedulesForAdmin,
    selectSchedules
} from '@/shared/stores/ScheduleSlice';
import { deleteSchedules, postSchedules } from '@/shared/apis/scheduleService';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface IDoctorService {
    id: number;
    doctorId: number;
    serviceId: number;
    price: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    service: {
        name: string;
        price: string;
    };
}

export default function DoctorManage() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();

    // Selectors
    const {
        list: doctors,
        totalDoctors,
        loading: tableLoading
    } = useAppSelector(selectDoctor);
    const { list: specialties } = useAppSelector(selectSpecialty);
    const { list: schedules } = useAppSelector(selectSchedules);
    const { list: allServicesList } = useAppSelector(selectServices);

    // Doctor & General State
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);
    const [editItem, setEditItem] = useState<IDoctor | null>(null);
    const [priceItem, setPriceItem] = useState<IDoctor | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

    // Search State
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Schedule State
    const [isOpenSchedule, setIsOpenSchedule] = useState(false);
    const [scheduleFormData, setScheduleFormData] = useState<
        Record<string, any>
    >({});
    const [excludedDates, setExcludedDates] = useState<Set<string>>(new Set());
    const [schedulesToDelete, setSchedulesToDelete] = useState<Set<number>>(
        new Set()
    );

    // Service Modal State
    const [isOpenServiceModal, setIsOpenServiceModal] = useState(false);
    const [serviceList, setServiceList] = useState<IDoctorService[]>([]);
    const [isServiceLoading, setIsServiceLoading] = useState(false);
    const [currentDoctorIdForService, setCurrentDoctorIdForService] = useState<
        number | null
    >(null);
    const [newServiceForm] = Form.useForm();

    // Edit Service Price State
    const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<IDoctorService | null>(
        null
    );
    const [editServiceForm] = Form.useForm();

    // Service Pagination State (Client-side)
    const [servicePage, setServicePage] = useState(1);
    const servicePageSize = 5;

    // --- Search Debounce Effect ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchText);
            if (searchText !== debouncedSearchTerm) {
                setCurrentPage(1); // Reset to page 1 on search change
            }
        }, 500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    // --- Effects ---
    useEffect(() => {
        dispatch(
            fetchDoctors({
                page: currentPage,
                limit: pageSize,
                q: debouncedSearchTerm // Pass search term to API
            })
        );
    }, [dispatch, currentPage, pageSize, debouncedSearchTerm]);

    useEffect(() => {
        dispatch(fetchSpecialties({ page: 1, limit: 100 }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchServices({ page: 1, limit: 100 }));
    }, [dispatch]);

    // --- Helper Functions ---
    const refreshData = () => {
        dispatch(
            fetchDoctors({
                page: currentPage,
                limit: pageSize,
                q: debouncedSearchTerm
            })
        );
    };

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };

    // --- Schedule Logic ---
    const onPanelChange = (value: Dayjs) => {
        setScheduleFormData((prev) => ({
            ...prev,
            month: value.format('YYYY-MM')
        }));
        setExcludedDates(new Set());
        setSchedulesToDelete(new Set());
    };

    const renderShift = (shift: any) => {
        if (!shift) return '';
        if (Array.isArray(shift)) return shift.join(', ');
        if (typeof shift === 'string') {
            try {
                const parsed = JSON.parse(shift);
                return Array.isArray(parsed) ? parsed.join(', ') : parsed;
            } catch (e) {
                return shift;
            }
        }
        return shift;
    };

    const dateCellRender = (value: Dayjs) => {
        const dateStr = value.format('YYYY-MM-DD');
        const currentMonth =
            scheduleFormData.month || dayjs().format('YYYY-MM');
        const existingSchedules = schedules.filter(
            (s) => dayjs(s.workDate).format('YYYY-MM-DD') === dateStr
        );
        const isCurrentMonth = value.format('YYYY-MM') === currentMonth;
        const isExcluded = excludedDates.has(dateStr);
        const isScheduleSelectedForDelete = (scheduleId: number) =>
            schedulesToDelete.has(scheduleId);

        return (
            <>
                <div className='flex flex-wrap gap-2 items-center justify-center'>
                    {existingSchedules.map((item: any) => (
                        <div
                            key={item.id}
                            className={`text-xs w-fit rounded-none px-1 cursor-pointer ${
                                isScheduleSelectedForDelete(item.id)
                                    ? 'bg-red-400 text-white border border-red-600'
                                    : 'bg-green-200 text-green-800'
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleScheduleSelectForDelete(item.id);
                            }}
                        >
                            {renderShift(item.shift)}
                        </div>
                    ))}
                </div>
                {isCurrentMonth && (
                    <div className='absolute bottom-0 left-0 right-0 text-center'>
                        {isExcluded ? (
                            <span className='text-red-500 text-xs font-bold'>
                                {t('doctor.dn')}
                            </span>
                        ) : (
                            <span className='text-blue-500 text-xs font-bold'>
                                {t('doctor.wo')}
                            </span>
                        )}
                    </div>
                )}
            </>
        );
    };

    const handleDateSelect = (date: Dayjs) => {
        const dateStr = date.format('YYYY-MM-DD');
        const hasSchedule = schedules.some(
            (s) => dayjs(s.workDate).format('YYYY-MM-DD') === dateStr
        );
        if (hasSchedule) {
            toast.warning(
                language === 'vi'
                    ? 'Ngày này đã có lịch làm việc'
                    : 'Schedule already exists for this date'
            );
            return;
        }
        const newExcluded = new Set(excludedDates);
        if (newExcluded.has(dateStr)) newExcluded.delete(dateStr);
        else newExcluded.add(dateStr);
        setExcludedDates(newExcluded);
    };

    const handleScheduleSelectForDelete = (scheduleId: number) => {
        setSchedulesToDelete((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(scheduleId)) newSet.delete(scheduleId);
            else newSet.add(scheduleId);
            return newSet;
        });
    };

    const handleCreateSchedule = async () => {
        if (!scheduleFormData.month) {
            toast.error(
                language === 'vi'
                    ? 'Vui lòng chọn tháng!'
                    : 'Please select a month!'
            );
            return;
        }
        if (!scheduleFormData.ca || scheduleFormData.ca.length === 0) {
            toast.error(
                language === 'vi'
                    ? 'Vui lòng chọn ít nhất một ca làm việc!'
                    : 'Please select at least one shift!'
            );
            return;
        }
        if (!scheduleFormData.tenlich) {
            toast.error(
                language === 'vi'
                    ? 'Vui lòng nhập tên lịch!'
                    : 'Please enter a schedule name!'
            );
            return;
        }

        const selectedMonth = dayjs(scheduleFormData.month, 'YYYY-MM');
        const daysInMonth = selectedMonth.daysInMonth();
        const listScheduleToCreate = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = selectedMonth.date(i);
            const dateStr = currentDate.format('YYYY-MM-DD');
            const isExcluded = excludedDates.has(dateStr);
            const isExist = schedules.some(
                (s) => dayjs(s.workDate).format('YYYY-MM-DD') === dateStr
            );

            if (!isExcluded && !isExist) {
                listScheduleToCreate.push({
                    workDate: dateStr,
                    shift: scheduleFormData.ca,
                    name: scheduleFormData.tenlich,
                    status: 'active'
                });
            }
        }

        if (listScheduleToCreate.length === 0) {
            toast.warning(
                language === 'vi'
                    ? 'Không có ngày nào để tạo lịch!'
                    : 'No days to create schedules!'
            );
            return;
        } else {
            try {
                setIsLoading(true);
                const res = await postSchedules(
                    Number(selectedDoctor?.id),
                    listScheduleToCreate
                );
                if (res.data.errCode === 0) {
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
            } catch (e: any) {
                console.error('Error creating schedules:', e);
                toast.error(
                    language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
                );
            }
            setIsLoading(false);
            setScheduleFormData((prev) => ({ ...prev }));
            setExcludedDates(new Set());
            dispatch(fetchSchedulesForAdmin(Number(selectedDoctor?.id)));
        }
    };

    const handledeleteSchedules = async () => {
        if (schedulesToDelete.size === 0) {
            toast.warning(
                language === 'vi'
                    ? 'Vui lòng chọn ít nhất một lịch để xóa!'
                    : 'Please select at least one schedule to delete!'
            );
            return;
        }
        const listIdsToDelete = Array.from(schedulesToDelete);
        try {
            setIsLoading(true);
            const res = await deleteSchedules({ scheduleIds: listIdsToDelete });
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            console.error('Error deleting schedules:', e);
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        }
        setIsLoading(false);
        setSchedulesToDelete(new Set());
        dispatch(fetchSchedulesForAdmin(Number(selectedDoctor?.id)));
    };

    const hanldeOpenScheduleModal = (record: IDoctor) => {
        setSelectedDoctor(record);
        dispatch(fetchSchedulesForAdmin(Number(record.id)));
        setScheduleFormData({
            month: dayjs().format('YYYY-MM'),
            ca: [],
            tenlich: ''
        });
        setExcludedDates(new Set());
        setSchedulesToDelete(new Set());
        setIsOpenSchedule(true);
    };

    // --- Doctor CRUD Logic ---
    const handleOk = () => {
        if (editItem) {
            hanleUpdate();
        } else if (priceItem) {
            hanldeUpdatePrice();
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.name
        ) {
            toast.error(
                language === 'vi'
                    ? 'Vui lòng điền đầy đủ thông tin'
                    : 'Please fill in all required fields'
            );
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu không khớp'
                    : 'Passwords do not match'
            );
            return;
        }

        const postData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'dob' && formData[key]) {
                postData.append(key, formData[key].format('YYYY-M-D'));
            } else if (formData[key] !== undefined && formData[key] !== null) {
                postData.append(key, formData[key]);
            }
        });

        try {
            setIsLoading(true);
            const res = await postDoctor(postData);
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
                setIsOpen(false);
                setFormData({});
                refreshData();
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            toast.error(
                language === 'vi' ? 'Lỗi phí Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const hanleUpdate = async () => {
        const updateData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'dob' && formData[key]) {
                updateData.append(key, formData[key].format('YYYY-M-D'));
            } else if (formData[key] !== undefined && formData[key] !== null) {
                updateData.append(key, formData[key]);
            }
        });

        try {
            setIsLoading(true);
            const res = await updateDoctor(
                Number(editItem?.userId),
                updateData
            );
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
                setIsOpen(false);
                setEditItem(null);
                setFormData({});
                refreshData();
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const hanldeUpdatePrice = async () => {
        if (!formData.price) return;
        const priceData = { price: formData.price };
        try {
            setIsLoading(true);
            const res = await setPriceDoctor(Number(priceItem?.id), priceData);
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
                setIsOpen(false);
                setPriceItem(null);
                setFormData({});
                refreshData();
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = async (userId: number, status: boolean) => {
        const newStatus = status ? 'inactive' : 'active';
        const statusData = new FormData();
        statusData.append('status', newStatus);
        try {
            setLoadingStatusId(userId);
            const res = await updateDoctor(userId, statusData);
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );
                refreshData();
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            toast.error(
                language === 'vi' ? 'Lỗi phí Server' : 'Error from Server'
            );
        } finally {
            setLoadingStatusId(null);
        }
    };

    // --- Service Logic ---

    const handleOpenServiceModal = async (doctorId: number) => {
        setCurrentDoctorIdForService(doctorId);
        setIsOpenServiceModal(true);
        setIsServiceLoading(true);
        setServicePage(1);

        try {
            const res: any = await getDoctorServices(doctorId);
            if (res && res.data && res.data.errCode === 0) {
                setServiceList(res.data.data);
            } else {
                setServiceList([]);
            }
        } catch (error) {
            console.error(error);
            toast.error(language === 'vi' ? 'Lỗi hệ thống' : 'System error');
        } finally {
            setIsServiceLoading(false);
        }
    };

    const handleCreateService = async (values: any) => {
        if (!currentDoctorIdForService) return;
        const data = {
            doctorId: String(currentDoctorIdForService),
            serviceId: values.serviceId,
            price: values.price,
            status: 'active'
        };
        try {
            setIsServiceLoading(true);
            const res = await createDoctorServices(data);
            if (res && res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'vi'
                        ? 'Thêm dịch vụ thành công'
                        : 'Add service successful'
                );
                newServiceForm.resetFields();
                const listRes: any = await getDoctorServices(
                    currentDoctorIdForService
                );
                if (listRes && listRes.data && listRes.data.errCode === 0) {
                    setServiceList(listRes.data.data);
                }
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage || 'Thêm thất bại'
                        : res.data.errEnMessage || 'Add failed'
                );
            }
        } catch (error) {
            toast.error(language === 'vi' ? 'Lỗi hệ thống' : 'System error');
        } finally {
            setIsServiceLoading(false);
        }
    };

    const handleServiceStatusToggle = async (
        record: IDoctorService,
        checked: boolean
    ) => {
        if (!currentDoctorIdForService) return;

        const newStatus = checked ? 'active' : 'inactive';
        try {
            const res = await updateDoctorServices(
                record.doctorId,
                record.serviceId,
                { status: newStatus }
            );
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi'
                        ? 'Cập nhật trạng thái thành công'
                        : 'Update status successful'
                );

                // --- FIX: Dùng serviceId để so sánh thay vì id (đề phòng id null/trùng) ---
                const updatedList = serviceList.map((item) =>
                    item.serviceId === record.serviceId
                        ? { ...item, status: newStatus }
                        : item
                );
                setServiceList(updatedList);
            } else {
                toast.error(
                    language === 'vi' ? 'Cập nhật thất bại' : 'Update failed'
                );
            }
        } catch (error) {
            toast.error(language === 'vi' ? 'Lỗi hệ thống' : 'System error');
        }
    };

    const handleOpenEditServiceModal = (record: IDoctorService) => {
        setEditingService(record);
        editServiceForm.setFieldsValue({ price: record.price });
        setIsEditServiceModalOpen(true);
    };

    const handleUpdateServicePrice = async (values: any) => {
        if (!editingService || !currentDoctorIdForService) return;
        try {
            setIsServiceLoading(true);
            const res = await updateDoctorServices(
                editingService.doctorId,
                editingService.serviceId,
                { price: values.price }
            );
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi'
                        ? 'Cập nhật giá thành công'
                        : 'Update price successful'
                );
                setIsEditServiceModalOpen(false);
                const listRes: any = await getDoctorServices(
                    currentDoctorIdForService
                );
                if (listRes && listRes.data && listRes.data.errCode === 0) {
                    setServiceList(listRes.data.data);
                }
            } else {
                toast.error(
                    language === 'vi' ? 'Cập nhật thất bại' : 'Update failed'
                );
            }
        } catch (error) {
            toast.error(language === 'vi' ? 'Lỗi hệ thống' : 'System error');
        } finally {
            setIsServiceLoading(false);
        }
    };

    // Calculate pagination for services
    const indexOfLastService = servicePage * servicePageSize;
    const indexOfFirstService = indexOfLastService - servicePageSize;
    const currentServices = serviceList.slice(
        indexOfFirstService,
        indexOfLastService
    );

    // --- Columns Configuration ---
    const serviceColumns = [
        {
            title: language === 'vi' ? 'Tên dịch vụ' : 'Service Name',
            dataIndex: ['service', 'name'],
            key: 'name'
        },
        {
            title: language === 'vi' ? 'Giá' : 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center' as const,
            render: (_: any, record: IDoctorService) => (
                <div className='flex gap-3 items-center justify-center'>
                    <div>{Number(record.price).toLocaleString('vi-VN')} </div>
                    <button
                        onClick={() => {
                            handleOpenEditServiceModal(record);
                        }}
                        className='flex items-center gap-2 justify-center cursor-pointer'
                    >
                        <IoPricetagsOutline className='text-xl text-blue-500' />
                    </button>
                </div>
            )
        },
        {
            title: language === 'vi' ? 'Trạng thái' : 'Status',
            key: 'status',
            align: 'center' as const,
            render: (_: any, record: IDoctorService) => (
                <div className='flex items-center justify-center'>
                    <ToggleSwitch
                        checked={record.status === 'active'}
                        onToggle={(checked) =>
                            handleServiceStatusToggle(record, checked)
                        }
                    />
                </div>
            )
        }
    ];

    const columns = [
        {
            title: t('doctor.im'),
            dataIndex: 'image',
            key: 'image',
            align: 'center' as const,
            render: (image: string) => (
                <div className='flex items-center justify-center'>
                    <img
                        src={
                            image.startsWith(BACKEND_URL)
                                ? image
                                : `${BACKEND_URL}${image}`
                        }
                        alt='Doctor Image'
                        className='rounded-full h-15 w-15 text-center'
                    />
                </div>
            )
        },
        {
            title: 'Email',
            dataIndex: 'user',
            key: 'email',
            render: (user: any) => user?.email
        },
        {
            title: t('doctor.na'),
            dataIndex: 'user',
            key: 'name',
            render: (user: any) => user?.name
        },
        {
            title: t('doctor.sp'),
            dataIndex: 'specialty',
            key: 'specialty',
            render: (specialty: any) => specialty?.name
        },
        {
            title: t('doctor.ro'),
            dataIndex: 'room',
            key: 'room',
            align: 'center' as const
        },
        {
            title: t('doctor.pr'),
            dataIndex: 'price',
            key: 'price',
            align: 'center' as const,
            render: (_: any, record: IDoctor) => (
                <div className='flex gap-3 items-center justify-center'>
                    <div>{Number(record.price).toLocaleString('vi-VN')} </div>
                    <button
                        onClick={() => {
                            const id = Number(record.id);
                            const old = doctors.find(
                                (d) => Number(d.id) === id
                            );
                            setPriceItem(old || null);
                            setFormData({ price: old?.price });
                            setIsOpen(true);
                        }}
                        className='flex items-center gap-2 justify-center cursor-pointer'
                    >
                        <IoPricetagsOutline className='text-xl text-blue-500' />
                    </button>
                </div>
            )
        },
        {
            title: t('doctor.st'),
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (_: any, record: IDoctor) =>
                loadingStatusId === record.userId ? (
                    <LoadingOutlined spin className='text-3xl text-gray-500' />
                ) : (
                    <div className='flex items-center justify-center'>
                        <ToggleSwitch
                            checked={record.status === 'active'}
                            onToggle={() => {
                                handleToggleStatus(
                                    Number(record.userId),
                                    record.status === 'active'
                                );
                            }}
                        />
                    </div>
                )
        },
        {
            title: t('doctor.at'),
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IDoctor) => (
                <div className='flex gap-5 justify-center'>
                    <button
                        onClick={() => {
                            const userId = Number(record.userId);
                            const old = doctors.find(
                                (d) => Number(d.userId) === userId
                            );
                            setEditItem(old || null);
                            setFormData({
                                name: old?.user?.name,
                                email: old?.user?.email,
                                phone: old?.user?.phone,
                                password: '',
                                confirmPassword: '',
                                specialty: old?.specialty?.id
                                    ? String(old.specialty.id)
                                    : undefined,
                                room: old?.room,
                                dob: old?.dob ? dayjs(old.dob) : null,
                                ethnicity: old?.ethnicity,
                                gender: old?.gender,
                                address: old?.address,
                                degree: old?.degree,
                                image: old?.image,
                                introduce: old?.introduce,
                                workExperience: old?.workExperience
                            });
                            setIsOpen(true);
                        }}
                    >
                        <GoPencil className='text-2xl text-blue-500 cursor-pointer' />
                    </button>

                    <button onClick={() => hanldeOpenScheduleModal(record)}>
                        <AiOutlineSchedule className='text-3xl text-blue-500 cursor-pointer' />
                    </button>

                    <button
                        onClick={() =>
                            handleOpenServiceModal(Number(record.id))
                        }
                    >
                        <RxOpenInNewWindow className='size-7 text-blue-500 cursor-pointer' />
                    </button>
                </div>
            )
        }
    ];

    let modalConfigs: filterConfig[] = [];
    const editorFields: filterConfig[] = [
        {
            name: 'introduce',
            label: t('doctor.intro'),
            type: 'editor',
            width: '100%'
        },
        {
            name: 'workExperience',
            label: t('doctor.exp'),
            type: 'editor',
            width: '100%'
        }
    ];

    if (editItem) {
        modalConfigs = [
            {
                name: 'image',
                label: t('doctor.im') as string,
                type: 'upload' as const,
                placeholder: t('doctor.ul') as string
            },
            {
                name: 'name',
                label: t('doctor.na') as string,
                type: 'input' as const
            },
            { name: 'email', label: 'Email', type: 'input' as const },
            {
                name: 'phone',
                label: t('doctor.ph') as string,
                type: 'input' as const
            },
            {
                name: 'specialty',
                label: t('doctor.sp') as string,
                type: 'select' as const,
                options: specialties.map((s) => ({
                    value: String(s.id),
                    label: s.name
                }))
            },
            {
                name: 'room',
                label: t('doctor.ro') as string,
                type: 'input' as const,
                width: '30%'
            },
            {
                name: 'dob',
                label: t('doctor.bd') as string,
                type: 'date' as const
            },
            {
                name: 'ethnicity',
                label: t('doctor.et') as string,
                type: 'input' as const
            },
            {
                name: 'gender',
                label: t('doctor.gd') as string,
                type: 'select' as const,
                options: [
                    { value: '1', label: t('doctor.ma') },
                    { value: '0', label: t('doctor.fm') },
                    { value: '3', label: t('doctor.ot') }
                ]
            },
            {
                name: 'address',
                label: t('doctor.ad') as string,
                type: 'input' as const,
                width: '100%'
            },
            {
                name: 'degree',
                label: t('doctor.dg') as string,
                type: 'input' as const
            },
            ...editorFields
        ];
    } else if (priceItem) {
        modalConfigs = [
            {
                name: 'price',
                label: t('doctor.pr') as string,
                type: 'input' as const,
                width: '100%'
            }
        ];
    } else {
        modalConfigs = [
            {
                name: 'image',
                label: t('doctor.im') as string,
                type: 'upload' as const,
                placeholder: t('doctor.ul') as string
            },
            {
                name: 'name',
                label: t('doctor.na') as string,
                type: 'input' as const
            },
            { name: 'email', label: 'Email', type: 'input' as const },
            {
                name: 'phone',
                label: t('doctor.ph') as string,
                type: 'input' as const
            },
            {
                name: 'password',
                label: t('doctor.pa') as string,
                type: 'input' as const
            },
            {
                name: 'confirmPassword',
                label: t('doctor.cp') as string,
                type: 'input' as const
            },
            {
                name: 'specialty',
                label: t('doctor.sp') as string,
                type: 'select' as const,
                options: specialties.map((s) => ({
                    value: String(s.id),
                    label: s.name
                }))
            },
            {
                name: 'room',
                label: t('doctor.ro') as string,
                type: 'input' as const,
                width: '30%'
            },
            {
                name: 'dob',
                label: t('doctor.bd') as string,
                type: 'date' as const
            },
            {
                name: 'ethnicity',
                label: t('doctor.et') as string,
                type: 'input' as const
            },
            {
                name: 'gender',
                label: t('doctor.gd') as string,
                type: 'select' as const,
                options: [
                    { value: '1', label: t('doctor.ma') },
                    { value: '0', label: t('doctor.fm') },
                    { value: '3', label: t('doctor.ot') }
                ]
            },
            {
                name: 'address',
                label: t('doctor.ad') as string,
                type: 'input' as const,
                width: '100%'
            },
            {
                name: 'degree',
                label: t('doctor.dg') as string,
                type: 'input' as const
            },
            ...editorFields
        ];
    }

    return (
        <div className='m-5'>
            {/* Header */}
            <div
                className={`text-2xl uppercase pb-2 ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                {t('doctor.tt')}
            </div>
            <div
                className={`flex justify-between ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                <div className='text-base py-2'>{t('doctor.ds')}</div>
                <div>
                    <Button
                        className='rounded-none w-25'
                        onClick={() => setIsOpen(true)}
                    >
                        {t('doctor.nb')}
                    </Button>
                </div>
            </div>

            {/* Main Table */}
            <div className={`p-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                {/* Search and Pagination Controls */}
                <div className='flex justify-between items-center mb-5'>
                    <div className='flex gap-5 items-center'>
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
                            {t('doctor.epg')}
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className='w-1/3'>
                        <Input
                            placeholder={
                                language === 'vi'
                                    ? 'Tìm kiếm bác sĩ...'
                                    : 'Search doctor...'
                            }
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            prefix={
                                <SearchOutlined className='text-gray-400' />
                            }
                        />
                    </div>
                </div>

                <div className={isDark ? 'text-black' : 'text-blue-500'}>
                    <Table
                        loading={tableLoading}
                        dataSource={doctors}
                        columns={columns}
                        rowKey='id'
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={totalDoctors}
                                pageSize={pageSize}
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                isDark={isDark}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Modal: Create/Edit Doctor */}
            <AdminModal
                title={
                    priceItem
                        ? t('doctor.ur')
                        : editItem
                          ? t('doctor.ed')
                          : t('doctor.an')
                }
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false);
                    setEditItem(null);
                    setPriceItem(null);
                    setFormData({});
                }}
                onOk={handleOk}
            >
                {isLoading && <LoadingCommon />}
                <AdminFilter
                    filters={modalConfigs}
                    initialValues={formData}
                    onChange={(values) => setFormData(values)}
                />
            </AdminModal>

            {/* Modal: Schedule Management */}
            <AdminModal
                title={t('doctor.sm')}
                open={isOpenSchedule}
                onCancel={() => setIsOpenSchedule(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                onOk={() => setIsOpenSchedule(false)}
                width='90vw'
            >
                {isLoading && <LoadingCommon />}
                <div className='flex flex-wrap gap-4'>
                    <div className='flex flex-col gap-4 w-full sm:w-1/3'>
                        <AdminFilter
                            filters={[
                                {
                                    name: 'month',
                                    label: t('doctor.cm') as string,
                                    type: 'month' as const
                                },
                                {
                                    name: 'tenlich',
                                    label: t('doctor.sn') as string,
                                    type: 'input' as const
                                },
                                {
                                    name: 'ca',
                                    label: t('doctor.ss') as string,
                                    type: 'checkboxGroup' as const,
                                    options: [
                                        { value: 'C1', label: t('doctor.cs') },
                                        { value: 'C2', label: t('doctor.cc') },
                                        { value: 'C3', label: t('doctor.ct') }
                                    ]
                                }
                            ]}
                            initialValues={scheduleFormData}
                            onChange={(values) =>
                                setScheduleFormData((prev) => ({
                                    ...prev,
                                    ...values
                                }))
                            }
                        />
                        <div className='flex gap-2'>
                            <Button
                                className='rounded-none w-1/4'
                                onClick={handleCreateSchedule}
                            >
                                {t('doctor.sc')}
                            </Button>
                            <Button
                                className={`rounded-none w-1/4 ${
                                    isDark
                                        ? 'border-red-500!'
                                        : 'bg-red-500! border-red-500!'
                                } `}
                                onClick={handledeleteSchedules}
                            >
                                {t('doctor.sd')}
                            </Button>
                        </div>
                    </div>
                    <div
                        className='flex-1 border p-2 rounded-none w-full sm:w-2/3'
                        style={{ maxHeight: '80vh', overflowY: 'auto' }}
                    >
                        <Calendar
                            fullscreen
                            value={
                                scheduleFormData.month
                                    ? dayjs(scheduleFormData.month)
                                    : dayjs()
                            }
                            headerRender={() => null}
                            onPanelChange={onPanelChange}
                            cellRender={dateCellRender}
                            onSelect={handleDateSelect}
                        />
                    </div>
                </div>
            </AdminModal>

            {/* Modal: Service List */}
            <AdminModal
                title={
                    language === 'vi' ? 'Danh sách dịch vụ' : 'Services List'
                }
                open={isOpenServiceModal}
                onCancel={() => {
                    setIsOpenServiceModal(false);
                    newServiceForm.resetFields();
                }}
                footer={null}
                width={800}
            >
                <div className='mb-4 p-4'>
                    <Form
                        form={newServiceForm}
                        layout='inline'
                        onFinish={handleCreateService}
                        className='flex justify-between w-full'
                    >
                        <Form.Item
                            name='serviceId'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        language === 'vi'
                                            ? 'Chọn dịch vụ'
                                            : 'Select service'
                                }
                            ]}
                            className='flex-1'
                            style={{ flex: 1 }}
                        >
                            <Select
                                placeholder={
                                    language === 'vi'
                                        ? 'Chọn dịch vụ'
                                        : 'Select service'
                                }
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={allServicesList.map((s: any) => ({
                                    value: String(s.id),
                                    label: s.name
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            name='price'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        language === 'vi'
                                            ? 'Nhập giá'
                                            : 'Enter price'
                                }
                            ]}
                        >
                            <Input
                                type='number'
                                placeholder={
                                    language === 'vi' ? 'Giá (VNĐ)' : 'Price'
                                }
                                min={0}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                icon={<PlusOutlined />}
                                loading={isServiceLoading}
                            >
                                {language === 'vi' ? 'Thêm' : 'Add'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <Table
                    loading={isServiceLoading}
                    dataSource={currentServices}
                    columns={serviceColumns}
                    rowKey='serviceId'
                    pagination={false}
                    footer={() =>
                        serviceList.length > 0 && (
                            <Pagination
                                total={serviceList.length}
                                pageSize={servicePageSize}
                                current={servicePage}
                                onChange={(page) => setServicePage(page)}
                                isDark={isDark}
                            />
                        )
                    }
                />
            </AdminModal>

            {/* Modal: Edit Service Price */}
            <AdminModal
                title={
                    language === 'vi'
                        ? 'Cập nhật giá dịch vụ'
                        : 'Update Service Price'
                }
                open={isEditServiceModalOpen}
                onCancel={() => {
                    setIsEditServiceModalOpen(false);
                    setEditingService(null);
                }}
                footer={null}
            >
                <Form
                    form={editServiceForm}
                    onFinish={handleUpdateServicePrice}
                    layout='vertical'
                >
                    <Form.Item
                        label={
                            language === 'vi' ? 'Giá mới (VNĐ)' : 'New Price'
                        }
                        name='price'
                        rules={[
                            {
                                required: true,
                                message:
                                    language === 'vi'
                                        ? 'Vui lòng nhập giá'
                                        : 'Please enter price'
                            }
                        ]}
                    >
                        <Input type='number' min={0} />
                    </Form.Item>
                    <div className='flex justify-end gap-2'>
                        <Button
                            onClick={() => setIsEditServiceModalOpen(false)}
                        >
                            {language === 'vi' ? 'Hủy' : 'Cancel'}
                        </Button>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={isServiceLoading}
                        >
                            {language === 'vi' ? 'Lưu' : 'Save'}
                        </Button>
                    </div>
                </Form>
            </AdminModal>
        </div>
    );
}
