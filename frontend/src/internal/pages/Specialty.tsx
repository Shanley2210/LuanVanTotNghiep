import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { Button, Select, Spin, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { AiOutlineDelete } from 'react-icons/ai';
import ToggleSwitch from '../components/ToggleSwitch';
import Pagination from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchSpecilties,
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
import { LoadingOutlined } from '@ant-design/icons';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { list: specialties } = useAppSelector(selectSpecialty);
    const pageSize = entriesPerPage;
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [editItem, setEditItem] = useState<ISpecialtyApi | null>(null);
    const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);
    const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);

    const transformData: ISpecialty[] = (specialties as ISpecialtyApi[]).map(
        (item: ISpecialtyApi) => ({
            key: item.id.toString(),
            image: item.image,
            name: item.name,
            description: item.description,
            status: item.status === 'active'
        })
    );
    const currentData = transformData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageSizeChange = (value: number) => {
        setEntriesPerPage(Number(value));
        setCurrentPage(1);
    };
    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.image) {
            if (language === 'en') {
                toast.warning('Please fill in all required fields');
                return;
            } else if (language === 'vi') {
                toast.warning('Vui lòng điền đầy đủ thông tin');
                return;
            }
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
                if (language === 'en') {
                    toast.error(
                        res.data.errEnMessage || 'Failed to add specialty'
                    );
                } else if (language === 'vi') {
                    toast.error(
                        res.data.errViMessage || 'Thêm chuyên khoa thất bại'
                    );
                }
            }

            if (res.data && res.data.errCode === 0) {
                if (language === 'en') {
                    toast.success(res.data.enMessage);
                } else if (language === 'vi') {
                    toast.success(res.data.viMessage);
                }
            }

            setIsLoading(false);
            setFormData({});
            dispatch(fetchSpecilties());
        } catch (e: any) {
            console.error('Error submitting form:', e);
            if (language === 'en') {
                toast.error('Error from Server');
            } else if (language === 'vi') {
                toast.error('Lỗi phí Server');
            }
        }

        setIsOpen(false);
        setFormData({});
    };
    const handleDelete = async (id: number) => {
        if (!id) {
            if (language === 'en') {
                toast.error('Invalid specialty ID');
            } else if (language === 'vi') {
                toast.error('ID chuyên khoa không hợp lệ');
            }
            return;
        }

        setLoadingDeleteId(id.toString());

        try {
            const res = await deleteSpecialty(id);

            if (res.data.errCode !== 0) {
                if (language === 'en') {
                    toast.error(
                        res.data.errEnMessage || 'Failed to delete specialty'
                    );
                } else if (language === 'vi') {
                    toast.error(
                        res.data.errViMessage || 'Xóa chuyên khoa thất bại'
                    );
                }
            }

            if (res.data.errCode === 0) {
                if (language === 'en') {
                    toast.success(res.data.enMessage);
                } else if (language === 'vi') {
                    toast.success(res.data.viMessage);
                }
            }
        } catch (e) {
            console.error('Error deleting specialty:', e);

            if (language === 'en') {
                toast.error('Error from Server');
            } else if (language === 'vi') {
                toast.error('Lỗi phí Server');
            }
        }
        setLoadingDeleteId(null);
        dispatch(fetchSpecilties());
    };
    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        const newStatus = currentStatus ? 'inactive' : 'active';

        const form = new FormData();
        form.append('status', newStatus);

        setLoadingStatusId(id.toString());

        const res = await updateSpecialty(id, form);

        if (res.data.errCode !== 0) {
            if (language === 'en') {
                toast.error(
                    res.data.errEnMessage || 'Failed to update specialty status'
                );
            } else if (language === 'vi') {
                toast.error(
                    res.data.errViMessage ||
                        'Cập nhật trạng thái chuyên khoa thất bại'
                );
            }
        }
        if (res.data.errCode === 0) {
            if (language === 'en') {
                toast.success(res.data.enMessage);
            } else if (language === 'vi') {
                toast.success(res.data.viMessage);
            }
        }

        setLoadingStatusId(null);
        dispatch(fetchSpecilties());
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

        const res = await updateSpecialty(editItem.id, form);

        if (res.data.errCode === 0) {
            toast.success(
                language === 'en' ? res.data.enMessage : res.data.viMessage
            );
        } else {
            toast.error(
                language === 'en'
                    ? res.data.errEnMessage
                    : res.data.errViMessage
            );
        }

        setIsLoading(false);
        setIsOpen(false);
        setEditItem(null);
        setFormData({});
        dispatch(fetchSpecilties());
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            sorter: (a: ISpecialty, b: ISpecialty) => {
                return Number(a.key) - Number(b.key);
            }
        },
        {
            title: t('specialty.im'),
            dataIndex: 'image',
            key: 'image',
            align: 'center' as const,
            render: (image: string) => (
                <img
                    src={
                        image.startsWith(BACKEND_URL)
                            ? image
                            : `${BACKEND_URL}${image}`
                    }
                    alt='Specialty Image'
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover'
                    }}
                />
            )
        },
        {
            title: t('specialty.na'),
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ISpecialty, b: ISpecialty) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }
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
                    <ToggleSwitch
                        checked={record.status}
                        onToggle={() => {
                            handleToggleStatus(
                                Number(record.key),
                                record.status
                            );
                        }}
                    />
                )
        },
        {
            title: t('specialty.at'),
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: ISpecialty) => (
                <div className='flex gap-5'>
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
    const modalConfigs: filterConfig[] = editItem
        ? [
              {
                  name: 'image',
                  label: t('specialty.im') as string,
                  type: 'upload',
                  placeholder: t('specialty.ul') as string
              },
              {
                  name: 'name',
                  label: t('specialty.np') as string,
                  type: 'input'
              },
              {
                  name: 'description',
                  label: t('specialty.dc') as string,
                  type: 'textarea',
                  rows: 5
              }
          ]
        : [
              {
                  name: 'image',
                  label: t('specialty.im') as string,
                  type: 'upload',
                  placeholder: t('specialty.ul') as string
              },
              {
                  name: 'name',
                  label: t('specialty.np') as string,
                  type: 'input'
              },
              {
                  name: 'description',
                  label: t('specialty.dc') as string,
                  type: 'textarea',
                  rows: 5
              },
              {
                  name: 'status',
                  label: t('specialty.st') as string,
                  type: 'checkbox'
              }
          ];

    useEffect(() => {
        dispatch(fetchSpecilties());
    }, [dispatch]);

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
                <div className='flex gap-5 mb-5'>
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

                <div className={isDark ? 'text-black' : 'text-blue-500'}>
                    <Table
                        dataSource={currentData}
                        columns={columns}
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={transformData.length}
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
