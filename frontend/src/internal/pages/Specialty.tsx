import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { Button, Select, Spin, Table, Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { AiOutlineDelete } from 'react-icons/ai';
import ToggleSwitch from '../components/ToggleSwitch';
import Pagination from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchSpecialties,
    selectSpecialty
} from '@/shared/stores/specialtySlice';
import type { filterConfig } from '../components/AdminFilter';
import AdminModal from '../components/AdminModal';
import AdminFilter from '../components/AdminFilter';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
    deleteSpecialty,
    postSpecialty,
    updateSpecialty
} from '@/shared/apis/specialtyService';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import LoadingCommon from '@/shared/components/LoadingCommon';

interface ISpecialtyApi {
    id: number;
    name: string;
    description: string;
    image: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

interface ISpecialty {
    key: string;
    image: string;
    name: string;
    description: string;
    status: boolean;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Specialty() {
    const { isDark } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const dispatch = useAppDispatch();

    const {
        list: specialties,
        totalSpecialties,
        loading: isFetching
    } = useAppSelector(selectSpecialty);

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [editItem, setEditItem] = useState<ISpecialtyApi | null>(null);
    const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);
    const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);

    // State cho tìm kiếm
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const pageSize = entriesPerPage;

    // Xử lý Debounce cho tìm kiếm (delay 500ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchText);
            // Nếu từ khóa thay đổi, reset về trang 1
            if (searchText !== debouncedSearchTerm) {
                setCurrentPage(1);
            }
        }, 500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    // Gọi API khi page, limit hoặc từ khóa tìm kiếm thay đổi
    useEffect(() => {
        dispatch(
            fetchSpecialties({
                page: currentPage,
                limit: entriesPerPage,
                q: debouncedSearchTerm // Truyền tham số search
            })
        );
    }, [dispatch, currentPage, entriesPerPage, debouncedSearchTerm]);

    const currentData: ISpecialty[] = (specialties as ISpecialtyApi[]).map(
        (item: ISpecialtyApi) => ({
            key: item.id.toString(),
            image: item.image,
            name: item.name,
            description: item.description,
            status: item.status === 'active'
        })
    );

    const handlePageSizeChange = (value: number) => {
        setEntriesPerPage(Number(value));
        setCurrentPage(1);
    };

    const refreshData = () => {
        dispatch(
            fetchSpecialties({
                page: currentPage,
                limit: entriesPerPage,
                q: debouncedSearchTerm
            })
        );
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.image) {
            toast.warning(
                language === 'en'
                    ? 'Please fill in all required fields'
                    : 'Vui lòng điền đầy đủ thông tin'
            );
            return;
        }

        try {
            const postData = new FormData();
            postData.append('name', formData.name);
            postData.append('description', formData.description);
            postData.append('status', formData.status ? 'active' : 'inactive');
            if (formData.image) {
                postData.append('image', formData.image);
            }

            setIsLoading(true);
            const res = await postSpecialty(postData);

            if (res.data && res.data.errCode !== 0) {
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage || 'Failed to add specialty'
                        : res.data.errViMessage || 'Thêm chuyên khoa thất bại'
                );
            } else if (res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                setIsOpen(false);
                setFormData({});
                refreshData();
            }
        } catch (e: any) {
            console.error('Error submitting form:', e);
            toast.error(
                language === 'en' ? 'Error from Server' : 'Lỗi phía Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!id) return;
        setLoadingDeleteId(id.toString());
        try {
            const res = await deleteSpecialty(id);
            if (res.data.errCode !== 0) {
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage || 'Failed to delete specialty'
                        : res.data.errViMessage || 'Xóa chuyên khoa thất bại'
                );
            } else {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                refreshData();
            }
        } catch (e) {
            console.error('Error deleting specialty:', e);
            toast.error(
                language === 'en' ? 'Error from Server' : 'Lỗi phía Server'
            );
        } finally {
            setLoadingDeleteId(null);
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        const newStatus = currentStatus ? 'inactive' : 'active';
        const form = new FormData();
        form.append('status', newStatus);

        setLoadingStatusId(id.toString());

        try {
            const res = await updateSpecialty(id, form);
            if (res.data.errCode !== 0) {
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage || 'Failed to update status'
                        : res.data.errViMessage ||
                              'Cập nhật trạng thái thất bại'
                );
            } else {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                refreshData();
            }
        } catch (error) {
            toast.error(
                language === 'en' ? 'Error from Server' : 'Lỗi phía Server'
            );
        } finally {
            setLoadingStatusId(null);
        }
    };

    const handleUpdate = async () => {
        if (!editItem) return;

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('status', formData.status ? 'active' : 'inactive');

        if (formData.image && formData.image instanceof File) {
            form.append('image', formData.image);
        }

        setIsLoading(true);
        try {
            const res = await updateSpecialty(editItem.id, form);
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                setIsOpen(false);
                setEditItem(null);
                setFormData({});
                refreshData();
            } else {
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage
                        : res.data.errViMessage
                );
            }
        } catch (error) {
            toast.error(
                language === 'en' ? 'Error from Server' : 'Lỗi phía Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            sorter: (a: ISpecialty, b: ISpecialty) =>
                Number(a.key) - Number(b.key)
        },
        {
            title: t('specialty.im'),
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
                        alt='Specialty'
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            )
        },
        {
            title: t('specialty.na'),
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ISpecialty, b: ISpecialty) =>
                a.name.localeCompare(b.name)
        },
        {
            title: t('specialty.dc'),
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: t('specialty.st'),
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (_: any, record: ISpecialty) =>
                loadingStatusId == record.key ? (
                    <Spin indicator={<LoadingOutlined spin />} />
                ) : (
                    <div className='flex items-center justify-center'>
                        <ToggleSwitch
                            checked={record.status}
                            onToggle={() =>
                                handleToggleStatus(
                                    Number(record.key),
                                    record.status
                                )
                            }
                        />
                    </div>
                )
        },
        {
            title: t('specialty.at'),
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: ISpecialty) => (
                <div className='flex items-center justify-center gap-5'>
                    <button
                        onClick={() => {
                            const id = Number(record.key);
                            const old = (specialties as ISpecialtyApi[]).find(
                                (sp) => sp.id === id
                            );
                            setEditItem(old || null);
                            setFormData({
                                name: old?.name,
                                description: old?.description,
                                status: old?.status === 'active',
                                image: old?.image
                            });
                            setIsOpen(true);
                        }}
                    >
                        <GoPencil className='text-2xl text-blue-500 cursor-pointer' />
                    </button>
                    {loadingDeleteId == record.key ? (
                        <Spin indicator={<LoadingOutlined spin />} />
                    ) : (
                        <button
                            onClick={() => handleDelete(Number(record.key))}
                        >
                            <AiOutlineDelete className='text-2xl text-red-500 cursor-pointer' />
                        </button>
                    )}
                </div>
            )
        }
    ];

    const modalConfigs: filterConfig[] = [
        {
            name: 'image',
            label: t('specialty.im') as string,
            type: 'upload' as const,
            placeholder: t('specialty.ul') as string
        },
        {
            name: 'name',
            label: t('specialty.np') as string,
            type: 'input' as const
        },
        {
            name: 'description',
            label: t('specialty.dc') as string,
            type: 'textarea' as const,
            rows: 5
        },
        ...(editItem
            ? []
            : [
                  {
                      name: 'status',
                      label: t('specialty.st') as string,
                      type: 'checkbox' as const
                  }
              ])
    ];

    return (
        <div className='m-5'>
            <div
                className={`text-2xl uppercase pb-2 ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                {t('specialty.tt')}
            </div>
            <div
                className={`flex justify-between ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                <div className='text-base py-2'> {t('specialty.ds')}</div>
                <div>
                    <Button
                        className='rounded-none w-25'
                        onClick={() => setIsOpen(true)}
                    >
                        {t('specialty.nb')}
                    </Button>
                </div>
                <AdminModal
                    title={editItem ? t('specialty.ed') : t('specialty.an')}
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

            <div className={`p-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                {/* Khu vực Toolbar: Select và Search */}
                <div className='flex justify-between items-center mb-5'>
                    <div className='flex gap-5 items-center'>
                        <Select
                            defaultValue={entriesPerPage}
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
                            {t('specialty.epg')}
                        </div>
                    </div>

                    {/* Ô tìm kiếm */}
                    <div className='w-1/3'>
                        <Input
                            placeholder={
                                language === 'en'
                                    ? 'Search specialty...'
                                    : 'Tìm kiếm chuyên khoa...'
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
                        loading={isFetching}
                        dataSource={currentData}
                        columns={columns}
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={totalSpecialties}
                                pageSize={pageSize}
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                isDark={isDark}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
