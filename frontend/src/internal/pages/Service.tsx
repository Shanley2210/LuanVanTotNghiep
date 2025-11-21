import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchServices,
    selectServices,
    type IService
} from '@/shared/stores/serviceSlice';
import { Button, Select, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import ToggleSwitch from '../components/ToggleSwitch';
import { GoPencil } from 'react-icons/go';
import { AiOutlineDelete } from 'react-icons/ai';
import type { filterConfig } from '../components/AdminFilter';
import AdminModal from '../components/AdminModal';
import AdminFilter from '../components/AdminFilter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
    deleteService,
    postService,
    updateService
} from '@/shared/apis/serviceService';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { LoadingOutlined } from '@ant-design/icons';

export default function Service() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const { list: services } = useAppSelector(selectServices);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [isLoading, setIsLoading] = useState(false);
    const [editItem, setEditItem] = useState<IService | null>(null);
    const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);
    const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);

    const currentData = services.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1);
    };
    const handleSubmit = async () => {
        if (
            !formData.name ||
            !formData.description ||
            !formData.durationMinutes ||
            !formData.price
        ) {
            if (language === 'en') {
                toast.warning('Please fill in all required fields');
                return;
            } else if (language === 'vi') {
                toast.warning('Vui lòng điền đầy đủ thông tin');
                return;
            }
        }

        if (
            !Number.isInteger(Number(formData.durationMinutes)) ||
            Number(formData.durationMinutes) <= 0
        ) {
            if (language === 'en') {
                toast.warning('Duration Minutes must be a positive integer');
                return;
            } else if (language === 'vi') {
                toast.warning('Thời lượng phải là số nguyên dương');
                return;
            }
        }

        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            if (language === 'en') {
                toast.warning('Price must be a positive number');
                return;
            } else if (language === 'vi') {
                toast.warning('Giá phải là số dương');
                return;
            }
        }

        const postData = {
            name: formData.name,
            description: formData.description,
            durationMinutes: formData.durationMinutes,
            price: formData.price,
            status: formData.status ? 'active' : 'inactive'
        };

        try {
            setIsLoading(true);

            const res = await postService(postData);

            if (res.data && res.data.errCode !== 0) {
                if (language === 'en') {
                    toast.error(
                        res.data.errEnMessage || 'Failed to add service'
                    );
                } else if (language === 'vi') {
                    toast.error(
                        res.data.errViMessage || 'Thêm dịch vụ thất bại'
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
            dispatch(fetchServices());
        } catch (e) {
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
                toast.error('Invalid service ID');
            } else if (language === 'vi') {
                toast.error('ID dịch vụ không hợp lệ');
            }
            return;
        }

        setLoadingDeleteId(id);

        try {
            const res = await deleteService(id);

            if (res.data && res.data.errCode !== 0) {
                if (language === 'en') {
                    toast.error(
                        res.data.errEnMessage || 'Failed to delete service'
                    );
                } else if (language === 'vi') {
                    toast.error(
                        res.data.errViMessage || 'Xóa dịch vụ thất bại'
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
        } catch (e: any) {
            console.log('Error deleting service:', e);
            if (language === 'en') {
                toast.error('Error from Server');
            } else if (language === 'vi') {
                toast.error('Lỗi phí Server');
            }
        }

        setLoadingDeleteId(null);
        dispatch(fetchServices());
    };
    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        const newStatus = currentStatus ? 'inactive' : 'active';

        setLoadingStatusId(id);

        const res = await updateService(id, { status: newStatus });

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
        dispatch(fetchServices());
    };
    const handleUpdate = async () => {
        if (!editItem) return;

        if (
            !Number.isInteger(Number(formData.durationMinutes)) ||
            Number(formData.durationMinutes) <= 0
        ) {
            if (language === 'en') {
                toast.warning('Duration Minutes must be a positive integer');
                return;
            } else if (language === 'vi') {
                toast.warning('Thời lượng phải là số nguyên dương');
                return;
            }
        }

        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            if (language === 'en') {
                toast.warning('Price must be a positive number');
                return;
            } else if (language === 'vi') {
                toast.warning('Giá phải là số dương');
                return;
            }
        }

        const updatedData = {
            name: formData.name,
            description: formData.description,
            durationMinutes: formData.durationMinutes,
            price: formData.price
        };

        setIsLoading(true);

        const res = await updateService(Number(editItem.id), updatedData);

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
        dispatch(fetchServices());
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: any, b: any) => {
                return a.id - b.id;
            }
        },
        {
            title: t('service.na'),
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name)
        },
        {
            title: t('service.dc'),
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: t('service.dm'),
            dataIndex: 'durationMinutes',
            key: 'durationMinutes',
            align: 'center' as const,
            sorter: (a: any, b: any) => a.durationMinutes - b.durationMinutes
        },
        {
            title: t('service.pr'),
            dataIndex: 'price',
            key: 'price',
            align: 'center' as const,
            sorter: (a: any, b: any) => a.price.localeCompare(b.price)
        },
        {
            title: t('service.st'),
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (_: any, record: IService) =>
                loadingStatusId === record.id ? (
                    <LoadingOutlined spin className='text-lg text-gray-500' />
                ) : (
                    <ToggleSwitch
                        checked={record.status === 'active'}
                        onToggle={() =>
                            handleToggleStatus(
                                Number(record.id),
                                record.status === 'active'
                            )
                        }
                    />
                )
        },
        {
            title: t('service.at'),
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IService) => (
                <div className='flex gap-5'>
                    <button
                        onClick={() => {
                            const id = Number(record.id);
                            const old = services.find(
                                (s) => Number(s.id) === id
                            );

                            setEditItem(old || null);

                            setFormData({
                                name: old?.name,
                                description: old?.description,
                                durationMinutes: old?.durationMinutes,
                                price: old?.price
                            });

                            setIsOpen(true);
                        }}
                    >
                        <GoPencil className='text-2xl text-blue-500 cursor-pointer' />
                    </button>

                    {loadingDeleteId === record.id ? (
                        <LoadingOutlined
                            spin
                            className='text-lg text-gray-500'
                        />
                    ) : (
                        <button
                            onClick={() => {
                                handleDelete(Number(record.id));
                            }}
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
                  name: 'name',
                  label: t('service.ns') as string,
                  type: 'input'
              },
              {
                  name: 'description',
                  label: t('service.dc') as string,
                  type: 'textarea',
                  rows: 4
              },
              {
                  name: 'durationMinutes',
                  label: t('service.dm') as string,
                  type: 'input'
              },
              {
                  name: 'price',
                  label: t('service.pr') as string,
                  type: 'input'
              }
          ]
        : [
              {
                  name: 'name',
                  label: t('service.ns') as string,
                  type: 'input'
              },
              {
                  name: 'description',
                  label: t('service.dc') as string,
                  type: 'textarea',
                  rows: 4
              },
              {
                  name: 'durationMinutes',
                  label: t('service.dm') as string,
                  type: 'input'
              },
              {
                  name: 'price',
                  label: t('service.pr') as string,
                  type: 'input'
              },
              {
                  name: 'status',
                  label: t('service.st') as string,
                  type: 'checkbox'
              }
          ];

    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServices());
        }
    }, [dispatch, services.length]);
    return (
        <div className='m-5'>
            <div
                className={`text-2xl uppercase pb-2 ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                {t('service.tt')}
            </div>
            <div
                className={`flex justify-between ${
                    isDark ? 'text-gray-100' : 'text-neutral-900'
                }`}
            >
                <div className='text-base py-2'>{t('service.ds')}</div>
                <div>
                    <Button
                        className='rounded-none w-25'
                        onClick={() => setIsOpen(true)}
                    >
                        {t('service.nb')}
                    </Button>
                </div>
                <AdminModal
                    title='Them dich vu'
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
                        {t('service.epg')}
                    </div>
                </div>

                <div className={isDark ? 'text-black' : 'text-blue-500'}>
                    <Table
                        dataSource={currentData}
                        columns={columns}
                        rowKey='id'
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={services.length}
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
