import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import DoctorSideBar from '../components/DoctorSideBar';

export default function DoctorLayout() {
    return (
        <Layout className='min-h-screen select-none'>
            <DoctorSideBar />

            <Layout>
                <AdminHeader />
                <Content className='ml-[200px] mt-16'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
