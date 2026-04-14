import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import moment from 'moment';
import _ from 'underscore';
import { useTranslation } from 'react-i18next';

import BannerCentered from '../../../components/Banner/BannerCentered';
import Button from '../../../components/Buttons/Button';
import CardBasic from '../../../components/Card/CardBasic';
import Item from '../../../components/Item/Item';
import Tabs from '../../../components/Tabs/Tabs';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import BannerImage from '../../../components/Banner/BannerImage';
import Slick from '../../../components/SlickSlider/Slick';
import Icon from '../../../components/MdIcon/Icon';
import CustomMarkdown from '../../../components/CustomMarkdown';
import CardResource from '../../../components/Card/CardResource';
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getMcpLibrary, getMcpLibraries } from '../../../redux/actions/mcpLibraryAction';
import { getBlogs } from '../../../redux/actions/blogAction';
import config from '../../../services/config';
import classes from './mcp-detail.module.scss';
import CommandModal from '../../../components/Modal/CommandModal';
import Ratings from '../../../components/Ratings';

function McpDetail({ setIsOpen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { homePage } = useSelector((state) => state.home);
  const { mcpLibrary, mcpLibraries, liveSession } = useSelector((state) => state.mcpLibrary);
  const { blogs } = useSelector((state) => state.blog);

  const [bannerImg, setBannerImg] = useState('');
  const [cardsImages, setCardsImages] = useState({});
  const [vsCodeCopied, setVsCodeCopied] = useState(null);

  useEffect(() => {
    dispatch(getMcpLibraries());
  }, []);

  useEffect(() => {
    if (mcpLibrary?.image?.length > 0) {
      setBannerImg(`${mcpLibrary.image[0].formats?.medium?.url || mcpLibrary.image[0].url}`);
    } else if (mcpLibrary && Object.keys(mcpLibrary).length > 0) {
      setBannerImg(config.notImage);
    }
  }, [mcpLibrary]);

  useEffect(() => {
    if (mcpLibraries && mcpLibraries.length > 0) {
      const imgs = {};
      mcpLibraries.forEach((lib) => {
        imgs[lib.documentId] = lib.image?.length > 0
          ? `${lib.image[0].formats?.medium?.url || lib.image[0].url}`
          : config.notImage;
      });
      setCardsImages(imgs);
    }
  }, [mcpLibraries]);

  useEffect(() => {
    if (params?.id) {
      dispatch(getMcpLibrary(params?.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (homePage && Object.keys(homePage).length === 0) {
      dispatch(getHomeContent());
    }
    if (blogs?.length === 0) {
      dispatch(getBlogs());
    }
    if (mcpLibraries?.length === 0) {
      dispatch(getMcpLibraries());
    }
  }, []);

  const filterHomeBanner = homePage?.contentSections && homePage.contentSections?.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'home.banner-section') : [];
  const filterHomeBannerTitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.title ? filterHomeBanner[0]?.title : '';
  const filterHomeBannerSubtitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.subtitle ? filterHomeBanner[0]?.subtitle : '';
  const filterHomeBannerImage = filterHomeBanner.length > 0 && filterHomeBanner[0]?.background ? filterHomeBanner[0]?.background?.url : '';
  const filterHomeBannerNameType = '/#data';

  const filterDiscoverTab = homePage?.contentSections && homePage?.contentSections?.length > 0 ? homePage?.contentSections?.filter((item) => item.__component === 'home.discover-section') : [];

  const filterButtonSection = homePage?.contentSections && homePage?.contentSections?.length > 0 ? homePage?.contentSections?.filter((item) => item.__component === 'sections.button-hero') : [];

  const buttonsLbls = mcpLibrary?.buttons?.length > 0
    ? mcpLibrary.buttons.map((item) => ({
        label: item?.name,
        class: item?.class,
        link: `/mcps/${mcpLibrary?.slug}/mcp-ui`,
      }))
    : [
        {
          label: t('McpDetail.tryMcp'),
          class: 'primary-dinamic',
          link: `/mcps/${mcpLibrary?.slug}/mcp-ui`,
        },
      ];

  const datanews = blogs?.length > 0 ? _.sortBy(blogs, (m) => {
    return moment(m.created_at).toDate().getTime();
  }) : [];

  const slidesNew = datanews.length > 0 ? datanews.reverse().slice(0, 6).map((item) => ({
    img: item?.image?.[0]?.url,
    title: item?.title,
    description: item?.description,
    linkText: t('McpDetail.moreInfo'),
    route: `/blog/${item?.documentId}#blogDetail`,
  })) : [];

  const otherMcps = mcpLibraries?.filter((lib) => lib.documentId !== mcpLibrary?.documentId) || [];
  const shuffledMcps = _.shuffle(otherMcps);
  const mcpsNews = shuffledMcps.slice(0, 3);

  const hasAnyRating =
    !!mcpLibrary?.ratings?.globalRating ||
    !!mcpLibrary?.ratings?.definitionRating ||
    !!mcpLibrary?.ratings?.securityRating ||
    !!mcpLibrary?.ratings?.qualityRating;

  const handleClickPage = (id) => {
    dispatch(getMcpLibrary(id));
  };

  const isLiveSessionActive = liveSession !== null && liveSession.slug === mcpLibrary?.slug;
  const effectiveResources = isLiveSessionActive ? (liveSession.resources || []) : [];

  const mergeHeadersIntoCfg = (cfg, hdrs) => {
    if (cfg.mcpServers) {
      const serverName = Object.keys(cfg.mcpServers)[0];
      if (serverName) cfg.mcpServers[serverName].headers = { ...hdrs };
    } else if (cfg.servers) {
      const serverName = Object.keys(cfg.servers)[0];
      if (serverName) cfg.servers[serverName].headers = { ...hdrs };
    } else {
      cfg.headers = { ...hdrs };
    }
  };

  const extractHeadersFromCfg = (cfg) => {
    if (cfg.mcpServers) {
      const serverName = Object.keys(cfg.mcpServers)[0];
      return cfg.mcpServers[serverName]?.headers || null;
    }
    if (cfg.servers) {
      const serverName = Object.keys(cfg.servers)[0];
      return cfg.servers[serverName]?.headers || null;
    }
    return cfg.headers || null;
  };

  const effectiveConfigSnippet = (() => {
    if (!mcpLibrary?.configSnippet) return null;
    if (!isLiveSessionActive || !liveSession.headers || Object.keys(liveSession.headers).length === 0) {
      return mcpLibrary.configSnippet;
    }
    try {
      const cfg = typeof mcpLibrary.configSnippet === 'string'
        ? JSON.parse(mcpLibrary.configSnippet)
        : structuredClone(mcpLibrary.configSnippet);
      mergeHeadersIntoCfg(cfg, liveSession.headers);
      return cfg;
    } catch {
      return mcpLibrary.configSnippet;
    }
  })();

  const maskedConfigSnippet = (() => {
    if (!effectiveConfigSnippet) return null;
    try {
      const cfg = typeof effectiveConfigSnippet === 'string'
        ? JSON.parse(effectiveConfigSnippet)
        : structuredClone(effectiveConfigSnippet);
      const existingHeaders = extractHeadersFromCfg(cfg);
      if (existingHeaders && Object.keys(existingHeaders).length > 0) {
        const masked = Object.fromEntries(
          Object.entries(existingHeaders).map(([k, v]) => [k, '•'.repeat(String(v).length || 8)]),
        );
        mergeHeadersIntoCfg(cfg, masked);
      }
      return cfg;
    } catch {
      return effectiveConfigSnippet;
    }
  })();

  return (
    <div id='mcp'>
      {mcpLibrary && Object.keys(mcpLibrary).length > 0 ? (
        <>
          <section>
            <BannerImage
              title={mcpLibrary?.title}
              apiId={mcpLibrary?.slug}
              img={bannerImg}
              buttons={buttonsLbls}
              setIsOpen={setIsOpen}
              css_styles={{ 'image_display': 'banner_custom__img--dnone', 'apiindividual_height': 'banner_apiindividual__layout--height', 'custom_line_height': 'line-height-1' }}
              redirect='/mcps'
              description={mcpLibrary?.description?.length > 0 && mcpLibrary?.description ? mcpLibrary?.description : ''}
            />
          </section>
          <section className={`container ${classes.section__content} pb-9`}>&nbsp;</section>
          {mcpLibrary && hasAnyRating && (
            <section className={`container ${classes.section__content} ${classes.section__ratings}`}>
              <Ratings
                ratings={mcpLibrary.ratings}
                title={t('McpDetail.globalGradesTitle')}
                subtitle={t('McpDetail.globalGradesSubtitle')}
                labels={{
                  globalRating: t('McpDetail.ratingGlobal'),
                  definitionRating: t('McpDetail.ratingDefinition'),
                  securityRating: t('McpDetail.ratingSecurity'),
                  qualityRating: t('McpDetail.ratingQuality'),
                }}
              />
            </section>
          )}

          <section className={`container ${classes.section__content} ${classes.section__three_cols}`}>
            <div className={classes.three_cols__grid}>

              <div className={classes.three_cols__col}>
                <h3 className={classes.three_cols__col__title}>
                  {t('McpDetail.technicalSetupTitle')}
                </h3>

                {mcpLibrary?.configSnippet ? (
                  <>
                    <pre className={classes.three_cols__code}><code className="language-json">{typeof maskedConfigSnippet === 'string' ? maskedConfigSnippet : JSON.stringify(maskedConfigSnippet, null, 2)}</code></pre>

                    <button
                      type='button'
                      className={classes.three_cols__vscode_btn}
                      onClick={() => {
                        try {
                          const cfg = typeof effectiveConfigSnippet === 'string'
                            ? JSON.parse(effectiveConfigSnippet)
                            : effectiveConfigSnippet;

                          const servers = cfg?.mcpServers || cfg?.servers || {};
                          const [serverName, serverConfig] = Object.entries(servers)[0] || [mcpLibrary.slug, cfg];

                          const payload = { name: serverName, ...serverConfig };
                          const vsCodeUrl = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(payload))}`;

                          globalThis.location.href = vsCodeUrl;

                        } catch {
                          const jsonStr = JSON.stringify(mcpLibrary.configSnippet);
                          const escaped = jsonStr.replaceAll('"', String.raw`\"`);
                          const cmd = `code --add-mcp "${escaped}"`;
                          navigator.clipboard.writeText(cmd).then(() => setVsCodeCopied(cmd));
                        }
                      }}
                    >
                      <Icon id='MdCode' />
                      <span>{t('McpDetail.addToVsCode')}</span>
                    </button>
                  </>
                ) : (
                  <div className={classes.three_cols__placeholder}>
                    {t('McpDetail.noConfigSnippet')}
                  </div>
                )}
              </div>

              <div className={classes.three_cols__col}>
                <h3 className={classes.three_cols__col__title}>
                  {t('McpDetail.descriptionTitle')}
                </h3>

                {mcpLibrary?.markdown && mcpLibrary.markdown.length > 0 ? (
                  <div className={`markdown__content ${classes.three_cols__markdown}`}>
                    <CustomMarkdown content={mcpLibrary.markdown} />
                  </div>
                ) : (
                  <div className={classes.three_cols__placeholder}>
                    {t('McpDetail.noDescription')}
                  </div>
                )}
              </div>

              <div className={classes.three_cols__col}>
                <h3 className={classes.three_cols__col__title}>
                  {t('McpDetail.resourcesTitle')}
                </h3>
                {effectiveResources.length > 0 ? (
                  <div className={classes.resources__list}>
                    {effectiveResources.map((resource, index) => (
                      <CardResource key={resource?.id || index} resource={resource} />
                    ))}
                  </div>
                ) : (
                  <div className={classes.three_cols__placeholder}>
                    {t('McpDetail.noResources')}
                  </div>
                )}
              </div>
            </div>

            <div className={classes.three_cols__actions}>
              {mcpLibrary.reportUrl && (
                <button
                  type='button'
                  className={classes.three_cols__action_btn}
                  onClick={() => window.open(mcpLibrary.reportUrl, '_blank', 'noopener,noreferrer')}
                >
                  <Icon id='MdDownload' />
                  <span>{t('McpDetail.downloadReport')}</span>
                </button>
              )}
              <button
                type='button'
                className={`${classes.three_cols__action_btn} ${classes.three_cols__action_btn__primary}`}
                onClick={() => navigate(`/mcps/${mcpLibrary.slug}/mcp-ui`)}
              >
                <Icon id='MdPlayArrow' />
                <span>{t('McpDetail.tryOut')}</span>
              </button>
            </div>
          </section>

          <section className={classes.section__discover}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className='h2 text__primary__title text-center font-weight-bold mb-2 ml-1'>
                    {t('McpDetail.discoverTitle')}
                  </h1>
                </div>
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <p className={`subtitle-1 mb-10 text__gray__darken text-center ${classes.section__discover__subtitle}`}>
                    {t('McpDetail.discoverSubtitle')}
                  </p>
                </div>
              </div>
              <div className='row justify-center'>
                {mcpsNews.length > 0 && (
                  mcpsNews.map((card) => (
                    <div key={card.documentId} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                      <CardBasic
                        chipTitle={card?.status === 'Publicado' ? 'GET' : 'POST'}
                        title={card?.title}
                        description={card?.description}
                        info={t('McpDetail.moreInfo')}
                        url={`/mcps/${card?.documentId}#mcp`}
                        css_styles={{ 'override_border__chip': 'custom_border__chip' }}
                        route={() => handleClickPage(card?.documentId)}
                        img={cardsImages[card.documentId] || config.notImage}
                      />
                    </div>
                  ))
                )}
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                    <div className={`button text__primary d-xs-none ${classes.section__discover__showmore__button}`}>
                      <HashLink smooth to='/mcps#mcpHome'>
                        <span className='mr-1'>{t('McpDetail.seeAll')}</span>
                      </HashLink>
                      <Icon id='MdOutlineEast' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`${classes.section__works}`}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className={`h3 text-center text__white mb-5 ${classes.section__works__title}`}>
                    {t('McpDetail.howItWorks')}
                  </h1>
                </div>
              </div>
              <Tabs direction='center' colorTab='white' activeColor='yellow'>
                {filterDiscoverTab.map((item, i) => (
                  <div label={item?.title} key={i}>
                    <div className='row'>
                      {item.Products.map((data, x) => (
                        <div key={x + i} className='flex-lg-4 flex-md-12 flex-sm-12 py-6'>
                          <Item
                            number={data?.num}
                            title={data?.title}
                            description={data?.subtitle}
                            icon={data?.iconText}
                            type='title'
                            textColor='#d4d9db'
                            css_styles={{ 'custom_description': 'text__white' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Tabs>
              <div className={classes.section__buttons_grid}>
                {filterButtonSection && filterButtonSection.length > 0 ? (
                  filterButtonSection?.[0]?.header.map((button, i) => (
                    <div key={i} className='mb-4'>
                      {button?.isKeywordInverted ? (
                        <HashLink smooth to='/mcps#mcpHome'>
                          <Button styles={button?.keyword}>
                            {button?.title}
                          </Button>
                        </HashLink>
                      ) : (
                        <HashLink smooth to={`/mcps/${params?.id}#contact`}>
                          <Button styles={button?.keyword}>
                            {button?.title}
                          </Button>
                        </HashLink>
                      )}
                    </div>
                  ))
                ) : (null)}
              </div>
            </div>
          </section>
          <section id='Banner'>
            <BannerCentered
              title={filterHomeBannerTitle !== '' ? filterHomeBannerTitle : 'Title'}
              subtitle={filterHomeBannerSubtitle !== '' ? filterHomeBannerSubtitle : ''}
              img={filterHomeBannerImage !== '' ? '' : ''}
              buttonType='tertiary'
              buttonLabel={t('Home.discoverSubtitle')}
              redirect={filterHomeBannerNameType}
            />
          </section>
          <section className={classes.section__news}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__dark__primary'>{t('McpDetail.news')}</h1>
                </div>
                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1'>
                    {t('McpDetail.newsDescription')}
                  </p>
                </div>
              </div>
            </div>
            <div className='container'>
              <div className={`row ${slidesNew.length <= 3 ? 'justify-center' : ''}`}>
                {slidesNew.length > 0 && slidesNew.length <= 3 ? (
                  slidesNew.map((item, i) => (
                    <div key={i} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                      <CardBasic
                        title={item.title}
                        description={item.description}
                        img={item.img || config.notImage}
                        info={item.linkText}
                        url={item.route}
                      />
                    </div>
                  ))
                ) : (
                  <div className='flex-md-12 flex-sm-12'>
                    {slidesNew.length > 0 ? (
                      <Slick slides={slidesNew} />
                    ) : (
                      <div className='text-center py-10'>
                        <p>{t('Home.noBlogEntries')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div id='contact' className={`container ${classes.section__news__showmore}`}>
              <div className='row justify-center'>
                <div className={`flex-lg-2 flex-md-6 flex-sm-12 text-center ${classes.custom_top}`}>
                  <HashLink smooth to='/blog#blogIndex'>
                    <div className='text__secondary'>{t('McpDetail.seeMore')}</div>
                  </HashLink>
                </div>
              </div>
            </div>
          </section>
          <CommandModal isOpen={!!vsCodeCopied} onClose={() => setVsCodeCopied(null)}>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#222', margin: 0 }}>{t('McpDetail.commandCopied')}</p>
            <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{t('McpDetail.openTerminalPaste')}</p>
            <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1rem 1.2rem', fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>{vsCodeCopied}</pre>
            <button
              type='button'
              className={classes.three_cols__vscode_btn}
              onClick={() => navigator.clipboard.writeText(vsCodeCopied)}
            >
              {t('McpDetail.copyAgain')}
            </button>
          </CommandModal>
          <div id='contact' />
        </>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
};

export default McpDetail;
