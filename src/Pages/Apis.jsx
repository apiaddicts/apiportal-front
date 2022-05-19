import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import BannerImage from '../components/Banner/BannerImage';
import SearchInput from '../components/Input/SearchInput';
import InputSelect from '../components/Input/InputSelect';

import classes from '../styles/pages/api.module.scss';
import CheckboxWrapper from '../components/common/Check';
import CustomizedAccordions from '../components/common/AccordionMUI';
import CardInformation from '../components/Card/CardInformation';
// import ButtonCutom from '../components/common/ButtonMUI';
import ButtonGroupMUI from '../components/common/ButtonGroup';

import { getLibraries, filterCheck, sortApiCollection } from '../redux/actions/libraryAction';
import CheckboxLabels from '../components/common/CustomCheck';
import Icon from '../components/MdIcon/Icon';

function Apis() {
  const [activeTab, setActiveTab] = useState('');

  const { libraries, filters, backUpLibreries, loadingLibraries } = useSelector((state) => state.library);
  const [filtersSelect, setFiltersSelect] = useState([]);

  const dispatch = useDispatch();

  // remove all filters
  const resetFilters = () => {
    dispatch(getLibraries());
    dispatch({
      type: 'RESET_LIBRARY',
    });
    setFiltersSelect([]);
    setActiveTab('');

  };

  const handleChangeStatus = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'status'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };
  const handleChangeVersions = (name, label, checked) => {
    console.log(name, checked);
    if (name === label && checked) {
      setActiveTab(label);
    } else {
      setActiveTab('');
    }
    dispatch(filterCheck(label, checked, 'version'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };

  const handleChangeSolutions = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'solution'));
    setFiltersSelect({ ...filtersSelect, [name]: checked });
  };
  const handleChangFilterTags = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 'tag'));
    setFiltersSelect({ ...filtersSelect, [name]: label });
  };
  const handleChangeSearchFilter = (text) => {
    dispatch(filterCheck(text, null, 'search'));
  };

  const handleSort = (sort) => {
    dispatch(sortApiCollection(sort));
  };
  // Filters titles array
  const titleRepeated = backUpLibreries.map((element) => {
    return element.title;
  });
  // count items repeated
  const countRepeated = titleRepeated.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const items = Object.keys(countRepeated).map((key) => {
    return {
      title: key,
      count: countRepeated[key],
    };
  });

  // Filters status array
  const stateRepeated = backUpLibreries.map((element) => {
    return element.status;
  });
  const stateArr = new Set(stateRepeated);
  const state = [...stateArr];

  // Filters tags array
  const arrayTagsRepeated = backUpLibreries.map((element) => {
    return element.tags;
  });
  const tagsBtns = arrayTagsRepeated.flat();
  const tagsArr = new Set(tagsBtns);
  const tagsArrUnique = [...tagsArr];
  const labelsTags = tagsArrUnique.map((item) => { return item.label; });

  // count labelsTags repeated
  const countRepeatedTags = labelsTags.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const tags = Object.keys(countRepeatedTags).map((key) => {
    return {
      label: key,
      count: countRepeatedTags[key],
    };
  });

  // Filters version array
  const versionRepeated = backUpLibreries.map((element) => {
    return element.version;
  });

  const versionArr = new Set(versionRepeated);
  const versions = [...versionArr];

  useEffect(() => {
    if (libraries && libraries.length === 0 && Object.keys(filters).length === 0) {
      dispatch(getLibraries());
    }
  }, [libraries]);

  // console.log('Librerias array', libraries);
  return (
    <div style={{ paddingTop: '114px' }}>
      <BannerImage />
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
              Version
            </Typography>
            <ButtonGroupMUI sx={{ marginBottom: '15px' }}>
              {versions.map((item, index) => (
                <CheckboxLabels
                  activeTab={activeTab}
                  key={index}
                  label={item}
                  name={item}
                  handleChangeSelect={handleChangeVersions}
                  checked={filtersSelect[item] !== undefined ? filtersSelect[item] : false}
                />
              ))}
            </ButtonGroupMUI>
          </div>
          <CustomizedAccordions title='Solution'>
            { items.map((item, index) => (
              <div key={index} className={classes.wrapper__checkbox}>
                <CheckboxWrapper
                  name={item.title}
                  label={item.title}
                  handleChangeSelect={handleChangeSolutions}
                  checked={filtersSelect[item.title] !== undefined ? filtersSelect[item.title] : false}
                />
                <p className={classes.wrapper__checkbox__counter}>{item.count}</p>
              </div>
            ))}
          </CustomizedAccordions>
          <CustomizedAccordions title='Tags'>
            { tags.map((item, index) => (
              <div className={classes.wrapper__checkbox} key={index}>
                <CheckboxWrapper
                  name={item.label}
                  label={item.label}
                  handleChangeSelect={handleChangFilterTags}
                  checked={filtersSelect[item.label] !== undefined ? filtersSelect[item.label] : false}
                />
                <p className={classes.wrapper__checkbox__counter}>{item.count}</p>
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
              <div className='flex-sm-12 flex-md-8 mt-8'>
                <SearchInput
                  icon
                  name='search'
                  type='text'
                  onChange={(e) => {
                    handleChangeSearchFilter(e.target.value);
                  }}
                  placeholder='Buscar APIs...'
                  borderRadius='20px'
                />
              </div>
              <div className='flex-sm-12 flex-md-4 mt-8'>
                <InputSelect handleSelect={(e) => {
                  console.log(e);
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
                  libraries.map((item, index) => (
                    <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                      <Link to={`/api/${item.id}`}>
                        <CardInformation
                          title={item.title}
                          status={item.status}
                          version={item.version}
                          buttons={item.tags}
                          colorStatus={item.color_status}
                          info='Ver Documentación'
                          description={item.description}
                        />
                      </Link>
                    </div>
                  ))
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
                      <h1>No hay data</h1>
                    </div>
                  </section>
                )
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
                    <h1>Cargando....</h1>
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Apis;
