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
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getMcpLibraryBySlug, getMcpLibraries } from '../../../redux/actions/mcpLibraryAction';
import { getBlogs } from '../../../redux/actions/blogAction';
import config from '../../../services/config';
import classes from './mcp-detail.module.scss';
import McpOverview from '../../common/McpOverview';

function McpDetail({ setIsOpen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { homePage } = useSelector((state) => state.home);
  const { mcpLibraryBySlug: mcpLibrary, mcpLibraries, liveSession } = useSelector((state) => state.mcpLibrary);
  const { blogs } = useSelector((state) => state.blog);

  const [bannerImg, setBannerImg] = useState('');
  const [cardsImages, setCardsImages] = useState({});

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
    if (params?.slug) {
      dispatch(getMcpLibraryBySlug(params?.slug));
    }
  }, [params?.slug]);

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

  const handleClickPage = (slug) => {
    dispatch(getMcpLibraryBySlug(slug));
  };



  return (
    <div>
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
          <McpOverview
            mcpLibrary={mcpLibrary}
            liveSession={liveSession}
            tryOutUrl={`/mcps/${mcpLibrary?.slug}/mcp-ui`}
          />

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
                        url={`/mcps/${card?.slug}`}
                        css_styles={{ 'override_border__chip': 'custom_border__chip' }}
                        route={() => handleClickPage(card?.slug)}
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
                      <HashLink smooth to='/mcps'>
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
                        <HashLink smooth to='/mcps'>
                          <Button styles={button?.keyword}>
                            {button?.title}
                          </Button>
                        </HashLink>
                      ) : (
                        <HashLink smooth to={`/mcps/${params?.slug}#contact`}>
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
          <div id='contact' />
        </>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
};

export default McpDetail;
