import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import CardInformation from '../Card/CardInformation';
import classes from './mcps-paginated.module.scss';

function McpsGrid({ currentItems }) {
  const { t } = useTranslation();

  return (
    <div className={classes.api_list}>
      {currentItems &&
        currentItems.map((item, index) => (
          <CardInformation
            key={index}
            title={item?.title || ''}
            status={item?.status || ''}
            version={item?.version || ''}
            buttons={item?.tags || ''}
            colorStatus={item?.color_status || ''}
            info={t('McpsPaginated.viewDocumentation')}
            description={item?.description || ''}
            globalRating={item?.globalRating}
            link={`/mcps/${item?.documentId}#mcp`}
            css_styles={{ 'custom_title_size': 'fs__22', 'custom_status_size': 'fs__10' }}
          />
        ))}
    </div>
  );
}

function McpsList({ currentItems }) {
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
          onClick={() => navigate(`/mcps/${item?.documentId}#mcp`)}
        >
          <div className={classes.api__name}>{item?.title || '-'}</div>
          <div>{item?.version || '-'}</div>
          <div className={classes.table__description}>{item?.description || '-'}</div>
        </div>
      ))}
    </div>
  );
}

function McpsPaginated({ mcps, itemsPerPage, viewType = 'grid' }) {
  const { t } = useTranslation();

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItemOffset(0);
  }, [itemsPerPage]);

  useEffect(() => {
    if (mcps.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(mcps.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(mcps.length / itemsPerPage));
    }
  }, [mcps, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % mcps.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {viewType === 'grid'
        ? <McpsGrid currentItems={currentItems} />
        : <McpsList currentItems={currentItems} />
      }
      <ReactPaginate
        breakLabel='...'
        nextLabel={t('McpsPaginated.next')}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t('McpsPaginated.previous')}
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

export default McpsPaginated;
