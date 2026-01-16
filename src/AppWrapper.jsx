import React, { useEffect, useState } from 'react';
import AppRouter from './routers/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/actions/userAction';
import { getSettingPage } from './redux/actions/settingPageAction';

const AppWrapper = () => {
    const dispatch = useDispatch();
    const { settingPage } = useSelector((state) => state.settingPage);
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        dispatch(getSettingPage());
    }, [dispatch]);

    useEffect(() => {
        const raw = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (raw) {
            const parsed = JSON.parse(raw);
            const stillValid = parsed.expiresIn > Date.now();
            if (stillValid) {
                dispatch(getUser(parsed.accessToken, 'Mulesoft'));
            }
        }
    }, [dispatch]);

    const primaryColor = settingPage?.mainColor ?? '#000000';
    const secondaryColor = settingPage?.secondaryColor ?? '#ffffff';
    const typography = settingPage?.typography ?? 'Roboto';

    useEffect(() => {
        if (!settingPage || !primaryColor || !secondaryColor || !typography) return;

        document.body.style.fontFamily = `${typography}, sans-serif`;

        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${typography.replace(/\s+/g, '+')}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        document.documentElement.style.setProperty('--font-family', `${typography}, sans-serif`);
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);

        const hexToRgb = (hex) => {
            const cleanHex = hex.replace('#', '');
            const r = parseInt(cleanHex.slice(0, 2), 16);
            const g = parseInt(cleanHex.slice(2, 4), 16);
            const b = parseInt(cleanHex.slice(4, 6), 16);
            return `${r}, ${g}, ${b}`;
        };

        document.documentElement.style.setProperty('--primary-color-rgb', hexToRgb(primaryColor));
        document.documentElement.style.setProperty('--secondary-color-rgb', hexToRgb(secondaryColor));

        setIsAppReady(true);

        return () => {
            document.head.removeChild(link);
        };
    }, [settingPage, primaryColor, secondaryColor, typography]);

    if (!isAppReady) {
        return <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }} />;
    }

    return <AppRouter isAppReady={isAppReady} />;
};

export default AppWrapper;
