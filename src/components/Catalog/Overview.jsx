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
  Add,
  InsertDriveFileOutlined
} from '@mui/icons-material';
import Chip from '@mui/material/Chip';

function OverviewServiceOffering({ serviceOffering }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

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
  const termsAndConditions = subject["gx:termsAndConditions"] || [];
  const complianceLabel = subject["gx:complianceLabel"] || {};
  const dataSovereignty = subject["gx:dataSovereignty"] || {};

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
    }
  };

  const handleClick = (section) => {
    navigate(`/catalogs/${params?.id}/${section}`);
  };

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
          { false && <div className={classes.card_footer}>
            <div className={classes.version_tag}>
              <span>v 1.0.0</span>
              <Chip
                label="Beta"
                size="small"
                sx={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  height: '18px',
                  fontSize: '0.65rem',
                  fontWeight: 'bold'
                }}
              />
            </div>
          </div>}
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
        {aggregationOf && aggregationOf.length > 0 ? (
          aggregationOf.map((asset, idx) => (
            <button key={asset.id} className={classes.asset_card}
              onClick={() => handleClick(logosIndex[asset["type"]]?.section)}
            >
              <div className={classes.card_top}>
                <div className={classes.info_section}>
                  <span className={classes.resource_type_label}>{logosIndex[asset["type"]]?.label}</span>
                  <div className={classes.resource_main}>
                    <div className={classes.icon_wrapper}>
                      {logosIndex[asset["type"]]?.icon}
                    </div>
                    <div className={classes.name_container}>
                      <h3>{asset["gx:name"]}</h3>
                      <p>{logosIndex[asset["type"]]?.desc}</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className={classes.arrow_icon} />
              </div>

              <div className={classes.card_footer}>
                <span className={classes.tag}>{logosIndex[asset["type"]]?.tag}</span>
              </div>
            </button>
          ))
        ) : <></>}
        </div>
      </section>
    </div>
  );
}

export default OverviewServiceOffering;
