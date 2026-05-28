import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import GavelIcon from '@mui/icons-material/Gavel';
import AssignmentIcon from '@mui/icons-material/Assignment';

function SectionPolicies({ policies }) {
  const { t } = useTranslation();

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const subject = policies?.credentialSubject || {};
  const generalInfo = {
    id: subject["id"] || policies?.["id"] || "—",
    policyName: subject["gx:policyName"] || "—",
    issuer: policies?.["issuer"] || "—",
    issuanceDate: policies?.["issuanceDate"] || "—",
    type: Array.isArray(policies?.["type"]) ? policies["type"].join(', ') : (policies?.["type"] || "—"),
  };

  const accessPolicy = subject["gx:accessPolicy"] || {};
  const accessRules = accessPolicy["gx:rules"] || [];
  const usagePolicy = subject["gx:usagePolicy"] || {};
  const usagePermissions = usagePolicy["odrl:permission"] || [];
  const usageProhibitions = usagePolicy["odrl:prohibition"] || [];
  const contractDefinitions = subject["gx:contractDefinitions"] || {};

  const getActionLabel = (permission) => {
    const actionId = permission?.["odrl:action"]?.["@id"] || permission?.["odrl:action"] || '';
    return actionId.includes(':') ? actionId.split(':')[1] : actionId;
  };

  return (
    <div className={classes.participant_container}>

      {/* Column 1 — General Info */}
      <section className={classes.column}>
        <h3>{t("Catalogs.Policy.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.Policy.polleyId")}</label>
            <div className={classes.field_box}>{generalInfo.id}</div>
          </div>
          <div className={classes.input_group}>
            <label>{t("Catalogs.Policy.policyName")}</label>
            <div className={classes.field_box}>{generalInfo.policyName}</div>
          </div>
          <div className={classes.input_group}>
            <label>{t("Catalogs.Policy.issuer")}</label>
            <div className={classes.field_box}>{generalInfo.issuer}</div>
          </div>
          <div className={classes.input_group}>
            <label>{t("Catalogs.Policy.issuanceDate")}</label>
            <div className={classes.field_box}>{generalInfo.issuanceDate}</div>
          </div>
          <div className={classes.input_group}>
            <label>{t("Catalogs.Policy.policyType")}</label>
            <div className={classes.field_box}>{generalInfo.type}</div>
          </div>
        </div>
      </section>

      {/* Column 2 — Access Policies */}
      <section className={classes.column}>
        <h3>{t("Catalogs.Policy.accessPoliciesTitle")}</h3>
        <div className={classes.void_card}>
          {accessRules.length > 0 ? (
            accessRules.map((rule, idx) => {
              const permission = rule["odrl:permission"];
              const actionLabel = getActionLabel(permission);
              const prohibitions = rule["odrl:prohibition"] || [];
              const obligations = rule["odrl:obligation"] || [];
              return (
                <div className={classes.sub_card} key={rule.id || idx}>
                  <div className={classes.icon_text}>
                    <AssignmentIcon sx={{ color: primaryColor, flexShrink: 0 }} />
                    <div>
                      <strong>{rule.policyId || rule.id}</strong>
                      {actionLabel && (
                        <p>
                          <CheckCircleIcon sx={{ fontSize: 13, color: '#00c853', mr: 0.5 }} />
                          {t("Catalogs.Policy.permissionAction")}: <em>{actionLabel}</em>
                        </p>
                      )}
                      {prohibitions.length > 0 && (
                        <p>
                          <CancelRoundedIcon sx={{ fontSize: 13, color: '#e53935', mr: 0.5 }} />
                          {t("Catalogs.Policy.prohibitions")}: {prohibitions.length}
                        </p>
                      )}
                      {obligations.length > 0 && (
                        <p>⚠ {t("Catalogs.Policy.obligations")}: {obligations.length}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={classes.sub_card}>
              <div className={classes.icon_text}>
                <span>🏢</span>
                <div>
                  <strong>{t("Catalogs.Policy.noAccessPolicies")}</strong>
                  <p>{t("Catalogs.Policy.noAccessPoliciesDesc")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Column 3 — Usage Policy + Contract Definitions */}
      <section className={classes.column}>
        <h3>{t("Catalogs.Policy.usageTitle")}</h3>

        {usagePolicy["description"] && (
          <div className={classes.card}>
            <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{usagePolicy["description"]}</p>
          </div>
        )}

        {usagePermissions.length > 0 ? (
          usagePermissions.map((per, idx) => (
            <div className={`${classes.void_card} ${classes.highlight_card}`} key={idx}>
              <div className={classes.icon_text}>
                <CheckCircleIcon sx={{ color: "white" }} />
                <div>
                  <strong>{getActionLabel(per) || t("Catalogs.Policy.permissionAction")}</strong>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.void_card}>
            <div className={classes.icon_text}>
              <div>❌</div>
              <div>
                <strong>{t("Catalogs.Policy.noUsagePolicies")}</strong>
                <p>{t("Catalogs.Policy.noUsagePoliciesDesc")}</p>
              </div>
            </div>
          </div>
        )}

        {usageProhibitions.length > 0 ? (
          usageProhibitions.map((pro, idx) => (
            <div className={`${classes.void_card} ${classes.highlight_red_card}`} key={idx}>
              <div className={classes.icon_text}>
                <CancelRoundedIcon sx={{ color: "white" }} />
                <div>
                  <strong>{getActionLabel(pro)}</strong>
                  {pro["description"] && <p>{pro["description"]}</p>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.void_card}>
            <div className={classes.icon_text}>
              <div>❌</div>
              <div>
                <strong>{t("Catalogs.Policy.noProhibition")}</strong>
                <p>{t("Catalogs.Policy.noProhibitionDesc")}</p>
              </div>
            </div>
          </div>
        )}

        {(contractDefinitions["gx:governingLaw"] || contractDefinitions["gx:arbitration"] || contractDefinitions["gx:termsAndConditions"]) && (
          <div className={classes.card}>
            <div className={classes.icon_text}>
              <GavelIcon sx={{ color: primaryColor, flexShrink: 0 }} />
              <div>
                <strong>{t("Catalogs.Policy.legalTemplate")}</strong>
                {contractDefinitions["gx:governingLaw"] && (
                  <p>{t("Catalogs.Policy.governingLaw")}: {contractDefinitions["gx:governingLaw"]}</p>
                )}
                {contractDefinitions["gx:arbitration"] && (
                  <p>{t("Catalogs.Policy.terms&conditions")}: {contractDefinitions["gx:arbitration"]}</p>
                )}
                {contractDefinitions["gx:termsAndConditions"] && (
                  <p style={{ overflowWrap: 'anywhere', fontSize: '0.8rem' }}>
                    <a href={contractDefinitions["gx:termsAndConditions"]} target="_blank" rel="noreferrer" style={{ color: primaryColor }}>
                      {t("Catalogs.Policy.viewFullPolicy")}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default SectionPolicies;
