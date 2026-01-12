/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getAppPartnersContent } from '../../../redux/actions/appPartnersAction';
import Item from '../../../components/Item/Item';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import classes from './apppartners.module.scss';
import appBg from '../../../static/img/app-partners-bg.jpg';
import Base from '../../../components/Banner/Base';
import Button from '../../../components/Buttons/Button';

moment.locale('es');

function AppPartners({ setOpenForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appPartnersPage } = useSelector((state) => state.appPartners);
  useEffect(() => {
    if (appPartnersPage && Object.keys(appPartnersPage).length === 0) {
      dispatch(getAppPartnersContent());
    }
  }, []);

  // Load section
  const bannerSection = appPartnersPage && appPartnersPage.contentSections ? appPartnersPage.contentSections.filter((item) => item.__component === 'home.banner-section')[0] : [];

  const listSection = (item) => {
    const section = appPartnersPage && appPartnersPage.contentSections ? appPartnersPage.contentSections.filter((item) => item.__component === 'home.work-section')[item] : [];
    const background = section && section?.background ? section?.background?.url : '';
    const items = section && section.Steps.length ? section.Steps.map((i) => {
      const response = {
        icon: i.number,
        title: i.title,
        description: i.subtitle,
      };
      return response;
    }) : [];

    return { section, background, items };
  };

  const bannerStyle = () => ({
    position: 'relative',
  });

  const displaySection = (item, direction) => {
    return (
      <section className={`container mt-10 mb-9 ${classes.section__content}`}>
        <div className='row align-center'>
          {direction === 'l' && (
            <div className='flex-lg-6 flex-md-6 flex-sm-12'>
              <div className='container'>
                <img src={listSection(item).background || ''} alt='' className='w-full' />
              </div>
            </div>
          )}
          <div className='flex-lg-6 flex-md-6 flex-sm-12'>
            <div className='flex-lg-12 flex-md-12 flex-sm-12'>
              <h1 className='h3 text__primary__title font-weight-regular mb-5 text-left'>
                {listSection(item).section.title}
              </h1>
            </div>
            <div className='flex-lg-12 flex-md-12 flex-sm-12 mt-3 text__primary'>
              {listSection(item).items.map((item, i) => (
                <Item
                  key={i}
                  title={item?.title}
                  number={item?.number}
                  icon={item?.icon}
                  iconColor='#007AC3'
                  css_styles={{ 'custom_description': 'text__gray__darken' }}
                  titleStyles={{ 'fontWeight': '400', 'color': '#000000 !important' }}
                  iconStyle={{
                    'background': '0',
                    'justifyContent': 'center' }}
                />
              ))}
            </div>
            <div className='flex-lg-6 flex-md-6 flex-sm-12'>
              <div className='button__group mt-5'>
                <Button
                  styles={listSection(item).section.buttons[0].class}
                  onClick={() => { navigate(`/${listSection(item).section?.buttons?.[0]?.link}`); }}
                >
                  {listSection(item).section?.buttons?.[0]?.name}
                </Button>
              </div>
            </div>
          </div>
          {direction === 'r' && (
            <div className='flex-lg-6 flex-md-6 flex-sm-12'>
              <div className='container'>
                <img src={listSection(item).background || ''} alt='' className='w-full' />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div style={{ paddingTop: '114px' }}>
      {appPartnersPage && Object.keys(appPartnersPage).length > 0 ? (
        <div>
          <Base
            img={bannerSection?.[0]?.background?.url ? bannerSection?.background?.url : appBg}
            style={bannerStyle}
          >
            <div className={`container display_flex ${classes.app__content}`}>
              <div className='row'>
                <div className={`container flex-lg-8 flex-md-6 flex-sm-12 py-10 ${classes.app__banner}`}>
                  <h1 className='h4 text__white'>{ bannerSection?.title}</h1>
                </div>
                <div className='container flex-lg-4 flex-md-6 flex-sm-12 pt-10 align-self-end'>
                  <div className='button__group mt-5'>
                    <Button
                      styles={bannerSection?.buttons?.[0]?.class}
                      onClick={() => { navigate(`/${bannerSection?.buttons?.[0]?.link}`); }}
                    >
                      {bannerSection?.buttons?.[0]?.name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Base>
          {/* Razones */}
          {displaySection(0, 'l')}
          {/* Ventajas */}
          {displaySection(1, 'r')}
          {/* Benefits */}
          {displaySection(2, 'l')}

        </div>
      ) : (
        <SkeletonComponent />
      )}
    </div>

  );
}

export default AppPartners;

