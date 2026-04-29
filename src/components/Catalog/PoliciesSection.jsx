import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function SectionPolicies({ policies }) {
  const { t } = useTranslation();

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  const titleIconAccessPolicies = {
    "gx:compliance": {
      "title": "Gaia-X Compliance",
      "label": "Compliance Level",
      "icon": <CheckCircleIcon sx={{ color: primaryColor }} />
    },
    "gx:location": {
      "title": "Geographic Restriction",
      "label": "Location",
      "icon": <LocationOnOutlinedIcon sx={{ color: primaryColor }} />
    }
  }

  const subject = policies?.credentialSubject || {};
  const generalInfo = {
    id: subject["id"] || "—",
    policyName: subject["gx:policyName"] || "—",
    issuer: policies["issuer"] || "—",
    issuanceDate: policies["issuanceDate"] || "—",
    type: policies["type"] || "—",
  };
  const accessPolicy = subject["gx:accessPolicy"] || {};
  const usagePolicy = subject["gx:usagePolicy"] || {};
  const permissions = usagePolicy["odrl:permission"] || [];
  const prohibitions = usagePolicy["odrl:prohibition"] || [];
  const contractDefinitions = subject["gx:contractDefinitions"] || {};

  return (
    <div className={classes.participant_container}>
      <section className={classes.column}>
        <h3>{t("Catalogs.Policy.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.info_row}>
            <label>{t("Catalogs.Policy.polleyId")}</label>
            <span className={``}></span>
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.Policy.policyName")}</label>
            <MoreVertIcon style={{ cursor: "pointer" }} />
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.Policy.issuer")}</label>
            <MoreVertIcon style={{ cursor: "pointer" }} />
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.Policy.issuanceDate")}</label>
            <MoreVertIcon style={{ cursor: "pointer" }} />
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.Policy.policyType")}</label>
            <span className={``}></span>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.Policy.accessPoliciesTitle")}</h3>
        <div className={classes.void_card}>
          {accessPolicy && accessPolicy['gx:rules'] && accessPolicy['gx:rules'].length > 0 ? (
            accessPolicy['gx:rules'].map((pol, idx) => (
              <div className={classes.sub_card} key={idx}>
                <div className={classes.icon_text}>
                  <span>{titleIconAccessPolicies[pol['attribute']]?.icon}</span>
                  <div>
                    <strong>{titleIconAccessPolicies[pol['attribute']]?.title}</strong>
                    <p>{titleIconAccessPolicies[pol['attribute']]?.label}: {Array.isArray(pol['value']) ? pol['value'].join(' / ') : pol['value']}</p>
                  </div>
                </div>
              </div>
            ))
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

      <section className={classes.column}>
        <h3>{t("Catalogs.Policy.usageTitle")}</h3>
        {permissions && permissions.length > 0 ?
        permissions.map((per, idx) => (
          <div className={`${classes.void_card} ${classes.highlight_card}`} key={idx}>
            <div className={classes.icon_text}>
              <CheckCircleIcon sx={{ color: "white" }} />
              <div>
                <strong>{per["odrl:action"].split(':')[1]}</strong>
                <p>
                  {t("Catalogs.Policy.usageDesc")}
                  {(per["odrl:constraint"][0]["odrl:rightOperand"].match(/\b\d{4}\b/) || [])[0]}
                </p>
              </div>
            </div>
          </div>
        )) :
          <div className={classes.void_card}>
            <div className={classes.icon_text}>
              <div>❌</div>
              <div>
                <strong>{t("Catalogs.Policy.noUsagePolicies")}</strong>
                <p>{t("Catalogs.Policy.noUsagePoliciesDesc")}</p>
              </div>
            </div>
          </div>
        }
        {prohibitions && prohibitions.length > 0 ?
        prohibitions.map((pro, idx) => (
          <div className={`${classes.void_card} ${classes.highlight_red_card}`} key={idx}>
            <div className={classes.icon_text}>
              <CancelRoundedIcon sx={{ color: "white" }} />
              <div>
                <strong>{pro["odrl:action"].split(':')[1]}</strong>
                <p>
                  {pro["description"]}
                </p>
              </div>
            </div>
          </div>
        )) :
          <div className={classes.void_card}>
            <div className={classes.icon_text}>
              <div>❌</div>
              <div>
                <strong>{t("Catalogs.Policy.noProhibition")}</strong>
                <p>{t("Catalogs.Policy.noProhibitionDesc")}</p>
              </div>
            </div>
          </div>
        }
        <div className={classes.card}>
          <div className={classes.icon_text}>
            <div>⚖️</div>
            <div>
              <strong>{t("Catalogs.Policy.legalTemplate")}</strong>
              <p className={classes.details}>{t("Catalogs.Policy.terms&conditions")}: {contractDefinitions["gx:arbitration"]}</p>
              <p className={classes.details}>{t("Catalogs.Policy.governingLaw")} {contractDefinitions["gx:governingLaw"]}</p>
            </div>
          </div>
          <button className={classes.btn_action}>
            {t("Catalogs.Policy.viewFullPolicy")}
          </button>
        </div>
      </section>
    </div>
  );
}

export default SectionPolicies;