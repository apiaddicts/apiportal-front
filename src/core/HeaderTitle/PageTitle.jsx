import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './PageTitle.module.scss';

import getListItems from '../const'; // Asegúrate de que la ruta sea correcta

// 👇 Importante: Asegúrate de que este mismo array esté sincronizado con tu SidebarDrawer


const PageTitle = () => {
    const location = useLocation();
    const { t } = useTranslation();

    // Busca coincidencia exacta o parcial si tienes subrutas
    const listItems = getListItems(t);
    const matchedItem = listItems.find(item => location.pathname.startsWith(item.route));
    const title = matchedItem ? matchedItem.text : 'Live API Docs';

    return <span className={styles.pageTitle}>{title}</span>;
};

export default PageTitle;
