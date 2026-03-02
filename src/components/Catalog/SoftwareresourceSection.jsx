import React, { useEffect } from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function SectionSoftware({ software }) {
  const { t } = useTranslation();

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const subject = software?.credentialSubject || {};
  const generalInfo = {
    id: software["id"] || "—",
    date: software["issuanceDate"] || "—",
    issuer: software["issuer"] || "—",
    name: subject["gx:name"] || "—",
    description: subject["gx:description"] || "—",
    copyrightOwner: subject["gx:copyrightOwner"] || "—",
    license: subject["gx:license"] || "—",
    version: subject["gx:version"] || "—",
    softwareReference: subject["gx:softwareReference"] || "—",
    programmingLanguage: subject["gx:programmingLanguage"] || "—",
  };

  const technicalInterface = subject["gx:technicalInterface"] || {};
  const ApiOperations = technicalInterface["gx:operations"] || [];

  const policies = subject["gx:policy"] || [];

  return (
    <div className={classes.participant_container}>
      <section className={classes.column}>
        <h3>{t("Catalogs.softwareresource.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.softwareresource.id")}</label>
            <div className={classes.field_box}>{generalInfo.id}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.softwareresource.name")}</label>
            <div className={classes.field_box}>{generalInfo.name}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.softwareresource.description")}</label>
            <div className={classes.field_box}>{generalInfo.description}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.softwareresource.version")}</label>
            <div className={classes.field_box}>{generalInfo.version}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.softwareresource.issuer")}</label>
            <div className={classes.field_box}>{generalInfo.issuer}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.softwareresource.publishedDate")}</label>
            <div className={classes.field_box}>{generalInfo.date}</div>
          </div>

          <div className={classes.signature_section}>
            <label className={classes.checkbox_container}>
              <input type="checkbox" />
              <span className={classes.checkmark}></span>
              {t("Catalogs.softwareresource.validSignature")}
            </label>
            <button className={classes.btn_link}>
              {t("Catalogs.softwareresource.viewProofDetails")}
            </button>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.softwareresource.technicalTitle")}</h3>
        <div className={classes.card}>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.softwareresource.interfaceType")}:</strong> {technicalInterface["gx:interfaceType"]}
            </label>
          </div>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.softwareresource.endpoint")}:</strong> {technicalInterface["gx:endpoint"]}
            </label>
          </div>
        </div>

        <h3>{t("Catalogs.softwareresource.apiOpsTitle")}</h3>
        <div className={classes.void_card}>
          {ApiOperations && ApiOperations.length > 0 ? (
            ApiOperations.map((op, idx) => (
              <div className={classes.sub_card} key={op["operationId"] || idx}>
                <div className={classes.icon_text}>
                  <CheckCircleIcon sx={{ color: primaryColor, fontSize: 30 }} />
                  <div>
                    <strong>{op["operationId"]}</strong>
                    <p>{op["description"]}</p>
                  </div>
                </div>
                <span
                  className={`${classes.badge_post} ${
                    op["method"].toLowerCase() === 'get' ? classes.highlight_get_method :
                    op["method"].toLowerCase() === 'post' ? classes.highlight_post_method :
                    op["method"].toLowerCase() === 'put' ? classes.highlight_put_method :
                    op["method"].toLowerCase() === 'patch' ? classes.highlight_patch_method :
                    op["method"].toLowerCase() === 'delete' ? classes.highlight_delete_method :
                    classes.highlight_default}`
                  }
                >
                  {op["method"]}
                </span>
              </div>
            ))
          ) : (
            <div className={classes.sub_card}>
              <div className={classes.icon_text}>
                <span>🏢</span>
                <div>
                  <strong>{t("Catalogs.softwareresource.noApiOps")}</strong>
                  <p>{t("Catalogs.softwareresource.noApiOpsDesc")}</p>
                </div>
              </div>
            </div>
          )}
          <div className={classes.field_box}>{generalInfo.softwareReference}</div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.softwareresource.policiesTitle")}</h3>
        {policies && policies.length > 0 ? (
          policies.map((policy, idx) => (
            <div key={idx} className={`${classes.card} ${policy["type"] === "Permission" ? classes.highlight_card : classes.highlight_red_card }`}>
              <div className={classes.icon_text}>
                <div>
                  <strong>{policy["type"]}</strong>
                  <p>{policy["description"]}</p>
                </div>
                <CancelIcon sx={{ color: "red" }} />
              </div>
            </div>
          )))
          : <></>
        }
        <hr />
        <div>
          <p>Copyright owner</p>
          <div className={classes.field_box}>{generalInfo.copyrightOwner}</div>
        </div>
      </section>
    </div>    
  );
}

export default SectionSoftware;