import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import {
    fetchSpecialties,
    selectSpecialty
} from '@/shared/stores/specialtySlice';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowRoundForward } from 'react-icons/io';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SpecialtyHomepage() {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { list: specialties } = useAppSelector(selectSpecialty);

    useEffect(() => {
        dispatch(fetchSpecialties({ page: 1, limit: 10 }));
    }, [dispatch]);
    return (
        <div
            className={`
                p-4 lg:p-20 w-screen
                ${
                    isDark
                        ? 'bg-gray-900 text-white'
                        : 'bg-linear-to-b from-blue-600 to-blue-400 text-white'
                }
            `}
        >
            <div className='mb-8 text-white'>
                <span className='text-3xl font-bold'>{t('homePage.bs')}</span>
                <div className='flex justify-between items-center mt-2 flex-wrap gap-2'>
                    <p className='opacity-90'>{t('homePage.fd')}</p>
                    <Button
                        className={`
                            border rounded-none cursor-pointer transition-colors
                            ${
                                isDark
                                    ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                    : 'border-white text-white hover:bg-white hover:text-blue-500'
                            }
                        `}
                    >
                        {t('homePage.xt')}
                    </Button>
                </div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
                {specialties.slice(0, 8).map((item, index) => (
                    <div
                        key={index}
                        className={`
                            rounded-none p-3 transition-shadow cursor-pointer
                            ${
                                isDark
                                    ? 'bg-gray-800 text-white hover:shadow-lg'
                                    : 'bg-white text-black hover:shadow-xl'
                            }
                        `}
                    >
                        <div className='flex flex-col justify-between h-full'>
                            <div className='flex items-start gap-3'>
                                <div className='w-12 h-12 bg-gray-200 rounded-full shrink-0'>
                                    <img
                                        src={BACKEND_URL + item?.image || ''}
                                        alt=''
                                        className='w-full h-full object-cover rounded-full'
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <span
                                        className={
                                            isDark
                                                ? 'font-bold text-blue-300'
                                                : 'font-bold text-blue-500'
                                        }
                                    >
                                        {item?.name || 'No data'}
                                    </span>

                                    <span
                                        className={
                                            isDark
                                                ? 'text-sm text-gray-300'
                                                : 'text-sm text-gray-500'
                                        }
                                    >
                                        {item?.doctorCount || 'No data'} Doctors
                                    </span>
                                </div>
                            </div>

                            <div className='flex justify-end mt-2'>
                                <IoIosArrowRoundForward
                                    className={`
                                        border text-2xl rounded-full transition-colors cursor-pointer
                                        ${
                                            isDark
                                                ? 'border-gray-500 text-gray-300 hover:border-blue-300 hover:text-blue-300'
                                                : 'border-gray-300 hover:border-blue-500 hover:text-blue-500'
                                        }
                                    `}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
