import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import CardInformation from '../Card/CardInformation';
import classes from './library-paginated.module.scss';
import config, { getMediaUrl } from '../../services/config';

function getItemImageUrl(item) {
  return item?.image?.length > 0
    ? getMediaUrl(item.image[0].formats?.medium?.url || item.image[0].url)
    : config.notImage;
}

function LibraryGrid({ currentItems, basePath, anchor, viewDocLabel }) {
  return (
    <div className={classes.api_list}>
      {currentItems &&
        currentItems.map((item, index) => (
          <CardInformation
            key={index}
            img={getItemImageUrl(item)}
            title={item?.title || ''}
            status={item?.status || ''}
            version={item?.version || ''}
            buttons={item?.tags || ''}
            colorStatus={item?.color_status || ''}
            info={viewDocLabel}
            description={item?.description || ''}
            globalRating={item?.globalRating}
            link={`${basePath}/${item?.slug}#${anchor}`}
            css_styles={{ 'custom_title_size': 'fs__22', 'custom_status_size': 'fs__10' }}
          />
        ))}
    </div>
  );
}

function LibraryList({ currentItems, basePath, anchor }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={classes.apis__table}>
      <div className={classes.table__header}>
        <div>{t('name')}</div>
        <div>{t('version')}</div>
        <div>{t('description')}</div>
      </div>
      {currentItems && currentItems.map((item, index) => (
        <div
          key={index}
          className={classes.table__row}
          onClick={() => navigate(`${basePath}/${item?.slug}#${anchor}`)}
        >
          <div className={classes.api__name}>{item?.title || '-'}</div>
          <div>{item?.version || '-'}</div>
          <div className={classes.table__description}>{item?.description || '-'}</div>
        </div>
      ))}
    </div>
  );
}

function LibraryPaginated({ items, itemsPerPage, viewType, basePath, anchor }) {
  const { t } = useTranslation();

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItemOffset(0);
  }, [itemsPerPage]);

  useEffect(() => {
    if (items.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }
  }, [items, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const viewDocLabel = t(`LibraryPaginated.viewDocumentation`);

  return (
    <>
      {viewType === 'grid'
        ? <LibraryGrid currentItems={currentItems} basePath={basePath} anchor={anchor} viewDocLabel={viewDocLabel} />
        : <LibraryList currentItems={currentItems} basePath={basePath} anchor={anchor} />
      }
      <ReactPaginate
        breakLabel='...'
        nextLabel={t(`LibraryPaginated.next`)}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t(`LibraryPaginated.previous`)}
        previousClassName={`${classes.previous}`}
        previousLinkClassName={`${classes.previous__link}`}
        nextClassName={`${classes.next}`}
        nextLinkClassName={`${classes.next__link}`}
        disabledClassName={`${classes.disabled}`}
        renderOnZeroPageCount={null}
        containerClassName={`${classes.pagination}`}
        breakClassName={`${classes.number_page}`}
        pageClassName={`${classes.number_page}`}
        activeclassname={`${classes.number_page_active}`}
      />
    </>
  );
}

LibraryPaginated.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  viewType: PropTypes.string,
  basePath: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
};

LibraryPaginated.defaultProps = {
  viewType: 'grid',
};

LibraryGrid.propTypes = {
  currentItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  basePath: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
  viewDocLabel: PropTypes.string.isRequired,
};

LibraryList.propTypes = {
  currentItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  basePath: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
};

export default LibraryPaginated;
