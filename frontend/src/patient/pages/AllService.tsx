import { Button } from '@/components/ui/button';
import PatientPagination from '../components/PatientPagination';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import Loading from '@/shared/pages/Loading';

import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineClockCircle } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';

export default function AllService() {
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    // Lấy dữ liệu từ Redux store
    const {
        list: listServices,
        loading,
        totalPages
    } = useAppSelector(selectServices);

    const [currentPage, setCurrentPage] = useState(1);

    // Gọi API lấy danh sách dịch vụ
    useEffect(() => {
        dispatch(
            fetchServices({
                page: currentPage,
                limit: 10
            })
        );
    }, [dispatch, currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (totalPages || 1)) {
            setCurrentPage(newPage);
        }
    };

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

    return loading ? (
        <Loading />
    ) : (
        <div
            className={`
                flex flex-col px-3 sm:px-4 lg:px-20 w-screen py-5 my-5
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
        >
            {/* Breadcrumb */}
            <div className='flex items-center gap-1 flex-wrap text-sm sm:text-base mb-5'>
                <AiOutlineHome
                    className='text-lg sm:text-xl cursor-pointer text-blue-500'
                    onClick={() => navigate('/')}
                />
                <IoIosArrowForward className='shrink-0' />
                <span className='line-clamp-1 break-all'>
                    {t('allServicePage.allServices') || 'Tất cả dịch vụ'}
                </span>
            </div>

            {/* Title */}
            <div className='border-b border-gray-200 pb-4 mb-4'>
                <h1 className='text-xl sm:text-2xl font-bold'>
                    {t('allServicePage.listServices') ||
                        'Danh sách dịch vụ khám bệnh'}
                </h1>
            </div>

            {/* Service List */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                {listServices && listServices.length > 0 ? (
                    listServices.map((service, index) => (
                        <div
                            className={`
                                flex flex-col justify-between border p-4 sm:p-5 rounded-none shadow-sm hover:shadow-md transition-shadow
                                ${
                                    isDark
                                        ? 'border-gray-700 hover:border-blue-500'
                                        : 'border-gray-200 hover:border-blue-500'
                                }
                            `}
                            key={service.id || index}
                        >
                            {/* Top content */}
                            <div>
                                <div className='flex justify-between items-start gap-2 mb-2'>
                                    <h2
                                        className='text-lg sm:text-xl font-bold cursor-pointer hover:text-blue-500 line-clamp-2'
                                        onClick={() =>
                                            navigate(
                                                `/detail-service/${service.id}`
                                            )
                                        }
                                    >
                                        {service.name}
                                    </h2>
                                    <span className='font-bold text-blue-600 shrink-0 whitespace-nowrap'>
                                        {Number(service.price).toLocaleString()}{' '}
                                        VND
                                    </span>
                                </div>

                                <div className='flex items-center gap-1 text-sm text-gray-500 mb-3'>
                                    <AiOutlineClockCircle />
                                    <span>
                                        {service.durationMinutes}{' '}
                                        {t('bookingAppointment.ph') || 'phút'}
                                    </span>
                                </div>

                                <p className='text-gray-500 text-sm sm:text-base line-clamp-3 mb-4 text-justify min-h-[4.5em]'>
                                    {service.description ||
                                        t('allServicePage.noDescription') ||
                                        'Chưa có mô tả'}
                                </p>
                            </div>

                            {/* Bottom Action */}
                            <div className='flex justify-end mt-2'>
                                <Button
                                    className={`
                                        border rounded-none transition-colors cursor-pointer text-sm w-full sm:w-auto
                                        ${
                                            isDark
                                                ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                                : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                                        }
                                    `}
                                    onClick={() =>
                                        navigate(
                                            `/dich-vu/${slugify(
                                                service.name || ''
                                            )}/${service.id}`
                                        )
                                    }
                                >
                                    {t('allServicePage.viewDetail') ||
                                        'Xem chi tiết'}
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-1 md:col-span-2 text-center py-10 text-gray-500'>
                        {t('allServicePage.noData') ||
                            'Không có dữ liệu dịch vụ'}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <PatientPagination
                    currentPage={currentPage}
                    totalPages={totalPages || 0}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
