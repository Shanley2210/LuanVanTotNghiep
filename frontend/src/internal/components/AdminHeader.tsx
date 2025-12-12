import { Avatar, Dropdown, Layout } from 'antd';
import { CgProfile } from 'react-icons/cg';
import { CiLight, CiDark } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { BsTranslate } from 'react-icons/bs';
import { useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/stores/hooks';
import { useNavigate } from 'react-router-dom';
import { clientLogout } from '@/shared/stores/authSlice';
import { MdLogout } from 'react-icons/md';
import Logo from '@shared/images/Logo.png';

const { Header } = Layout;

export default function AdminHeader() {
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: 'My Profile'
        },
        {
            key: '2',
            label: 'Setting'
        },
        {
            key: '3',
            label: 'Logout',
            icon: <MdLogout style={{ fontSize: '20px' }} />,
            onClick: () => {
                dispatch(clientLogout());
                navigate('/login', { replace: true });
            },
            danger: true
        }
    ];

    const laguages = [
        {
            key: 'en',
            label: (
                <div className='flex items-center gap-2'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/197/197374.png'
                        className='w-5 h-5'
                    />
                    <span>English</span>
                </div>
            ),
            onClick: () => changeLanguage('en')
        },
        {
            key: 'vi',
            label: (
                <div className='flex items-center gap-2'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/197/197473.png'
                        className='w-5 h-5'
                    />
                    <span>Tiếng Việt</span>
                </div>
            ),
            onClick: () => changeLanguage('vi')
        }
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Header className='flex justify-between items-center bg-white px-6! pr-15! fixed top-0 left-0 w-full z-50 '>
            <div className='w-40'>
                <img src={Logo} alt='Logo' />
            </div>
            <div className='flex items-center gap-10'>
                <button
                    className='text-lg cursor-pointer text-blue-500 '
                    onClick={toggleTheme}
                >
                    {isDark ? (
                        <CiDark className='text-3xl cursor-pointer text-blue-800 hover:text-blue-600 transition-colors' />
                    ) : (
                        <CiLight className='text-3xl cursor-pointer text-blue-600 hover:text-blue-800 transition-colors' />
                    )}
                </button>

                <Dropdown
                    menu={{ items: laguages }}
                    trigger={['click']}
                    placement='bottom'
                >
                    <span>
                        <BsTranslate
                            className={`text-2xl cursor-pointer transition-colors ${
                                isDark
                                    ? 'text-blue-800 hover:text-blue-600'
                                    : 'text-blue-600 hover:text-blue-800'
                            }`}
                        />
                    </span>
                </Dropdown>

                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                    placement='bottom'
                >
                    <span>
                        <IoIosNotificationsOutline
                            className={`text-3xl cursor-pointer transition-colors ${
                                isDark
                                    ? 'text-blue-800 hover:text-blue-600'
                                    : 'text-blue-600 hover:text-blue-800'
                            }`}
                        />
                    </span>
                </Dropdown>

                <Dropdown menu={{ items }} placement='bottom'>
                    <Avatar size={'large'} icon={<CgProfile />} />
                </Dropdown>
            </div>
        </Header>
    );
}
