import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';

import BannerImage from '../../../components/Banner/BannerImage';
import Button from '../../../components/Buttons/Button';
import CardBasic from '../../../components/Card/CardBasic';
import CardResource from '../../../components/Card/CardResource';
import Chip from '../../../components/Chip/Chip';
import CustomMarkdown from '../../../components/CustomMarkdown';
import Icon from '../../../components/MdIcon/Icon';
import Ratings from '../../../components/Ratings';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import { getAgentLibraryBySlug, getAgentLibraries } from '../../../redux/actions/agentLibraryAction';
import config, { getMediaUrl } from '../../../services/config';
import classes from './agent-detail.module.scss';

const CONTACT_ROUTE = '/soporte';
const RATING_KEYS = ['globalRating', 'definitionRating', 'securityRating', 'qualityRating'];

const getImageUrl = (image) => (image?.length > 0
  ? getMediaUrl(image[0].formats?.medium?.url || image[0].url)
  : config.notImage);

function AgentDetail() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { agentLibraryBySlug: agent, loadingAgentLibraryBySlug, agentLibraries, backUpAgentLibraries } = useSelector((state) => state.agentLibrary);
  const [requestedSlug, setRequestedSlug] = useState(null);

  useEffect(() => {
    if (agentLibraries === null) {
      dispatch(getAgentLibraries());
    }
  }, [agentLibraries, dispatch]);

  useEffect(() => {
    if (params?.slug) {
      dispatch(getAgentLibraryBySlug(params.slug));
      setRequestedSlug(params.slug);
    }
  }, [params?.slug, dispatch]);

  if (!agent) {
    if (loadingAgentLibraryBySlug || requestedSlug !== params?.slug) return <SkeletonComponent />;
    return (
      <div className={`container ${classes.not_found}`}>
        <p className='fs__20 mb-5'>{t('AgentDetail.notFound')}</p>
        <HashLink smooth to='/agents'>{t('BannerImage.goBack')}</HashLink>
      </div>
    );
  }

  const hasAnyRating = RATING_KEYS.some((key) => !!agent.ratings?.[key]);

  const relatedAgents = backUpAgentLibraries
    .filter((other) => other.slug !== agent.slug)
    .filter((other) => other.skillTags.some((tag) => agent.skillTags.includes(tag)))
    .slice(0, 3);

  const features = [
    { key: 'streaming', on: agent.capabilities.streaming },
    { key: 'pushNotifications', on: agent.capabilities.pushNotifications },
    { key: 'taskHistory', on: agent.capabilities.taskHistory },
    { key: 'textJsonInput', on: agent.inputModes.length > 0, detail: agent.inputModes.join(', ') },
    { key: 'interactiveUi', on: agent.protocols.includes('A2UI') },
    { key: 'versionedReleases', on: true },
  ];

  const facts = [
    { key: 'version', value: agent.version },
    { key: 'provider', value: agent.provider },
    { key: 'protocols', value: agent.protocols.join(' · ') },
    { key: 'spec', value: `A2A ${agent.specVersion}` },
    {
      key: 'docs',
      value: agent.documentationUrl && (
        <a href={agent.documentationUrl} target='_blank' rel='noopener noreferrer'>
          {agent.documentationUrl.replace(/^https?:\/\//, '')}
        </a>
      ),
    },
  ].filter((fact) => fact.value);

  return (
    <div>
      <section>
        <BannerImage
          title={agent.title}
          apiId={agent.slug}
          img={getImageUrl(agent.image)}
          buttons={[{ label: 'AgentDetail.contact', class: 'primary-dinamic', link: CONTACT_ROUTE }]}
          css_styles={{ 'image_display': 'banner_custom__img--dnone', 'apiindividual_height': 'banner_apiindividual__layout--height', 'custom_line_height': 'line-height-1' }}
          redirect='/agents'
          description={agent.description}
        />
      </section>

      {(hasAnyRating || agent.reportUrl) && (
        <section className={`container ${classes.section__ratings}`}>
          {hasAnyRating && (
            <Ratings
              ratings={agent.ratings}
              title={t('AgentDetail.globalGradesTitle')}
              subtitle={t('AgentDetail.globalGradesSubtitle')}
              labels={{
                globalRating: t('AgentDetail.ratingGlobal'),
                definitionRating: t('AgentDetail.ratingDefinition'),
                securityRating: t('AgentDetail.ratingSecurity'),
                qualityRating: t('AgentDetail.ratingQuality'),
              }}
            />
          )}
          {agent.reportUrl && (
            <div className={classes.report}>
              <button
                type='button'
                className={classes.report__btn}
                onClick={() => window.open(agent.reportUrl, '_blank', 'noopener,noreferrer')}
              >
                <Icon id='MdDownload' />
                <span>{t('AgentDetail.downloadReport')}</span>
              </button>
            </div>
          )}
        </section>
      )}

      <div className='container'>
        <section className={classes.body}>
          <div>
            {agent.markdown && (
              <div className={classes.section}>
                <h2 className={classes.section__title}>{t('AgentDetail.about')}</h2>
                <div className={`markdown__content ${classes.markdown}`}>
                  <CustomMarkdown content={agent.markdown} />
                </div>
              </div>
            )}

            <div className={classes.section}>
              <h2 className={classes.section__title}>{t('AgentDetail.whatItDoes')}</h2>
              <p className={classes.section__subtitle}>{t('AgentDetail.skillsReady', { count: agent.skills.length })}</p>
              {agent.skills.map((skill) => (
                <CardResource key={skill.id || skill.name} resource={skill} type='skill' />
              ))}
            </div>

            <div className={classes.section}>
              <h2 className={classes.section__title}>{t('AgentDetail.builtForProduction')}</h2>
              <p className={classes.section__subtitle}>{t('AgentDetail.builtForProductionSubtitle')}</p>
              <div className={classes.features}>
                {features.map((feature) => (
                  <div key={feature.key} className={`${classes.feature} ${feature.on ? '' : classes['feature--off']}`}>
                    <Icon id='MdOutlineCheckCircle' />
                    <div>
                      <b>{t(`AgentDetail.features.${feature.key}.title`)}</b>
                      <span>
                        {feature.on
                          ? t(`AgentDetail.features.${feature.key}.description`, { version: agent.version })
                          : t('AgentDetail.notSupported')}
                      </span>
                      {feature.on && feature.detail && <code>{feature.detail}</code>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {agent.protocols.length > 0 && (
              <div className={classes.section}>
                <h2 className={classes.section__title}>{t('AgentDetail.integrateYourWay')}</h2>
                <p className={classes.section__subtitle}>{t('AgentDetail.integrateYourWaySubtitle')}</p>
                <div className={classes.integrations}>
                  {agent.protocols.map((protocol) => (
                    <div key={protocol} className={classes.integration}>
                      <Chip title={protocol} className={`protocol-${protocol.toLowerCase()}`} spanClass='fs__10 font-weight-medium' />
                      <p>{t(`AgentDetail.protocols.${protocol}`)}</p>
                      {agent.documentationUrl && (
                        <a href={agent.documentationUrl} target='_blank' rel='noopener noreferrer'>
                          {t('AgentDetail.viewDocs')}
                          <Icon id='MdEast' />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className={classes.side}>
            <div className={classes.plan}>
              <h3>{t('AgentDetail.plan.title')}</h3>
              <div className={classes.plan__price}>
                {t('AgentDetail.plan.price')} <small>{t('AgentDetail.plan.period')}</small>
              </div>
              <ul>
                <li>{t('AgentDetail.plan.credentials')}</li>
                <li>{t('AgentDetail.plan.analytics')}</li>
                <li>{t('AgentDetail.plan.support')}</li>
              </ul>
              <Button styles='secundary-dinamic' onClick={() => navigate(CONTACT_ROUTE)}>
                {t('AgentDetail.contact')}
              </Button>
            </div>
            <dl className={classes.facts}>
              {facts.map((fact) => (
                <React.Fragment key={fact.key}>
                  <dt>{t(`AgentDetail.facts.${fact.key}`)}</dt>
                  <dd>{fact.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </aside>
        </section>
      </div>

      {relatedAgents.length > 0 && (
        <section className={classes.section__related}>
          <div className='container'>
            <h2 className='h2 text__primary__title text-center font-weight-bold mb-2'>{t('AgentDetail.youMayAlsoLike')}</h2>
            <p className='subtitle-1 mb-10 text__gray__darken text-center'>{t('AgentDetail.youMayAlsoLikeSubtitle')}</p>
            <div className='row justify-center'>
              {relatedAgents.map((card) => (
                <div key={card.documentId} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                  <CardBasic
                    title={card.title}
                    description={card.description}
                    info={t('AgentDetail.moreInfo')}
                    url={`/agents/${card.slug}`}
                    route={() => dispatch(getAgentLibraryBySlug(card.slug))}
                    img={getImageUrl(card.image)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default AgentDetail;
