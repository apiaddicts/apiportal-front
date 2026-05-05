import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { CatalogCard } from '../Card/CardCatalog';
import Drawer from '../Drawer/DrawerCatalog';
import classes from './catalogs-paginated.module.scss';
import './drawerDetail.scss';
import { useNavigate } from 'react-router-dom';
import checkoutService from '../../services/checkoutService';

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
            serviceOffering={JSON.parse(selectedItem?.services || '{}')}
            contract={JSON.parse(selectedItem?.contractDefinition || '{}')}
            catalogDocumentId={selectedItem?.documentId}
            onNavigate={(section) => {
              navigate(`/catalogs/${selectedItem?.documentId}/${section}`);
              setSelectedId(null);
            }}
            onConsume={(purchaseId) => {
              navigate(`/purchases/${purchaseId}`);
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

function DrawerCatalogDetails({ serviceOffering, contract, catalogDocumentId, onNavigate, onConsume }) {
  const { t } = useTranslation();
  const assets = serviceOffering?.credentialSubject?.["gx:aggregationOf"] || [];
  const policy = contract?.credentialSubject?.["gx:usagePolicy"] || {};

  const permissions = policy["odrl:permission"] || [];
  const prohibitions = policy["odrl:prohibition"] || [];

  const terms = contract?.credentialSubject?.["gx:termsAndConditions"] || [];

  const existingPurchase = useExistingPurchase(catalogDocumentId);
  const hasActiveContract = Boolean(existingPurchase);

  return (
    <div className="drawer-details">
      <div
        className="drawer-section-header clickable"
        onClick={() => onNavigate('assets')}
      >
        <h3 className="drawer-title">{t("Catalogs.theAssets")}</h3>
        <div className="asset-list">
          {assets.map((a) => (
            <div key={a.id} className="asset-item">
              <div className="asset-icon">📦</div>
              <div>
                <div className="asset-name">{a["gx:name"]}</div>
                <div className="asset-type">{a.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div
        className="drawer-section-header clickable"
        onClick={() => onNavigate('policies')}
      >
        <h3 className="drawer-title">{t("Catalogs.thePolicies")}</h3>
        {permissions.map((p, i) => (
          <div key={"perm" + i} className="policy-card permission">
            <div className="policy-title">{t("Catalogs.policiesPermission")}</div>
            <div className="policy-body">
              {t("Catalogs.policiesAllow")}: {p["odrl:action"]?.map(a => a["odrl:type"]).join(", ")}
            </div>
          </div>
        ))}

        {prohibitions.map((p, i) => (
          <div key={"proh" + i} className="policy-card prohibition">
            <div className="policy-title">{t("Catalogs.policiesProhibition")}</div>
            <div className="policy-body">
              {t("Catalogs.policiesForbiden")}: {p["odrl:action"]?.map(a => a["odrl:type"]).join(", ")}
            </div>
          </div>
        ))}
      </div>

      <div
        className="drawer-section-header clickable"
        onClick={() => onNavigate('contracts')}
      >
        <h3 className="drawer-title">{t("Catalogs.theContrat")}</h3>
        {terms.map((te, i) => (
          <a
            key={i}
            href={te["gx:URL"]}
            className="contract-link"
            target="_blank"
            rel="noreferrer"
          >
            {t("Catalogs.viewTermAndConds")}
          </a>
        ))}
        <button
          className="negotiate-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (hasActiveContract) onConsume?.(existingPurchase.documentId);
          }}
        >
          {hasActiveContract ? t("Catalogs.contractConsume") : t("Catalogs.contractNegotiate")}
        </button>
        {!hasActiveContract && (
          <p className="contract-note">
            {t("Catalogs.requierCredential")}
          </p>
        )}
      </div>
    </div>
  );
}

export default CatalogsPaginated;
