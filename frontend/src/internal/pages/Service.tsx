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
    setPriceService,
    updateService
} from '@/shared/apis/serviceService';
import LoadingCommon from '@/shared/components/LoadingCommon';
import { LoadingOutlined } from '@ant-design/icons';
import { IoPricetagsOutline } from 'react-icons/io5';

export default function Service() {
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();

    // 1. Lấy dữ liệu list, totalServices và loading từ Redux
    const {
        list: services,
        totalServices,
        loading: tableLoading
    } = useAppSelector(selectServices);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    // Loading cho các hành động Submit/Update
    const [isLoading, setIsLoading] = useState(false);

    const [editItem, setEditItem] = useState<IService | null>(null);
    const [priceItem, setPriceItem] = useState<IService | null>(null);
    const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);
    const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);

    // 2. useEffect gọi API với tham số phân trang
    useEffect(() => {
        dispatch(fetchServices({ page: currentPage, limit: pageSize }));
    }, [dispatch, currentPage, pageSize]);

    // Hàm refresh dữ liệu tại trang hiện tại (dùng sau khi CRUD)
    const refreshData = () => {
        dispatch(fetchServices({ page: currentPage, limit: pageSize }));
    };

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        setCurrentPage(1); // Reset về trang 1 khi đổi số lượng hiển thị
    };

    const handleSubmit = async () => {
        if (
            !formData.name ||
            !formData.description ||
            !formData.durationMinutes ||
            !formData.price
        ) {
            toast.warning(
                language === 'en'
                    ? 'Please fill in all required fields'
                    : 'Vui lòng điền đầy đủ thông tin'
            );
            return;
        }

        if (
            !Number.isInteger(Number(formData.durationMinutes)) ||
            Number(formData.durationMinutes) <= 0
        ) {
            toast.warning(
                language === 'en'
                    ? 'Duration Minutes must be a positive integer'
                    : 'Thời lượng phải là số nguyên dương'
            );
            return;
        }

        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            toast.warning(
                language === 'en'
                    ? 'Price must be a positive number'
                    : 'Giá phải là số dương'
            );
            return;
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
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage || 'Failed to add service'
                        : res.data.errViMessage || 'Thêm dịch vụ thất bại'
                );
            } else if (res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                setIsOpen(false);
                setFormData({});
                refreshData(); // Refresh data
            }
        } catch (e) {
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
        setLoadingDeleteId(id);

        try {
            const res = await deleteService(id);
            if (res.data && res.data.errCode !== 0) {
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage || 'Failed to delete service'
                        : res.data.errViMessage || 'Xóa dịch vụ thất bại'
                );
            } else if (res.data && res.data.errCode === 0) {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                refreshData(); // Refresh data
            }
        } catch (e: any) {
            console.log('Error deleting service:', e);
            toast.error(
                language === 'en' ? 'Error from Server' : 'Lỗi phía Server'
            );
        } finally {
            setLoadingDeleteId(null);
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: boolean) => {
        const newStatus = currentStatus ? 'inactive' : 'active';
        setLoadingStatusId(id);

        try {
            const res = await updateService(id, { status: newStatus });
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
                refreshData(); // Refresh data
            }
        } catch (e) {
            toast.error(
                language === 'en' ? 'Error from Server' : 'Lỗi phía Server'
            );
        } finally {
            setLoadingStatusId(null);
        }
    };

    const handleUpdate = async () => {
        if (!editItem) return;

        if (
            !Number.isInteger(Number(formData.durationMinutes)) ||
            Number(formData.durationMinutes) <= 0
        ) {
            toast.warning(
                language === 'en'
                    ? 'Duration Minutes must be a positive integer'
                    : 'Thời lượng phải là số nguyên dương'
            );
            return;
        }

        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            toast.warning(
                language === 'en'
                    ? 'Price must be a positive number'
                    : 'Giá phải là số dương'
            );
            return;
        }

        const updatedData = {
            name: formData.name,
            description: formData.description,
            durationMinutes: formData.durationMinutes,
            price: formData.price
        };

        setIsLoading(true);
        try {
            const res = await updateService(Number(editItem.id), updatedData);
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                setIsOpen(false);
                setEditItem(null);
                setFormData({});
                refreshData(); // Refresh data
            } else {
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage
                        : res.data.errViMessage
                );
            }
        } catch (e) {
            toast.error(
                language === 'en' ? 'Error from Server' : 'Lỗi phía Server'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePrice = async () => {
        if (!priceItem) return;

        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            toast.warning(
                language === 'en'
                    ? 'Price must be a positive number'
                    : 'Giá phải là số dương'
            );
            return;
        }

        const updatedData = {
            price: formData.price
        };

        setIsLoading(true);
        try {
            const res = await setPriceService(
                Number(priceItem.id),
                updatedData
            );
            if (res.data.errCode === 0) {
                toast.success(
                    language === 'en' ? res.data.enMessage : res.data.viMessage
                );
                setIsPriceOpen(false);
                setPriceItem(null);
                setFormData({});
                refreshData(); // Refresh data
            } else {
                toast.error(
                    language === 'en'
                        ? res.data.errEnMessage
                        : res.data.errViMessage
                );
            }
        } catch (e) {
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
            dataIndex: 'id',
            key: 'id',
            sorter: (a: any, b: any) => a.id - b.id
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
            sorter: (a: any, b: any) => a.price.localeCompare(b.price),
            render: (_: any, record: IService) => (
                <div className='flex gap-3 items-center justify-center'>
                    <div>{Number(record.price).toLocaleString('vi-VN')} </div>
                    <button
                        onClick={() => {
                            const id = Number(record.id);
                            const old = services.find(
                                (s) => Number(s.id) === id
                            );
                            setPriceItem(old || null);
                            setFormData({ price: old?.price });
                            setIsPriceOpen(true);
                        }}
                        className='flex items-center gap-2 justify-center cursor-pointer'
                    >
                        <IoPricetagsOutline className='text-xl text-blue-500' />
                    </button>
                </div>
            )
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
                    <div className='flex items-center justify-center'>
                        <ToggleSwitch
                            checked={record.status === 'active'}
                            onToggle={() =>
                                handleToggleStatus(
                                    Number(record.id),
                                    record.status === 'active'
                                )
                            }
                        />
                    </div>
                )
        },
        {
            title: t('service.at'),
            dataIndex: 'action',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: IService) => (
                <div className='flex gap-5 justify-center'>
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
                        <button onClick={() => handleDelete(Number(record.id))}>
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
                  type: 'input' as const
              },
              {
                  name: 'description',
                  label: t('service.dc') as string,
                  type: 'textarea' as const,
                  rows: 4
              },
              {
                  name: 'durationMinutes',
                  label: t('service.dm') as string,
                  type: 'input' as const
              },
              {
                  name: 'price',
                  label: t('service.pr') as string,
                  type: 'input' as const
              }
          ]
        : [
              {
                  name: 'name',
                  label: t('service.ns') as string,
                  type: 'input' as const
              },
              {
                  name: 'description',
                  label: t('service.dc') as string,
                  type: 'textarea' as const,
                  rows: 4
              },
              {
                  name: 'durationMinutes',
                  label: t('service.dm') as string,
                  type: 'input' as const
              },
              {
                  name: 'price',
                  label: t('service.pr') as string,
                  type: 'input' as const
              },
              {
                  name: 'status',
                  label: t('service.st') as string,
                  type: 'checkbox' as const
              }
          ];

    const priceModalConfigs: filterConfig[] = [
        {
            name: 'price',
            label: t('service.pr') as string,
            type: 'input' as const
        }
    ];

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
                    title={editItem ? t('service.ed') : t('service.an')}
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
                <AdminModal
                    title={t('service.ur') as string}
                    open={isPriceOpen}
                    onCancel={() => {
                        setIsPriceOpen(false);
                        setPriceItem(null);
                        setFormData({});
                    }}
                    onOk={handleUpdatePrice}
                >
                    {isLoading && <LoadingCommon />}
                    <AdminFilter
                        filters={priceModalConfigs}
                        initialValues={formData}
                        onChange={(values) =>
                            setFormData((prev: any) => ({ ...prev, ...values }))
                        }
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
                        loading={tableLoading} // Binding trạng thái loading vào bảng
                        dataSource={services} // Dùng trực tiếp list services từ Redux
                        columns={columns}
                        rowKey='id'
                        showSorterTooltip={false}
                        pagination={false}
                        footer={() => (
                            <Pagination
                                total={totalServices} // Binding tổng số bản ghi từ Server
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
