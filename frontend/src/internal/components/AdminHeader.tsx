import { Avatar, Dropdown, Layout } from 'antd';
import {
    MoonOutlined,
    NotificationOutlined,
    SunOutlined,
    TranslationOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

const { Header } = Layout;

export default function AdminHeader() {
    const { isDark, toggleTheme } = useContext(ThemeContext);

    const items = [
        {
            key: '1',
            label: 'Profile'
        },
        {
            key: '2',
            label: 'Logout'
        }
    ];

    return (
        <Header className='flex justify-between items-center px-6 shadow-sm'>
            <div />
            <div className='flex items-center gap-10'>
                <button
                    className='text-lg cursor-pointer hover:text-blue-500 transition-colors'
                    onClick={toggleTheme}
                >
                    {isDark ? <SunOutlined /> : <MoonOutlined />}
                </button>

                <Dropdown menu={{ items }} placement='bottomRight'>
                    <TranslationOutlined />
                </Dropdown>

                <Dropdown menu={{ items }} placement='bottomRight'>
                    <NotificationOutlined />
                </Dropdown>

                <Dropdown menu={{ items }} placement='bottomRight'>
                    <Avatar size={'large'} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    );
}
