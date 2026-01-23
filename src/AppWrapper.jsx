import React, { useEffect, useState } from 'react';
import AppRouter from './routers/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/actions/userAction';
import { getSettingPage } from './redux/actions/settingPageAction';
import config from './services/config';

const colorToRgb = (color) => {
    if (!color) return null;

    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);

    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);

    const match = computed.match(/\d+/g);
    if (!match || match.length < 3) return null;

    const [r, g, b] = match;
    return `${r}, ${g}, ${b}`;
};

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

    const primaryColor = settingPage?.mainColor ?? '#023d4c';
    const secondaryColor = settingPage?.secondaryColor ?? '#ef910d';
    const typography = settingPage?.typography ?? 'Roboto';
    const customCssUrl = settingPage?.customCss?.url;

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

        const basePrimaryRgb = colorToRgb(primaryColor);
        const baseSecondaryRgb = colorToRgb(secondaryColor);

        if (basePrimaryRgb) {
            document.documentElement.style.setProperty('--primary-color-rgb', basePrimaryRgb);
        }

        if (baseSecondaryRgb) {
            document.documentElement.style.setProperty('--secondary-color-rgb', baseSecondaryRgb);
        }

        setIsAppReady(true);

        return () => {
            document.head.removeChild(link);
        };
    }, [settingPage, primaryColor, secondaryColor, typography]);

    useEffect(() => {
        if (!customCssUrl) return;

        const existing = document.getElementById('custom-css');
        if (existing) {
            existing.remove();
        }

        const link = document.createElement('link');
        link.id = 'custom-css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `${customCssUrl}?v=${Date.now()}`;

        document.head.appendChild(link);

        return () => {
            link.remove();
        };
    }, [customCssUrl]);

    useEffect(() => {
        if (!customCssUrl) return;

        const timeout = setTimeout(() => {
            const styles = getComputedStyle(document.documentElement);

            const primary = styles.getPropertyValue('--primary-color')?.trim();
            const secondary = styles.getPropertyValue('--secondary-color')?.trim();

            if (primary) {
                const rgb = colorToRgb(primary);
                if (rgb) {
                    document.documentElement.style.setProperty('--primary-color-rgb', rgb);
                }
            }

            if (secondary) {
                const rgb = colorToRgb(secondary);
                if (rgb) {
                    document.documentElement.style.setProperty('--secondary-color-rgb', rgb);
                }
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [customCssUrl]);

    if (!isAppReady) {
        return <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }} />;
    }

    return <AppRouter isAppReady={isAppReady} />;
};

export default AppWrapper;
