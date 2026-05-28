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
  Add,
  InsertDriveFileOutlined
} from '@mui/icons-material';
import Chip from '@mui/material/Chip';

function AssetDetail({ asset, onBack, t, primaryColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: primaryColor, fontWeight: 600, fontSize: '0.9rem', padding: 0 }}
      >
        <ArrowBack fontSize="small" /> {t('back')}
      </button>

      <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <InsertDriveFileOutlined sx={{ color: primaryColor, fontSize: 36 }} />
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#334155' }}>{asset['gx:name'] || asset.id}</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{asset.type}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 14px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>ID</span>
            <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#334155', overflowWrap: 'anywhere' }}>{asset.id || '—'}</p>
          </div>

          <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 14px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>{t('type')}</span>
            <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#334155' }}>{asset.type || '—'}</p>
          </div>

          {asset['gx:description'] && (
            <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 14px', border: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>{t('description')}</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#334155' }}>{asset['gx:description']}</p>
            </div>
          )}

          {asset['gx:providedBy'] && (
            <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 14px', border: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>{t('Catalogs.Overview.providedBy')}</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#334155', overflowWrap: 'anywhere' }}>{asset['gx:providedBy']}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OverviewServiceOffering({ serviceOffering }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const subject = serviceOffering?.credentialSubject || {};
  const generalInfo = {
    id: subject["id"] || "—",
    name: subject["gx:name"] || "—",
    desc: subject["gx:description"] || "—",
    providedBy: subject["gx:providedBy"] || "—"
  };
  const aggregationOf = subject["gx:aggregationOf"] || [];

  const logosIndex = {
    "SoftwareResource": {
      icon: <Code />,
      label: t("Catalogs.Overview.softwareLabel"),
      tag: t("Catalogs.Overview.softwareTag"),
      desc: t("Catalogs.Overview.softwareDesc"),
      section: 'softwareresource'
    },
    "DataResource": {
      icon: <Storage />,
      label: t("Catalogs.Overview.dataLabel"),
      tag: t("Catalogs.Overview.dataTag"),
      desc: t("Catalogs.Overview.dataDesc"),
      section: 'dataresources'
    },
    "InfrastructureResource": {
      icon: <SettingsSystemDaydream />,
      label: t("Catalogs.Overview.infrastructureLabel"),
      tag: t("Catalogs.Overview.infrastructureTag"),
      desc: t("Catalogs.Overview.infrastructureDesc"),
      section: 'infrastructureresource'
    },
    "ServiceOffering": {
      icon: <InsertDriveFileOutlined />,
      label: t("Catalogs.Overview.serviceOfferingLabel"),
      tag: t("Catalogs.Overview.serviceOfferingTag"),
      desc: t("Catalogs.Overview.serviceOfferingDesc"),
      section: null
    }
  };

  const getEntry = (type) => logosIndex[type] ?? {
    icon: <InsertDriveFileOutlined />,
    label: type || '—',
    tag: '',
    desc: '',
    section: null
  };

  const handleClick = (asset) => {
    const entry = getEntry(asset["type"]);
    if (entry.section) {
      navigate(`/catalogs/${params?.id}/${entry.section}`);
    } else {
      setSelectedAsset(asset);
    }
  };

  if (selectedAsset) {
    return (
      <div className={classes.overview_layout}>
        <section className={classes.column} style={{ flex: 1 }}>
          <AssetDetail asset={selectedAsset} onBack={() => setSelectedAsset(null)} t={t} primaryColor={primaryColor} />
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
              <p className={classes.provider}>{t("Catalogs.Overview.providedBy")} {generalInfo.providedBy}</p>
            </div>
          </div>
        </div>

        <button className={classes.overview_button}>
          <div className={classes.left_group}>
            <InsertDriveFileOutlined sx={{ fontSize: 20 }} />
            <span>{t("Catalogs.Overview.overview")}</span>
          </div>
          <Add sx={{ fontSize: 20 }} />
        </button>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.Overview.linkedAssetsTitle")}</h3>
        <div className={classes.asset_grid}>
          {aggregationOf.length > 0 ? (
            aggregationOf.map((asset, idx) => {
              const entry = getEntry(asset["type"]);
              return (
                <button key={asset.id || idx} className={classes.asset_card} onClick={() => handleClick(asset)}>
                  <div className={classes.card_top}>
                    <div className={classes.info_section}>
                      <span className={classes.resource_type_label}>{entry.label}</span>
                      <div className={classes.resource_main}>
                        <div className={classes.icon_wrapper}>{entry.icon}</div>
                        <div className={classes.name_container}>
                          <h3>{asset["gx:name"] || asset.id}</h3>
                          <p>{entry.desc}</p>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={classes.arrow_icon} />
                  </div>
                  <div className={classes.card_footer}>
                    <span className={classes.tag}>{entry.tag}</span>
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
