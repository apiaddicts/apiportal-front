import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';

function SectionContracts({ contract }) {
  const { t } = useTranslation();

  const subject = contract?.credentialSubject || {};
  const parties = subject["gx:parties"] || {};
  const generalInfo = {
    contractId: subject["gx:contractId"] || "—",
    provider: parties["gx:provider"] || "—",
    status: subject["gx:status"] || "—",
    consumer: parties["gx:consumer"] || "—",
    offeringModel: subject["gx:offeringModel"] || "—",
  };

  const policyClauses = subject["gx:policyClauses"] || [];
  const linkedAssets = subject["gx:linkedAssets"] || [];

  return (
    <div className={classes.contract_section}>
      <h3 className={classes.subsection_title}>{t("Catalogs.Contract.generalInfo")}</h3>
      <div className={classes.general_info_card}>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.contractId")}</label>
          <div className={classes.field_box}>{generalInfo.contractId}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.provider")}</label>
          <div className={classes.field_box}>{generalInfo.provider}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.status")}</label>
          <div className={classes.field_box}>{generalInfo.status}</div>
        </div>
        <div className={classes.grid_item}>
          <label>{t("Catalogs.Contract.consumer")}</label>
          <div className={classes.field_box}>{generalInfo.consumer}</div>
        </div>
        <div className={`${classes.grid_item}`}>
          <label>{t("Catalogs.Contract.offeringModel")}</label>
          <div className={classes.field_box}>{generalInfo.offeringModel}</div>
        </div>
      </div>

      <h3 className={classes.subsection_title}>{t("Catalogs.Contract.PolicyClauses")}</h3>
      <table className={classes.table_wrapper}>
        <thead>
          <tr>
            <th>{t("Catalogs.Contract.type")}</th>
            <th>{t("Catalogs.Contract.clause")}</th>
            <th>{t("Catalogs.Contract.metric")}</th>
            <th>{t("Catalogs.Contract.value")}</th>
          </tr>
        </thead>
        <tbody>
          {policyClauses.map((p, idx) => (
            <tr key={p.value}>
              <td>{p.type || "—"}</td>
              <td>{p.clause || "—"}</td>
              <td>{p.metric || "—"}</td>
              <td>{p.value || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h3 className={classes.subsection_title}>{t("Catalogs.Contract.linkedAssets")}</h3>
      <table className={classes.table_wrapper}>
        <thead>
          <tr>
            <th>{t("Catalogs.Contract.assetsName")}</th>
            <th>{t("Catalogs.Contract.datasetName")}</th>
            <th>{t("Catalogs.Contract.linkType")}</th>
            <th>{t("Catalogs.Contract.linkProducer")}</th>
          </tr>
        </thead>
        <tbody>
          {linkedAssets.map((a, idx) => (
            <tr key={idx}>
              <td>{a.assetName || "—"}</td>
              <td>{a.datasetName || "—"}</td>
              <td>{a.type || "—"}</td>
              <td>{a.producer || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default SectionContracts;