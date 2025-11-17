import { Layout } from 'antd';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <Layout className='min-h-screen select-none'>
            <AdminSideBar />

            <Layout>
                <AdminHeader />
                <Content className='bg-amber-200 p-5'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
