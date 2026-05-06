import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getcatalogs } from '../../../redux/actions/catalogAction';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import Card, { CardTitle, CardBody } from '../../../components/ui/Card/Card';
import { RowList, Row, RowLabel } from '../../../components/ui/RowList/RowList';
import BuyButton from '../../../components/CatalogDetail/BuyButton';
import classes from './private-catalogs.module.scss';

const SCHEMA_NS = 'https://schema.org/';
const BILLING_NS = 'https://w3id.org/dataspace-billing/v0.1/ns/';

function parseFirst(raw) {
  if (!raw) return null;
  try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return null; }
}

function offerFromCatalog(c) {
  const cdOps = parseFirst(c.contractDefinitionOperations);
  const services = parseFirst(c.services);
  const datasets = services?.['dcat:dataset'] ?? services?.dataset;
  const list = Array.isArray(datasets) ? datasets : datasets ? [datasets] : [];
  const wanted = cdOps?.assetsSelector?.operandRight;
  const dataset = (Array.isArray(wanted) ? list.find(d => wanted.includes(d?.['@id'])) : null)
    || list.find(d => d?.[`${SCHEMA_NS}offers`] || d?.['schema:offers']);
  return dataset?.[`${SCHEMA_NS}offers`] || dataset?.['schema:offers'] || null;
}

function metaFromCatalog(c) {
  const offer = offerFromCatalog(c) || {};
  const price = offer['schema:price'] ?? offer[`${SCHEMA_NS}price`];
  const currency = offer['schema:priceCurrency'] ?? offer[`${SCHEMA_NS}priceCurrency`] ?? 'EUR';
  const bundleId = offer[`${BILLING_NS}bundleId`] ?? offer.bundleId ?? null;
  return {
    priceCents: price != null ? Math.round(Number(price) * 100) : null,
    currency,
    bundleId,
  };
}

function PrivateCatalogs() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const highlightedRef = useRef(null);

  const { catalogs, loadingCatalogs } = useSelector((state) => state.catalogs);

  useEffect(() => {
    if (!catalogs || catalogs.length === 0) dispatch(getcatalogs());
  }, []);

  useEffect(() => {
    if (highlightId && highlightedRef.current) {
      highlightedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightId, catalogs]);

  const items = useMemo(() => (catalogs || []).map((c) => ({ catalog: c, meta: metaFromCatalog(c) })), [catalogs]);

  if (loadingCatalogs && (!catalogs || catalogs.length === 0)) return <SkeletonComponent />;

  return (
    <Card layout="wide">
      <CardTitle>{t('Catalogs.privateList.title')}</CardTitle>
      {items.length === 0 && <CardBody>{t('Catalogs.privateList.empty')}</CardBody>}
      <RowList>
        {items.map(({ catalog: c, meta }) => {
          const isHighlighted = highlightId === c.documentId;
          return (
            <Row
              key={c.documentId}
              interactive={false}
              className={isHighlighted ? classes.rowHighlighted : ''}
            >
              <div
                ref={isHighlighted ? highlightedRef : null}
                className={classes.entry}
              >
                <RowLabel>{c.title}</RowLabel>
                {c.description && <p className={classes.desc}>{c.description}</p>}
              </div>
              <div className={classes.actions}>
                <div className={classes.buyWrap}>
                  <BuyButton
                    catalogId={c.documentId}
                    priceCents={meta.priceCents}
                    currency={meta.currency}
                    bundleId={meta.bundleId}
                  />
                </div>
                <Link to={`/catalogs/${c.documentId}`} className={classes.publicLink}>
                  {t('Catalogs.privateList.viewPublic')}
                </Link>
              </div>
            </Row>
          );
        })}
      </RowList>
    </Card>
  );
}

export default PrivateCatalogs;
