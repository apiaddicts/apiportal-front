import React, { useEffect } from 'react';
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
import ButtonCutom from '../components/common/ButtonMUI';
import ButtonGroupMUI from '../components/common/ButtonGroup';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';

import { getLibraries, filterCheck } from '../redux/actions/libraryAction';

function Apis() {
  const { libraries, backUpLibreries, loadingLibraries } = useSelector((state) => state.library);
  const dispatch = useDispatch();

  const onClickItem = (label) => {
    console.log(label);
    //   setActiveTab(label);
  //   // resultsData.filter((item) => {
  //   //   if (item.version.toLowerCase() !== 'v 1.0') {
  //   //     return setResultsData(libraries);
  //   //   }
  //   //   return setResultsData([item]);
  //   // });
  };

  const handleChangeStatus = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 0));
  };

  const handleChangeSolutions = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 1));
  };
  const handleChangFilterTags = (name, label, checked) => {
    dispatch(filterCheck(label, checked, 2));
  };
  // Filters titles array
  const titleRepeated = backUpLibreries.map((element) => {
    return element.title;
  });
  const dataArr = new Set(titleRepeated);
  const items = [...dataArr];

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
  const labelsTagsArr = new Set(labelsTags);
  const tags = [...labelsTagsArr];

  // Filters version array
  const versionRepeated = libraries.map((element) => {
    return element.version;
  });

  const versionArr = new Set(versionRepeated);
  const versions = [...versionArr];

  useEffect(() => {

    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }
  }, [libraries]);

  console.log('Librerias array', libraries);
  return (
    <div>
      {loadingLibraries === false && libraries && libraries.length > 0 ? (
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
                        handleChangeSelect={handleChangeStatus}
                      />
                    </div>
                  ))
                }
              </CustomizedAccordions>
              <div className='container py-3'>
                <Typography>
                  VERSIÓN
                </Typography>
                <ButtonGroupMUI>
                  <ButtonCutom />
                  {versions.map((item, index) => (
                    // activeTab={activeTab}
                    <ButtonCutom key={index} label={item} onClickItem={onClickItem} />
                  ))}
                </ButtonGroupMUI>
              </div>
              <CustomizedAccordions title='Solutions'>
                { items.map((item, index) => (
                  <div key={index} className={classes.container__checkbox}>
                    <CheckboxWrapper
                      name={item}
                      label={item}
                      handleChangeSelect={handleChangeSolutions}
                    />
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
                      // onChange={formik.handleChange}
                      placeholder='Buscar APIs...'
                      borderRadius='20px'
                    />
                  </div>
                  <div className='flex-sm-12 flex-md-4 mt-8'>
                    {/* <InputSelect handleClick={setFilterLetter} /> */}
                    <InputSelect />
                  </div>
                </div>
              </div>
              <div className='flex-sm-12 flex-md-6'>
                <div className='row'>
                  {libraries.length > 0 ? (
                    libraries.map((item, index) => (
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
                  ) : (
                    <h1>No hay data</h1>
                  )}
                </div>
              </div>
            </section>
          </section>
        </>
      ) : (
        <SkeletonComponent />
      )}

    </div>
  );
};

export default Apis;
