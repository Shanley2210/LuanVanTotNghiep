import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { CarryOutOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

export default function AdminSideBar() {
    const navigate = useNavigate();
    const { isDark } = useContext(ThemeContext);

    const items = [
        {
            key: 'dashboard',
            icon: <HomeOutlined />,
            label: 'DashBoard'
        },
        {
            key: 'appointments',
            icon: <CarryOutOutlined />,
            label: 'Appointments'
        }
    ];

    const handleNavigate = (e: any) => {
        navigate(`/admin/${e.key}`);
    };

    return (
        <Sider trigger={null} collapsible className='h-screen'>
            <div className='text-2xl text-center font-bold text-blue-700 py-5'>
                ADMIN PANEL
            </div>

            <Menu
                theme={isDark ? 'dark' : 'light'}
                mode='inline'
                defaultSelectedKeys={['1']}
                items={items}
                onClick={handleNavigate}
            />
        </Sider>
    );
}
