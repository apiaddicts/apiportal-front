// src/config/routesConfig.js
import Terminal from '@mui/icons-material/Terminal';
import CustomIcon from '../components/MdIcon/CustomIcon';
import { useLocation } from 'react-router-dom';

const getListItems = (t) => {
    const location = useLocation();

    return [
        { key: 'dashboard', route: '/developer/dashboard', text: t('dashboard'), icon: <CustomIcon name={'dashboard'} isActive={location.pathname === '/developer/dashboard'} />, primaryRole: true },
        { key: 'apiToken', route: '/developer/api-token', text: t('apiToken'), icon: <CustomIcon name={'apitoken'} isActive={location.pathname === '/developer/api-token'} />, primaryRole: true },
        { key: 'apisLibrary', route: '/developer/apis', text: t('apisLibrary'), icon: <CustomIcon name={'apitoken'} isActive={location.pathname === '/developer/apis'} />, primaryRole: true },
        { key: 'codeSamples', route: '/developer/code-samples', text: t('codeSamples'), icon: <Terminal size='1.5rem' />, primaryRole: true },
        { key: 'billings', route: '/developer/billings', text: t('billings'), icon: <CustomIcon name={'billing'} isActive={location.pathname === '/developer/billings'} />, primaryRole: true },
        { key: 'news', route: '/developer/news', text: t('news'), icon: <CustomIcon name={'news'} isActive={location.pathname === '/developer/news'} />, primaryRole: true },
        { key: 'blog', route: '/developer/blog', text: t('blog'), icon: <CustomIcon name={'blog'} isActive={location.pathname === '/developer/blog'} />, primaryRole: true },
        { key: 'faqs', route: '/developer/faqs', text: t('faqs'), icon: <CustomIcon name={'faqs'} isActive={location.pathname === '/developer/faqs'} />, primaryRole: true },
        { key: 'support', route: '/developer/support', text: t('support'), icon: <CustomIcon name={'support'} isActive={location.pathname === '/developer/support'} />, primaryRole: true },
    ];
};

export default getListItems;

