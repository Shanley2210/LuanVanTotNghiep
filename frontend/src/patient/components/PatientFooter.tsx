import { ThemeContext } from '@/shared/contexts/ThemeContext';
import Logo from '@shared/images/Logo.png';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhone,
    FaYoutube
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function PatientFooter() {
    const { t } = useTranslation();
    const { isDark } = useContext(ThemeContext);

    return (
        <footer
            className={`pt-10 pb-6 border-t ${
                isDark
                    ? 'bg-gray-900 text-white border-gray-800'
                    : 'bg-gray-50 text-gray-800 border-gray-200'
            }`}
        >
            <div className='px-4 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-8'>
                {/* Cột 1: Logo và giới thiệu ngắn */}
                <div className='flex flex-col gap-4'>
                    <img src={Logo} alt='Logo' className='w-40' />
                    <p
                        className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        {t('homePage.fdes')}
                    </p>
                    <div className='flex gap-4 mt-2'>
                        <a
                            href='#'
                            className='hover:opacity-80 transition-opacity'
                        >
                            <FaFacebook className='text-2xl text-blue-600' />
                        </a>
                        <a
                            href='#'
                            className='hover:opacity-80 transition-opacity'
                        >
                            <FaInstagram className='text-2xl text-pink-600' />
                        </a>
                        <a
                            href='#'
                            className='hover:opacity-80 transition-opacity'
                        >
                            <FaYoutube className='text-2xl text-red-600' />
                        </a>
                    </div>
                </div>

                {/* Cột 2: Liên kết nhanh (Sử dụng lại key từ Header) */}
                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-lg uppercase'>
                        {t('homePage.lkn')}
                    </h3>
                    <ul className='flex flex-col gap-2 text-sm'>
                        <li>
                            <Link
                                to='/specialist'
                                className='hover:text-blue-500 transition-colors'
                            >
                                {t('homePage.sp')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/services'
                                className='hover:text-blue-500 transition-colors'
                            >
                                {t('homePage.sv')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/doctors'
                                className='hover:text-blue-500 transition-colors'
                            >
                                {t('homePage.dt')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/appointment'
                                className='hover:text-blue-500 transition-colors'
                            >
                                {t('homePage.ap')}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Cột 3: Dịch vụ (Ví dụ placeholder) */}
                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-lg uppercase'>
                        {t('homePage.spo')}
                    </h3>
                    <ul className='flex flex-col gap-2 text-sm'>
                        <li>
                            <Link
                                to='/faq'
                                className='hover:text-blue-500 transition-colors'
                            >
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/policy'
                                className='hover:text-blue-500 transition-colors'
                            >
                                {t('homePage.csbm')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/terms'
                                className='hover:text-blue-500 transition-colors'
                            >
                                {t('homePage.dksd')}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Cột 4: Thông tin liên hệ */}
                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-lg uppercase'>
                        {t('homePage.lhe')}
                    </h3>
                    <div className='flex flex-col gap-3 text-sm'>
                        <div className='flex items-center gap-3'>
                            <FaMapMarkerAlt className='text-blue-500 shrink-0' />
                            <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaEnvelope className='text-blue-500 shrink-0' />
                            <a
                                href='mailto:infoemail@gmail.com'
                                className='hover:text-blue-500'
                            >
                                infoemail@gmail.com
                            </a>
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaPhone className='text-blue-500 shrink-0' />
                            <a
                                href='tel:0326780822555'
                                className='hover:text-blue-500'
                            >
                                0326780822555
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div
                className={`mt-10 py-4 text-center text-sm border-t ${
                    isDark
                        ? 'border-gray-800 bg-black/20'
                        : 'border-gray-200 bg-gray-100'
                }`}
            >
                <p>
                    &copy; {new Date().getFullYear()} Shanley. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
