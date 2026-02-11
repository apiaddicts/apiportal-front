import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';

function SectionAssets({ serviceOffering }) {
  const { t } = useTranslation();

  if (!serviceOffering) return <div>{t("Catalogs.Asset.noData")}</div>;

  const assets = serviceOffering?.credentialSubject?.["gx:aggregationOf"] || [];

  return (
    <div className={classes.section}>
      <h1 className={classes.section_title}>{t("Catalogs.Asset.title")}</h1>
      <div className={classes.asset_table}>
        {assets.map((a) => (
          <div className={classes.asset_row} key={a.id}>
            <div className={classes.asset_icon}>📦</div>
            <div className={classes.asset_info}>
              <div className={classes.asset_name}>{a["gx:name"]}</div>
              <div className={classes.asset_type}>{a.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionAssets;