import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { CatalogCard } from '../Card/CardCatalog';
import Drawer from '../Drawer/DrawerCatalog';
import classes from './catalogs-paginated.module.scss';
import './drawerDetail.scss';
import { useNavigate } from 'react-router-dom';
import checkoutService from '../../services/checkoutService';
import {
  Code,
  Storage,
  SettingsSystemDaydream,
  InsertDriveFileOutlined,
  ChevronRight,
  CheckCircleOutline,
  BlockOutlined,
  OpenInNew,
  Business,
} from '@mui/icons-material';

function isAuthenticated() {
  try {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    return !!(token?.jwt || token?.accessToken);
  } catch { return false; }
}

function useExistingPurchase(catalogDocumentId) {
  const [purchase, setPurchase] = useState(null);
  useEffect(() => {
    if (!catalogDocumentId || !isAuthenticated()) {
      setPurchase(null);
      return;
    }
    let cancelled = false;
    checkoutService.getMyPurchases()
      .then((res) => {
        if (cancelled) return;
        const items = res.data || [];
        const match = items.find((p) =>
          p.status === 'paid' && p.library_catalog?.documentId === catalogDocumentId,
        );
        setPurchase(match || null);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [catalogDocumentId]);
  return purchase;
}

function Catalogs({ currentItems }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('');
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
  const selectedItem = currentItems.find(d => d.id === selectedId) || null;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className={`${classes.api_list}`}>
      {currentItems &&
        currentItems.map((item, index) => (
          <CatalogCard
            key={index}
            id={item?.id || ''}
            title={item?.title || ''}
            subtitle={item?.slug || ''}
            provider={item?.organization || ''}
            tags={item?.tags?.map(t => t.label) || []}
            imageUrl={item?.image == null ? '' : item?.image[0]?.image?.url || ''}
            selectionColor={primaryColor}
            selected={selectedId === item?.id}
            onSelectChange={(id, s) => setSelectedId(s ? id : null)}
          />
        ))}
        <Drawer
          isOpen={!!selectedItem}
          onClose={() => setSelectedId(null)}
          title={selectedItem?.title}
          side="right"
          width={480}
        >
          <DrawerCatalogDetails
            serviceOffering={JSON.parse(selectedItem?.assets || '{}')}
            contract={JSON.parse(selectedItem?.contractDefinition || '{}')}
            policies={JSON.parse(selectedItem?.policies || '{}')}
            catalogDocumentId={selectedItem?.documentId}
            provider={selectedItem?.organization || ''}
            tags={selectedItem?.tags?.map(t => t.label) || []}
            onNavigate={(section) => {
              navigate(`/catalogs/${selectedItem?.documentId}/${section}`);
              setSelectedId(null);
            }}
            onNegotiate={() => {
              if (isAuthenticated()) navigate(`/developer/catalogs?highlight=${selectedItem?.documentId}`);
              else navigate(`/catalogs/${selectedItem?.documentId}`);
              setSelectedId(null);
            }}
            onConsume={(purchaseId) => {
              navigate(`/developer/purchases/${purchaseId}`);
              setSelectedId(null);
            }}
          />
        </Drawer>
    </div>
  );
}

function CatalogsPaginated({ apis, itemsPerPage }) {
  const { t } = useTranslation();

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (apis.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(apis.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(apis.length / itemsPerPage));
    }
  }, [apis, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % apis.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Catalogs currentItems={currentItems} />
      <ReactPaginate
        breakLabel='...'
        nextLabel={t('ApisPaginated.next')}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t('ApisPaginated.previous')}
        previousClassName={`${classes.previous}`}
        previousLinkClassName={`${classes.previous__link}`}
        nextClassName={`${classes.next}`}
        nextLinkClassName={`${classes.next__link}`}
        disabledClassName={`${classes.disabled}`}
        renderOnZeroPageCount={null}
        containerClassName={`${classes.pagination}`}
        breakClassName={`${classes.number_page}`}
        pageClassName={`${classes.number_page}`}
        activeclassname={`${classes.number_page_active}`}
      />
    </>
  );
}

const ASSET_ICONS = {
  SoftwareResource: <Code fontSize="small" />,
  DataResource: <Storage fontSize="small" />,
  InfrastructureResource: <SettingsSystemDaydream fontSize="small" />,
};

function getAssetIcon(type) {
  return ASSET_ICONS[type] ?? <InsertDriveFileOutlined fontSize="small" />;
}

function DrawerCatalogDetails({ serviceOffering, contract, policies, catalogDocumentId, provider, tags, onNavigate, onNegotiate, onConsume }) {
  const { t } = useTranslation();

  const subject = serviceOffering?.credentialSubject || {};
  const aggregationOf = subject["gx:aggregationOf"] || [];
  const hasServiceOfferings = aggregationOf.some(a => a.type === 'ServiceOffering');
  const schemaAssets = serviceOffering?.assetsWithSchema || [];
  const assets = hasServiceOfferings
    ? aggregationOf
    : schemaAssets.map(a => ({
        id: a['@id'],
        'gx:name': a.properties?.name || a['@id'],
        type: a.properties?.httpMethod || a['@type'] || 'Asset',
      }));
  const offeringName = subject["gx:name"] || '';
  const offeringDesc = subject["gx:description"] || '';

  const rules = policies?.credentialSubject?.["gx:accessPolicy"]?.["gx:rules"] || [];
  const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const permissionCount = rules.filter(r => toArray(r["odrl:permission"]).length > 0).length;
  const prohibitionCount = rules.filter(r => toArray(r["odrl:prohibition"]).length > 0).length;
  const terms = contract?.credentialSubject?.["gx:termsAndConditions"] || [];

  const existingPurchase = useExistingPurchase(catalogDocumentId);
  const hasActiveContract = Boolean(existingPurchase);

  return (
    <div className="drawer-details">

      {/* Info block */}
      {(offeringName || offeringDesc || provider) && (
        <div className="drawer-info-block">
          {provider && (
            <div className="drawer-provider">
              <Business sx={{ fontSize: 14 }} />
              <span>{provider}</span>
            </div>
          )}
          {offeringName && <p className="drawer-offering-name">{offeringName}</p>}
          {offeringDesc && <p className="drawer-offering-desc">{offeringDesc}</p>}
          {tags?.length > 0 && (
            <div className="drawer-tags">
              {tags.map((tag) => (
                <span key={tag} className="drawer-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Assets */}
      <div className="drawer-section-header clickable" onClick={() => onNavigate('assets')}>
        <div className="drawer-section-title-row">
          <h3 className="drawer-title">{t("Catalogs.theAssets")}</h3>
          <div className="drawer-section-actions">
            {assets.length > 0 && <span className="drawer-count-badge">{assets.length}</span>}
            <ChevronRight fontSize="small" className="drawer-chevron" />
          </div>
        </div>
        {assets.length > 0 ? (
          <div className="asset-list">
            {assets.map((a, idx) => (
              <div key={a.id || idx} className="asset-item">
                <div className="asset-icon-wrapper">{getAssetIcon(a.type)}</div>
                <div>
                  <div className="asset-name">{a["gx:name"] || a.id}</div>
                  <div className="asset-type">{a.type}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="drawer-empty">—</p>
        )}
      </div>

      {/* Policies */}
      <div className="drawer-section-header clickable" onClick={() => onNavigate('policies')}>
        <div className="drawer-section-title-row">
          <h3 className="drawer-title">{t("Catalogs.thePolicies")}</h3>
          <div className="drawer-section-actions">
            {rules.length > 0 && (
              <span className="drawer-count-badge">{rules.length}</span>
            )}
            <ChevronRight fontSize="small" className="drawer-chevron" />
          </div>
        </div>
        {rules.length === 0 ? (
          <p className="drawer-empty">—</p>
        ) : (
          <div className="policy-summary-list">
            {permissionCount > 0 && (
              <div className="policy-summary-item permission-item">
                <CheckCircleOutline sx={{ fontSize: 16 }} />
                <span>{permissionCount} {t("Catalogs.policiesPermission")}</span>
              </div>
            )}
            {prohibitionCount > 0 && (
              <div className="policy-summary-item prohibition-item">
                <BlockOutlined sx={{ fontSize: 16 }} />
                <span>{prohibitionCount} {t("Catalogs.policiesProhibition")}</span>
              </div>
            )}
            {permissionCount === 0 && prohibitionCount === 0 && (
              <div className="policy-summary-item permission-item">
                <CheckCircleOutline sx={{ fontSize: 16 }} />
                <span>{rules.length} {t("Catalogs.policiesRules", "Rules")}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contract */}
      <div className="drawer-section-header clickable" onClick={() => onNavigate('contracts')}>
        <div className="drawer-section-title-row">
          <h3 className="drawer-title">{t("Catalogs.theContrat")}</h3>
          <ChevronRight fontSize="small" className="drawer-chevron" />
        </div>
        {terms.map((te, i) => (
          <a
            key={i}
            href={te["gx:URL"]}
            className="contract-link"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <OpenInNew sx={{ fontSize: 14 }} />
            {t("Catalogs.viewTermAndConds")}
          </a>
        ))}
        <button
          className="negotiate-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (hasActiveContract) onConsume?.(existingPurchase.documentId);
            else onNegotiate?.();
          }}
        >
          {hasActiveContract ? t("Catalogs.contractConsume") : t("Catalogs.contractNegotiate")}
        </button>
        {!hasActiveContract && (
          <p className="contract-note">{t("Catalogs.requierCredential")}</p>
        )}
      </div>
    </div>
  );
}

export default CatalogsPaginated;
