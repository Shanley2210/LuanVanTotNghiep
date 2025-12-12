import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useTranslation } from 'react-i18next';
import { MdHistory, MdOutlineDashboard } from 'react-icons/md';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function ReceptionistSideBar() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const currentKey = location.pathname.replace('/receptionist/', '');

    const items = [
        {
            key: 'dailyboard',
            icon: <MdOutlineDashboard className='w-5 h-5' />,
            label: t('receptionistSideBar.dailt')
        },
        {
            key: 'new-appointments',
            icon: <RiCalendarScheduleLine className='w-5 h-5' />,
            label: t('receptionistSideBar.neap')
        },
        {
            key: 'history-appointments',
            icon: <MdHistory className='w-5 h-5' />,
            label: t('receptionistSideBar.lisu')
        },
        {
            key: 'create-appointments',
            icon: <MdHistory className='w-5 h-5' />,
            label: t('receptionistSideBar.crea')
        }
    ];

    const handleNavigate = (e: any) => {
        navigate(`/receptionist/${e.key}`);
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
