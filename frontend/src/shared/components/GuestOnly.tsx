import { useAppSelector } from '../stores/hooks';
import { selectAuth } from '../stores/authSlice';
import { Navigate } from 'react-router-dom';

export default function GuestOnly({ children }: { children: JSX.Element }) {
    const { isAuthenticated, user } = useAppSelector(selectAuth);

    if (isAuthenticated && user) {
        switch (user.role) {
            case 1:
            case 2:
                return <Navigate to='/admin/dashboard' replace />;
            case 3:
                return <Navigate to='/' replace />;
            case 4:
                return <Navigate to='/doctor/dailyboard' replace />;
            case 5:
                return <Navigate to='/receptionist/dailyboard' replace />;
            default:
                return <Navigate to='/' replace />;
        }
    }

    return children;
}
