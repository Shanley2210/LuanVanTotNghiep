import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { fetchDoctors, selectDoctor } from '@/shared/stores/doctorSlice';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DoctorHomapage() {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { list: doctors } = useAppSelector(selectDoctor);
    const navigate = useNavigate();

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

    useEffect(() => {
        dispatch(fetchDoctors({ page: 1, limit: 10, status: 'active' }));
    }, [dispatch]);

    return (
        <div
            className={`
                p-4 lg:p-20 w-screen
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
        >
            <div className='mb-8'>
                <span className='text-3xl font-bold'>{t('homePage.bod')}</span>
                <div className='flex justify-between items-center mt-2 flex-wrap gap-2'>
                    <p className={isDark ? 'opacity-80' : 'opacity-90'}>
                        {t('homePage.moebo')}
                    </p>
                    <Button
                        className={`
                            border rounded-none transition-colors cursor-pointer
                            ${
                                isDark
                                    ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                    : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                            }
                        `}
                        onClick={() => navigate('/bac-si')}
                    >
                        {t('homePage.xt')}
                    </Button>
                </div>
            </div>

            <div className='px-10'>
                <Carousel
                    opts={{
                        align: 'start',
                        slidesToScroll: 1,
                        loop: true
                    }}
                    className='w-full'
                >
                    <CarouselContent>
                        {doctors.map((doctor, index) => (
                            <CarouselItem
                                key={index}
                                className='md:basis-1/2 lg:basis-1/5 pl-4'
                            >
                                <div className='h-full'>
                                    <Card
                                        className={`
                                            h-full rounded-none shadow-none
                                            ${
                                                isDark
                                                    ? 'border-blue-300 bg-gray-800 text-white'
                                                    : 'border-blue-500 bg-white text-black'
                                            }
                                        `}
                                    >
                                        <CardContent className='flex flex-col items-center justify-center p-4 text-center h-full'>
                                            <div className='mb-4 overflow-hidden w-50 h-50'>
                                                <img
                                                    src={
                                                        BACKEND_URL +
                                                            doctor?.image ||
                                                        'No data'
                                                    }
                                                    alt={
                                                        doctor?.user?.name ||
                                                        'No data'
                                                    }
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                            <div className='space-y-3 pb-5'>
                                                <h3
                                                    className={
                                                        isDark
                                                            ? 'font-bold text-lg pt-10 text-blue-300'
                                                            : 'font-bold text-lg pt-10'
                                                    }
                                                >
                                                    {doctor?.user?.name ||
                                                        'No data'}
                                                </h3>
                                                <p
                                                    className={
                                                        isDark
                                                            ? 'text-sm text-gray-300'
                                                            : 'text-sm text-gray-500'
                                                    }
                                                >
                                                    {doctor?.degree ||
                                                        'No data'}
                                                </p>
                                                <p
                                                    className={
                                                        isDark
                                                            ? 'text-sm text-blue-300 font-medium'
                                                            : 'text-sm text-blue-600 font-medium'
                                                    }
                                                >
                                                    {doctor?.specialty?.name ||
                                                        'No data'}
                                                </p>
                                            </div>

                                            <div
                                                className={
                                                    isDark
                                                        ? 'flex justify-between pt-5 space-x-7 border-t border-gray-600'
                                                        : 'flex justify-between pt-5 space-x-7 border-t border-gray-300'
                                                }
                                            >
                                                <div className='flex justify-center items-center'>
                                                    <span
                                                        className={
                                                            isDark ? '' : ''
                                                        }
                                                    >
                                                        {new Intl.NumberFormat(
                                                            'vi-VN'
                                                        ).format(
                                                            Number(
                                                                doctor?.price
                                                            ) || 0
                                                        ) + 'đ'}
                                                    </span>
                                                </div>
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
                                                    {t('homePage.xct')}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious
                        className={`
                            -left-10 lg:-left-9 rounded-none transition-colors cursor-pointer
                            ${
                                isDark
                                    ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                    : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                            }
                        `}
                    />

                    <CarouselNext
                        className={`
                            -right-10 lg:-right-9 rounded-none transition-colors cursor-pointer
                            ${
                                isDark
                                    ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                    : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                            }
                        `}
                    />
                </Carousel>
            </div>
        </div>
    );
}
