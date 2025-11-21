import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import specialtiesReducer from './specialtySlice';
import servicesReducer from './serviceSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        specialties: specialtiesReducer,
        services: servicesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
