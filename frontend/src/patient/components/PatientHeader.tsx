import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiDark, CiLight } from 'react-icons/ci';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import {
    RiArrowDownSLine,
    RiCloseLine,
    RiMenuUnfoldLine
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Logo from '@shared/images/Logo.png';

export default function PatientHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const langUI: any = {
        en: (
            <div className='flex items-center gap-1'>
                <img
                    src='https://cdn-icons-png.flaticon.com/512/197/197374.png'
                    className='w-5 h-5'
                />
                <span>English</span>
                <RiArrowDownSLine />
            </div>
        ),
        vi: (
            <div className='flex items-center gap-1'>
                <img
                    src='https://cdn-icons-png.flaticon.com/512/197/197473.png'
                    className='w-5 h-5'
                />
                <span>Tiếng Việt</span>
                <RiArrowDownSLine />
            </div>
        )
    };

    return (
        <header
            className={`flex flex-col sticky top-0 z-50 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
            }`}
        >
            <div
                className={`px-4 md:px-20 hidden md:flex justify-between pt-2 text-sm ${
                    isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
                }`}
            >
                <div className='flex gap-5'>
                    <div>infoemail@gmail.com</div>
                    <div className='border-r border-gray-400' />
                    <div>0326780822555</div>
                </div>
                <div className='flex items-center gap-5 '>
                    <div className='flex items-center'>
                        <button
                            className='text-lg cursor-pointer text-blue-500 '
                            onClick={toggleTheme}
                        >
                            {isDark ? (
                                <CiDark className='text-xl cursor-pointer text-blue-800 hover:text-blue-600 transition-colors' />
                            ) : (
                                <CiLight className='text-xl cursor-pointer text-blue-600 hover:text-blue-800 transition-colors' />
                            )}
                        </button>
                    </div>
                    <div className='flex items-center w-27'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='outline-none cursor-pointer'>
                                {langUI[i18n.language] || langUI['en']}
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align='center'
                                className='bg-white border-none'
                            >
                                <DropdownMenuItem>
                                    <div
                                        className='flex items-center gap-2 cursor-pointer'
                                        onClick={() => changeLanguage('en')}
                                    >
                                        <img
                                            src='https://cdn-icons-png.flaticon.com/512/197/197374.png'
                                            className='w-5 h-5'
                                        />
                                        <span>English</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <div
                                        className='flex items-center gap-2 cursor-pointer'
                                        onClick={() => changeLanguage('vi')}
                                    >
                                        <img
                                            src='https://cdn-icons-png.flaticon.com/512/197/197473.png'
                                            className='w-5 h-5'
                                        />
                                        <span>Tiếng Việt</span>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <FaFacebook className='text-xl text-blue-600' />
                    </div>
                    <div>
                        <FaInstagram className='text-xl text-pink-600' />
                    </div>
                    <div>
                        <FaYoutube className='text-xl text-red-600' />
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center py-3 px-4 md:px-20'>
                <div className='md:hidden flex items-center z-50'>
                    <button
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className='p-1'
                    >
                        {isMenuOpen ? (
                            <RiCloseLine className='text-3xl text-blue-600' />
                        ) : (
                            <RiMenuUnfoldLine className='text-3xl text-blue-600 cursor-pointer' />
                        )}
                    </button>
                </div>
                <div
                    className='hidden md:block w-40 cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    <img src={Logo} alt='Logo' />
                </div>

                <div className='md:hidden w-full flex justify-center absolute left-1/2 transform -translate-x-1/2'>
                    <img
                        className='h-12 cursor-pointer'
                        onClick={() => navigate('/')}
                        src={Logo}
                        alt='Logo'
                    />
                </div>
                <div className='hidden md:flex gap-3 items-center'>
                    <div className='flex gap-10 mr-10 items-center'>
                        <div className='flex flex-col cursor-pointer'>
                            <span className='font-bold'>
                                {t('homePage.sp')}
                            </span>
                            <span className='text-sm'>
                                {t('homePage.subSp')}
                            </span>
                        </div>
                        <div className='flex flex-col cursor-pointer'>
                            <span className='font-bold'>
                                {t('homePage.sv')}
                            </span>
                            <span className='text-sm'>
                                {t('homePage.subSv')}
                            </span>
                        </div>
                        <div className='flex flex-col cursor-pointer'>
                            <span className='font-bold'>
                                {t('homePage.dt')}
                            </span>
                            <span className='text-sm'>
                                {t('homePage.subDt')}
                            </span>
                        </div>
                        <div>{t('homePage.ap')}</div>
                    </div>

                    <Button
                        className='rounded-none p-3 cursor-pointer w-30 text-white font-bold bg-linear-to-r from-blue-500 to-blue-300 hover:brightness-110 active:brightness-90'
                        onClick={() => navigate('/login')}
                    >
                        <MdLogin /> {t('homePage.lg')}
                    </Button>
                </div>
            </div>

            <div
                className={`fixed top-0 left-0 h-screen ${
                    isDark ? 'bg-gray-900 text-white' : 'bg-sky-800 text-white'
                } w-64 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className='pt-16 flex bg-white flex-col border-none '>
                    <div className='absolute top-0 left-4'>
                        <Button className='rounded-none p-3 w-20 h-8 cursor-pointer text-white font-bold bg-linear-to-r from-blue-500 to-blue-300 hover:brightness-110 active:brightness-90 mt-4 mr-2'>
                            {t('homePage.lg')}
                        </Button>
                    </div>
                    <div className='absolute top-6 right-4'>
                        <button onClick={toggleMenu} aria-label='Close menu'>
                            <RiCloseLine className='text-xl cursor-pointer text-black' />
                        </button>
                    </div>

                    <div className={`${isDark ? 'bg-gray-900' : 'bg-sky-800'}`}>
                        <div className='py-3 px-6 cursor-pointer'>
                            {t('homePage.ap')}
                        </div>
                        <div className='py-3 px-6 cursor-pointer'>
                            {t('homePage.dt')}
                        </div>
                        <div className='py-3 px-6 cursor-pointer'>
                            {t('homePage.sp')}
                        </div>
                        <div className='py-3 px-6 cursor-pointer'>
                            {t('homePage.sv')}
                        </div>
                    </div>

                    <div
                        className={`p-6 absolute bottom-0 text-sm flex flex-col gap-2 ${
                            isDark
                                ? 'bg-gray-900 text-white'
                                : 'bg-sky-800 text-white'
                        }`}
                    >
                        <div className='flex justify-between mt-2'>
                            <div className='flex items-center gap-5 '>
                                <div className='flex items-center'>
                                    <button
                                        className='text-lg cursor-pointer text-blue-500 '
                                        onClick={toggleTheme}
                                    >
                                        {isDark ? (
                                            <CiDark className='text-xl text-white cursor-pointer hover:text-amber-100 transition-colors' />
                                        ) : (
                                            <CiLight className='text-xl text-white cursor-pointer  hover:text-amber-100 transition-colors' />
                                        )}
                                    </button>
                                </div>
                                <div className='flex items-center w-27'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='outline-none cursor-pointer'>
                                            {langUI[i18n.language] ||
                                                langUI['en']}
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent
                                            align='center'
                                            className='bg-white border-none'
                                        >
                                            <DropdownMenuItem>
                                                <div
                                                    className='flex items-center gap-2 cursor-pointer'
                                                    onClick={() =>
                                                        changeLanguage('en')
                                                    }
                                                >
                                                    <img
                                                        src='https://cdn-icons-png.flaticon.com/512/197/197374.png'
                                                        className='w-5 h-5'
                                                    />
                                                    <span>English</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div
                                                    className='flex items-center gap-2 cursor-pointer'
                                                    onClick={() =>
                                                        changeLanguage('vi')
                                                    }
                                                >
                                                    <img
                                                        src='https://cdn-icons-png.flaticon.com/512/197/197473.png'
                                                        className='w-5 h-5'
                                                    />
                                                    <span>Tiếng Việt</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='mt-5'>infoemail@gmail.com</div>
                            <div>0326780822555</div>
                        </div>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className='fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40 md:hidden'
                    onClick={toggleMenu}
                />
            )}
        </header>
    );
}
