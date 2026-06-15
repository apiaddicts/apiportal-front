import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import GavelIcon from '@mui/icons-material/Gavel';
import AssignmentIcon from '@mui/icons-material/Assignment';

function formatDid(did) {
  if (!did || did === '—') return did;
  if (did.startsWith('did:web:')) return did.replace('did:web:', '');
  return did;
}

function formatDate(iso) {
  if (!iso || iso === '—') return iso;
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return iso; }
}

function formatId(id) {
  if (!id || id === '—') return id;
  try {
    const url = new URL(id);
    return url.pathname.split('/').filter(Boolean).slice(-2).join('/');
  } catch { return id; }
}

function SectionPolicies({ policies }) {
  const { t } = useTranslation();

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const subject = policies?.credentialSubject || {};
  const generalInfo = {
    id: subject["id"] || policies?.["id"] || "—",
    policyName: subject["gx:policyName"] || "—",
    issuer: formatDid(policies?.["issuer"] || "—"),
    issuanceDate: formatDate(policies?.["issuanceDate"] || "—"),
    types: Array.isArray(policies?.["type"]) ? policies["type"] : (policies?.["type"] ? [policies["type"]] : []),
  };

  const accessPolicy = subject["gx:accessPolicy"] || {};
  const accessRules = accessPolicy["gx:rules"] || [];
  const usagePolicy = subject["gx:usagePolicy"] || {};
  const usagePermissions = Array.isArray(usagePolicy["odrl:permission"]) ? usagePolicy["odrl:permission"] : (usagePolicy["odrl:permission"] ? [usagePolicy["odrl:permission"]] : []);
  const usageProhibitions = Array.isArray(usagePolicy["odrl:prohibition"]) ? usagePolicy["odrl:prohibition"] : (usagePolicy["odrl:prohibition"] ? [usagePolicy["odrl:prohibition"]] : []);
  const contractDefinitions = subject["gx:contractDefinitions"] || {};

  const hasUsageContent = usagePermissions.length > 0 || usageProhibitions.length > 0;
  const hasLegalContent = contractDefinitions["gx:governingLaw"] || contractDefinitions["gx:arbitration"] || contractDefinitions["gx:termsAndConditions"];

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
            <div className={`${classes.field_box} ${classes.field_mono}`}>{formatId(generalInfo.id)}</div>
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
            <div className={classes.type_badges}>
              {generalInfo.types.filter(tp => tp !== 'VerifiableCredential').map((tp) => (
                <span key={tp} className={classes.type_badge}>{tp}</span>
              ))}
            </div>
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
              const prohibitions = Array.isArray(rule["odrl:prohibition"]) ? rule["odrl:prohibition"] : [];
              const obligations = Array.isArray(rule["odrl:obligation"]) ? rule["odrl:obligation"] : [];
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
                <AssignmentIcon sx={{ color: '#94a3b8', flexShrink: 0 }} />
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

        {hasUsageContent && (
          <>
            {usagePermissions.map((per, idx) => (
              <div className={`${classes.void_card} ${classes.highlight_card}`} key={idx}>
                <div className={classes.icon_text}>
                  <CheckCircleIcon sx={{ color: "white" }} />
                  <div>
                    <strong>{getActionLabel(per) || t("Catalogs.Policy.permissionAction")}</strong>
                  </div>
                </div>
              </div>
            ))}
            {usageProhibitions.map((pro, idx) => (
              <div className={`${classes.void_card} ${classes.highlight_red_card}`} key={idx}>
                <div className={classes.icon_text}>
                  <CancelRoundedIcon sx={{ color: "white" }} />
                  <div>
                    <strong>{getActionLabel(pro)}</strong>
                    {pro["description"] && <p>{pro["description"]}</p>}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {hasLegalContent && (
          <div className={classes.card}>
            <div className={classes.icon_text}>
              <GavelIcon sx={{ color: primaryColor, flexShrink: 0 }} />
              <div style={{ width: '100%' }}>
                <strong>{t("Catalogs.Policy.legalTemplate")}</strong>
                {usagePolicy["description"] && (
                  <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: 8 }}>{usagePolicy["description"]}</p>
                )}
                {contractDefinitions["gx:governingLaw"] && (
                  <p>{t("Catalogs.Policy.governingLaw")}: <strong>{contractDefinitions["gx:governingLaw"]}</strong></p>
                )}
                {contractDefinitions["gx:arbitration"] && (
                  <p>{t("Catalogs.Policy.arbitration", "Arbitration")}: <strong>{contractDefinitions["gx:arbitration"]}</strong></p>
                )}
                {contractDefinitions["gx:termsAndConditions"] && (
                  <p style={{ marginTop: 6 }}>
                    <a href={contractDefinitions["gx:termsAndConditions"]} target="_blank" rel="noreferrer" style={{ color: primaryColor, fontSize: '0.85rem', fontWeight: 600 }}>
                      {t("Catalogs.Policy.viewFullPolicy")}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {!hasUsageContent && !hasLegalContent && (
          <div className={classes.card}>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0 }}>—</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default SectionPolicies;
