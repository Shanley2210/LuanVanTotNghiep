import { Button } from '@/components/ui/button';
import PatientPagination from '../components/PatientPagination';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import Loading from '@/shared/pages/Loading';
import {
    fetchDoctorsBySpecialty,
    selectDoctor
} from '@/shared/stores/doctorSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DoctorSpecialty() {
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { listDoctorSpecialty, loading, totalPages } =
        useAppSelector(selectDoctor);

    const [currentPage, setCurrentPage] = useState(1);
    const [specialtyName, setSpecialtyName] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(
                fetchDoctorsBySpecialty({
                    specialtyId: Number(id),
                    page: currentPage,
                    limit: 10,
                    status: 'active'
                })
            );
        }
    }, [dispatch, currentPage, id]);

    useEffect(() => {
        if (
            listDoctorSpecialty &&
            listDoctorSpecialty.length > 0 &&
            listDoctorSpecialty[0].specialty
        ) {
            setSpecialtyName(listDoctorSpecialty[0].specialty.name || '');
        }
    }, [listDoctorSpecialty]);

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
            <div className='flex items-center gap-1 flex-wrap text-sm sm:text-base mb-5'>
                <AiOutlineHome
                    className='text-lg sm:text-xl cursor-pointer text-blue-500'
                    onClick={() => navigate('/')}
                />
                <IoIosArrowForward className='shrink-0' />
                <span
                    className='cursor-pointer hover:text-blue-500'
                    onClick={() => navigate('/all-doctors')}
                >
                    {t('doctorSpecialty.all') || 'Tất cả chuyên khoa'}
                </span>
                <IoIosArrowForward className='shrink-0' />
                <span className='line-clamp-1 break-all font-medium text-blue-500'>
                    {specialtyName || t('common.specialty') || 'Chuyên khoa'}
                </span>
            </div>

            <div className='border-b border-gray-200 pb-4 mb-4'>
                <h1 className='text-xl sm:text-2xl font-bold'>
                    {t('doctorSpecialty.listDoctors') || 'Bác sĩ chuyên khoa'}{' '}
                    {specialtyName}
                </h1>
            </div>

            {/* Doctor List */}
            <div className='flex flex-col gap-6'>
                {listDoctorSpecialty && listDoctorSpecialty.length > 0 ? (
                    listDoctorSpecialty.map((doctor, index) => (
                        <div
                            className='flex flex-col border border-gray-200 p-3 sm:p-5 rounded-none shadow-sm hover:shadow-md transition-shadow'
                            key={doctor.id || index}
                        >
                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-10'>
                                <div className='shrink-0'>
                                    <img
                                        src={
                                            doctor.image
                                                ? doctor.image.startsWith(
                                                      'http'
                                                  )
                                                    ? doctor.image
                                                    : BACKEND_URL + doctor.image
                                                : ''
                                        }
                                        alt={doctor.user?.name}
                                        className='w-full h-56 sm:w-36 sm:h-36 object-cover sm:rounded-none mx-auto border border-gray-100'
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'https://via.placeholder.com/150';
                                        }}
                                    />
                                </div>

                                <div className='flex-1 flex flex-col justify-between'>
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <h2
                                                className='text-lg sm:text-xl font-bold mb-1 cursor-pointer hover:text-blue-500'
                                                onClick={() =>
                                                    navigate(
                                                        `/detail-doctor/${doctor.id}`
                                                    )
                                                }
                                            >
                                                {doctor.degree
                                                    ? `${doctor.degree}, `
                                                    : ''}
                                                {doctor.user?.name}
                                            </h2>

                                            <Button
                                                className={`
                                                    border rounded-none transition-colors cursor-pointer
                                                    ${
                                                        isDark
                                                            ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                                            : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                                                    }
                                                `}
                                                onClick={() =>
                                                    navigate(
                                                        `/bac-si/${slugify(
                                                            doctor?.user
                                                                ?.name || ''
                                                        )}/${doctor?.id}`
                                                    )
                                                }
                                            >
                                                {t('allDoctorPage.xct')}
                                            </Button>
                                        </div>

                                        <p className='font-medium text-sm sm:text-base text-blue-500 mb-2'>
                                            {doctor.specialty?.name ||
                                                'Chuyên khoa'}
                                        </p>

                                        <div className='flex items-center gap-2 text-sm sm:text-base mt-2'>
                                            <span className='text-gray-500'>
                                                {t('bookingAppointment.gi') ||
                                                    'Giá khám'}
                                                :
                                            </span>
                                            <span className='font-semibold'>
                                                {Number(
                                                    doctor.price
                                                ).toLocaleString()}{' '}
                                                VND
                                            </span>
                                        </div>

                                        <p className='text-gray-500 text-sm sm:text-base line-clamp-3 mb-2 text-justify'>
                                            {doctor.introduce}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-10 text-gray-500'>
                        {t('allDoctorPage.noData') ||
                            'Không có dữ liệu bác sĩ cho chuyên khoa này'}
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
