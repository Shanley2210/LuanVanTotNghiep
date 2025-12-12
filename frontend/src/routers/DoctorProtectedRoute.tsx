import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/stores/hooks';
import { selectAuth, refreshToken } from '@/shared/stores/authSlice';
import NotFound from '@/shared/pages/NotFound';
import { Outlet } from 'react-router-dom';
import Loading from '@/shared/pages/Loading';

const ALLOWED_ROLES = [4];

export default function DoctorProtectedRoute() {
    const dispatch = useAppDispatch();
    const { accessToken, user, loading } = useAppSelector(selectAuth);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const storedRefreshToken = localStorage.getItem('refreshToken');

            if (!accessToken && storedRefreshToken) {
                try {
                    await dispatch(refreshToken(storedRefreshToken)).unwrap();
                } catch (error) {
                    console.log('Session expired');
                }
            }
            setIsCheckingAuth(false);
        };

        checkAuth();
    }, [accessToken, dispatch]);

    if (loading || isCheckingAuth) {
        return <Loading />;
    }

    const hasAccess = accessToken && user && ALLOWED_ROLES.includes(user.role);

    if (!hasAccess) {
        return <NotFound />;
    }

    return <Outlet />;
}
