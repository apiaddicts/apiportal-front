import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';

function SectionPolicies({ contract }) {
  const { t } = useTranslation();

  const usage = contract?.credentialSubject?.["gx:usagePolicy"] || {};
  const permissions = usage["odrl:permission"] || [];
  const prohibitions = usage["odrl:prohibition"] || [];

  return (
    <div className={classes.section}>
      <h1 className={classes.section_title}>{t("Catalogs.Policy.title")}</h1>

      <h2 className={classes.policy_group_title}>{t("Catalogs.Policy.permissions")}</h2>
      {permissions.map((p, i) => (
        <div className={classes.policy_card + classes.policy_card__perm} key={i}>
          <div className={classes.policy_header}>{t("Catalogs.Policy.permission")}</div>
          <p>{t("Catalogs.Policy.allow")}: {p["odrl:action"]?.map(a => a["odrl:type"]).join(", ")}</p>
        </div>
      ))}

      <h2 className={classes.policy_group_title}>{t("Catalogs.Policy.phobictions")}</h2>
      {prohibitions.map((p, i) => (
        <div className={classes.policy_card + classes.policy_card__rohib} key={i}>
          <div className={classes.policy_header}>{t("Catalogs.Policy.prohibition")}</div>
          <p>{t("Catalogs.Policy.forbiden")}: {p["odrl:action"]?.map(a => a["odrl:type"]).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default SectionPolicies;