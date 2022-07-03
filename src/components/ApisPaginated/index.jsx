import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CardInformation from '../Card/CardInformation';
import classes from './apis-paginated.module.scss';

function Apis({ currentItems }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className={`${classes.api_list}`}>
      {currentItems &&
        currentItems.map((item, index) => (
          <CardInformation
            key={index}
            title={item?.title || ''}
            status={item?.status || ''}
            version={item?.version || ''}
            buttons={item?.tags || ''}
            colorStatus={item?.color_status || ''}
            info='Ver Documentación'
            description={item?.description || ''}
            link={`/apis/${item?.id}#api`}
            css_styles={{ 'custom_title_size': 'fs__22', 'custom_status_size': 'fs__10' }}
          />
        ))}
    </div>
  );
}

function ApisPaginated({ apis, itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (apis.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(apis.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(apis.length / itemsPerPage));
    }
  }, [apis, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % apis.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Apis currentItems={currentItems} />
      <ReactPaginate
        breakLabel='...'
        nextLabel='Siguiente'
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel='Anterior'
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

export default ApisPaginated;
