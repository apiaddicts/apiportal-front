import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogContent } from '../../../redux/actions/catalogAction';
import { getcatalogs  } from '../../../redux/actions/catalogAction';
import BannerImageBg from '../../../components/Banner/BannerImageBg';
import SearchInput from '../../../components/Input/SearchInput';
import InputSelect from '../../../components/Input/InputSelect';
import CheckboxWrapper from '../../../components/common/Check';
import CustomizedAccordions from '../../../components/common/AccordionMUI';
import {CatalogsPaginated} from '../../../components/ApisPaginated';
import Icon from '../../../components/MdIcon/Icon';
import classes from './catalogs.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import config from '../../../services/config';
import { useTranslation } from 'react-i18next';

function Catalog() {
  const { t } = useTranslation();
  const { catalogPage, catalogs, backUpCatalogs, filtersCatalogs, loadingCatalogs} = useSelector((state) => state.catalogs);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const [searchApiInputValue, setSearchApiInputValue] = useState('');
  const dispatch = useDispatch();
  const [cats, setCats] = useState([]);
  const [loading, setLoaging] = useState(false);

  useEffect(() => {
    if (catalogPage && Object.keys(catalogPage).length === 0) {
      dispatch(getCatalogContent());
    }
  }, [catalogPage, dispatch]);

  useEffect(() => {
    if (catalogs?.length === 0) {
      setLoaging(true);
      dispatch(getcatalogs());
    }
  }, [dispatch]);

  useEffect(() => {
    if (catalogs && catalogs.length > 0) {
      if (JSON.stringify(cats) !== JSON.stringify(catalogs)) {
        setCats(prev => [...prev, ...catalogs]);
        setLoaging(false);
      }
    }
  }, [catalogs]);

  const filterApiBanner = catalogPage && catalogPage.contentSections && catalogPage.contentSections?.length > 0 ? catalogPage.contentSections.filter((item) => item.__component === 'sections.calculate-section') : [];

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

  const apiImageUrl = filterApiBanner?.[0]?.image?.url
    ? `${filterApiBanner[0].image.url}`
    : config.notImage;

  const fApis = cats && cats.length > 0 ? cats : [];

  return (
    <div id='catalogHome'>
      {catalogPage && Object.keys(catalogPage).length > 0 ? (
        <div>
          <section>
            <BannerImageBg
              imageUrl={apiImageUrl}
              initialTitle={catalogPage.contentSections[0].title}
              initialSubtitle={catalogPage.contentSections[0].subtitle}
              textBtn={catalogPage.contentSections[0].button.name}
            />
          </section>
          <section className={classes.wrapper}>
            <article className={classes.wrapper__left}>
              {items && Object.keys(items).length > 0 && (
                <CustomizedAccordions title={t('Catalogs.filterByOrg')}>
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
              {((state && Object.keys(state).length > 0) || (versions && Object.keys(versions).length > 0) || (items && Object.keys(items).length > 0) || (tags && Object.keys(tags).length > 0)) && (
                <div className={classes.wrapper__filters_primary}>
                  <Icon id='MdDeleteOutline' />
                  <button type='button' className={classes.wrapper__reset} onClick={resetFilters}>{t('Apis.clearFilters')}</button>
                  <p>{t("Catalogs.deleteFilters")}</p>
                </div>
              )}
            </article>
            <section className={classes.wrapper__right}>
              {loading === false && cats && (
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
                  {loading === false && cats ? (
                    cats.length > 0 ? (
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
