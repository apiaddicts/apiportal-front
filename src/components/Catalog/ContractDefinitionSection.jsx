import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GavelIcon from '@mui/icons-material/Gavel';
import PolicyIcon from '@mui/icons-material/Policy';

function SectionContractDefinition({ contract }) {
  const { t } = useTranslation();

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const contractId       = contract?.["@id"] || "—";
  const accessPolicyId   = contract?.["accessPolicyId"] || "—";
  const contractPolicyId = contract?.["contractPolicyId"] || "—";

  const assetsSelector  = contract?.["assetsSelector"] || {};
  const operandRight    = Array.isArray(assetsSelector["operandRight"])
    ? assetsSelector["operandRight"]
    : [];

  return (
    <div className={classes.participant_container}>

      {/* Column 1 — General Info */}
      <section className={classes.column}>
        <h3>{t("Catalogs.contractDefinition.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.contractDefinition.contractId")}</label>
            <div className={`${classes.field_box} ${classes.field_mono}`}>{contractId}</div>
          </div>
          <div className={classes.input_group}>
            <label>{t("Catalogs.contractDefinition.accessPolicyId")}</label>
            <div className={`${classes.field_box} ${classes.field_mono}`}>{accessPolicyId}</div>
          </div>
          <div className={classes.input_group}>
            <label>{t("Catalogs.contractDefinition.contractPolicyId", "Contract Policy ID")}</label>
            <div className={`${classes.field_box} ${classes.field_mono}`}>{contractPolicyId}</div>
          </div>
        </div>
      </section>

      {/* Column 2 — Governed Assets */}
      <section className={classes.column}>
        <h3>
          {t("Catalogs.contractDefinition.goverredAssets")}
          {operandRight.length > 0 && (
            <span className={classes.assets_count_badge} style={{ marginLeft: 8 }}>{operandRight.length}</span>
          )}
        </h3>
        <div className={classes.void_card}>
          {operandRight.length > 0 ? (
            operandRight.map((assetId, idx) => (
              <div key={idx} className={classes.sub_card}>
                <div className={classes.icon_text}>
                  <CheckCircleIcon sx={{ color: primaryColor, fontSize: 18, flexShrink: 0 }} />
                  <strong style={{ fontSize: '0.88rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {assetId}
                  </strong>
                </div>
              </div>
            ))
          ) : (
            <div className={classes.sub_card}>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.88rem' }}>—</p>
            </div>
          )}
        </div>
      </section>

      {/* Column 3 — Policy Details */}
      <section className={classes.column}>
        <h3>{t("Catalogs.contractDefinition.policiDetails")}</h3>
        <div className={classes.card}>
          <div className={classes.icon_text}>
            <GavelIcon sx={{ color: primaryColor, flexShrink: 0 }} />
            <div>
              <strong>{t("Catalogs.contractDefinition.accessPolicyId")}</strong>
              <p style={{ fontFamily: 'monospace', fontSize: '0.82rem', overflowWrap: 'anywhere' }}>{accessPolicyId}</p>
            </div>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.icon_text}>
            <PolicyIcon sx={{ color: primaryColor, flexShrink: 0 }} />
            <div>
              <strong>{t("Catalogs.contractDefinition.contractPolicyId", "Contract Policy ID")}</strong>
              <p style={{ fontFamily: 'monospace', fontSize: '0.82rem', overflowWrap: 'anywhere' }}>{contractPolicyId}</p>
            </div>
          </div>
        </div>
        {assetsSelector["operandLeft"] && (
          <div className={classes.card}>
            <div className={classes.input_group} style={{ margin: 0 }}>
              <label>Operator</label>
              <div className={classes.field_box}>{assetsSelector["operator"] || "—"}</div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default SectionContractDefinition;
