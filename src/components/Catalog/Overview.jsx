import { useState } from 'react';
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
  CheckCircle,
  CheckBox,
  Storage,
  Code,
  SettingsSystemDaydream,
  ChevronRight,
  ArrowBack,
  InsertDriveFileOutlined,
  VerifiedOutlined,
  DataObject,
} from '@mui/icons-material';

function formatDid(did) {
  if (!did || did === '—') return did;
  if (did.startsWith('did:web:')) return did.replace('did:web:', '');
  return did;
}

function splitAssetName(name = '') {
  const parts = name.split(' - ');
  if (parts.length > 1) {
    return { api: parts[0].trim(), operation: parts.slice(1).join(' - ').trim() };
  }
  return { api: '', operation: name };
}

function getOperationAccent(name = '') {
  const lower = name.toLowerCase();
  if (lower.includes('add') || lower.includes('create') || lower.includes('register')) return '#22c55e';
  if (lower.includes('update')) return '#f59e0b';
  if (lower.includes('delete') || lower.includes('deletes')) return '#ef4444';
  if (lower.includes('find') || lower.includes('get') || lower.includes('all')) return '#3b82f6';
  return '#6b7280';
}

const METHOD_COLORS = {
  GET:    { bg: '#dcfce7', color: '#16a34a' },
  POST:   { bg: '#dbeafe', color: '#1d4ed8' },
  PUT:    { bg: '#fef3c7', color: '#d97706' },
  PATCH:  { bg: '#f3e8ff', color: '#7c3aed' },
  DELETE: { bg: '#fee2e2', color: '#dc2626' },
};


function FieldBox({ label, value, mono = false }) {
  if (!value) return null;
  return (
    <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 14px', border: '1px solid #e5e7eb' }}>
      <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</span>
      <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#334155', overflowWrap: 'anywhere', fontFamily: mono ? 'monospace' : 'inherit' }}>{value}</p>
    </div>
  );
}

function schemaToExample(schema) {
  if (!schema) return null;
  const type = schema.type;
  if (type === 'object') {
    const result = {};
    if (schema.properties) {
      for (const [k, v] of Object.entries(schema.properties)) {
        result[k] = schemaToExample(v);
      }
    }
    return result;
  }
  if (type === 'array') {
    return schema.items ? [schemaToExample(schema.items)] : [];
  }
  if (type === 'string') return '';
  if (type === 'integer' || type === 'number') return 0;
  if (type === 'boolean') return true;
  return null;
}

function colorizeJson(json) {
  return json
    .replace(/("[\w]+")\s*:/g, '<span style="color:#7dd3fc">$1</span>:')
    .replace(/:\s*(".*?")/g, ': <span style="color:#86efac">$1</span>')
    .replace(/:\s*(\d+)/g, ': <span style="color:#fbbf24">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span style="color:#c084fc">$1</span>')
    .replace(/:\s*(null)/g, ': <span style="color:#94a3b8">$1</span>');
}

function ResponseSchemaSection({ schemaData, primaryColor }) {
  const schema = schemaData?.responseSchema;
  if (!schema) return null;

  const example = schemaToExample(schema);
  const jsonString = JSON.stringify(example, null, 2);

  return (
    <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <DataObject sx={{ color: primaryColor, fontSize: 20 }} />
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>Ejemplo de respuesta</span>
        <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.72rem', fontWeight: 600, padding: '1px 7px', borderRadius: 4, fontFamily: 'monospace' }}>
          {schema.type || 'object'}
        </span>
      </div>
      <pre
        style={{ margin: 0, background: '#0f172a', borderRadius: 8, padding: '16px', overflowX: 'auto', fontSize: '0.83rem', lineHeight: 1.6, color: '#e2e8f0', fontFamily: "'Fira Code', 'Cascadia Code', monospace" }}
        dangerouslySetInnerHTML={{ __html: colorizeJson(jsonString) }}
      />
    </div>
  );
}

function AssetDetail({ asset, edcData, schemaData, onBack, t, primaryColor }) {
  const method = edcData?.httpMethod?.toUpperCase() || '';
  const methodStyle = METHOD_COLORS[method] || { bg: '#f3f4f6', color: '#6b7280' };
  const { operation } = splitAssetName(asset['gx:name'] || asset.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: primaryColor, fontWeight: 600, fontSize: '0.9rem', padding: 0 }}
      >
        <ArrowBack fontSize="small" /> {t('back')}
      </button>

      <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
          <InsertDriveFileOutlined sx={{ color: primaryColor, fontSize: 36, flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
              {method && (
                <span style={{ background: methodStyle.bg, color: methodStyle.color, fontWeight: 700, fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>
                  {method}
                </span>
              )}
              {edcData?.path && (
                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4 }}>
                  {edcData.path}
                </span>
              )}
            </div>
            <h2 style={{ margin: 0, fontSize: '1rem', color: '#334155', fontWeight: 700 }}>{operation || asset['gx:name'] || asset.id}</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{asset.type}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FieldBox label="ID" value={asset.id} mono />
          {edcData?.description && <FieldBox label={t('description')} value={edcData.description} />}
          {edcData?.apiName && <FieldBox label="API" value={edcData.apiName} />}
          {edcData?.operationId && <FieldBox label="Operation ID" value={edcData.operationId} mono />}
          {edcData?.apiVersion && <FieldBox label="Version" value={edcData.apiVersion} />}
          {edcData?.contenttype && <FieldBox label="Content Type" value={edcData.contenttype} mono />}
          {!edcData?.description && asset['gx:description'] && <FieldBox label={t('description')} value={asset['gx:description']} />}
        </div>
      </div>

      <ResponseSchemaSection schemaData={schemaData} primaryColor={primaryColor} />
    </div>
  );
}

function OverviewServiceOffering({ serviceOffering, edcCatalog }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedEdcData, setSelectedEdcData] = useState(null);
  const [selectedSchemaData, setSelectedSchemaData] = useState(null);

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const edcDatasets = Array.isArray(edcCatalog?.['dcat:dataset'])
    ? edcCatalog['dcat:dataset']
    : edcCatalog?.['dcat:dataset']
      ? [edcCatalog['dcat:dataset']]
      : [];
  const edcById = Object.fromEntries(edcDatasets.map(d => [d['@id'] || d.id, d]));

  const assetsWithSchema = Array.isArray(serviceOffering?.assetsWithSchema)
    ? serviceOffering.assetsWithSchema
    : [];
  const schemaById = Object.fromEntries(assetsWithSchema.map(a => [a['@id'], a]));

  const subject = serviceOffering?.credentialSubject || {};
  const generalInfo = {
    id: subject["id"] || "—",
    name: subject["gx:name"] || "—",
    desc: subject["gx:description"] || "",
    providedBy: formatDid(subject["gx:providedBy"] || "—"),
    complianceLevel: subject["gx:complianceLabel"]?.["gx:level"] || "",
    certifiedBy: formatDid(subject["gx:complianceLabel"]?.["gx:certifiedBy"] || ""),
  };
  const aggregationOf = subject["gx:aggregationOf"] || [];

  const logosIndex = {
    "SoftwareResource": {
      icon: <Code />,
      label: t("Catalogs.Overview.softwareLabel"),
      tag: t("Catalogs.Overview.softwareTag"),
      section: 'softwareresource'
    },
    "DataResource": {
      icon: <Storage />,
      label: t("Catalogs.Overview.dataLabel"),
      tag: t("Catalogs.Overview.dataTag"),
      section: 'dataresources'
    },
    "InfrastructureResource": {
      icon: <SettingsSystemDaydream />,
      label: t("Catalogs.Overview.infrastructureLabel"),
      tag: t("Catalogs.Overview.infrastructureTag"),
      section: 'infrastructureresource'
    },
    "ServiceOffering": {
      icon: <InsertDriveFileOutlined />,
      label: t("Catalogs.Overview.serviceOfferingLabel"),
      tag: t("Catalogs.Overview.serviceOfferingTag"),
      section: null
    }
  };

  const getEntry = (type) => logosIndex[type] ?? {
    icon: <InsertDriveFileOutlined />,
    label: type || '—',
    tag: '',
    section: null
  };

  const handleClick = (asset) => {
    const entry = getEntry(asset["type"]);
    if (entry.section) {
      navigate(`/catalogs/${params?.id}/${entry.section}`);
    } else {
      const schemaData = schemaById[asset.id]
        || assetsWithSchema.find(a => a.properties?.operationId === asset.id)
        || null;
      setSelectedAsset(asset);
      setSelectedEdcData(edcById[asset.id] || null);
      setSelectedSchemaData(schemaData);
    }
  };

  if (selectedAsset) {
    return (
      <div className={classes.overview_layout}>
        <section className={classes.column} style={{ flex: 1 }}>
          <AssetDetail
            asset={selectedAsset}
            edcData={selectedEdcData}
            schemaData={selectedSchemaData}
            onBack={() => { setSelectedAsset(null); setSelectedEdcData(null); setSelectedSchemaData(null); }}
            t={t}
            primaryColor={primaryColor}
          />
        </section>
      </div>
    );
  }

  return (
    <div className={classes.overview_layout}>
      <section className={classes.column}>
        <h3>{t("Catalogs.Overview.overview")}</h3>
        <div className={classes.main_card}>
          <div className={classes.checkbox_top}>
            <CheckBox sx={{ color: primaryColor, fontSize: 20 }} />
          </div>
          <div className={classes.card_content}>
            <div className={classes.status_icon_container}>
              <CheckCircle sx={{ fontSize: 60, color: primaryColor }} />
            </div>
            <div className={`${classes.text_content} pt-4`}>
              <h2 className={classes.main_title}>{generalInfo.name}</h2>
              <p className={classes.subtitle}>Gaia-X Compliant</p>
              {generalInfo.providedBy && generalInfo.providedBy !== '—' && (
                <p className={classes.provider}>{t("Catalogs.Overview.providedBy")} {generalInfo.providedBy}</p>
              )}
            </div>
          </div>
          {(generalInfo.desc || generalInfo.complianceLevel) && (
            <div className={classes.card_extra}>
              {generalInfo.desc && (
                <p className={classes.card_desc}>{generalInfo.desc}</p>
              )}
              {generalInfo.complianceLevel && (
                <div className={classes.compliance_chip}>
                  <VerifiedOutlined sx={{ fontSize: 14 }} />
                  <span>{generalInfo.complianceLevel}</span>
                  {generalInfo.certifiedBy && <span className={classes.certified_by}>· {generalInfo.certifiedBy}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={classes.column}>
        <div className={classes.linked_assets_header}>
          <h3>{t("Catalogs.Overview.linkedAssetsTitle")}</h3>
          {aggregationOf.length > 0 && (
            <span className={classes.assets_count_badge}>{aggregationOf.length}</span>
          )}
        </div>
        <div className={classes.asset_grid}>
          {aggregationOf.length > 0 ? (
            aggregationOf.map((asset, idx) => {
              const entry = getEntry(asset["type"]);
              const { api, operation } = splitAssetName(asset["gx:name"] || asset.id);
              const accent = getOperationAccent(asset["gx:name"] || '');
              return (
                <button
                  key={asset.id || idx}
                  className={classes.asset_card}
                  onClick={() => handleClick(asset)}
                  style={{ borderLeft: `4px solid ${accent}` }}
                >
                  <div className={classes.card_top}>
                    <div className={classes.info_section}>
                      {api && <span className={classes.resource_type_label}>{api}</span>}
                      <div className={classes.resource_main}>
                        <div className={classes.icon_wrapper} style={{ color: accent }}>
                          {entry.icon}
                        </div>
                        <div className={classes.name_container}>
                          <h3>{operation || asset["gx:name"] || asset.id}</h3>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={classes.arrow_icon} />
                  </div>
                  <div className={classes.card_footer}>
                    <span className={classes.tag} style={{ color: accent }}>{entry.tag}</span>
                  </div>
                </button>
              );
            })
          ) : <></>}
        </div>
      </section>
    </div>
  );
}

export default OverviewServiceOffering;
