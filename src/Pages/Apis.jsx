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

const versions = [
  {
    label: 'v1.0',
  },
  {
    label: 'v1.5',
  },
  {
    label: 'v2.0',
  },
];
function Apis() {
  // const [filterStatus, setFilterStatus] = useState('');
  // const [filterTags, setFilterTags] = useState('');
  const [activeTab, setActiveTab] = useState(versions[0].label);

  const { libraries } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  const onClickItem = (label) => {
    setActiveTab(label);
  };

  // const handleChangeSelect = (label) => {
  //   setFilterStatus(label);
  // };
  // const handleChangTags = (label) => {
  //   setFilterTags(label);
  // };

  // const results = fake.filter((item) => {
  //   return item.status.toLowerCase().includes(filterStatus.toLowerCase());
  // });

  // const resultsData = fake.filter((item) => {
  //   return item.tags.map((tag) => {
  //     tag.name.toLowerCase().includes(filterTags.toLowerCase());
  //   });
  // });

  // useEffect(() => {
  //   console.log(filterStatus);
  //   console.log(results);
  //   console.log(resultsData);
  // }, [results, filterStatus, filterTags]);

  const state = [
    {
      title: 'ESTADO',
      options: [
        {
          label: 'Publicado',
          name: 'publicado',
        },
        {
          label: 'Deprecated',
          name: 'deprecated',
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
          label: 'Canales no tradicionales',
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
    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }
  }, [libraries]);

  console.log(libraries);
  console.log(libraries.length);
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
                          <CheckboxWrapper name={option.name} label={option.label} />
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
                          <CheckboxWrapper name={option.name} label={option.label} />
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
                      placeholder='Buscar APIs...'
                      borderRadius='20px'
                    />
                  </div>
                  <div className='flex-sm-12 flex-md-4 mt-8'>
                    <InputSelect />
                  </div>
                </div>
              </div>
              <div className='flex-sm-12 flex-md-6'>
                <div className='row'>
                  {libraries.map((item, index) => (
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
                  ))}
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
