import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { fetchDoctors, selectDoctor } from '@/shared/stores/doctorSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';
import {
    fetchSpecialties,
    selectSpecialty
} from '@/shared/stores/specialtySlice';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function InfoBanner() {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { totalServices } = useAppSelector(selectServices);
    const { totalSpecialties } = useAppSelector(selectSpecialty);
    const { totalDoctors } = useAppSelector(selectDoctor);

    useEffect(() => {
        dispatch(fetchServices({ page: 1, limit: 10 }));
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchSpecialties({ page: 1, limit: 10 }));
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchDoctors({ page: 1, limit: 10 }));
    }, [dispatch]);

    return (
        <div
            className={`
        flex flex-col px-4 lg:px-20 w-screen py-15
        ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
    `}
        >
            <div className='flex justify-center text-3xl lg:text-5xl font-bold text-blue-500 text-center'>
                {t('homePage.lc')}
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 w-full mt-10 lg:mt-20 gap-5'>
                <div
                    className={`
        flex flex-col flex-1 text-center gap-2 p-3 border shadow-xl
        ${
            isDark
                ? 'border-blue-300 bg-gray-800 text-white'
                : 'border-blue-500 bg-blue-100 text-black'
        }
    `}
                >
                    <span className='text-3xl text-green-600 font-bold'>
                        {totalDoctors || 'No data'}
                    </span>
                    {t('homePage.bc')}
                </div>
                <div
                    className={`
        flex flex-col flex-1 text-center gap-2 p-3 border shadow-xl
        ${
            isDark
                ? 'border-blue-300 bg-gray-800 text-white'
                : 'border-blue-500 bg-blue-100 text-black'
        }
    `}
                >
                    <span className='text-3xl text-blue-600 font-bold'>
                        {totalSpecialties || 'No data'}
                    </span>
                    {t('homePage.sp')}
                </div>
                <div
                    className={`
        flex flex-col flex-1 text-center gap-2 p-3 border shadow-xl
        ${
            isDark
                ? 'border-blue-300 bg-gray-800 text-white'
                : 'border-blue-500 bg-blue-100 text-black'
        }
    `}
                >
                    <span className='text-3xl text-amber-500 font-bold'>
                        {totalServices || 'No data'}
                    </span>
                    {t('homePage.sv')}
                </div>
                <div
                    className={`
        flex flex-col flex-1 text-center gap-2 p-3 border shadow-xl
        ${
            isDark
                ? 'border-blue-300 bg-gray-800 text-white'
                : 'border-blue-500 bg-blue-100 text-black'
        }
    `}
                >
                    <span className='text-3xl text-orange-600 font-bold'>
                        24/7
                    </span>
                    {t('homePage.247')}
                </div>
            </div>
        </div>
    );
}
