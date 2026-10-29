import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Icon from '../../../components/MdIcon/Icon';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import { getAgentLibraryBySlug, getCapabilityKeys, getSecuritySchemeDetails } from '../../../redux/actions/agentLibraryAction';
import classes from './agent-card.module.scss';

const VIEW_MODES = ['form', 'json'];
const SKILL_DESCRIPTION_LIMIT = 140;

const CAPABILITY_CARD_FIELDS = {
  streaming: 'streaming',
  pushNotifications: 'pushNotifications',
  taskHistory: 'stateTransitionHistory',
  extendedAgentCard: 'extendedAgentCard',
};

function Field({ label, children }) {
  return (
    <>
      <dt>{`${label}:`}</dt>
      <dd>{children || '-'}</dd>
    </>
  );
}

function SectionCard({ title, extra, empty, emptyText, children }) {
  return (
    <section className={classes.section}>
      <div className={classes.section__header}>
        <h2 className={classes.section__title}>{title}</h2>
        {extra}
      </div>
      <div className={classes.section__box}>
        {empty ? <p className={classes.empty}>{emptyText}</p> : children}
      </div>
    </section>
  );
}

function SkillDescription({ text }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;
  const isLong = text.length > SKILL_DESCRIPTION_LIMIT;

  return (
    <p className={classes.skill__description}>
      {expanded || !isLong ? text : `${text.slice(0, SKILL_DESCRIPTION_LIMIT)}…`}
      {isLong && (
        <button type='button' className={classes.link_btn} onClick={() => setExpanded((value) => !value)}>
          {expanded ? t('AgentCard.showLess') : t('AgentCard.showMore')}
        </button>
      )}
    </p>
  );
}

// Same content as the A2A tab of the agent in ApiQuality: the published agent card as a form or as raw JSON.
function AgentCard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const { agentLibraryBySlug: agent, loadingAgentLibraryBySlug } = useSelector((state) => state.agentLibrary);
  const [requestedSlug, setRequestedSlug] = useState(null);
  const [viewMode, setViewMode] = useState('form');

  useEffect(() => {
    if (params?.slug) {
      dispatch(getAgentLibraryBySlug(params.slug));
      setRequestedSlug(params.slug);
    }
  }, [params?.slug, dispatch]);

  if (!agent || requestedSlug !== params?.slug) {
    if (loadingAgentLibraryBySlug || requestedSlug !== params?.slug) return <SkeletonComponent />;
    return (
      <div className={`container ${classes.not_found}`}>
        <p className='fs__20 mb-5'>{t('AgentDetail.notFound')}</p>
        <HashLink smooth to='/agents'>{t('BannerImage.goBack')}</HashLink>
      </div>
    );
  }

  const card = agent.agentCard && typeof agent.agentCard === 'object' ? agent.agentCard : {};
  const rawCard = typeof agent.agentCard === 'string' ? agent.agentCard : JSON.stringify(card, null, 2);
  const cardCapabilities = card.capabilities && typeof card.capabilities === 'object' ? card.capabilities : {};
  const capabilityKeys = getCapabilityKeys(agent.specVersion);
  const hasCapabilities = capabilityKeys.some((key) => cardCapabilities[CAPABILITY_CARD_FIELDS[key]] !== undefined);
  const agentUrls = agent.interfaces.filter((item) => item.url);
  const versionChip = [
    agent.protocolVersion && `protocolVersion ${agent.protocolVersion}`,
    card.version && `v${card.version}`,
  ].filter(Boolean).join(' · ');

  return (
    <div className={`container ${classes.page}`}>
      <div className={classes.header}>
        <div>
          <Link to={`/agents/${agent.slug}`} className={classes.back}>
            <Icon id='MdArrowBack' />
            <span>{t('AgentCard.backToAgent')}</span>
          </Link>
          <h1 className={classes.title}>{card.name || agent.title}</h1>
        </div>
        <div className={classes.switch} role='group' aria-label={t('AgentCard.viewMode')}>
          {VIEW_MODES.map((mode) => (
            <button
              key={mode}
              type='button'
              className={`${classes.switch__btn} ${viewMode === mode ? classes['switch__btn--active'] : ''}`}
              aria-pressed={viewMode === mode}
              onClick={() => setViewMode(mode)}
            >
              {t(`AgentCard.${mode}View`)}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'json' ? (
        <SyntaxHighlighter language='json' customStyle={{ margin: 0, padding: '16px', borderRadius: '8px', fontSize: '0.85rem', background: '#f6f8fa' }}>
          {rawCard}
        </SyntaxHighlighter>
      ) : (
        <>
          <SectionCard
            title={t('AgentCard.agentCardTitle')}
            extra={versionChip && <span className={classes.chip}>{versionChip}</span>}
          >
            <dl className={classes.fields}>
              <Field label={t('AgentCard.name')}>{card.name}</Field>
              <Field label={t('AgentCard.description')}>{card.description}</Field>
              <Field label={t('AgentCard.provider')}>{agent.provider}</Field>
              <Field label={t('AgentCard.version')}>{card.version}</Field>
              <Field label={t('AgentCard.url')}>
                {agentUrls.length > 0 && agentUrls.map((item) => (
                  <span key={`${item.url}-${item.binding}`} className={classes.line}>
                    {item.url}
                    {agentUrls.length > 1 && item.binding && <small>{` (${item.binding})`}</small>}
                  </span>
                ))}
              </Field>
              <Field label={t('AgentCard.documentationUrl')}>
                {agent.documentationUrl && (
                  <a href={agent.documentationUrl} target='_blank' rel='noopener noreferrer'>{agent.documentationUrl}</a>
                )}
              </Field>
              <Field label={t('AgentCard.defaultInputModes')}>{agent.inputModes.join(', ')}</Field>
              <Field label={t('AgentCard.defaultOutputModes')}>{agent.outputModes.join(', ')}</Field>
            </dl>
          </SectionCard>

          <SectionCard
            title={t('AgentCard.capabilitiesTitle')}
            empty={!hasCapabilities}
            emptyText={t('AgentCard.noCapabilities')}
          >
            <div className={classes.table_wrapper}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>{t('AgentCard.capabilityColumn')}</th>
                    <th>{t('AgentCard.valueColumn')}</th>
                    <th>{t('AgentCard.meaningColumn')}</th>
                  </tr>
                </thead>
                <tbody>
                  {capabilityKeys.map((key) => {
                    const on = agent.capabilities[key];
                    return (
                      <tr key={key}>
                        <td className={classes.strong}>{t(`AgentDetail.features.${key}.title`)}</td>
                        <td>
                          <span className={`${classes.value} ${on ? classes['value--on'] : ''}`}>{String(on)}</span>
                        </td>
                        <td className={classes.muted}>
                          {on ? t(`AgentDetail.features.${key}.description`) : t(`AgentDetail.features.${key}.descriptionOff`)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard
            title={t('AgentCard.authenticationTitle')}
            empty={agent.securitySchemes.length === 0}
            emptyText={t('AgentCard.noAuthentication')}
          >
            <div className={classes.schemes}>
              {agent.securitySchemes.map((scheme) => (
                <div key={scheme.name} className={classes.scheme}>
                  <b>{scheme.name}</b>
                  <span>
                    {getSecuritySchemeDetails(scheme).map(({ label, value }) => `${t(`AgentCard.${label}`)}: ${value}`).join(' · ') || '-'}
                  </span>
                  {scheme.description && <span>{scheme.description}</span>}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title={t('AgentCard.skillsTitle')}
            extra={agent.skills.length > 0 && (
              <span className={classes.chip}>{t('AgentCard.skillsPublished', { count: agent.skills.length })}</span>
            )}
            empty={agent.skills.length === 0}
            emptyText={t('AgentCard.noSkills')}
          >
            <div className={classes.table_wrapper}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>{t('AgentCard.skillColumn')}</th>
                    <th>{t('AgentCard.nameColumn')}</th>
                    <th>{t('AgentCard.modesColumn')}</th>
                  </tr>
                </thead>
                <tbody>
                  {agent.skills.map((skill) => (
                    <tr key={skill.id || skill.name}>
                      <td className={classes.mono}>{skill.id}</td>
                      <td>
                        <span className={classes.strong}>{skill.name}</span>
                        <SkillDescription text={skill.description} />
                        {skill.tags.length > 0 && (
                          <div className={classes.tags}>
                            {skill.tags.map((tag) => (
                              <span key={String(tag)} className={classes.tag}>{String(tag)}</span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className={classes.muted}>
                        {[skill.inputModes.join(', '), skill.outputModes.join(', ')].filter(Boolean).join(' → ') || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
}

export default AgentCard;
