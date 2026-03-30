import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMcpContent } from '../../../redux/actions/mcpAction';
import { getMcpLibraries, filterMcpCheck, sortMcpCollection } from '../../../redux/actions/mcpLibraryAction';
import BannerImage from '../../../components/Banner/BannerImage';
import SearchInput from '../../../components/Input/SearchInput';
import InputSelect from '../../../components/Input/InputSelect';
import CheckboxWrapper from '../../../components/common/Check';
import CustomizedAccordions from '../../../components/common/AccordionMUI';
import ButtonGroupMUI from '../../../components/common/ButtonGroup';
import CheckboxLabels from '../../../components/common/CustomCheck';
import LibraryPaginated from '../../../components/LibraryPaginated';
import CustomIcon from '../../../components/MdIcon/CustomIcon';
import Icon from '../../../components/MdIcon/Icon';
import classes from './mcps.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import config from '../../../services/config';
import { useTranslation } from 'react-i18next';

function Mcps({ setIsOpen }) {
  const { t } = useTranslation();
  const { mcpLibraries, filters, backUpMcpLibraries, loadingMcpLibraries } = useSelector((state) => state.mcpLibrary);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const dispatch = useDispatch();
  const { mcpPage } = useSelector((state) => state.mcp);

  useEffect(() => {
    if (mcpPage && Object.keys(mcpPage).length === 0) {
      dispatch(getMcpContent());
    }
  }, [mcpPage, dispatch]);

  useEffect(() => {
    if (mcpLibraries?.length === 0 && Object.keys(filters).length === 0) {
      dispatch(getMcpLibraries());
    }
  }, [mcpLibraries, filters, dispatch]);

  const filterMcpBanner = mcpPage && mcpPage.contentSections && mcpPage.contentSections?.length > 0
    ? mcpPage.contentSections.filter((item) => item.__component === 'home.banner-section')
    : [];

  const resetFilters = () => {
    dispatch(getMcpLibraries());
    dispatch({
      type: 'RESET_MCP_LIBRARY',
    });
    setSearchInputValue('');
    setFiltersSelect([]);
  };

  const handleChangeVersions = (name, label, checked) => {
    dispatch(filterMcpCheck(label, checked, 'version'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeSolutions = (name, label, checked) => {
    dispatch(filterMcpCheck(label, checked, 'solution'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangFilterTags = (name, label, checked) => {
    dispatch(filterMcpCheck(label, checked, 'tag'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeSearchFilter = (text) => {
    setSearchInputValue(text);
    dispatch(filterMcpCheck(text, null, 'search'));
  };

  const handleChangeGlobalRating = (name, label, checked) => {
    dispatch(filterMcpCheck(label, checked, 'globalRating'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleSort = (sort) => {
    dispatch(sortMcpCollection(sort));
  };

  const titleRepeated = backUpMcpLibraries?.map((element) => {
    return element.title;
  });

  const countRepeated = titleRepeated?.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const items = countRepeated && Object.keys(countRepeated).map((key) => {
    return {
      title: key,
      count: countRepeated[key],
    };
  });


  const stateRepeated = backUpMcpLibraries?.map((element) => {
    return element.publish;
  });
  const stateArr = stateRepeated && new Set(stateRepeated);
  const state = stateArr ? [...stateArr] : [];


  const arrayTagsRepeated = backUpMcpLibraries?.map((element) => {
    return element.tags;
  });
  const tagsBtns = arrayTagsRepeated && arrayTagsRepeated.flat();
  const tagsArr = tagsBtns && new Set(tagsBtns);
  const tagsArrUnique = tagsArr ? [...tagsArr] : [];
  const labelsTags = tagsArrUnique.map((item) => { return item.label; });

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

  const versionRepeated = backUpMcpLibraries?.map((element) => {
    return element.version;
  });

  const versionArr = new Set(versionRepeated);
  const versions = [...versionArr].sort();

  const globalRatingRepeated = backUpMcpLibraries?.map((element) => element.globalRating)
    .filter(Boolean);

  const globalRatingArr = new Set(globalRatingRepeated);
  const globalRatings = [...globalRatingArr].sort();

  const products = useMemo(() => {
    if (!backUpMcpLibraries || backUpMcpLibraries.length === 0) return [];
    return backUpMcpLibraries.flatMap((library) => library.products || []);
  }, [backUpMcpLibraries]);

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

  const mcpImageUrl = filterMcpBanner?.[0]?.background?.url
    ? `${filterMcpBanner[0].background.url}`
    : config.notImage;

  const fMcps = mcpLibraries && mcpLibraries.length > 0 ? mcpLibraries : [];

  return (
    <div id='mcpHome'>
      <BannerImage
        title={filterMcpBanner?.[0]?.title}
        img={mcpImageUrl}
        description={filterMcpBanner?.[0]?.subtitle}
        css_styles={{ 'layout_height': 'banner_custom__layout--height' }}
      />
      <div className='container'>
        <section className={classes.wrapper}>
          <article className={classes.wrapper__left}>
            {((state && Object.keys(state).length > 0) || (versions && Object.keys(versions).length > 0) || (items && Object.keys(items).length > 0) || (tags && Object.keys(tags).length > 0)) && (
              <div className={classes.wrapper__title}>
                {t('Mcps.filterBy')}
              </div>
            )}
            {versions && Object.keys(versions).length > 0 && (
              <div className='w-full pl-4'>
                <div className={classes.wrapper__title}>
                  {t('Mcps.version')}
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
              <CustomizedAccordions title={t('Mcps.solution')}>
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
              <CustomizedAccordions title={t('Mcps.tags')}>
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
              <CustomizedAccordions title={t('Mcps.globalRating')}>
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
              <CustomizedAccordions title={t('Mcps.products')}>
                {productsFilters.map((item, index) => (
                  <div key={index} className={classes.wrapper__checkbox}>
                    <CheckboxWrapper
                      name={item.slug}
                      label={item.title}
                      handleChangeSelect={(name, label, checked) => {
                        setFiltersSelect({ ...filtersSelect, [name]: checked });
                      }}
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
                <button type='button' className={classes.wrapper__reset} onClick={resetFilters}>{t('Mcps.clearFilters')}</button>
              </div>
            )}
          </article>
          <section className={classes.wrapper__right}>
            {loadingMcpLibraries === false && mcpLibraries && (
              <div className={classes.wrapper__right__controls_row}>
                <div className={classes.wrapper__right__search}>
                  <SearchInput
                    icon
                    name='search'
                    type='text'
                    onChange={(e) => {
                      handleChangeSearchFilter(e.target.value);
                    }}
                    placeholder={t('Mcps.searchPlaceholder')}
                    borderRadius='6px'
                    value={searchInputValue}
                  />
                </div>
                <div className={classes.wrapper__right__sort}>
                  <InputSelect handleSelect={(e) => {
                    handleSort(e);
                  }}
                  />
                </div>
                <div className={classes.wrapper__right__page_size}>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className={classes.wrapper__right__page_size__select}
                    aria-label={t('Mcps.itemsPerPage') || 'Items per page'}
                  >
                    {[9, 30, 60, 90].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className={classes.wrapper__right__view_switch}>
                  <button
                    className={viewType === 'list' ? classes.wrapper__right__view_switch__active : ''}
                    onClick={() => setViewType('list')}
                  >
                    <Icon id='MdOutlineViewAgenda'></Icon>
                  </button>
                  <button
                    className={viewType === 'grid' ? classes.wrapper__right__view_switch__active : ''}
                    onClick={() => setViewType('grid')}
                  >
                    <Icon id='MdGridView'></Icon>
                  </button>
                </div>
              </div>
            )}
            <div className='flex-sm-12 flex-md-6'>
              <div className='row'>
                {loadingMcpLibraries === false && mcpLibraries ? (
                  mcpLibraries.length > 0 ? (
                    <LibraryPaginated
                      items={fMcps}
                      itemsPerPage={itemsPerPage}
                      viewType={viewType}
                      basePath='/mcps'
                      anchor='mcp'
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
                        <h1>{t('Mcps.noData')}</h1>
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

export default Mcps;
