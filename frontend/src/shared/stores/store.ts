import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import specialtiesReducer from './specialtySlice';
import servicesReducer from './serviceSlice';
import doctorsReducer from './doctorSlice';
import scheduleReducer from './ScheduleSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        specialties: specialtiesReducer,
        services: servicesReducer,
        doctors: doctorsReducer,
        schedules: scheduleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
