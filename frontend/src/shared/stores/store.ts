import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import specialtiesReducer from './specialtySlice';
import servicesReducer from './serviceSlice';
import doctorsReducer from './doctorSlice';
import scheduleReducer from './ScheduleSlice';
import patientReducer from './patientSlice';
import receptionistReduer from './receptionistSlice';
import appointmentReducer from './appointmentSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        specialties: specialtiesReducer,
        services: servicesReducer,
        doctors: doctorsReducer,
        schedules: scheduleReducer,
        patients: patientReducer,
        receptionists: receptionistReduer,
        appointments: appointmentReducer,
        search: searchReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
