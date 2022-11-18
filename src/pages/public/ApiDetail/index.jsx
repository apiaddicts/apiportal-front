import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import moment from 'moment';
import _ from 'underscore';
import BannerCentered from '../../../components/Banner/BannerCentered';
import Button from '../../../components/Buttons/Button';
import CardBasic from '../../../components/Card/CardBasic';
import Item from '../../../components/Item/Item';
import Tabs from '../../../components/Tabs/Tabs';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import BannerImage from '../../../components/Banner/BannerImage';
import Slick from '../../../components/SlickSlider/Slick';
import Icon from '../../../components/MdIcon/Icon';
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getLibrary, getLibraries } from '../../../redux/actions/libraryAction';
import { getBlogs } from '../../../redux/actions/blogAction';
import codeSnipet from '../../../static/img/code-snippet.png';
import classes from './api-detail.module.scss';

function ApiDetail({ setIsOpen }) {

  const dispatch = useDispatch();
  const params = useParams();
  const { homePage } = useSelector((state) => state.home);
  const { library, libraries } = useSelector((state) => state.library);
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    if (params?.id) {
      dispatch(getLibrary(params?.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (homePage && Object.keys(homePage).length === 0) {
      dispatch(getHomeContent());
    }

    //if (params.id && library && Object.keys(library).length === 0) {
    //  dispatch(getLibrary(params?.id));
    //}

    if (blogs && blogs.length === 0) {
      dispatch(getBlogs());
    }

    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }

    //dispatch(resetGetLibrary());
  }, []);

  // Load Banner Section
  const filterHomeBanner = homePage && homePage.contentSections && homePage.contentSections?.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'home.banner-section') : [];
  const filterHomeBannerTitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.title ? filterHomeBanner[0]?.title : '';
  const filterHomeBannerSubtitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.subtitle ? filterHomeBanner[0]?.subtitle : '';
  const filterHomeBannerImage = filterHomeBanner.length > 0 && filterHomeBanner[0]?.background ? filterHomeBanner[0]?.background?.url : '';
  const filterHomeBannerNameButtom = filterHomeBanner.length > 0 && filterHomeBanner[0]?.buttons.length > 0 ? filterHomeBanner[0]?.buttons?.[0]?.name : '';
  const filterHomeBannerNameType = filterHomeBanner.length > 0 && filterHomeBanner[0]?.buttons.length > 0 ? filterHomeBanner[0]?.buttons?.[0]?.type : '/#data';

  // Load discover section
  const filterDiscoverTab = homePage && homePage?.contentSections && homePage?.contentSections?.length > 0 ? homePage?.contentSections?.filter((item) => item.__component === 'home.discover-section') : [];

  // Load buttons sections
  const filterButtonSection = homePage && homePage?.contentSections && homePage?.contentSections?.length > 0 ? homePage?.contentSections?.filter((item) => item.__component === 'sections.button-hero') : [];

  const buttonsLbls = library && library?.buttons && library?.buttons?.length > 0 ? library?.buttons?.map((item) => {
    const data = {
      label: item?.name,
      class: item?.class,
      link: item?.link !== '' ? `/apis/${params?.id}#contact` : '',
    };

    return data;
  }) : [
    {
      label: 'Probar API',
      class: 'primary',
    },
    {
      label: 'Documentación',
      class: 'btn-tertiary-white',
    },
  ];

  const datanews = blogs?.length > 0 ? _.sortBy(blogs, (m) => {
    return moment(m.created_at).toDate().getTime();
  }) : [];

  const slidesNew = datanews.length > 0 ? datanews.reverse().slice(0, 6).map((item, i) => {
    const itemData = {
      img: item?.image?.[0]?.url,
      title: item?.title,
      description: item?.description,
      linkText: 'Conoce más',
      route: `/blog/${item?.id}#blogDetail`,
    };
    return itemData;
  }) : [];

  const random = Math.floor(Math.random() * libraries.length);
  const random2 = Math.floor(Math.random() * libraries.length);
  const random3 = Math.floor(Math.random() * libraries.length);

  const apisNews = libraries?.length > 0 ? [libraries[random], libraries[random2], libraries[random3]] : [];

  const handleClickPage = (id) => {
    dispatch(getLibrary(id));
  };

  return (
    <div id='api' style={{ paddingTop: '114px' }}>
      {Object.keys(homePage).length > 0 && Object.keys(library).length > 0 ? (
        <>
          <section>
            <BannerImage
              title={library?.title}
              img={library?.image?.length > 0 && library?.image?.length === 1 ? library?.image?.[0]?.url : ''}
              buttons={buttonsLbls}
              setIsOpen={setIsOpen}
              css_styles={{ 'image_display': 'banner_custom__img--dnone', 'apiindividual_height': 'banner_apiindividual__layout--height', 'custom_line_height': 'line-height-1' }}
              redirect='/apis'
              description={library?.description?.length > 0 && library?.description ? library?.description : ''}
            />
          </section>
          <section className={`container ${classes.section__content} pb-9`}>&nbsp;</section>
          <section className='container mb-15'>
            <div className='row'>
              <div className={`flex-md-12 flex-sm-12 -ml-23 ${classes.section__content__title}`}>
                <h1 className='h2 text__dark__primary font-weight-bold mb-10 -ml-23 text-center'>
                  {library?.benefits && library?.benefits?.length > 0 && library?.benefits?.length === 1 ?
                    library?.benefits?.[0]?.title :
                    'Benificios principales'}
                </h1>
              </div>
              <div className='row px-5'>
                <div className='flex-sm-12 flex-md-6 flex-lg-6' style={{ display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1fr)', gap: '2rem', alignContent: 'center' }}>
                    {library?.benefits && library?.benefits?.length > 0 && library?.benefits?.length === 1 && library?.benefits?.[0]?.Steps?.length > 0 ? (
                      library?.benefits?.[0]?.Steps.map((item, i) => (
                        <div key={i}>
                          <Item
                            key={i}
                            title={item?.title}
                            icon={item?.number ? item?.number : 'note1'}
                            titleStyles={{ fontSize: '18px', fontWeight: '500', color: '#53565A' }}
                            iconStyle={{ width: '50px', height: '50px' }}
                          />
                        </div>
                      ))

                    ) : (null)}
                  </div>
                </div>
                <div className={`flex-sm-12 flex-md-6 flex-lg-6 container ${classes.section__content__img}`}>
                  <img src={library?.benefits && library?.benefits?.length > 0 && library?.benefits?.length === 1 && library?.benefits?.[0]?.background ? library?.benefits?.[0]?.background.url : codeSnipet} alt='Benefits' className='w-full' />
                </div>
              </div>
            </div>
          </section>
          <section className={classes.section__discover}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className='h2 text__dark__primary text-center font-weight-bold mb-2 ml-1'>
                    Otras APIs que te pueden interesar
                  </h1>
                </div>
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <p className={`subtitle-1 mb-10 text__gray__gray_lighten-4 text-center ${classes.section__discover__subtitle}`}>
                    Encuentra las mejores APIs para tu negocio.
                    {' '}
                    <br />
                    Nuestras APIs son fáciles de personalizar e integrar, para comenzar a vender y gestionar los productos.
                  </p>
                </div>
              </div>
              <div className='row'>
                {
                  apisNews && apisNews.length > 0 ? (
                    apisNews.map((card, i) => (
                      <div key={i} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                        <CardBasic
                          chipTitle={card?.status && card?.status === 'Publicado' ? 'GET' : 'POST'}
                          title={card?.title}
                          description={card?.description}
                          info='MÁS INFORMACIÓN'
                          url={`/apis/${card?.id}#api`}
                          css_styles={{ 'override_border__chip': 'custom_border__chip' }}
                          route={() => handleClickPage(card?.id)}
                        />
                      </div>
                    ))
                  ) : (null)
                }
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                    <div className={`button text__primary d-xs-none ${classes.section__discover__showmore__button}`}>
                      <HashLink smooth to='/apis#apiHome'>
                        <span className='mr-1'>ver todas</span>
                      </HashLink>
                      <Icon id='MdOutlineEast' />
                    </div>
                    {/* <div className={`d-sm-none ${classes.section__discover__showmore__button}`}>
                      Ver todas
                    </div> */}
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
                    ¿Cómo funciona?
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
              <div className='mt-10 justify-center' style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 230px))' }}>
                {filterButtonSection && filterButtonSection.length > 0 ? (
                  filterButtonSection?.[0]?.header.map((button, i) => (
                    <div key={i} className='mb-4'>
                      {button?.isKeywordInverted ? (
                        <HashLink smooth to='/apis#apiHome'>
                          <Button styles={button?.keyword}>
                            {button?.title}
                          </Button>
                        </HashLink>
                      ) : (
                        <HashLink smooth to={`/apis/${params?.id}#contact`}>
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
              buttonType='primary'
              buttonLabel={filterHomeBannerNameButtom !== '' ? filterHomeBannerNameButtom : 'Empezar ahora'}
              redirect={filterHomeBannerNameType}
            />
          </section>
          <section className={classes.section__news}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__dark__primary'>Novedades</h1>
                </div>

                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1'>
                    Conoce todas las novedades sobre tecnología, APIs y transformación digital
                  </p>
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <Slick slides={slidesNew} />
                </div>
              </div>
            </div>
            <div id='contact' className={`container ${classes.section__news__showmore}`}>
              <div className='row justify-center'>
                <div className={`flex-lg-2 flex-md-6 flex-sm-12 text-center ${classes.custom_top}`}>
                  <HashLink smooth to='/blog#blogIndex'>
                    <div className='text__secondary'>Ver más</div>
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

export default ApiDetail;
