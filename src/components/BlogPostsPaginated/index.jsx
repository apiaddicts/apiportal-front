import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CardInformation from '../Card/CardInformation';
import classes from './blog-posts-paginated.module.scss';

function Posts({ currentItems, additionalClasses }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className={additionalClasses ? `${classes.blog_list} ${classes[additionalClasses]}` : `${classes.blog_list}`}>
      {currentItems && currentItems?.length > 0 &&
        currentItems?.map((item, index) => {
          return (
            <CardInformation
              id={item?.id}
              img={item?.image ? item?.image?.[0]?.url : ''}
              description={item?.description}
              title={item?.title}
              buttons={item?.tags && item?.tags?.length > 0 ? item?.tags : []}
              css_styles={{ 'override_card_height': 'custom_card__height' }}
              theme='primary'
              info='Conoce más'
              blogTitle={true}
            />
          );
        })}
    </div>
  );
}

function BlogPostsPaginated({ posts, itemsPerPage, parentContainerClass }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(posts?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(posts.length / itemsPerPage));
    }
  }, [posts, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Posts currentItems={currentItems} additionalClasses={parentContainerClass} />
      <hr className={`${classes.separator}`} />
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
        activeclasscame={`${classes.number_page_active}`}
      />
    </>
  );
}

export default BlogPostsPaginated;
