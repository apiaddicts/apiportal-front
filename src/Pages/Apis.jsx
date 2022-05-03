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

const versions = [
  {
    label: 'v 1.0',
  },
  {
    label: 'v 1.5',
  },
  {
    label: 'v 2.0',
  },
];
function Apis() {
  const [filterLetter, setFilterLetter] = useState(true);
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
  const [activeTab, setActiveTab] = useState(versions[0].label);

  const { libraries } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  const onClickItem = (label) => {
    setActiveTab(label);
  };

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

  const results = libraries.filter((item) => {
    return item.status.toLowerCase().includes(filterStatus.label.toLowerCase());
  });

  const resultsData = libraries.filter((item) => {
    return formik.values.search === '' ? item.version.toLowerCase().includes(activeTab.toLowerCase()) :
      item.title.toLowerCase().includes(value.toLowerCase());
  });

  const filterResults = resultsData.filter((item) => {
    return filterStatus.status ? null : item.title.toLowerCase().includes(filter.label.toLowerCase());
  });
  resultsData.sort((a, b) => {
    if (filterLetter) {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    }
    return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
  });

  useEffect(() => {

  }, [filterLetter]);

  // const array = [4, 1, 2, 1, 1, 3, 45, 13, 42, 52, 45, 25, 13, 40, 13, 2];

  // const repetidos = {};

  // eslint-disable-next-line no-return-assign
  // const unique = (array) => array.filter((item) => !repetidos[item] && (repetidos[item] = true));
  // libraries.forEach((item) => {
  //   repetidos[item.title] = (repetidos[title] || 0) + 1;
  // });

  // const uniqueData = unique(resultsData);

  const state = [
    {
      title: 'ESTADO',
      options: [
        {
          label: 'Publicado',
          name: 'publicado',
        },
        {
          label: 'Deprecado',
          name: 'deprecado',
        },
      ],
    },
  ];

  const items = [
    {
      title: 'SOLUTION',
      options: [
        {
          label: 'Bokers',
          name: 'boker',
          count: '1',
        },
        {
          label: 'API de salud colectiva',
          name: 'canal',
          count: '4',
        },
        {
          label: 'Retail',
          name: 'retail',
          count: '4',
        },
        {
          label: 'Talleres',
          name: 'taller',
          count: '4',
        },
        {
          label: 'Banca',
          name: 'banca',
          count: '4',
        },
      ],
    },
    {
      title: 'TAGS',
      options: [
        {
          label: 'Banca',
          name: 'banca',
          count: '12',
        },
        {
          label: 'Salud Colectiva',
          name: 'salud colectiva',
          count: '4',
        },
        {
          label: 'Autos',
          name: 'autos',
          count: '4',
        },
        {
          label: 'Sinietro Vehicular',
          name: 'sinietro vehicular',
          count: '4',
        },
        {
          label: 'Riesgos Generales',
          name: 'riesgos generales',
          count: '4',
        },
      ],
    },
  ];

  useEffect(() => {
    setValue(formik.values.search);
    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }
  }, [libraries, formik.values.search]);

  return (
    <div>
      {libraries && libraries.length > 0 ? (
        <>
          <BannerImage />
          <section className={classes.container}>
            <article className={classes.container__left}>
              {
                state.map((item, index) => (
                  <CustomizedAccordions key={index} title={item.title}>
                    {
                      item.options.map((option, index) => (
                        <div
                          className={classes.container__checkbox}
                          key={index}
                        >
                          <CheckboxWrapper
                            name={option.name}
                            label={option.label}
                            handleChangeSelect={handleChangeSelect}
                          />
                          {option.count && (<p className={classes.container__checkbox__counter}>{option.count}</p>)}
                        </div>
                      ))
                    }
                  </CustomizedAccordions>
                ))
              }
              <div className='container py-3'>
                <Typography>
                  VERSIÓN
                </Typography>
                <ButtonGroupMUI>
                  {versions.map((item, index) => (
                    <ButtonCutom activeTab={activeTab} key={index} label={item.label} onClickItem={onClickItem} />
                  ))}
                </ButtonGroupMUI>
              </div>
              {
                items.map((item, index) => (
                  <CustomizedAccordions key={index} title={item.title}>
                    {
                      item.options.map((option, index) => (
                        <div
                          className={classes.container__checkbox}
                          key={index}
                        >
                          <CheckboxWrapper
                            name={option.name}
                            label={option.label}
                            handleChangeSelect={handleChangFilter}
                          />
                          {option.count && (<p className={classes.container__checkbox__counter}>{option.count}</p>)}
                        </div>
                      ))
                    }
                  </CustomizedAccordions>
                ))
              }
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
                    <InputSelect setFilterLetter={setFilterLetter} />
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
                  {filterStatus.active ? (
                    results.map((item, index) => (
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
                  ) : !filterStatus.active ? (
                    !filter.active ? (
                      resultsData.map((item, index) => (
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
                    ) :
                      filterResults.map((item, index) => (
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
                  ) : null}
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
