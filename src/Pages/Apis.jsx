import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import fake from '../fake';

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
  const [activeTab, setActiveTab] = useState(versions[0].label);

  const onClickItem = (label) => {
    setActiveTab(label);
  };

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
          label: 'Publicado',
          name: 'publicado',
          count: '1',
        },
        {
          label: 'Deprecated',
          name: 'deprecated',
          count: '4',
        },
      ],
    },
    {
      title: 'TAGS',
      options: [
        {
          label: 'Publicado',
          name: 'publicado',
          count: '12',
        },
        {
          label: 'Deprecated',
          name: 'deprecated',
          count: '4',
        },
      ],
    },
  ];
  return (
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
              {fake.map((item, index) => (
                <div key={index} className='flex-sm-12 flex-md-6 mt-8'>
                  <Link to='/api/1'>
                    <CardInformation
                      title={item.title}
                      status={item.status}
                      version={item.version}
                      buttons={item.btns}
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
  );
};

export default Apis;
