import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from "@mui/icons-material/MoreVert";

function SectionContractDefinition({ contract }) {
  const { t } = useTranslation();

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const subject = contract?.credentialSubject || {};
  const generalInfo = {
    id: contract["@id"] || "—"
  };
  const assets = contract["https://w3id.org/edc/v0.0.1/ns/assetsSelector"] || [];

  return (
    <div className={classes.participant_container}>
      <section className={classes.column}>
        <h3>{t("Catalogs.contractDefinition.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.contractDefinition.contractId")}</label>
            <div className={classes.field_box}>{generalInfo.id}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.contractDefinition.accessPolicyId")}</label>
            <select><option>{t("Catalogs.contractDefinition.contrasAllPolicyId")}</option></select>
          </div>

          <div className={classes.status_badge_container}>
            <button className={classes.btn_action}>
              {t("Catalogs.contractDefinition.allowAllPolicy")}
            </button>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.contractDefinition.goverredAssets")} ( {assets.length} {t("Catalogs.contractDefinition.operations")} )</h3>
        <div className={classes.void_card}>
          <p className='p-2'>{generalInfo.id}</p>
          {assets && assets.length > 0 ? (
            assets.map((as, idx) => (
            <div key={idx} className={`${classes.card} ${classes.highlight_card_no_transparency}`}>
              <div className={classes.icon_text}>
                <CheckCircleIcon sx={{ color: "white" }} />
                <div>
                  <strong>{as["https://w3id.org/edc/v0.0.1/ns/operandRight"][0]["@value"]}</strong>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className={`${classes.card} ${classes.highlight_card_no_transparency}`}>
              <div className={classes.icon_text}>
                <CheckCircleIcon sx={{ color: "white" }} />
                <div>
                  <strong>{t("Catalogs.contractDefinition.noAssets")}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.contractDefinition.policiDetails")}</h3>
        <div className={`${classes.void_card} ${classes.bg_white}`}>
          <div className={classes.status_badge_container}>
            <div className={classes.hexagon_icon}>
              <h1>✓</h1>
            </div>
            <div className={classes.icon_text}>
              <CheckCircleIcon sx={{ color: primaryColor, fontSize: 30 }} />
              <div>
                <strong>{t("Catalogs.contractDefinition.grantAllAccess")}</strong>
              </div>
            </div>
            <div className={classes.icon_text}>
              <CheckCircleIcon sx={{ color: primaryColor, fontSize: 30 }} />
              <div>
                <strong>{t("Catalogs.contractDefinition.allowsAllUsage")}</strong>
              </div>
            </div>
          <button className={classes.btn_primary}>{t("Catalogs.contractDefinition.viewRawJsonLd")}</button>
          </div>
        </div>
      </section>
    </div>    
  );
}

export default SectionContractDefinition;