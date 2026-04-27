import React from "react";
import classes from "./section.module.scss";
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

function CheckRow({ ok, label, errorMsg }) {
  return (
    <div style={{ marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            width: 28,
            height: 28,
            backgroundColor: ok ? 'var(--primary-color)' : '#e53935',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem',
            flexShrink: 0,
          }}
        >
          {ok ? '✓' : '✗'}
        </span>
        <span style={{ fontSize: '0.85rem' }}>{label}</span>
      </div>
      {!ok && errorMsg && (
        <p style={{ fontSize: '0.78rem', color: '#e53935', margin: 0 }}>{errorMsg}</p>
      )}
    </div>
  );
}

function GaiaXPanel({ data, loading, t }) {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress size={28} />
      </div>
    );
  }

  if (!data || data._error) {
    return (
      <div className={`${classes.void_card} ${classes.highlight_red_card}`}>
        <p style={{ color: '#c62828', fontWeight: 600 }}>{t('Catalogs.participant.gaiaX.genericError')}</p>
      </div>
    );
  }

  if (data.found === false) {
    return (
      <div className={`${classes.void_card} ${classes.highlight_red_card}`}>
        <p style={{ fontWeight: 600 }}>{t('Catalogs.participant.gaiaX.notFound')}</p>
      </div>
    );
  }

  if (data.hasCredential === false) {
    return (
      <div className={classes.void_card}>
        <div className={classes.sub_card}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>{t('Catalogs.participant.gaiaX.noCredential')}</p>
        </div>
      </div>
    );
  }

  const isActive = data.isActive;
  const badgeStyle = {
    display: 'block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 700,
    fontSize: '0.82rem',
    color: '#fff',
    backgroundColor: isActive ? '#00c853' : '#e53935',
    marginBottom: '12px',
    textAlign: 'center',
  };

  return (
    <div className={classes.card}>
      <span style={badgeStyle}>
        {isActive ? t('Catalogs.participant.gaiaX.active') : t('Catalogs.participant.gaiaX.inactive')}
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px', alignItems: 'center', textAlign: 'center' }}>
        <div><span style={{ fontSize: '0.8rem', color: '#888' }}>{t('Catalogs.participant.gaiaX.complianceLabel')}</span><br /><strong style={{ fontSize: '0.9rem' }}>{data.complianceLabel ?? '—'}</strong></div>
        <div><span style={{ fontSize: '0.8rem', color: '#888' }}>{t('Catalogs.participant.gaiaX.certifiedBy')}</span><br /><strong style={{ fontSize: '0.9rem' }}>{data.certifiedBy ?? '—'}</strong></div>
        <div><span style={{ fontSize: '0.8rem', color: '#888' }}>{t('Catalogs.participant.gaiaX.trustFramework')}</span><br /><span style={{ fontSize: '0.88rem' }}>{data.trustFrameworkVersion ?? '—'}</span></div>
        <div><span style={{ fontSize: '0.8rem', color: '#888' }}>{t('Catalogs.participant.gaiaX.issuer')}</span><br /><span style={{ fontSize: '0.85rem', overflowWrap: 'anywhere' }}>{data.issuer ?? '—'}</span></div>
        <div><span style={{ fontSize: '0.8rem', color: '#888' }}>{t('Catalogs.participant.gaiaX.issuanceDate')}</span><br /><span style={{ fontSize: '0.88rem' }}>{data.issuanceDate ?? '—'}</span></div>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>{t('Catalogs.participant.gaiaX.expirationDate')}</span><br />
          <span style={{ fontSize: '0.88rem', color: data.isExpired ? '#e53935' : 'inherit' }}>
            {data.expirationDate ?? t('Catalogs.participant.gaiaX.noExpiration')}
          </span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
          {t('Catalogs.participant.gaiaX.checks')}
        </p>
        <CheckRow ok={data.signatureValid} label={t('Catalogs.participant.gaiaX.checkSignature')} />
        <CheckRow ok={data.issuerTrusted} label={t('Catalogs.participant.gaiaX.checkIssuer')} />
        <CheckRow ok={!data.isExpired} label={t('Catalogs.participant.gaiaX.checkExpired')} />
      </div>
    </div>
  );
}

function SectionParticipant({ participant, gaiaXData, gaiaXLoading }) {
  const { t } = useTranslation();

  const subject = participant?.credentialSubject || {};
  const generalInfo = {
    id: participant?.["id"] || "—",
    legalName: subject?.["gx:legalName"] || "—",
    address: subject?.["gx:headquarterAddress"]?.["gx:streetAddress"] || "—",
    legalRegisterNumber: subject?.["gx:legalRegistrationNumber"]?.["gx:leiCode"] || "—",
    vatId: subject?.["gx:legalRegistrationNumber"]?.["gx:vatID"] || "—",
  };

  const countryCode = subject?.["gx:headquarterAddress"]?.["gx:addressCountryCode"]?.toLowerCase() || '';

  const parentOrganization = subject["gx:parentOrganization"] || '-';
  const subOrganization = subject["gx:subOrganization"] || [];

  return (
    <div className={classes.participant_container}>
      <section className={classes.column}>
        <h3>{t("Catalogs.participant.generalInfo")}</h3>
        <div className={classes.card}>
          <div className={classes.input_group}>
            <label>{t("Catalogs.participant.participantDid")}</label>
            <div className={`${classes.field_box} mt-2`}>{generalInfo.id}</div>
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.participant.legalName")}</label>
            {countryCode && <span className={`fi fi-${countryCode}`}></span>}
          </div>

          <div className={classes.info_row}>
            <label>{t("Catalogs.participant.headquarterAddress")}</label>
            {countryCode && <span className={`fi fi-${countryCode}`}></span>}
          </div>

          <div className={classes.input_group}>
            <label>{t("Catalogs.participant.legalRegNumber")}</label>
            <select className="mt-2"><option>VAT ID: {generalInfo.vatId}</option></select>
          </div>

          <div className={classes.status_badge_container}>
            <span className={classes.hexagon_icon}>✓</span>
            <strong>{t("Catalogs.participant.validSignature")}</strong>
            <button className={classes.btn_primary}>{t("Catalogs.participant.viewProofDetails")}</button>
          </div>
        </div>
      </section>

      <section className={classes.column}>
        <h3>{t("Catalogs.participant.complianceCert")}</h3>
        <GaiaXPanel data={gaiaXData} loading={gaiaXLoading} t={t} />

        <h3 className="mt-3">{t("Catalogs.participant.parentOrg")}</h3>
        <div className={classes.void_card}>
          <div className={classes.sub_card}>
            <div className={classes.card_layout}>
              <span>📍</span>
              <div>
                <strong>{t("Catalogs.participant.parentOrg")}</strong>
                <p>{parentOrganization}</p>
              </div>
            </div>
          </div>

          {subOrganization && subOrganization.length > 0 ? (
            subOrganization.map((sub, idx) => (
              <div className={classes.sub_card} key={sub["@id"] || idx}>
                <div className={classes.card_layout}>
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
              <div className={classes.card_layout}>
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
          <div className={classes.card_layout}>
            <CheckCircleIcon sx={{ color: "white" }} />
            <div>
              <strong>{t("Catalogs.participant.usage")}</strong>
              <p>{t("Catalogs.participant.licenseInfo")}</p>
            </div>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.card_layout}>
            <div>📧</div>
            <div>
              <strong>{t("Catalogs.participant.contactInfoTitle")}</strong>
              <p className={classes.details}>{t("Catalogs.participant.email")}: info@pethub.com</p>
              <p className={classes.details}>{t("Catalogs.participant.social")}: {countryCode}</p>
            </div>
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.card_layout}>
            <div>⚖️</div>
            <div>
              <strong>{t("Catalogs.participant.governingLawTitle")}</strong>
              <p className={classes.details}>{t("Catalogs.participant.jurisdiction")}</p>
              <p className={classes.details}>{t("Catalogs.participant.pointTemplates")}</p>
              <a href="#master-agreement" className={classes.link}>{t("Catalogs.participant.viewMasterAgreement")}</a>
            </div>
          </div>
          <div className={classes.status_badge_container}>
            <button className={classes.btn_action}>
              {t("Catalogs.participant.linkServiceOffering")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SectionParticipant;
