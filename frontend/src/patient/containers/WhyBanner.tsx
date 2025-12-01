import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { RiVoiceprintLine } from 'react-icons/ri';
import { TbLockAccess } from 'react-icons/tb';

export default function WhyBanner() {
    const { isDark } = useContext(ThemeContext);
    const { t } = useTranslation();

    return (
        <div
            className={`
                p-4 lg:p-20 flex flex-col items-center w-screen
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}
            `}
        >
            <h1
                className={`
                    rounded-none px-3 py-1
                    ${
                        isDark
                            ? 'bg-blue-400 text-black'
                            : 'bg-blue-500 text-white'
                    }
                `}
            >
                {t('homePage.wb')}
            </h1>
            <h2 className='text-3xl font-bold p-5 text-center'>
                {t('homePage.crc')}
            </h2>
            <div className='flex flex-col lg:flex-row w-full justify-between py-5'>
                <div
                    className={`
                        p-5 border-b lg:border-b-0 lg:border-r
                        ${isDark ? 'border-gray-700' : 'border-gray-300'}
                    `}
                >
                    <div className='flex gap-2 items-center justify-start'>
                        <HiOutlineUserGroup className='text-xl text-orange-500' />
                        <span className='font-semibold'>
                            {t('homePage.fuc')}
                        </span>
                    </div>
                    <p
                        className={
                            isDark
                                ? 'text-justify mt-2 text-gray-300'
                                : 'text-justify mt-2 text-gray-700'
                        }
                    >
                        {t('homePage.sfuc')}
                    </p>
                </div>
                <div
                    className={`
                        p-5 border-b lg:border-b-0 lg:border-r
                        ${isDark ? 'border-gray-700' : 'border-gray-300'}
                    `}
                >
                    <div className='flex gap-2 items-center justify-start'>
                        <RiVoiceprintLine className='text-xl text-purple-500' />
                        <span className='font-semibold'>
                            {t('homePage.pca')}
                        </span>
                    </div>
                    <p
                        className={
                            isDark
                                ? 'text-justify mt-2 text-gray-300'
                                : 'text-justify mt-2 text-gray-700'
                        }
                    >
                        {t('homePage.spca')}
                    </p>
                </div>
                <div
                    className={`
                        p-5 border-b lg:border-b-0 lg:border-r
                        ${isDark ? 'border-gray-700' : 'border-gray-300'}
                    `}
                >
                    <div className='flex gap-2 items-center justify-start'>
                        <TbLockAccess className='text-xl text-cyan-700' />
                        <span className='font-semibold'>
                            {t('homePage.ca')}
                        </span>
                    </div>
                    <p
                        className={
                            isDark
                                ? 'text-justify mt-2 text-gray-300'
                                : 'text-justify mt-2 text-gray-700'
                        }
                    >
                        {t('homePage.sca')}
                    </p>
                </div>
            </div>
        </div>
    );
}
