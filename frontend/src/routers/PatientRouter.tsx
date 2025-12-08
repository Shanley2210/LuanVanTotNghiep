import { Outlet, Route, Routes } from 'react-router-dom';
import Register from '@/patient/pages/Register';
import ForgotPassword from '@/patient/pages/ForgotPassword';
import VerifyEmail from '@/patient/pages/VerifyEmail';
import ResetPassword from '@/patient/pages/ResetPassword';
import HomePage from '@/patient/pages/HomePage';
import PatientLayout from '@/patient/layout/PatientLayout';
import DoctorDetail from '@/patient/pages/DoctorDetail';
import Profile from '@/patient/pages/Profile';
import CreateEditProfile from '@/patient/pages/CreateEditProfile';
import BookingAppointment from '@/patient/pages/BookingAppointment';

export default function PatientRouter() {
    return (
        <Routes>
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='verify-email' element={<VerifyEmail />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route
                element={
                    <PatientLayout>
                        <Outlet />
                    </PatientLayout>
                }
            >
                <Route index element={<HomePage />} />
                <Route path='bac-si/:slug/:id' element={<DoctorDetail />} />
                <Route path='/profile' element={<Profile />} />
                <Route
                    path='/profile/create-profile'
                    element={<CreateEditProfile />}
                />
                <Route
                    path='/booking-appointment'
                    element={<BookingAppointment />}
                />
            </Route>
        </Routes>
    );
}
