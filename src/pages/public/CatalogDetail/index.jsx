import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import _ from 'underscore';
import { useTranslation } from 'react-i18next';

import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getcatalog, getcatalogs, getCatalogContent } from '../../../redux/actions/catalogAction';
import { getBlogs } from '../../../redux/actions/blogAction';
//import classes from './catalog-detail.module.scss';
import AssetsSection from '../../../components/Catalog/AssetsSection';
import PoliciesSection from '../../../components/Catalog/PoliciesSection';
import ContractsSection from '../../../components/Catalog/ContractsSection';
import SectionParticipant from '../../../components/Catalog/ParticipantSection';
import SectionDataresource from '../../../components/Catalog/DataresourceSection';
import classes from './catalog-view.module.scss';

function CatalogDetail({ initialSection }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const params = useParams();
  const { homePage } = useSelector((state) => state.home);
  const { catalogPage, catalog, catalogs } = useSelector((state) => state.catalogs);
  const { blogs } = useSelector((state) => state.blog);

  const [section, setSection] = useState(initialSection);

  useEffect(() => {
    dispatch(getcatalogs());
  }, []);

  useEffect(() => {
    const section = location.pathname.split("/").pop();
    setSection(section);
  }, [location]);

  useEffect(() => {
    if (params?.id) {
      dispatch(getcatalog(params?.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (homePage && Object.keys(homePage).length === 0) {
      dispatch(getHomeContent());
    }

    if (blogs && blogs.length === 0) {
      dispatch(getBlogs());
    }

    if (catalogs && catalogs.length === 0) {
      dispatch(getcatalogs());
    }

  }, []);

  useEffect(() => {
    if (catalogPage && Object.keys(catalogPage).length === 0) {
      dispatch(getCatalogContent());
    }
  }, [catalogPage, dispatch]);

  const handleClick = (section) => {
    setSection(section);
    navigate(`/catalogs/${params?.id}/${section}`);
  };

  return (
    <div id='catalog'>
      { Object.keys(catalog).length > 0 ? (
        <>
          <div className={classes.catalog_layout}>
            <aside className={classes.catalog_sidebar}>
              <h2 className={classes.sidebar_title}>{t("Catalogs.detTitle")}</h2>
              <nav className={classes.sidebar_nav}>
                <button
                  className={section === "assets" ? classes.sidebar_nav__button__active : ""}
                  onClick={() => handleClick("assets")}
                >
                  {t("Catalogs.detAssets")}
                </button>
                <button
                  className={section === "policies" ? classes.sidebar_nav__button__active : ""}
                  onClick={() => handleClick("policies")}
                >
                  {t("Catalogs.detPolicies")}
                </button>
                <button
                  className={section === "contracts" ? classes.sidebar_nav__button__active : ""}
                  onClick={() => handleClick("contracts")}
                >
                  {t("Catalogs.detContracts")}
                </button>
              </nav>
              <hr/>
              <nav className={classes.sidebar_nav}>
                <button
                  className={section === "participants" ? classes.sidebar_nav__button__active : ""}
                  onClick={() => handleClick("participants")}
                >
                  Participants
                </button>
                <button
                  className={section === "dataresources" ? classes.sidebar_nav__button__active : ""}
                  onClick={() => handleClick("dataresources")}
                >
                  Data Resource
                </button>
              </nav>
            </aside>

            <main className={classes.catalog_content}>
              {section === "assets" && <AssetsSection serviceOffering={JSON.parse(catalog?.services || '{}')} />}
              {section === "policies" && <PoliciesSection policies={JSON.parse(catalog?.policies || '{}')} />}
              {section === "contracts" && <ContractsSection contract={JSON.parse(catalog?.contracstDefinition || '{}')} />}
              {section === "participants" && <SectionParticipant participant={JSON.parse(catalog?.participants || '{}')} />}
              {section === "dataresources" && <SectionDataresource dataResource={JSON.parse(catalog?.dataSource || '{}')} />}
            </main>
          </div>
          {/*<div id='contact' />*/}
        </>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
};

export default CatalogDetail;
