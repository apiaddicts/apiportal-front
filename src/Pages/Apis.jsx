import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

// import AccordionCheck from '../components/Accordion/AccordionCheck';

import BannerImage from '../components/Banner/BannerImage';
import SearchInput from '../components/Input/SearchInput';
import InputSelect from '../components/Input/InputSelect';

import classes from '../styles/pages/api.module.scss';
import CheckboxWrapper from '../components/common/Check';
import CustomizedAccordions from '../components/common/AccordionMUI';
import CardInformation from '../components/Card/CardInformation';
import ButtonCutom from '../components/common/ButtonMUI';
import ButtonGroupMUI from '../components/common/ButtonGroup';

import { getLibraries } from '../redux/actions/libraryAction';
import useSearch from '../hooks/useSearch';
import useResults from '../hooks/useResults';

function Apis() {
  const { libraries } = useSelector((state) => state.library);
  const [resultsSearch, setResultsSearch] = useState([]);
  const [resultsStatus, setResultsStatus] = useState([]);
  const [resultsData, setResultsData] = useState(libraries);
  const { resultValue, setResultValue } = useResults([]);
  const [filterLetter, setFilterLetter] = useState(true);

  const versionsRepeated = libraries.map((element) => {
    return element.version;
  });
  const versionArr = new Set(versionsRepeated);
  const versions = [...versionArr];
  const [activeTab, setActiveTab] = useState(versions[0]);

  const { value, setValue, formik } = useSearch({
    initialState: {
      search: '',
    },
  });
  const [filterStatus, setFilterStatus] = useState({
    active: false,
    label: '',
  });
  const [filter, setFilter] = useState({
    active: false,
    label: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [filterTags, setFilterTags] = useState({
    active: false,
    label: '',
  });

  const results = libraries.filter((item) => {
    if (formik.values.search === '') {
      return null;
    } if (formik.values.search !== '') {
      return item.title.toLowerCase().includes(value.toLowerCase());
    }
    return null;
  });

  const dispatch = useDispatch();

  const onClickItem = (label) => {
    setActiveTab(label);
    // resultsData.filter((item) => {
    //   if (item.version.toLowerCase() !== 'v 1.0') {
    //     return setResultsData(libraries);
    //   }
    //   return setResultsData([item]);
    // });
  };

  resultsData.sort((a, b) => {
    if (filterLetter) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    }
    return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
  });

  const handleChangeSelect = (name, label, checked) => {
    setFilterStatus({
      active: checked,
      label,
    });
  };

  const handleChangFilter = (name, label, checked) => {
    setFilter({
      active: checked,
      label,
    });
  };
  const handleChangFilterTags = (name, label, checked) => {
    setFilterTags({
      active: checked,
      label,
    });
  };

  // Repetidos echos por kike

  const titleRepeated = libraries.map((element) => {
    return element.title;
  });
  const dataArr = new Set(titleRepeated);
  const items = [...dataArr];

  const stateRepeated = libraries.map((element) => {
    return element.status;
  });
  const stateArr = new Set(stateRepeated);
  const state = [...stateArr];

  const arrayTagsRepeated = libraries.map((element) => {
    return element.tags;
  });
  const tagsBtns = arrayTagsRepeated.flat();

  const tagsArr = new Set(tagsBtns);
  const tagsArrUnique = [...tagsArr];
  const labelsTags = tagsArrUnique.map((item) => { return item.label; });
  const labelsTagsArr = new Set(labelsTags);
  const tags = [...labelsTagsArr];

  const resState = libraries.filter((item) => {
    if (filterStatus.active === false) {
      return null;
    } if (filterStatus.active === true) {
      return item.status.toLowerCase().includes(filterStatus.label.toLowerCase());
    }
    return null;
  });
  const resTitle = libraries.filter((item) => {
    if (filter.active === false) {
      return null;
    } if (filter.active === true) {
      return item.title.toLowerCase().includes(filter.label.toLowerCase());
    }
    return null;
  });

  useEffect(() => {
    setResultsStatus(resState);
  }, [filterStatus]);

  useEffect(() => {
    setResultValue(resTitle);
  }, [filter]);

  useEffect(() => {
    setValue(formik.values.search);
    setResultsSearch(results);
    console.log('Fuera del filter status');

    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }
    setResultsData(libraries);
  }, [libraries, formik.values.search]);

  resultsData.sort((a, b) => {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    }
    return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
  });

  return (
    <div>
      {libraries && libraries.length > 0 ? (
        <>
          <BannerImage />
          <section className={classes.container}>
            <article className={classes.container__left}>
              <CustomizedAccordions title='Status'>
                {
                  state.map((item, index) => (
                    <div
                      className={classes.container__checkbox}
                      key={index}
                    >
                      <CheckboxWrapper
                        name={item}
                        label={item}
                        handleChangeSelect={handleChangeSelect}
                      />
                      {/* {option.count && (<p className={classes.container__checkbox__counter}>{option.count}</p>)} */}
                    </div>
                  ))
                }
              </CustomizedAccordions>
              <div className='container py-3'>
                <Typography>
                  VERSIÓN
                </Typography>
                <ButtonGroupMUI>
                  {versions.map((item, index) => (
                    <ButtonCutom key={index} activeTab={activeTab} label={item} onClickItem={onClickItem} />
                  ))}
                </ButtonGroupMUI>
              </div>
              <CustomizedAccordions title='Solutions'>
                { items.map((item, index) => (
                  <div className={classes.container__checkbox}>
                    <CheckboxWrapper
                      name={item}
                      label={item}
                      handleChangeSelect={handleChangFilter}
                    />
                    {/* {option.count && (<p className={classes.container__checkbox__counter}>{option.count}</p>)} */}
                  </div>
                ))}
              </CustomizedAccordions>
              <CustomizedAccordions title='Tags'>
                { tags.map((item, index) => (
                  <div className={classes.container__checkbox} key={index}>
                    <CheckboxWrapper
                      name={item}
                      label={item}
                      handleChangeSelect={handleChangFilterTags}
                    />
                    {/* {option.count && (<p className={classes.container__checkbox__counter}>{option.count}</p>)} */}
                  </div>
                ))}
              </CustomizedAccordions>
            </article>
            <section className={classes.container__right}>
              <div className='w-full'>
                <div className='row'>
                  <div className='flex-sm-12 flex-md-8 mt-8'>
                    <SearchInput
                      icon
                      name='search'
                      type='text'
                      onChange={formik.handleChange}
                      placeholder='Buscar APIs...'
                      borderRadius='20px'
                    />
                  </div>
                  <div className='flex-sm-12 flex-md-4 mt-8'>
                    <InputSelect handleClick={setFilterLetter} />
                  </div>
                </div>
              </div>
              <div className='flex-sm-12 flex-md-6'>
                <div className='row'>
                  {/* {!filterStatus.active && !filter.active ? (
                    libraries.map((item, index) => (
                      <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                        <Link to='/api/1'>
                          <CardInformation
                            title={item.title}
                            status={item.status}
                            version={item.version}
                            buttons={item.tags}
                            colorStatus={item.color_status}
                            info='Documentación'
                            description={item.description}
                          />
                        </Link>
                      </div>
                    ))
                  ) : null} */}
                  {resultsStatus.length === 0 && resultValue.length === 0 ? (
                    resultsSearch.length === 0 || formik.values.search === '' ? (
                      resultsData.map((item, index) => (
                        <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                          <Link to={`/api/${item.id}`}>
                            <CardInformation
                              title={item.title}
                              status={item.status}
                              version={item.version}
                              buttons={item.tags}
                              colorStatus={item.color_status}
                              info='Documentación'
                              description={item.description}
                            />
                          </Link>
                        </div>
                      ))) : (
                      resultsSearch.map((item, index) => (
                        <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                          <Link to={`/api/${item.id}`}>
                            <CardInformation
                              title={item.title}
                              status={item.status}
                              version={item.version}
                              buttons={item.tags}
                              colorStatus={item.color_status}
                              info='Documentación'
                              description={item.description}
                            />
                          </Link>
                        </div>
                      ))
                    )
                  ) : null}
                  {resultsStatus.length !== 0 && (
                    resultsStatus.map((item, index) => (
                      <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                        <Link to={`/api/${item.id}`}>
                          <CardInformation
                            title={item.title}
                            status={item.status}
                            version={item.version}
                            buttons={item.tags}
                            colorStatus={item.color_status}
                            info='Documentación'
                            description={item.description}
                          />
                        </Link>
                      </div>
                    ))
                  )}
                  {resultValue.length !== 0 && (
                    resultValue.map((item, index) => (
                      <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                        <Link to={`/api/${item.id}`}>
                          <CardInformation
                            title={item.title}
                            status={item.status}
                            version={item.version}
                            buttons={item.tags}
                            colorStatus={item.color_status}
                            info='Documentación'
                            description={item.description}
                          />
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </section>
        </>
      ) : (null)}

    </div>
  );
};

export default Apis;

// // const results = libraries.filter((item) => {
// //   return item.status.toLowerCase().includes(filterStatus.label.toLowerCase());
// // });

// // eslint-disable-next-line no-unused-vars
// // const resultsData = libraries.filter((item) => {
// //   return formik.values.search === '' ? item.version.toLowerCase().includes(activeTab.toLowerCase()) :
// //     item.title.toLowerCase().includes(value.toLowerCase());
// // });

// // const filterResults = resultsData.filter((item) => {
// //   return filterStatus.status ? null : item.title.toLowerCase().includes(filter.label.toLowerCase());
// // });
