import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { getApiContent } from '../../../redux/actions/apiAction';
import { getLibraries, filterCheck, sortApiCollection } from '../../../redux/actions/libraryAction';
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

function Apis({ setIsOpen }) {
  const { libraries, filters, backUpLibreries, loadingLibraries } = useSelector((state) => state.library);
  const [filtersSelect, setFiltersSelect] = useState([]);
  const [searchApiInputValue, setSearchApiInputValue] = useState('');
  const dispatch = useDispatch();
  const { apiPage } = useSelector((state) => state.api);

  useEffect(() => {
    if (apiPage && Object.keys(apiPage).length === 0) {
      dispatch(getApiContent());
    }
  }, []);

  const filterApiBanner = apiPage && apiPage.contentSections && apiPage.contentSections?.length > 0 ? apiPage.contentSections.filter((item) => item.__component === 'home.banner-section') : [];

  // remove all filters
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
    return element.status;
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

  useEffect(() => {
    if (libraries && libraries.length === 0 && Object.keys(filters).length === 0) {
      dispatch(getLibraries());
    }
  }, []);

  return (
    <div id='apiHome' style={{ paddingTop: '114px' }}>
      <BannerImage
        title={filterApiBanner?.[0]?.title}
        img={filterApiBanner?.[0]?.background?.url}
        css_styles={{ 'layout_height': 'banner_custom__layout--height' }}
      />
      <div className='container'>
        <section className={classes.wrapper}>
          <article className={classes.wrapper__left}>
            <CustomizedAccordions title='Estado'>
              {
                state.map((item, index) => (
                  <div
                    className={classes.wrapper__checkbox}
                    key={index}
                  >
                    <CheckboxWrapper
                      name={item}
                      label={item}
                      handleChangeSelect={handleChangeStatus}
                      checked={filtersSelect[item] !== undefined ? filtersSelect[item] : false}
                    />
                  </div>
                ))
              }
            </CustomizedAccordions>
            <div className='w-full pl-4'>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1.33px',
                  color: '#53565A',
                  marginBottom: '15px',
                }}
              >
                Versión
              </Typography>
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
            <CustomizedAccordions title='Solución'>
              { items && items.map((item, index) => (
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
            <CustomizedAccordions title='Etiquetas'>
              { tags.map((item, index) => (
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
            <div className={classes.wrapper__filters}>
              <Icon id='MdDeleteOutline' />
              <button type='button' className={classes.wrapper__reset} onClick={resetFilters}>Eliminar filtros</button>
            </div>
          </article>
          <section className={classes.wrapper__right}>
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
                    placeholder='Buscar APIs...'
                    borderRadius='20px'
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
            <div className='flex-sm-12 flex-md-6'>
              <div className='row'>
                {loadingLibraries === false && libraries ? (
                  libraries.length > 0 ? (
                    <ApisPaginated
                      apis={libraries}
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
                        <h1>Información no disponible</h1>
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
                ) }
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Apis;
