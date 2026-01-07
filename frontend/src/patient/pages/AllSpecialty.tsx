import { Button } from '@/components/ui/button';
import PatientPagination from '../components/PatientPagination';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import Loading from '@/shared/pages/Loading';
import {
    fetchSpecialties,
    selectSpecialty
} from '@/shared/stores/specialtySlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AllSpecialty() {
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const {
        list: listSpecialties,
        loading,
        totalPages
    } = useAppSelector(selectSpecialty);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(
            fetchSpecialties({
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
                    {t('allSpecialtyPage.allSpecialties') ||
                        'Tất cả chuyên khoa'}
                </span>
            </div>

            {/* Title */}
            <div className='border-b border-gray-200 pb-4 mb-4'>
                <h1 className='text-xl sm:text-2xl font-bold'>
                    {t('allSpecialtyPage.listSpecialties') ||
                        'Danh sách chuyên khoa'}
                </h1>
            </div>

            {/* Specialty List */}
            <div className='flex flex-col gap-6'>
                {listSpecialties && listSpecialties.length > 0 ? (
                    listSpecialties.map((specialty, index) => (
                        <div
                            className='flex flex-col border border-gray-200 p-3 sm:p-5 rounded-none shadow-sm hover:shadow-md transition-shadow'
                            key={specialty.id || index}
                        >
                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                                {/* Image */}
                                <div className='shrink-0'>
                                    <img
                                        src={
                                            specialty.image
                                                ? specialty.image.startsWith(
                                                      'http'
                                                  )
                                                    ? specialty.image
                                                    : BACKEND_URL +
                                                      specialty.image
                                                : ''
                                        }
                                        alt={specialty.name}
                                        className='w-full h-48 sm:w-48 sm:h-32 object-cover sm:rounded-none mx-auto border border-gray-100'
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'https://via.placeholder.com/200x150?text=No+Image';
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                <div className='flex-1 flex flex-col justify-between'>
                                    <div>
                                        <div className='flex items-center justify-between flex-wrap gap-2'>
                                            <h2
                                                className='text-lg sm:text-xl font-bold cursor-pointer hover:text-blue-500'
                                                onClick={() =>
                                                    navigate(
                                                        `/detail-specialty/${specialty.id}`
                                                    )
                                                }
                                            >
                                                {specialty.name}
                                            </h2>

                                            <Button
                                                className={`
                                                    border rounded-none transition-colors cursor-pointer text-sm
                                                    ${
                                                        isDark
                                                            ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                                            : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                                                    }
                                                `}
                                                onClick={() =>
                                                    navigate(
                                                        `/chuyen-khoa/${slugify(
                                                            specialty.name || ''
                                                        )}/${specialty.id}`
                                                    )
                                                }
                                            >
                                                {t(
                                                    'allSpecialtyPage.viewDetail'
                                                ) || 'Xem chi tiết'}
                                            </Button>
                                        </div>

                                        {/* Doctor Count Badge */}
                                        <div className='mt-2'>
                                            <span
                                                className={`
                                                text-xs px-2 py-1 rounded-full font-medium
                                                ${
                                                    isDark
                                                        ? 'bg-blue-900 text-blue-200'
                                                        : 'bg-blue-100 text-blue-700'
                                                }
                                            `}
                                            >
                                                {specialty.doctorCount || 0}{' '}
                                                {t(
                                                    'allSpecialtyPage.doctors'
                                                ) || 'Bác sĩ'}
                                            </span>
                                        </div>

                                        <p className='text-gray-500 text-sm sm:text-base line-clamp-2 mt-3 text-justify'>
                                            {specialty.description ||
                                                t(
                                                    'allSpecialtyPage.noDescription'
                                                ) ||
                                                'Chưa có mô tả'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-10 text-gray-500'>
                        {t('allSpecialtyPage.noData') ||
                            'Không có dữ liệu chuyên khoa'}
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
