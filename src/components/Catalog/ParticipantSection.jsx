import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SectionParticipant({ participant }) {
  const { t } = useTranslation();

  const subject = participant?.credentialSubject || {};
  const generalInfo = {
    id: participant["id"] || "—",
    legalName: subject["gx:legalName"] || "—",
    address: subject["gx:headquarterAddress"]["gx:streetAddress"] || "—",
    legalRegisterNumber: subject["gx:legalRegistrationNumber"]["gx:leiCode"] || "—",
    vatId: subject["gx:legalRegistrationNumber"]["gx:vatID"] || "—",
  };

  const compliance = subject["gx:compliance"] || {};
  const parentOrganization = subject["gx:parentOrganization"] || '-';
  const subOrganization = subject["gx:subOrganization"] || [];
  
  const contactLegal = subject["gx:compliance"] || {};

  return (
    <div className={classes.participant_container}>
      <section className={classes.column}>
        <h3>{t("Catalogs.participant.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.participant.participantDid")}</label>
            <div className={classes.field_box}>{generalInfo.id}</div>
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.participant.legalName")}</label>
            <span className={`fi fi-${subject["gx:headquarterAddress"]["gx:addressCountryCode"].toLowerCase()}`}></span>
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.participant.headquarterAddress")}</label>
            <span className={`fi fi-${subject["gx:headquarterAddress"]["gx:addressCountryCode"].toLowerCase()}`}></span>
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.participant.legalRegNumber")}</label>
            <select><option>VAT ID: {generalInfo.vatId}</option></select>
          </div>

          <div className={classes.status_badge_container}>
            <span className={classes.hexagon_icon }>✓</span>
            <strong>{t("Catalogs.participant.validSignature")}</strong>
            <button className={classes.btn_primary}>{t("Catalogs.participant.viewProofDetails")}</button>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.participant.complianceCert")}</h3>
        <div className={`${classes.void_card} ${classes.bg_white}`}>
          <div className={classes.status_badge_container}>
            <div className={classes.hexagon_icon}>✓</div>
            <strong>{compliance['gx:complianceLabel']}</strong>
            <p>{t("Catalogs.participant.certifiedBy")} {compliance['gx:certifiedBy']}</p>
          </div>
        </div>

        <h3>{t("Catalogs.participant.parentOrg")}</h3>
        <div className={classes.void_card}>
          <div className={classes.sub_card}>
            <div className={classes.icon_text}>
              <span>📍</span>
              <div>
                <strong>{t("Catalogs.participant.parentOrg")}</strong>
                <p>{parentOrganization}</p>
              </div>
            </div>
          </div>

          {subOrganization && subOrganization.length > 0 ? (
            subOrganization.map((sub, idx) => (
              <div className={classes.sub_card} key={sub["@id"] || index}>
                <div className={classes.icon_text}>
                  <span>🏢</span>
                  <div>
                    <strong>{t("Catalogs.participant.subOrgs")}</strong>
                    <p>{sub["@id"]}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={classes.sub_card}>
              <div className={classes.icon_text}>
                <span>🏢</span>
                <div>
                  <strong>{t("Catalogs.participant.subOrgs")}</strong>
                  <p>{t("Catalogs.participant.noneLabel")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.participant.contactLegal")}</h3>
        <div className={`${classes.card} ${classes.highlight_card}`}>
          <div className={classes.icon_text}>
            <CheckCircleIcon sx={{ color: "white" }} />
            <div>
              <strong>{t("Catalogs.participant.usage")}</strong>
              <p>{t("Catalogs.participant.licenseInfo")}</p>
            </div>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.icon_text}>
            <div>📧</div>
            <div>
              <strong>{t("Catalogs.participant.contactInfoTitle")}</strong>
              <p className={classes.details}>{t("Catalogs.participant.email")}: info@pethub.com</p>
              <p className={classes.details}>{t("Catalogs.participant.social")}: {subject["gx:headquarterAddress"]["gx:addressCountryCode"]}</p>
            </div>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.icon_text}>
            <div>⚖️</div>
            <div>
              <strong>{t("Catalogs.participant.governingLawTitle")}</strong>
              <p className={classes.details}>{t("Catalogs.participant.jurisdiction")}</p>
              <p className={classes.details}>{t("Catalogs.participant.pointTemplates")}</p>
              <a href="#master-agreement" className={classes.link}>{t("Catalogs.participant.viewMasterAgreement")}</a>
            </div>
          </div>
          <button className={classes.btn_action}>
            {t("Catalogs.participant.linkServiceOffering")}
          </button>
        </div>
      </section>
    </div>    
  );
}

export default SectionParticipant;