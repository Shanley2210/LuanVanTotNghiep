import AdminLayout from '@/internal/layout/AdminLayout';
import Appointment from '@/internal/pages/Appointment';
import DashBoard from '@/internal/pages/DashBoard';
import { Route, Routes } from 'react-router-dom';

export default function AdminRouter() {
    return (
        <Routes>
            <Route path='/' element={<AdminLayout />}>
                <Route path='dashboard' element={<DashBoard />} />
                <Route path='appointments' element={<Appointment />} />
            </Route>
        </Routes>
    );
}
