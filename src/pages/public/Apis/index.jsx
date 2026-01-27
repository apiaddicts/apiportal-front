import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiContent } from '../../../redux/actions/apiAction';
import { getLibraries, filterCheck, sortApiCollection  } from '../../../redux/actions/libraryAction';
import BannerImage from '../../../components/Banner/BannerImage';
import SearchInput from '../../../components/Input/SearchInput';
import InputSelect from '../../../components/Input/InputSelect';
import CheckboxWrapper from '../../../components/common/Check';
import CustomizedAccordions from '../../../components/common/AccordionMUI';
import ButtonGroupMUI from '../../../components/common/ButtonGroup';
import CheckboxLabels from '../../../components/common/CustomCheck';
import ApisPaginated from '../../../components/ApisPaginated';
import Icon from '../../../components/MdIcon/Icon';
import classes from './apis.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import config from '../../../services/config';
import { useTranslation } from 'react-i18next';

function Apis({ setIsOpen }) {
  const { t } = useTranslation();
  const { libraries, filters, backUpLibreries, loadingLibraries } = useSelector((state) => state.library);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const [searchApiInputValue, setSearchApiInputValue] = useState('');
  const dispatch = useDispatch();
  const { apiPage } = useSelector((state) => state.api);

  useEffect(() => {
    if (apiPage && Object.keys(apiPage).length === 0) {
      dispatch(getApiContent());
    }
  }, [apiPage, dispatch]);

  useEffect(() => {
    if (libraries?.length === 0 && Object.keys(filters).length === 0) {
      dispatch(getLibraries());
    }
  }, [libraries, filters, dispatch]);

  const filterApiBanner = apiPage && apiPage.contentSections && apiPage.contentSections?.length > 0 ? apiPage.contentSections.filter((item) => item.__component === 'home.banner-section') : [];

  const resetFilters = () => {
    dispatch(getLibraries());
    dispatch({
      type: 'RESET_LIBRARY',
    });
    setSearchApiInputValue('');
    setFiltersSelect([]);
  };

  const handleChangeStatus = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'status'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeVersions = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'version'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeSolutions = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'solution'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangFilterTags = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'tag'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeSearchFilter = (text) => {
    setSearchApiInputValue(text);
    dispatch(filterCheck(text, null, 'search'));
  };

  const handleChangeGlobalRating = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'globalRating'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeProducts = (name, label, checked) => {
    dispatch(filterCheck(name, checked, 'product'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleSort = (sort) => {
    dispatch(sortApiCollection(sort));
  };
  // Filters titles array
  const titleRepeated = backUpLibreries && backUpLibreries.map((element) => {
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
  const stateRepeated = backUpLibreries && backUpLibreries.map((element) => {
    return element.publish;
  });
  const stateArr = stateRepeated && new Set(stateRepeated);
  const state = stateArr ? [...stateArr] : [];

  // Filters tags array
  const arrayTagsRepeated = backUpLibreries && backUpLibreries.map((element) => {
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
  const versionRepeated = backUpLibreries && backUpLibreries.map((element) => {
    return element.version;
  });

  const versionArr = new Set(versionRepeated);
  const versions = [...versionArr].sort();

  const globalRatingRepeated = backUpLibreries && backUpLibreries
    .map((element) => element.globalRating)
    .filter(Boolean); // quita null/undefined

  const globalRatingArr = new Set(globalRatingRepeated);
  const globalRatings = [...globalRatingArr].sort();

  const products = useMemo(() => {
    if (!backUpLibreries || backUpLibreries.length === 0) return [];
    return backUpLibreries.flatMap((library) => library.products || []);
  }, [backUpLibreries]);

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

  const compareArrays = (array1, array2) => {
    return array1.filter((a) => {
      return array2.some((b) => {
        return a.slug === b.name;
      });
    });
  };

  const apiImageUrl = filterApiBanner?.[0]?.background?.url
    ? `${filterApiBanner[0].background.url}`
    : config.notImage;

  const fApis = libraries && libraries.length > 0 ? libraries : [];

  return (
    <div id='apiHome'>
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
                {t('Apis.filterBy')}
              </div>
            )}
            {versions && Object.keys(versions).length > 0 && (
              <div className='w-full pl-4'>
                <div className={classes.wrapper__title}>
                  {t('Apis.version')}
                </div>
                <ButtonGroupMUI sx={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))', gap: '2px', alignItems: 'center', justifyContent: 'center' }}>
                  {versions.map((item, index) => (
                    <CheckboxLabels
                      key={index}
                      label={item}
                      name={item}
                      handleChangeSelect={handleChangeVersions}
                      checked={filtersSelect[item] !== undefined ? filtersSelect[item] : false}
                    />
                  ))}
                </ButtonGroupMUI>
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
            {loadingLibraries === false && libraries && (
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
                {loadingLibraries === false && libraries ? (
                  libraries.length > 0 ? (
                    <ApisPaginated
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

export default Apis;
