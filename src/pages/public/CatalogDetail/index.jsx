import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import _ from 'underscore';
import { useTranslation } from 'react-i18next';
import config from '../../../services/config';

import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getcatalog, getcatalogs, getCatalogContent } from '../../../redux/actions/catalogAction';
import { getBlogs } from '../../../redux/actions/blogAction';
import PoliciesSection from '../../../components/Catalog/PoliciesSection';
import ContractsSection from '../../../components/Catalog/ContractsSection';
import SectionParticipant from '../../../components/Catalog/ParticipantSection';
import SectionDataresource from '../../../components/Catalog/DataresourceSection';
import SectionSoftware from '../../../components/Catalog/SoftwareresourceSection';
import SectionInfrastructure from '../../../components/Catalog/InfrastructureresourceSection';
import SectionContractDefinition from '../../../components/Catalog/ContractDefinitionSection';
import OverviewServiceOffering from '../../../components/Catalog/Overview';
import BuyButton from '../../../components/CatalogDetail/BuyButton';
import classes from './catalog-view.module.scss';

function extractOfferFromCatalog(catalog) {
  if (!catalog) return { priceCents: null, currency: 'EUR', bundleId: null };
  try {
    const assets = typeof catalog.assets === 'string' ? JSON.parse(catalog.assets) : catalog.assets;
    const first = Array.isArray(assets) ? assets[0] : Array.isArray(assets?.assets) ? assets.assets[0] : assets;
    const offers = first?.['schema:offers'] || first?.properties?.['schema:offers'] || {};
    const amount = offers['schema:price'] || offers.price;
    const currency = offers['schema:priceCurrency'] || offers.priceCurrency || 'EUR';
    const bundleId = offers['https://w3id.org/dataspace-billing/v0.1/ns/bundleId'] || offers.bundleId || null;
    return { priceCents: amount ? Math.round(Number(amount) * 100) : null, currency, bundleId };
  } catch { return { priceCents: null, currency: 'EUR', bundleId: null }; }
}

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
  const [gaiaXData, setGaiaXData] = useState(null);
  const [gaiaXLoading, setGaiaXLoading] = useState(false);

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

  useEffect(() => {
    if (section !== 'participants' || !params?.id) return;
    setGaiaXData(null);
    setGaiaXLoading(true);
    fetch(`${config.apiUrl}/gaia-x/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: catalog?.slug }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setGaiaXData(data))
      .catch(() => setGaiaXData({ _error: true }))
      .finally(() => setGaiaXLoading(false));
  }, [section, params?.id]);

  const safeParse = (str, fallback = {}) => {
    try { return JSON.parse(str) || fallback; } catch { return fallback; }
  };

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
              <h2 className={classes.sidebar_title}>
                {t("Catalogs.detTitle")}
              </h2>
              <div data-testid="buy-button" className={classes.buy_button_slot}>
                <BuyButton
                  catalogId={catalog?.documentId}
                  priceCents={extractOfferFromCatalog(catalog).priceCents}
                  currency={extractOfferFromCatalog(catalog).currency}
                  bundleId={extractOfferFromCatalog(catalog).bundleId}
                />
              </div>
              <nav className={classes.sidebar_nav}>
                <button
                  className={section === "assets" ? classes.sidebar_nav__selected : ""}
                  onClick={() => handleClick("assets")}
                >
                  {t("Catalogs.detAssets")}
                </button>
                <button
                  className={section === "policies" ? classes.sidebar_nav__selected : ""}
                  onClick={() => handleClick("policies")}
                >
                  {t("Catalogs.detPolicies")}
                </button>
                <button
                  className={section === "contracts" ? classes.sidebar_nav__selected : ""}
                  onClick={() => handleClick("contracts")}
                >
                  {t("Catalogs.detContracts")}
                </button>
              </nav>
              <hr/>
              <nav className={classes.sidebar_nav}>
                <button
                  className={section === "participants" ? classes.sidebar_nav__selected : ""}
                  onClick={() => handleClick("participants")}
                >
                  {t("Catalogs.detParticipant")}
                </button>
                <button
                  className={section === "contractdefinition" ? classes.sidebar_nav__selected : ""}
                  onClick={() => handleClick("contractdefinition")}
                >
                  {t("Catalogs.detContractDefinition")}
                </button>
              </nav>
            </aside>

            <main className={classes.catalog_content}>
              {section === "assets" && <OverviewServiceOffering serviceOffering={safeParse(catalog?.assets)} />}
              {section === "policies" && <PoliciesSection policies={safeParse(catalog?.policies)} />}
              {section === "contracts" && <ContractsSection contract={safeParse(catalog?.contractDefinition)} />}
              {section === "participants" && <SectionParticipant participant={safeParse(catalog?.participants)} gaiaXData={gaiaXData} gaiaXLoading={gaiaXLoading} />}
              {section === "dataresources" && <SectionDataresource dataResource={safeParse(catalog?.dataSource)} />}
              {section === "softwareresource" && <SectionSoftware software={safeParse(catalog?.softwareResource)} />}
              {section === "infrastructureresource" && <SectionInfrastructure infrastructure={safeParse(catalog?.infrastructureResource)} />}
              {section === "contractdefinition" && <SectionContractDefinition contract={safeParse(catalog?.contractDefinitionOperations)} />}
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
