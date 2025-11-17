import { Route, Routes } from 'react-router-dom';
import Register from '@/patient/pages/Register';
import ForgotPassword from '@/patient/pages/ForgotPassword';
import VerifyEmail from '@/patient/pages/VerifyEmail';
import ResetPassword from '@/patient/pages/ResetPassword';

export default function PatientRouter() {
    return (
        <Routes>
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='verify-email' element={<VerifyEmail />} />
            <Route path='reset-password' element={<ResetPassword />} />
        </Routes>
    );
}
