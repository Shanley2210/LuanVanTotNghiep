import { Route, Routes } from 'react-router-dom';
import ReceptionistProtectedRoute from './ReceptionistProtectedRoute';
import ReceptionistLayout from '@/internal/layout/ReceptionistLayout';
import ReceptionistDailyBoard from '@/internal/pages/ReceptionistDailyBoard';
import NewApointment from '@/internal/pages/NewApointment';
import HistoryAppointment from '@/internal/pages/HistoryAppointment';
import CreateAppointment from '@/internal/pages/CreateAppointment';

export default function ReceptionistRoute() {
    return (
        <div>
            <Routes>
                <Route element={<ReceptionistProtectedRoute />}>
                    <Route path='/' element={<ReceptionistLayout />}>
                        <Route
                            path='dailyboard'
                            element={<ReceptionistDailyBoard />}
                        />
                        <Route
                            path='new-appointments'
                            element={<NewApointment />}
                        />
                        <Route
                            path='history-appointments'
                            element={<HistoryAppointment />}
                        />
                        <Route
                            path='create-appointments'
                            element={<CreateAppointment />}
                        />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
