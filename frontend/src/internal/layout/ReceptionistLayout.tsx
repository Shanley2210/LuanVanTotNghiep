import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import ReceptionistSideBar from '../components/ReceptionistSideBar';
import AdminHeader from '../components/AdminHeader';


export default function ReceptionistLayout() {
    return (
        <Layout className='min-h-screen select-none'>
            <ReceptionistSideBar />

            <Layout>
                <AdminHeader />
                <Content className='ml-[200px] mt-16'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
