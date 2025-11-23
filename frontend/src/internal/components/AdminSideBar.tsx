import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    MdOutlineDashboard,
    MdOutlineMedicalServices,
    MdOutlineLocalHospital
} from 'react-icons/md';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { FaUserDoctor, FaUserNurse } from 'react-icons/fa6';
import { FaUserInjured } from 'react-icons/fa';

export default function AdminSideBar() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const currentKey = location.pathname.replace('/admin/', '');

    const items = [
        {
            key: 'dashboard',
            icon: <MdOutlineDashboard className='w-5 h-5' />,
            label: t('adminSideBar.db')
        },
        {
            key: 'appointments',
            icon: <RiCalendarScheduleLine className='w-5 h-5' />,
            label: t('adminSideBar.ap')
        },
        {
            key: 'specialties',
            icon: <MdOutlineLocalHospital className='w-5 h-5' />,
            label: t('adminSideBar.sp')
        },
        {
            key: 'services',
            icon: <MdOutlineMedicalServices className='w-5 h-5' />,
            label: t('adminSideBar.sv')
        },
        {
            key: 'doctors',
            icon: <FaUserDoctor className='w-5 h-5' />,
            label: t('adminSideBar.dt')
        },
        {
            key: 'patients',
            icon: <FaUserInjured className='w-5 h-5' />,
            label: t('adminSideBar.pt')
        },
        {
            key: 'receptionists',
            icon: <FaUserNurse className='w-5 h-5' />,
            label: t('adminSideBar.rc')
        }
    ];

    const handleNavigate = (e: any) => {
        navigate(`/admin/${e.key}`);
    };

    return (
        <Sider
            trigger={null}
            collapsible
            className='fixed! top-16! left-0! h-screen overflow-auto'
        >
            <Menu
                mode='inline'
                selectedKeys={[currentKey]}
                items={items}
                onClick={handleNavigate}
            />
        </Sider>
    );
}
