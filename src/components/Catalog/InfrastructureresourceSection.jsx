import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function SectionInfrastructure({ infrastructure }) {
  const { t } = useTranslation();

  const subject = infrastructure?.credentialSubject || {};
  const generalInfo = {
    id: infrastructure["id"] || "—",
    issuer: infrastructure["issuer"] || "—",
    issuanceDate: infrastructure["issuanceDate"] || "—",
    name: subject["gx:name"] || "—",
    description: subject["gx:description"] || "—",
    version: subject["version"] || "—",
    copyrightOwner: subject["gx:copyrightOwner"] || "—",
    license: subject["gx:license"] || "—",
    dataAccountability: subject["gx:dataAccountability"] || "—",
  };

  const technicalAttributes = subject["gx:technicalAttributes"] || {};
  const nodeInfo = subject["gx:nodeInfo"] || '-';

  const policies = subject["gx:policy"] || {};

  return (
    <div className={classes.participant_container}>
      <section className={classes.column}>
        <h3>{t("Catalogs.infrastructureresource.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.infrastructureresource.id")}</label>
            <div className={classes.field_box}>{generalInfo.id}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.infrastructureresource.name")}</label>
            <div className={classes.field_box}>{generalInfo.name}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.infrastructureresource.description")}</label>
            <div className={classes.field_box}>{generalInfo.description}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.infrastructureresource.version")}</label>
            <div className={classes.field_box}>{generalInfo.version}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.infrastructureresource.issuer")}</label>
            <div className={classes.field_box}>{generalInfo.issuer}</div>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.infrastructureresource.issuanceDate")}</label>
            <div className={classes.field_box}>{generalInfo.issuanceDate}</div>
          </div>

          <div className={classes.signature_section}>
            <label className={classes.checkbox_container}>
              <input type="checkbox" />
              <span className={classes.checkmark}></span>
              {t("Catalogs.infrastructureresource.validSignature")}
            </label>
            <button className={classes.btn_link}>
              {t("Catalogs.infrastructureresource.viewProofDetails")}
            </button>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.infrastructureresource.NodeTitle")}</h3>
        <div className={classes.card}>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.infrastructureresource.serviceType")}:</strong> {nodeInfo["gx:serviceType"]}
            </label>
          </div>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.infrastructureresource.databaseEngine")}:</strong> {nodeInfo["gx:databaseEngine"]}
            </label>
          </div>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.infrastructureresource.storageAsset")}:</strong> {nodeInfo["gx:storageAsset"]}
            </label>
          </div>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.infrastructureresource.location")}:</strong> {nodeInfo["gx:location"]}
            </label>
          </div>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.infrastructureresource.cpuCores")}:</strong> {technicalAttributes["gx:cpuCores"]}
              <p>{technicalAttributes["gx:storageType"]}</p>
            </label>
          </div>
          <div className={classes.attribute_item}>
            <label>
              <strong>{t("Catalogs.infrastructureresource.networkZone")}:</strong> {technicalAttributes["gx:networkZone"]}
            </label>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.infrastructureresource.policiesTitle")}</h3>
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
          <p>{t("Catalogs.infrastructureresource.copyOwner")}</p>
          <div className={classes.field_box}>{generalInfo.copyrightOwner}</div>
          <button className={classes.btn_action}>
            {t("Catalogs.infrastructureresource.negotiationTitle")}
          </button>
        </div>
      </section>
    </div>    
  );
}

export default SectionInfrastructure;