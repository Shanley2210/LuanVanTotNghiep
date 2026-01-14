import { Route, Routes } from 'react-router-dom';
import DoctorProtectedRoute from './DoctorProtectedRoute';
import DoctorLayout from '@/internal/layout/DoctorLayout';
import DoctorDailyBoard from '@/internal/pages/DoctorDailyBoard';
import WorkSchedule from '@/internal/pages/WorkSchedule';
import DoctorExam from '@/internal/pages/DoctorExam';
import DoctorHistoryAppointment from '@/internal/pages/DoctorHistoryAppointment';

export default function DoctorRouter() {
  return (
    <div>
      <Routes>
        <Route element={<DoctorProtectedRoute />}>
          <Route path='/' element={<DoctorLayout />}>
            <Route path='dailyboard' element={<DoctorDailyBoard />} />
            <Route path='schedule' element={<WorkSchedule />} />
            <Route path='/exam/:id' element={<DoctorExam />} />
            <Route
              path='history-appointments'
              element={<DoctorHistoryAppointment />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
