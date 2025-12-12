import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useTranslation } from 'react-i18next';
import { MdOutlineDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function DoctorSideBar() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const currentKey = location.pathname.replace('/doctor/', '');

    const items = [
        {
            key: 'dailyboard',
            icon: <MdOutlineDashboard className='w-5 h-5' />,
            label: t('doctorSideBar.dailt')
        }
    ];

    const handleNavigate = (e: any) => {
        navigate(`/doctor/${e.key}`);
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
