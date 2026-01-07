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
import DoctorService from '@/patient/pages/DoctorService';
import PatientAppointment from '@/patient/pages/PatientAppointment';
import BookingService from '@/patient/pages/BookingService';
import ChangePassword from '@/patient/pages/ChangePassword';
import AllDoctor from '@/patient/pages/AllDoctor';
import AllSpecialty from '@/patient/pages/AllSpecialty';
import AllService from '@/patient/pages/AllService';
import DoctorSpecialty from '@/patient/pages/DoctorSpecialty';
import PaymentReturn from '@/patient/pages/PaymentReturn';
import MedicalRecord from '@/patient/pages/MedicalRecord';

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
                <Route path='/dich-vu/:slug/:id' element={<DoctorService />} />
                <Route
                    path='/chuyen-khoa/:slug/:id'
                    element={<DoctorSpecialty />}
                />
                <Route path='/booking-service' element={<BookingService />} />
                <Route
                    path='/patient/my-appointment'
                    element={<PatientAppointment />}
                />
                <Route
                    path='/patient/change-password'
                    element={<ChangePassword />}
                />
                <Route path='/bac-si' element={<AllDoctor />} />
                <Route path='/chuyen-khoa' element={<AllSpecialty />} />
                <Route path='/dich-vu' element={<AllService />} />
                <Route path='/payment-return' element={<PaymentReturn />} />
                <Route path='/medical-record/:id' element={<MedicalRecord />} />
            </Route>
        </Routes>
    );
}
