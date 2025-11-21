import AdminLayout from '@/internal/layout/AdminLayout';
import Appointment from '@/internal/pages/Appointment';
import DashBoard from '@/internal/pages/DashBoard';
import Specialty from '@/internal/pages/Specialty';
import { Route, Routes } from 'react-router-dom';
import AdminProtectedRoute from './AdminProtectedRoute';
import Service from '@/internal/pages/Service';

export default function AdminRouter() {
    return (
        <Routes>
            <Route element={<AdminProtectedRoute />}>
                <Route path='/' element={<AdminLayout />}>
                    <Route path='dashboard' element={<DashBoard />} />
                    <Route path='appointments' element={<Appointment />} />
                    <Route path='specialties' element={<Specialty />} />
                    <Route path='services' element={<Service />} />
                </Route>
            </Route>
        </Routes>
    );
}
