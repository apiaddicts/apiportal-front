import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';

function SectionContracts({ contract }) {
  const { t } = useTranslation();

  const subject = contract?.credentialSubject || {};
  const generalInfo = {
    contractId: subject["gx:contractId"] || "—",
    provider: subject["gx:parties"]["gx:provider"] || "—",
    status: subject["gx:status"] || "—",
    consumer: subject["gx:parties"]["gx:consumer"] || "—",
    offeringModel: subject["gx:offeringModel"] || "—",
  };

  const policyClauses = subject["gx:policyClauses"] || [];
  const linkedAssets = subject["gx:linkedAssets"] || [];

  return (
    <div className={classes.contract_section}>
      <h1 className={classes.contract_title}>{t("Catalogs.Contract.title")}</h1>
      <h2 className={classes.subsection_title}>{t("Catalogs.Contract.generalInfo")}</h2>
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
        <div className={classes.grid_item + classes.full}>
          <label>{t("Catalogs.Contract.offeringModel")}</label>
          <div className={classes.field_box}>{generalInfo.offeringModel}</div>
        </div>
      </div>

      <h2 className={classes.subsection_title}>{t("Catalogs.Contract.PolicyClauses")}</h2>
      <div className={classes.table_wrapper}>
        <table className={classes.clauses_table}>
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
              <tr key={idx}>
                <td>{p.type || "—"}</td>
                <td>{p.clause || "—"}</td>
                <td>{p.metric || "—"}</td>
                <td>{p.value || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={classes.subsection_title}>{t("Catalogs.Contract.linkedAssets")}</h2>
      <div className={classes.table_wrapper}>
        <table className={classes.assets_table}>
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
    </div>
  );
}

export default SectionContracts;