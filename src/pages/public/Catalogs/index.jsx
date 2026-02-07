import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiContent } from '../../../redux/actions/apiAction';
import { getcatalogs  } from '../../../redux/actions/catalogAction';
import BannerImage from '../../../components/Banner/BannerImage';
import SearchInput from '../../../components/Input/SearchInput';
import InputSelect from '../../../components/Input/InputSelect';
import CheckboxWrapper from '../../../components/common/Check';
import CustomizedAccordions from '../../../components/common/AccordionMUI';
import ButtonGroupMUI from '../../../components/common/ButtonGroup';
import CheckboxLabels from '../../../components/common/CustomCheck';
import {CatalogsPaginated} from '../../../components/ApisPaginated';
import Icon from '../../../components/MdIcon/Icon';
import classes from './catalogs.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import config from '../../../services/config';
import { useTranslation } from 'react-i18next';

function Catalog() {
  const { t } = useTranslation();
  const { catalogs, backUpCatalogs, filtersCatalogs, loadingCatalogs} = useSelector((state) => state.catalogs);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const [searchApiInputValue, setSearchApiInputValue] = useState('');
  const dispatch = useDispatch();
  const { apiPage } = useSelector((state) => state.api);

  useEffect(() => {
    if (apiPage && Object.keys(apiPage).length === 0) {
      dispatch(getApiContent());
    }
  }, [apiPage, dispatch]);

  const catalogsCopy = useMemo(() => {
    if (catalogs && catalogs.length > 0) {
      return [...catalogs];
    }
    return [];
  }, [catalogs?.length > 0]);

  useEffect(() => {
    if (catalogs?.length === 0 && Object.keys(filtersCatalogs).length === 0) {
      dispatch(getcatalogs());
    }
  }, [catalogs, filtersCatalogs, dispatch]);

  const filterApiBanner = apiPage && apiPage.contentSections && apiPage.contentSections?.length > 0 ? apiPage.contentSections.filter((item) => item.__component === 'home.banner-section') : [];

  const resetFilters = () => {
    dispatch(getLibraries());
    dispatch({
      type: 'RESET_LIBRARY',
    });
    setSearchApiInputValue('');
    setFiltersSelect([]);
  };

  const handleChangeSolutions = (name, label, checked) => {
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangFilterTags = (name, label, checked) => {
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeSearchFilter = (text) => {
    setSearchApiInputValue(text);
  };

  const handleChangeGlobalRating = (name, label, checked) => {
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeProducts = (name, label, checked) => {
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };


  // Filters titles array
  const titleRepeated = backUpCatalogs && backUpCatalogs.map((element) => {
    return element.title;
  });
  // count items repeated
  const countRepeated = titleRepeated && titleRepeated.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const items = countRepeated && Object.keys(countRepeated).map((key) => {
    return {
      title: key,
      count: countRepeated[key],
    };
  });

  // Filters status array
  const stateRepeated = backUpCatalogs && backUpCatalogs.map((element) => {
    return element.publish;
  });
  const stateArr = stateRepeated && new Set(stateRepeated);
  const state = stateArr ? [...stateArr] : [];

  // Filters tags array
  const arrayTagsRepeated = backUpCatalogs && backUpCatalogs.map((element) => {
    return element.tags;
  });
  const tagsBtns = arrayTagsRepeated && arrayTagsRepeated.flat();
  const tagsArr = tagsBtns && new Set(tagsBtns);
  const tagsArrUnique = tagsArr ? [...tagsArr] : [];
  const labelsTags = tagsArrUnique.map((item) => { return item.label; });

  // count labelsTags repeated
  const countRepeatedTags = labelsTags.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const tags = Object.keys(countRepeatedTags).map((key) => {
    return {
      title: key,
      count: countRepeatedTags[key],
    };
  });

  // Filters version array
  const versionRepeated = backUpCatalogs && backUpCatalogs.map((element) => {
    return element.version;
  });

  const versionArr = new Set(versionRepeated);
  const versions = [...versionArr].sort();

  const globalRatingRepeated = backUpCatalogs && backUpCatalogs
    .map((element) => element.globalRating)
    .filter(Boolean); // quita null/undefined

  const globalRatingArr = new Set(globalRatingRepeated);
  const globalRatings = [...globalRatingArr].sort();

  const products = useMemo(() => {
    if (!backUpCatalogs || backUpCatalogs.length === 0) return [];
    return backUpCatalogs.flatMap((library) => library.products || []);
  }, [backUpCatalogs]);

  const productsFilters = useMemo(() => {
    if (!products.length) return [];

    const map = products.reduce((acc, product) => {
      if (!acc[product.slug]) {
        acc[product.slug] = {
          title: product.title,
          slug: product.slug,
          count: 1,
        };
      } else {
        acc[product.slug].count += 1;
      }
      return acc;
    }, {});

    return Object.values(map);
  }, [products]);

  const apiImageUrl = filterApiBanner?.[0]?.background?.url
    ? `${filterApiBanner[0].background.url}`
    : config.notImage;

  const fApis = catalogsCopy && catalogsCopy.length > 0 ? catalogsCopy : [];

  return (
    <div id='catalogHome'>
      <BannerImage
        title={filterApiBanner?.[0]?.title}
        img={apiImageUrl}
        description={filterApiBanner?.[0]?.subtitle}
        css_styles={{ 'layout_height': 'banner_custom__layout--height' }}
      />
      <div className='container'>
        <section className={classes.wrapper}>
          <article className={classes.wrapper__left}>
            {((state && Object.keys(state).length > 0) || (versions && Object.keys(versions).length > 0) || (items && Object.keys(items).length > 0) || (tags && Object.keys(tags).length > 0)) && (
              <div className={classes.wrapper__title}>
                {t('catalogsCopy.filterByOrg')}
              </div>
            )}
            {items && Object.keys(items).length > 0 && (
              <CustomizedAccordions title={t('Apis.solution')}>
                {items && items.map((item, index) => (
                  <div key={index} className={classes.wrapper__checkbox}>
                    <CheckboxWrapper
                      name={item.title}
                      label={item.title}
                      handleChangeSelect={handleChangeSolutions}
                      checked={filtersSelect[item.title] !== undefined ? filtersSelect[item.title] : false}
                    />
                    <p className={`${classes.wrapper__checkbox__counter} fs__10 text__gray__gray_darken`}>{item.count}</p>
                  </div>
                ))}
              </CustomizedAccordions>
            )}
            {tags && Object.keys(tags).length > 0 && (
              <CustomizedAccordions title={t('Apis.tags')}>
                {tags.map((item, index) => (
                  <div className={classes.wrapper__checkbox} key={index}>
                    <CheckboxWrapper
                      name={item.title}
                      label={item.title}
                      handleChangeSelect={handleChangFilterTags}
                      checked={filtersSelect[item.title] !== undefined ? filtersSelect[item.title] : false}
                    />
                    <p className={`${classes.wrapper__checkbox__counter} fs__10 text__gray__gray_darken`}>{item.count}</p>
                  </div>
                ))}
              </CustomizedAccordions>
            )}
            {globalRatings && globalRatings.length > 0 && (
              <CustomizedAccordions title={t('Apis.globalRating')}>
                {globalRatings.map((item, index) => (
                  <div key={index} className={classes.wrapper__checkbox}>
                    <CheckboxWrapper
                      name={item}
                      label={item}
                      handleChangeSelect={handleChangeGlobalRating}
                      checked={filtersSelect[item] !== undefined ? filtersSelect[item] : false}
                    />
                  </div>
                ))}
              </CustomizedAccordions>
            )}
            {productsFilters && productsFilters.length > 0 && (
              <CustomizedAccordions title={t('Apis.products')}>
                {productsFilters.map((item, index) => (
                  <div key={index} className={classes.wrapper__checkbox}>
                    <CheckboxWrapper
                      name={item.slug}
                      label={item.title}
                      handleChangeSelect={handleChangeProducts}
                      checked={
                        filtersSelect[item.slug] !== undefined
                          ? filtersSelect[item.slug]
                          : false
                      }
                    />
                    <p className={`${classes.wrapper__checkbox__counter} fs__10 text__gray__gray_darken`}>
                      {item.count}
                    </p>
                  </div>
                ))}
              </CustomizedAccordions>
            )}
            {((state && Object.keys(state).length > 0) || (versions && Object.keys(versions).length > 0) || (items && Object.keys(items).length > 0) || (tags && Object.keys(tags).length > 0)) && (
              <div className={classes.wrapper__filters}>
                <Icon id='MdDeleteOutline' />
                <button type='button' className={classes.wrapper__reset} onClick={resetFilters}>{t('Apis.clearFilters')}</button>
              </div>
            )}
          </article>
          <section className={classes.wrapper__right}>
            {loadingCatalogs === false && catalogsCopy && (
              <div className='w-full'>
                <div className='row'>
                  <div className={`flex-sm-12 flex-md-7 flex-lg-7 ${classes.wrapper__right__control_container}`}>
                    <SearchInput
                      icon
                      name='search'
                      type='text'
                      onChange={(e) => {
                        handleChangeSearchFilter(e.target.value);
                      }}
                      placeholder={t('Apis.searchPlaceholder')}
                      borderRadius='6px'
                      value={searchApiInputValue}
                    />
                  </div>
                  <div className={`flex-sm-12 flex-md-5 flex-lg-5 ${classes.wrapper__right__control_container}`}>
                    <InputSelect handleSelect={(e) => {
                      handleSort(e);
                    }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className='flex-sm-12 flex-md-6'>
              <div className='row'>
                {loadingCatalogs === false && catalogsCopy ? (
                  catalogsCopy.length > 0 ? (
                    <CatalogsPaginated
                      apis={fApis}
                      itemsPerPage={8}
                    />
                  ) : (
                    <section
                      style={{
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '2rem',
                        }}
                      >
                        <h1>{t('Apis.noData')}</h1>
                      </div>
                    </section>
                  )
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <SkeletonComponent />
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Catalog;
