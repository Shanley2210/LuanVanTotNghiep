import { Button, Select, Table } from 'antd';
import Pagination from '../components/Pagination';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchReceptionists,
    selectReceptionist,
    type IReceptionist
} from '@/shared/stores/receptionistSlice';
import ToggleSwitch from '../components/ToggleSwitch';
import { GoPencil } from 'react-icons/go';
import AdminModal from '../components/AdminModal';
import LoadingCommon from '@/shared/components/LoadingCommon';
import AdminFilter, { type filterConfig } from '../components/AdminFilter';
import { toast } from 'react-toastify';
import {
    postReceptionist,
    updateReceptionist
} from '@/shared/apis/receptionistService';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ReceptionistsManage() {
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useAppDispatch();
    const { list: receptionists } = useAppSelector(selectReceptionist);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);
    const [editItem, setEditItem] = useState<IReceptionist | null>(null);

    const currentData = receptionists.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageSizeChange = (value: number) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };
    const handleSubmit = async () => {
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.dob ||
            !formData.gender ||
            !formData.ethnicity ||
            !formData.address
        ) {
            toast.error(
                language === 'vi'
                    ? 'Vui lòng điền đầy đủ thông tin'
                    : 'Please fill in all required fields'
            );
            return;
        }
        if (
            formData.phone &&
            (formData.phone.length !== 10 || isNaN(Number(formData.phone)))
        ) {
            toast.error(
                language === 'vi'
                    ? 'Số điện thoại không hợp lệ'
                    : 'Invalid phone number'
            );
            return;
        }
        if (
            formData.password.length < 6 ||
            formData.confirmPassword.length < 6
        ) {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu phải có ít nhất 6 ký tự'
                    : 'Password must be at least 6 characters'
            );
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error(
                language === 'vi'
                    ? 'Mật khẩu và xác nhận mật khẩu không khớp nhau'
                    : 'Password and confirm password do not match'
            );
            return;
        }

        const postData = new FormData();
        postData.append('name', formData.name);
        postData.append('email', formData.email);
        postData.append('phone', formData.phone);
        postData.append('password', formData.password);
        postData.append('confirmPassword', formData.confirmPassword);
        if (formData.dob) {
            postData.append('dob', formData.dob.format('YYYY-M-D'));
        }
        postData.append('ethnicity', formData.ethnicity);
        postData.append('gender', formData.gender);
        postData.append('address', formData.address);
        if (formData.image) {
            postData.append('image', formData.image);
        }

        try {
            setIsLoading(true);

            const res = await postReceptionist(postData);

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

            setIsOpen(false);
            setIsLoading(false);
            setFormData({});
            dispatch(fetchReceptionists());
        } catch (e: any) {
            console.error('Error submitting form:', e);

            toast.error(
                language === 'vi' ? 'Lỗi phí Server' : 'Error from Server'
            );
        }
    };
    const handleToggleStatus = async (userId: number, status: boolean) => {
        const newStatus = status ? 'inactive' : 'active';

        const statusData = new FormData();
        statusData.append('status', newStatus);

        try {
            setLoadingStatusId(userId);

            const res = await updateReceptionist(userId, statusData);

            if (res.data.errCode === 0) {
                toast.success(
                    language === 'vi' ? res.data.viMessage : res.data.enMessage
                );

                setLoadingStatusId(null);
                dispatch(fetchReceptionists());
            } else {
                toast.error(
                    language === 'vi'
                        ? res.data.errViMessage
                        : res.data.errEnMessage
                );
            }
        } catch (e: any) {
            console.error('Error submitting form:', e);

            toast.error(
                language === 'vi' ? 'Lỗi phí Server' : 'Error from Server'
            );
        }
    };
    const handleUpdate = async () => {
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.dob ||
            !formData.gender ||
            !formData.ethnicity ||
            !formData.address
        ) {
            toast.error(
                language === 'vi'
                    ? 'Vui lòng điền đầy đủ thông tin'
                    : 'Please fill in all required fields'
            );
            return;
        }
        if (
            formData.phone &&
            (formData.phone.length !== 10 || isNaN(Number(formData.phone)))
        ) {
            toast.error(
                language === 'vi'
                    ? 'Số điện thoại không hợp lệ'
                    : 'Invalid phone number'
            );
            return;
        }

        const updateData = new FormData();
        updateData.append('name', formData.name);
        updateData.append('email', formData.email);
        updateData.append('phone', formData.phone);
        if (formData.dob) {
            updateData.append('dob', formData.dob.format('YYYY-M-D'));
        }
        updateData.append('ethnicity', formData.ethnicity);
        updateData.append('gender', formData.gender);
        updateData.append('address', formData.address);
        if (formData.image) {
            updateData.append('image', formData.image);
        }

        try {
            setIsLoading(true);

            const res = await updateReceptionist(
                Number(editItem?.userId),
                updateData
            );

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

            setIsOpen(false);
            setIsLoading(false);
            setEditItem(null);
            setFormData({});
            dispatch(fetchReceptionists());
        } catch (e: any) {
            console.error('Error update form:', e);

            toast.error(
                language === 'vi' ? 'Lỗi phía Server' : 'Error from Server'
            );
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: t('receptionist.im'),
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
            title: t('receptionist.na'),
            dataIndex: 'user',
            key: 'name',
            render: (user: any) => user?.name
        },
        {
            title: 'Email',
            dataIndex: 'user',
            key: 'email',
            render: (user: any) => user?.email
        },
        {
            title: t('receptionist.ph'),
            dataIndex: 'user',
            key: 'phone',
            render: (user: any) => user?.phone
        },
        {
            title: t('receptionist.gd'),
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: any) => {
                if (gender === '1') {
                    return t('patient.ma');
                } else if (gender === '0') {
                    return t('patient.fm');
                } else {
                    return t('patient.ot');
                }
            }
        },
        {
            title: t('receptionist.ad'),
            dataIndex: 'address',
            key: 'address'
        },

        {
            title: t('receptionist.st'),
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (_: any, record: IReceptionist) =>
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
            title: t('receptionist.at'),
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IReceptionist) => (
                <div className='flex gap-5 items-center justify-center'>
                    <button
                        onClick={() => {
                            const id = Number(record.id);
                            const old = receptionists.find(
                                (s) => Number(s.id) === id
                            );

                            setEditItem(old || null);
                            setFormData({
                                name: old?.user?.name,
                                email: old?.user?.email,
                                phone: old?.user?.phone,
                                password: '',
                                confirmPassword: '',
                                dob: old?.dob ? dayjs(old.dob) : null,
                                gender: old?.gender,
                                ethnicity: old?.ethnicity,
                                address: old?.address,
                                image: old?.image
                            });

                            setIsOpen(true);
                        }}
                    >
                        <GoPencil className='text-2xl text-blue-500 cursor-pointer' />
                    </button>
                </div>
            )
        }
    ];

    let modalConfigs: filterConfig[] = [];

    if (editItem) {
        modalConfigs = [
            {
                name: 'image',
                label: t('receptionist.im'),
                type: 'upload',
                placeholder: t('doctor.ul')
            },
            {
                name: 'name',
                label: t('receptionist.na'),
                type: 'input'
            },
            {
                name: 'email',
                label: 'Email',
                type: 'input'
            },
            {
                name: 'phone',
                label: t('receptionist.ph'),
                type: 'input'
            },
            {
                name: 'dob',
                label: t('receptionist.bd'),
                type: 'date'
            },
            {
                name: 'gender',
                label: t('receptionist.gd'),
                type: 'select',
                width: 100,
                options: [
                    { value: '1', label: t('receptionist.ma') },
                    { value: '0', label: t('receptionist.fm') },
                    { value: '3', label: t('receptionist.ot') }
                ]
            },
            {
                name: 'ethnicity',
                label: t('receptionist.et'),
                type: 'input'
            },
            {
                name: 'address',
                label: t('receptionist.ad'),
                type: 'input'
            }
        ];
    } else {
        modalConfigs = [
            {
                name: 'image',
                label: t('receptionist.im'),
                type: 'upload',
                placeholder: t('doctor.ul')
            },
            {
                name: 'name',
                label: t('receptionist.na'),
                type: 'input'
            },
            {
                name: 'email',
                label: 'Email',
                type: 'input'
            },
            {
                name: 'phone',
                label: t('receptionist.ph'),
                type: 'input'
            },
            {
                name: 'password',
                label: t('receptionist.pa'),
                type: 'input'
            },
            {
                name: 'confirmPassword',
                label: t('receptionist.cp'),
                type: 'input'
            },
            {
                name: 'dob',
                label: t('receptionist.bd'),
                type: 'date'
            },
            {
                name: 'gender',
                label: t('receptionist.gd'),
                type: 'select',
                width: 100,
                options: [
                    { value: '1', label: t('receptionist.ma') },
                    { value: '0', label: t('receptionist.fm') },
                    { value: '3', label: t('receptionist.ot') }
                ]
            },
            {
                name: 'ethnicity',
                label: t('receptionist.et'),
                type: 'input'
            },
            {
                name: 'address',
                label: t('receptionist.ad'),
                type: 'input'
            }
        ];
    }

    useEffect(() => {
        dispatch(fetchReceptionists());
    }, [dispatch]);

    return (
        <div className='m-5'>
            <div
                className={`text-2xl uppercase pb-2 ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                {t('receptionist.tt')}
            </div>
            <div
                className={`flex justify-between ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                <div className='text-base py-2'>{t('receptionist.ds')}</div>
                <div>
                    <Button
                        className='rounded-none w-25'
                        onClick={() => setIsOpen(true)}
                    >
                        {t('service.nb')}
                    </Button>
                </div>
            </div>

            <div className={`p-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className='flex gap-5 mb-5'>
                    <Select
                        defaultValue={pageSize}
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
                        {t('patient.epg')}
                    </div>
                </div>

                <div className={isDark ? 'text-black' : 'text-blue-500'}>
                    <Table
                        rowKey='id'
                        dataSource={currentData}
                        columns={columns}
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={receptionists.length}
                                pageSize={pageSize}
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                isDark={isDark}
                            />
                        )}
                    />
                </div>
            </div>
            <AdminModal
                title={editItem ? t('receptionist.ed') : t('receptionist.an')}
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false);
                    setEditItem(null);
                    setFormData({});
                }}
                onOk={editItem ? handleUpdate : handleSubmit}
            >
                {isLoading && <LoadingCommon />}
                <AdminFilter
                    filters={modalConfigs}
                    initialValues={formData}
                    onChange={(values) => setFormData(values)}
                />
            </AdminModal>
        </div>
    );
}
