import React, { useEffect, useState } from 'react';
import AppRouter from './routers/AppRouter';
import useThemeColors from './components/SettingPages/SettingPages';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions/userAction';

const AppWrapper = () => {
    const [isAppReady, setIsAppReady] = useState(false);  
    const { typography } = useThemeColors();
    const dispatch = useDispatch();

    useEffect(() => {
        const raw = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (raw) {
            const parsed = JSON.parse(raw);
            const stillValid = parsed.expiresIn > Date.now();
            if (stillValid) {
                dispatch(getUser(parsed.accessToken, 'Mulesoft'));
                setIsAppReady(true);
                return;
            }
        }
        setIsAppReady(true);
    }, []);

    useEffect(() => {
        if (!typography) return;

        document.body.style.fontFamily = `${typography}, sans-serif`;

        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${typography.replace(/\s+/g, '+')}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        document.documentElement.style.setProperty('--typography-font', `${typography}, sans-serif`);

        return () => {
            document.head.removeChild(link);
        };
    }, [typography]);

    return <AppRouter isAppReady={isAppReady} />;
};

export default AppWrapper;
