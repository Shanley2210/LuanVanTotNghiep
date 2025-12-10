import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { fetchServices, selectServices } from '@/shared/stores/serviceSlice';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function SerivceHompage() {
    const { t } = useTranslation();
    const { isDark } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const { list: services } = useAppSelector(selectServices);
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
        dispatch(fetchServices({ page: 1, limit: 10 }));
    }, [dispatch]);

    return (
        <div
            className={`
        flex flex-col w-screen py-5 px-4 lg:px-20
        ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
    `}
        >
            <div className='flex justify-between items-end mb-4'>
                <div className='w-full'>
                    <span className='text-3xl font-bold'>
                        {t('homePage.sv')}
                    </span>
                    <div className='flex justify-between w-full flex-wrap gap-4'>
                        <p className='text-gray-600 max-w-xl mt-1'>
                            {t('homePage.svd')}
                        </p>
                        <Button
                            className={`
                                border rounded-none cursor-pointer
                                ${
                                    isDark
                                        ? 'border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-black'
                                        : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                                }
                            `}
                        >
                            {t('homePage.xt')}
                        </Button>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-6 gap-5'>
                {services.slice(0, 6).map((item, index) => (
                    <div
                        key={index}
                        className={`
                             cursor-pointer p-2 border flex flex-col justify-between
                                ${
                                    isDark
                                        ? 'border-blue-300 bg-gray-800 text-white'
                                        : 'border-blue-500 bg-white text-black'
                                }
                        `}
                        onClick={() =>
                            navigate(
                                `/doctors-by-service/${slugify(item.name)}/${
                                    item.id
                                }`
                            )
                        }
                    >
                        <div>
                            <p
                                className={`
                                py-5 text-center border-b text-xl font-bold
                                ${
                                    isDark
                                        ? 'text-blue-300 border-blue-300'
                                        : 'text-blue-500 border-blue-500'
                                }
                                `}
                            >
                                {item.name}
                            </p>
                            <p className='py-5 text-center'>
                                {item.description}
                            </p>
                        </div>
                        <div className='py-5 text-center flex flex-col gap-2 items-center'>
                            <p>
                                {t('homePage.du')} {item.durationMinutes}{' '}
                                {t('homePage.mi')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
