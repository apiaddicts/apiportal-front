import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';

function SectionContracts({ contract }) {
  const { t } = useTranslation();

  const subject = contract?.credentialSubject || {};

  const parties = subject["gx:parties"] || {};
  const generalInfo = {
    contractId: subject["gx:contractId"] || "—",
    contractName: subject["gx:contractName"] || "—",
    version: subject["gx:version"] || "—",
    status: subject["gx:status"] || "—",
    offeringModel: subject["gx:offeringModel"] || "—",
    description: subject["gx:description"] || "",
    provider: parties["gx:provider"] || "—",
    consumer: parties["gx:consumer"] || "—",
    issuer: contract?.["issuer"] || "—",
    issuanceDate: contract?.["issuanceDate"] || "—",
  };

  const appliesTo = subject["gx:appliesTo"] || [];
  const termsAndConditions = subject["gx:termsAndConditions"] || [];
  const compliance = subject["gx:compliance"] || {};
  const dataSovereignty = compliance["gx:dataSovereignty"] || {};

  return (
    <div className={classes.contract_section}>

      {/* General Info */}
      <h3 className={classes.subsection_title}>{t("Catalogs.Contract.generalInfo")}</h3>
      <div className={classes.general_info_card}>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.contractId")}</label>
          <div className={classes.field_box}>{generalInfo.contractId}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.contractName")}</label>
          <div className={classes.field_box}>{generalInfo.contractName}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.version")}</label>
          <div className={classes.field_box}>{generalInfo.version}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.status")}</label>
          <div className={classes.field_box}>{generalInfo.status}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.offeringModel")}</label>
          <div className={classes.field_box}>{generalInfo.offeringModel}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.provider")}</label>
          <div className={classes.field_box}>{generalInfo.provider}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.consumer")}</label>
          <div className={classes.field_box}>{generalInfo.consumer}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.issuer")}</label>
          <div className={classes.field_box}>{generalInfo.issuer}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.issuanceDate")}</label>
          <div className={classes.field_box}>{generalInfo.issuanceDate}</div>
        </div>
        {generalInfo.description && (
          <div className={classes.grid_item} style={{ gridColumn: '1 / -1' }}>
            <label>{t("Catalogs.Contract.description")}</label>
            <div className={classes.field_box}>{generalInfo.description}</div>
          </div>
        )}
      </div>

      {/* Linked Services (gx:appliesTo) */}
      {appliesTo.length > 0 && (
        <>
          <h3 className={classes.subsection_title}>{t("Catalogs.Contract.linkedAssets")}</h3>
          <div className={classes.table_wrapper}>
            <table>
              <thead>
                <tr>
                  <th>{t("Catalogs.Contract.assetsName")}</th>
                  <th>{t("Catalogs.Contract.linkType")}</th>
                </tr>
              </thead>
              <tbody>
                {appliesTo.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{item.id || "—"}</td>
                    <td>{item.type || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Terms & Conditions */}
      {termsAndConditions.length > 0 && (
        <>
          <h3 className={classes.subsection_title}>{t("Catalogs.Contract.termsAndConditions")}</h3>
          <div className={classes.table_wrapper}>
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Hash</th>
                </tr>
              </thead>
              <tbody>
                {termsAndConditions.map((tc, idx) => (
                  <tr key={idx}>
                    <td>
                      <a href={tc["gx:URL"]} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)' }}>
                        {tc["gx:URL"] || "—"}
                      </a>
                    </td>
                    <td>{tc["gx:hash"] || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Compliance / Data Sovereignty */}
      {dataSovereignty["gx:dataLocation"] && (
        <>
          <h3 className={classes.subsection_title}>{t("Catalogs.Contract.compliance")}</h3>
          <div className={classes.general_info_card}>
            <div className={classes.grid_item}>
              <label>{t("Catalogs.Contract.dataLocation")}</label>
              <div className={classes.field_box}>{dataSovereignty["gx:dataLocation"]}</div>
            </div>
            <div className={classes.grid_item}>
              <label>{t("Catalogs.Contract.isSovereign")}</label>
              <div className={classes.field_box}>{dataSovereignty["gx:isSovereign"] ? "✓ Yes" : "✗ No"}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SectionContracts;
