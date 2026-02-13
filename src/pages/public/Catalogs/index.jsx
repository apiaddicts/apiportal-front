import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcatalogs, getCatalogContent, filterCheck, sortApiCollection } from '../../../redux/actions/catalogAction';
import SearchInput from '../../../components/Input/SearchInput';
import InputSelect from '../../../components/Input/InputSelect';
import CheckboxWrapper from '../../../components/common/Check';
import CustomizedAccordions from '../../../components/common/AccordionMUI';
import CatalogsPaginated from '../../../components/CatalogsPaginated';
import Icon from '../../../components/MdIcon/Icon';
import classes from './catalogs.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import { useTranslation } from 'react-i18next';

function Catalog() {
  const { t } = useTranslation();
  const { catalogPage, catalogs, backUpCatalogs, filtersCatalogs, loadingCatalogs} = useSelector((state) => state.catalogs);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const [searchApiInputValue, setSearchApiInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogPage && Object.keys(catalogPage).length === 0) {
      dispatch(getCatalogContent());
    }
  }, [catalogPage, dispatch]);

  useEffect(() => {
    if (catalogs?.length === 0 && Object.keys(filtersCatalogs || {}).length === 0) {
      dispatch(getcatalogs());
    }
  }, [catalogs, filtersCatalogs, dispatch]);

  const resetFilters = () => {
    dispatch(getcatalogs());
    dispatch({
      type: 'RESET_CATALOG',
    });
    setSearchApiInputValue('');
    setFiltersSelect([]);
  };

  const handleChangeOrganization = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'organization'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeDomain = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'domain'));
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

  const handleSort = (sort) => {
    dispatch(sortApiCollection(sort));
  };

  // Filters titles array
  const titleRepeated = backUpCatalogs && backUpCatalogs.map((element) => {
    return element.organization;
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

  // Filters domains array
  const domainRepeated = backUpCatalogs && backUpCatalogs.map((element) => {
    return element.domain;
  });

  // count domains repeated
  const countRepeatedDomains = domainRepeated && domainRepeated.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const domains = countRepeatedDomains && Object.keys(countRepeatedDomains).map((key) => {
    return {
      title: key,
      count: countRepeatedDomains[key],
    };
  });

  const fApis = catalogs && catalogs.length > 0 ? catalogs : [];

  return (
    <div id='catalogHome'>
      {catalogPage && Object.keys(catalogPage).length > 0 ? (
        <div>
          {/*<section>
            <BannerImageBg
              imageUrl={apiImageUrl}
              initialTitle={catalogPage.contentSections[0].title}
              initialSubtitle={catalogPage.contentSections[0].subtitle}
              textBtn={catalogPage.contentSections[0].button.name}
              css_styles={{ 'layout_height': 'banner_custom__layout--height' }}
            />
          </section>*/}
          <section className={classes.wrapper}>
            <article className={classes.wrapper__left}>
              {items && Object.keys(items).length > 0 && (
                <CustomizedAccordions title={t('Catalogs.filterByOrg')}>
                  {items && items.map((item, index) => (
                    <div key={index} className={classes.wrapper__checkbox}>
                      <CheckboxWrapper
                        name={item.title}
                        label={item.title}
                        handleChangeSelect={handleChangeOrganization}
                        checked={filtersSelect[item.title] !== undefined ? filtersSelect[item.title] : false}
                      />
                      <p className={`${classes.wrapper__checkbox__counter} fs__10 text__gray__gray_darken`}>{item.count}</p>
                    </div>
                  ))}
                </CustomizedAccordions>
              )}
              {tags && Object.keys(tags).length > 0 && (
                <CustomizedAccordions title={t('Catalogs.filterByTag')}>
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
              {domains && Object.keys(domains).length > 0 && (
                <CustomizedAccordions title={t('Catalogs.filterByDomain')}>
                  {domains && domains.map((domain, index) => (
                    <div key={index} className={classes.wrapper__checkbox}>
                      <CheckboxWrapper
                        name={domain.title}
                        label={domain.title}
                        handleChangeSelect={handleChangeDomain}
                        checked={filtersSelect[domain.title] !== undefined ? filtersSelect[domain.title] : false}
                      />
                      <p className={`${classes.wrapper__checkbox__counter} fs__10 text__gray__gray_darken`}>{domain.count}</p>
                    </div>
                  ))}
                </CustomizedAccordions>
              )}
              {((state && Object.keys(state).length > 0) || (items && Object.keys(items).length > 0) || (tags && Object.keys(tags).length > 0) || (domains && Object.keys(domains).length > 0)) && (
                <div className={classes.wrapper__filters_primary}>
                  <Icon id='MdDeleteOutline' />
                  <button type='button' className={classes.wrapper__reset} onClick={resetFilters}>{t('Apis.clearFilters')}</button>
                  <p>{t("Catalogs.deleteFilters")}</p>
                </div>
              )}
            </article>
            <section className={classes.wrapper__right}>
              {loadingCatalogs === false && catalogs && (
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
                        placeholder={t('Catalogs.searchPlaceholder')}
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
                  {loadingCatalogs === false && catalogs ? (
                    catalogs.length > 0 ? (
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
      ) : (
        <SkeletonComponent />
      )}
      
    </div>
  );
};

export default Catalog;
