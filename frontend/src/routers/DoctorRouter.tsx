import { Route, Routes } from 'react-router-dom';
import DoctorProtectedRoute from './DoctorProtectedRoute';
import DoctorLayout from '@/internal/layout/DoctorLayout';
import DoctorDailyBoard from '@/internal/pages/DoctorDailyBoard';

export default function DoctorRouter() {
    return (
        <div>
            <Routes>
                <Route element={<DoctorProtectedRoute />}>
                    <Route path='/' element={<DoctorLayout />}>
                        <Route
                            path='dailyboard'
                            element={<DoctorDailyBoard />}
                        />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
