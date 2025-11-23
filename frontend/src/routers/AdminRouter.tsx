import AdminLayout from '@/internal/layout/AdminLayout';
import Appointment from '@/internal/pages/Appointment';
import DashBoard from '@/internal/pages/DashBoard';
import Specialty from '@/internal/pages/Specialty';
import { Route, Routes } from 'react-router-dom';
import AdminProtectedRoute from './AdminProtectedRoute';
import Service from '@/internal/pages/Service';
import DoctorManage from '@/internal/pages/DoctorManage';
import PatientManage from '@/internal/pages/PatientManage';

export default function AdminRouter() {
    return (
        <Routes>
            <Route element={<AdminProtectedRoute />}>
                <Route path='/' element={<AdminLayout />}>
                    <Route path='dashboard' element={<DashBoard />} />
                    <Route path='appointments' element={<Appointment />} />
                    <Route path='specialties' element={<Specialty />} />
                    <Route path='services' element={<Service />} />
                    <Route path='doctors' element={<DoctorManage />} />
                    <Route path='patients' element={<PatientManage />} />
                </Route>
            </Route>
        </Routes>
    );
}
