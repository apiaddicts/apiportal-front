import classes from "./section.module.scss";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import { ArrowBack, Cancel } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function SectionDataresource({ dataResource }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const subject = dataResource?.credentialSubject || {};
  const generalInfo = {
    id: dataResource["id"] || "—",
    name: subject["gx:name"] || "—",
    description: subject["gx:description"] || "—",
    copyright: subject["gx:copyrightOwner"] || "—",
    colection: subject["gx:collection"] || "—",
    producedBy: dataResource["issuer"] || "—",
    copyrightOwner: subject["gx:copyrightOwner"] || "—",
  };

  const attributes = subject["gx:exposedAttributes"] || {};
  const policies = subject["gx:policy"] || [];

  return (
    <div className={classes.resource_container}>
      <section className={classes.column}>
        <h3>
          <Button
            onClick={() => navigate(-1)}
            title='Back'
            disableElevation
            sx={{
              p: 0,
              minWidth: 0,
              minHeight: 1,
              lineHeight: 'inherit'
            }}
          >
            <ArrowBack sx={{ fontSize: '1em', marginRight: '8px' }} />
          </Button>
          {t("Catalogs.dataresource.generalInfoTitle")}
        </h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.dataresource.resourceId")}</label>
            <select><option>{generalInfo.id}</option></select>
          </div>

          <div className={classes.main_title}>
            <label>{t("Catalogs.dataresource.name")}</label>
            <h2>{generalInfo.name}</h2>
          </div>

          <div className={classes.info_field}>
            <label>{t("Catalogs.dataresource.description")}</label>
            <p>{generalInfo.description}</p>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.dataresource.producedBy")}</label>
            <select><option>{generalInfo.producedBy}</option></select>
          </div>

          <div className={classes.info_field}>
            <label>{t("Catalogs.dataresource.copyrightOwner")}</label>
            <p>{generalInfo.copyrightOwner}</p>
          </div>

          <div className={classes.signature_section}>
            <label className={classes.checkbox_container}>
              <input type="checkbox" />
              <span className={classes.checkmark}></span>
              {t("Catalogs.dataresource.validSignature")}
            </label>
            <button className={classes.btn_link}>{t("Catalogs.dataresource.viewProofDetails")}</button>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.dataresource.attributesTitle")}</h3>
        <div className={classes.card}>
          <div className={classes.attribute_item}>
            <label>{t("Catalogs.dataresource.license")}</label>
          </div>
          
          {Object.entries(attributes).map(([key, value]) => (
            <div key={key} className={classes.attribute_item}>
              <label>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.dataresource.usageRestrictionTitle")}</h3>
        
        <div className={`${classes.status_card} ${classes.permission}`}>
          <div className={classes.card_header}>
            <strong>{t("Catalogs.dataresource.permissionTitle")}</strong>
            <span className={classes.icon}>📋</span>
          </div>
        </div>

        <div className={`${classes.status_card} ${classes.research}`}>
          <div className={classes.card_header}>
            <strong>{t("Catalogs.dataresource.research")}</strong>
            <span className={classes.icon}>✕</span>
          </div>
          <p>{t("Catalogs.dataresource.researchPurposeDesc")}...</p>
        </div>

        <div className={`${classes.status_card} ${classes.commercial}`}>
          <div className={classes.card_header}>
            <strong>{t("Catalogs.dataresource.commercial")}</strong>
            <span className={classes.icon}>✕</span>
          </div>
          <p>{t("Catalogs.dataresource.noMarketingDesc")}</p>
        </div>

        <div className={classes.card}>
          <strong>{t("Catalogs.dataresource.obligationTitle")}</strong>
          <p className={classes.small_text}>{t("Catalogs.dataresource.reportUsageDesc")}</p>
        </div>

        <button className={classes.btn_primary}>{t("Catalogs.dataresource.viewMorePolicies")}</button>
      </section>
    </div>
  );
}

export default SectionDataresource;