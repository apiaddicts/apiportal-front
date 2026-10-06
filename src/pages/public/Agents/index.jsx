import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getAgentLibraries, getAgentPageContent, filterAgentCheck, sortAgentCollection, resetAgentLibrary,
} from '../../../redux/actions/agentLibraryAction';
import BannerImage from '../../../components/Banner/BannerImage';
import SearchInput from '../../../components/Input/SearchInput';
import InputSelect from '../../../components/Input/InputSelect';
import CheckboxWrapper from '../../../components/common/Check';
import CustomizedAccordions from '../../../components/common/AccordionMUI';
import ButtonGroupMUI from '../../../components/common/ButtonGroup';
import CheckboxLabels from '../../../components/common/CustomCheck';
import LibraryPaginated from '../../../components/LibraryPaginated';
import Icon from '../../../components/MdIcon/Icon';
import classes from './agents.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import config, { getMediaUrl } from '../../../services/config';

const countValues = (items, getValues) => items.reduce((acc, item) => {
  getValues(item).forEach((value) => {
    acc[value] = (acc[value] || 0) + 1;
  });
  return acc;
}, {});

function Agents() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { agentPage, agentLibraries, backUpAgentLibraries, loadingAgentLibraries, filters } = useSelector((state) => state.agentLibrary);
  const [searchInputValue, setSearchInputValue] = useState(filters.search || '');
  const [viewType, setViewType] = useState('grid');
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    if (agentPage === null) {
      dispatch(getAgentPageContent());
    }
  }, [agentPage, dispatch]);

  useEffect(() => {
    if (agentLibraries === null) {
      dispatch(getAgentLibraries());
    }
  }, [agentLibraries, dispatch]);

  const filterAgentBanner = agentPage?.contentSections?.filter((item) => item.__component === 'home.banner-section') || [];

  const resetFilters = () => {
    dispatch(resetAgentLibrary());
    setSearchInputValue('');
  };

  const handleFilter = (name) => (_name, label, checked) => {
    dispatch(filterAgentCheck(label, checked, name));
  };

  const handleChangeSearchFilter = (text) => {
    setSearchInputValue(text);
    dispatch(filterAgentCheck(text, null, 'search'));
  };

  const isChecked = (name, value) => (filters[name] || []).includes(value.toLowerCase());

  const versions = useMemo(
    () => [...new Set(backUpAgentLibraries.map((element) => element.version).filter(Boolean))].sort(),
    [backUpAgentLibraries],
  );
  const protocolCounts = useMemo(() => countValues(backUpAgentLibraries, (element) => element.protocols), [backUpAgentLibraries]);
  const globalRatings = useMemo(
    () => [...new Set(backUpAgentLibraries.map((element) => element.globalRating).filter(Boolean))].sort(),
    [backUpAgentLibraries],
  );

  const renderCheckboxes = (counts, name) => Object.keys(counts).sort().map((item) => (
    <div key={item} className={classes.wrapper__checkbox}>
      <CheckboxWrapper
        name={item}
        label={item}
        handleChangeSelect={handleFilter(name)}
        checked={isChecked(name, item)}
      />
      <p className={`${classes.wrapper__checkbox__counter} fs__10 text__gray__gray_darken`}>{counts[item]}</p>
    </div>
  ));

  const agentImageUrl = filterAgentBanner?.[0]?.background?.url
    ? getMediaUrl(filterAgentBanner[0].background.url)
    : config.notImage;

  const fAgents = agentLibraries && agentLibraries.length > 0 ? agentLibraries : [];
  const hasFilters = backUpAgentLibraries.length > 0;

  return (
    <div>
      <BannerImage
        title={filterAgentBanner?.[0]?.title || (agentPage ? t('Agents.title') : '')}
        img={agentImageUrl}
        description={filterAgentBanner?.[0]?.subtitle || (agentPage ? t('Agents.description') : '')}
        css_styles={{ 'layout_height': 'banner_custom__layout--height' }}
      />
      <div className='container'>
        <section className={classes.wrapper}>
          <article className={classes.wrapper__left}>
            {hasFilters && (
              <div className={classes.wrapper__title}>
                {t('Agents.filterBy')}
              </div>
            )}
            {versions.length > 0 && (
              <div className='w-full pl-4'>
                <div className={classes.wrapper__title}>
                  {t('Agents.version')}
                </div>
                <ButtonGroupMUI sx={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))', gap: '2px', alignItems: 'center', justifyContent: 'center' }}>
                  {versions.map((item) => (
                    <CheckboxLabels
                      key={item}
                      label={item}
                      name={item}
                      handleChangeSelect={handleFilter('version')}
                      checked={isChecked('version', item)}
                    />
                  ))}
                </ButtonGroupMUI>
              </div>
            )}
            {Object.keys(protocolCounts).length > 0 && (
              <CustomizedAccordions title={t('Agents.protocol')}>
                {renderCheckboxes(protocolCounts, 'protocol')}
              </CustomizedAccordions>
            )}
            {globalRatings.length > 0 && (
              <CustomizedAccordions title={t('Agents.globalRating')}>
                {globalRatings.map((item) => (
                  <div key={item} className={classes.wrapper__checkbox}>
                    <CheckboxWrapper
                      name={item}
                      label={item}
                      handleChangeSelect={handleFilter('globalRating')}
                      checked={isChecked('globalRating', item)}
                    />
                  </div>
                ))}
              </CustomizedAccordions>
            )}
            {hasFilters && (
              <div className={classes.wrapper__filters}>
                <Icon id='MdDeleteOutline' />
                <button type='button' className={classes.wrapper__reset} onClick={resetFilters}>{t('Agents.clearFilters')}</button>
              </div>
            )}
          </article>
          <section className={classes.wrapper__right}>
            {loadingAgentLibraries === false && agentLibraries && (
              <div className={classes.wrapper__right__controls_row}>
                <div className={classes.wrapper__right__search}>
                  <SearchInput
                    icon
                    name='search'
                    type='text'
                    onChange={(e) => {
                      handleChangeSearchFilter(e.target.value);
                    }}
                    placeholder={t('Agents.searchPlaceholder')}
                    borderRadius='6px'
                    value={searchInputValue}
                  />
                </div>
                <div className={classes.wrapper__right__sort}>
                  <InputSelect handleSelect={(sort) => dispatch(sortAgentCollection(sort))} />
                </div>
                <div className={classes.wrapper__right__page_size}>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className={classes.wrapper__right__page_size__select}
                    aria-label={t('Agents.itemsPerPage')}
                  >
                    {[9, 30, 60, 90].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className={classes.wrapper__right__view_switch}>
                  <button
                    type='button'
                    className={viewType === 'list' ? classes.wrapper__right__view_switch__active : ''}
                    onClick={() => setViewType('list')}
                  >
                    <Icon id='MdOutlineViewAgenda' />
                  </button>
                  <button
                    type='button'
                    className={viewType === 'grid' ? classes.wrapper__right__view_switch__active : ''}
                    onClick={() => setViewType('grid')}
                  >
                    <Icon id='MdGridView' />
                  </button>
                </div>
              </div>
            )}
            <div className='flex-sm-12 flex-md-6'>
              <div className='row'>
                {loadingAgentLibraries === false && agentLibraries ? (
                  fAgents.length > 0 ? (
                    <LibraryPaginated
                      key={`${JSON.stringify(filters)}-${itemsPerPage}`}
                      items={fAgents}
                      itemsPerPage={itemsPerPage}
                      viewType={viewType}
                      basePath='/agents'
                      anchor='agent'
                    />
                  ) : (
                    <section style={{ width: '100%' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '2rem',
                          color: '#939393',
                        }}
                      >
                        <p className='fs__20'>{t('Agents.noData')}</p>
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
}

export default Agents;
