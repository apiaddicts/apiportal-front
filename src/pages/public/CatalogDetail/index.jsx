import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import _ from 'underscore';
import { useTranslation } from 'react-i18next';

import CardBasic from '../../../components/Card/CardBasic';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import BannerImageBg from '../../../components/Banner/BannerImageBg';
import Icon from '../../../components/MdIcon/Icon';
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getcatalog, getcatalogs } from '../../../redux/actions/catalogAction';
import { getBlogs } from '../../../redux/actions/blogAction';
import config from '../../../services/config';
import classes from './catalog-detail.module.scss';
import ReactJsonView from '@microlink/react-json-view';
import yaml from 'js-yaml';

function CatalogDetail({ setIsOpen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const { homePage } = useSelector((state) => state.home);
  const { catalogPage, catalog, catalogs } = useSelector((state) => state.catalogs);
  const { blogs } = useSelector((state) => state.blog);

  const [bannerImg, setBannerImg] = useState('');
  const [cardsImages, setCardsImages] = useState({});
  const [jsonDl, setJsonDl] = useState();
  const [numCol, setNumCol] = useState(0);
  const [listCharacteristics, setListCharacteristics] = useState(['']);
  const [listColumns, setListColumns] = useState([['']]);

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();

  useEffect(() => {
    dispatch(getcatalogs());
  }, []);

  useEffect(() => {
    if (catalog?.image?.length > 0) {
      setBannerImg(`${catalog.image[0].formats?.medium?.url || catalog.image[0].url}`);
    } else if (catalog && Object.keys(catalog).length > 0) {
      setBannerImg(config.notImage);
    }
  }, [catalog]);

  useEffect(() => {
    if (catalogs && catalogs.length > 0) {
      const imgs = {};
      catalogs.forEach(lib => {
        imgs[lib.documentId] = lib.image?.length > 0
          ? `${lib.image[0].formats?.medium?.url || lib.image[0].url}`
          : config.notImage;
      });
      setCardsImages(imgs);
    }
  }, [catalogs]);

  useEffect(() => {
    if (catalog && catalog.markdown) {
      const list = listToArray(catalog.markdown);
      setListCharacteristics(list);
      setNumCol(Math.ceil(list.length/3));
    }
  }, [catalog]);

  useEffect(() => {
    if (numCol > 0) {
      const columns = makeColums(numCol, listCharacteristics);
      setListColumns(columns);
    }
  }, [numCol]);

  useEffect(() => {
    if (params?.id) {
      dispatch(getcatalog(params?.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (homePage && Object.keys(homePage).length === 0) {
      dispatch(getHomeContent());
    }

    if (blogs && blogs.length === 0) {
      dispatch(getBlogs());
    }

    if (catalogs && catalogs.length === 0) {
      dispatch(getcatalogs());
    }

  }, []);

  useEffect(() => {
    if (catalog && catalog.openDocTaxonomy) {
      try {
        if (catalog.openDocFormat === 'yaml') {
          const temp = yaml.load(catalog.openDocTaxonomy);
          setJsonDl(temp);
        } else if (catalog.openDocFormat === 'json') {
          setJsonDl(JSON.parse(catalog.openDocTaxonomy));
        } else {
          const fallbackYaml = String.raw`status: formato_no_definido
            mensaje: "El formato del documento no está definido. Use 'yaml' o 'json'."
            detalles:
              formato_recibido: ${JSON.stringify(catalog.openDocFormat)}
              ejemplo_yaml: |
                string: ejemplo
                integer: 42
                array:
                  - a
                  - b
          `;
          const parsedFallback = yaml.parse(fallbackYaml);
          setJsonDl(parsedFallback);
        }
      } catch (error) {
        setJsonDl({
          status: 'error_de_parseo',
          mensaje: 'No se pudo convertir el documento al objeto esperado.',
          formato: catalog.openDocFormat ?? null,
          error: (err)?.message ?? String(err),
          raw: catalog.openDocTaxonomy
        });
      }
    }
  }, [catalog]);

  useEffect(() => {
    if (catalogPage && Object.keys(catalogPage).length === 0) {
      dispatch(getCatalogContent());
    }
  }, [catalogPage, dispatch]);

  const getDocRoute = (catalog, id) => {
    if (catalog?.openDocType === 'asyncapi') {
      return `/apis/${id}/asyncapi-ui`;
    }
    return `/apis/${id}/swagger-ui`;
  };

  const buttonsLbls =
    catalog?.buttons?.length > 0
      ? catalog.buttons.map((item) => ({
          label: item?.name,
          class: item?.class,
          link: getDocRoute(catalog, catalog?.slug),
        }))
      : [
          {
            label: t('Catalogs.regAndTry'),
            class: 'primary-dinamic',
            link: getDocRoute(catalog, catalog?.slug),
          },
        ];

  const otherApis = catalogs?.filter(lib => lib.documentId !== catalog?.documentId) || [];
  const shuffledApis = _.shuffle(otherApis);
  const apisNews = shuffledApis.slice(0, 3);

  const handleClickPage = (id) => {
    dispatch(getcatalog(id));
  };

  const listToArray = (md) => {
    return md
      .trim()
      .split('\n')
      .map(item => item.replace(/^[*+-]\s+/, '').trim())
      .filter(item => item.length > 0);
  };

  const makeColums = (numColumns, items ) => Array.from({ length: numColumns }).map((_, colIndex) => {
    const start = colIndex * 3;
    const end = start + 3;
    return items.slice(start, end);
  });

  const filterApiBanner = catalogPage && catalogPage.contentSections && catalogPage.contentSections?.length > 0 ? catalogPage.contentSections.filter((item) => item.__component === 'sections.calculate-section') : [];

  const apiImageUrl = filterApiBanner?.[0]?.image?.url
    ? `${filterApiBanner[0].image.url}`
    : config.notImage;

  return (
    <div id='catalog'>
      { Object.keys(catalog).length > 0 ? (
        <>
          <section>
            <BannerImageBg
              imageUrl={apiImageUrl}
              initialTitle={catalog?.title}
              initialSubtitle={catalog?.description?.length > 0 && catalog?.description ? catalog?.description : ''}
              textBtn={buttonsLbls[0].label}
            />
          </section>

          <section className={`container ${classes.section__content}`}>
            <div className={` ${classes.section__content__sec}`}>
              <div className={classes.section__content__image}>
                <img
                  className={`${classes.img} banner_custom__img--dnone`}
                  src={bannerImg !== '' ? bannerImg : config.notImage}
                  alt={t('BannerImage.noImage')}
                />
              </div>
              <div className={classes.section__content__list}>
                <h1><span style={{ color: primaryColor }}>{t("Catalogs.main")}</span> {t("Catalogs.features")}</h1>
                <div className={classes.section__content__list_container}>
                  {listColumns.map((colItems, colIndex) => (
                    <ul key={colIndex} className={classes.section__content__list_column}>
                      {colItems.map((item, itemIndex) => (
                        <li key={itemIndex} className={classes.section__content__listItem}>{item}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </section>

          
          {/*<section className={`${classes.section__taxonomy} pb-9`}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className='h2 text__primary__title text-center font-weight-bold mb-2 ml-1'>
                    {t("Catalogs.taxonomyTitle")}
                  </h1>
                </div>
              </div>
              <div className='p-6'>
                <ReactJsonView
                  src={
                    jsonDl
                  }
                  showComma
                />
              </div>
            </div>
          </section>*/}

          <section className={classes.section__discover}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className='h2 text__primary__title text-center font-weight-bold mb-2 ml-1'>
                    {t('Home.discoverTitle')}
                  </h1>
                </div>
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <p className={`subtitle-1 mb-10 text__gray__darken text-center ${classes.section__discover__subtitle}`}>
                    {t('Home.discoverSubtitle')}
                  </p>
                </div>
              </div>
              <div className='row justify-center'>
                {
                  apisNews.length > 0 && (
                    apisNews.map((card) => (
                      <div key={card.documentId} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                        <CardBasic
                          chipTitle={card?.status === 'Publicado' ? 'GET' : 'POST'}
                          title={card?.title}
                          description={card?.description}
                          info={t('ApiDetail.moreInfo')}
                          url={`/apis/${card?.documentId}#api`}
                          css_styles={{ 'override_border__chip': 'custom_border__chip' }}
                          route={() => handleClickPage(card?.documentId)}
                          img={cardsImages[card.documentId] || config.notImage}
                        />
                      </div>
                    ))
                  )
                }
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                    <div className={`button text__primary d-xs-none ${classes.section__discover__showmore__button}`}>
                      <HashLink smooth to='/apis#apiHome'>
                        <span className='mr-1'>{t('ApiDetail.seeAll')}</span>
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

          <div id='contact' />
        </>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
};

export default CatalogDetail;
