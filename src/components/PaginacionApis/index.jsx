import React from 'react';
import classes from './PaginacionApis.module.scss';
import Icon from '../MdIcon/Icon';

function PaginacionApis({ css_styles }) {
  const { custom_margin } = css_styles;
  return (
    <div className={`${classes.wrapper_pagination} ${custom_margin}`}>
      <div className={`${classes.wrapper_pagination__info} mr-auto`}>
        1-10 de 32 Apis
      </div>
      <div className={classes.wrapper_pagination_pages}>
        <div className={classes.wrapper_pagination_page}>
          <div className={classes.wrapper_left__arrow}>
            <div className={classes.arrow}>
              <Icon id='MdChevronLeft' />
            </div>
          </div>
          <div className={classes.wrapper_numbers}>
            <div className={`${classes.number_page} ${classes.number_page_active}`}>01</div>
            <div className={classes.number_page}>02</div>
            <div className={classes.number_page}>03</div>
            <div className={classes.number_page}>04</div>
            <div className={classes.number_page}>05</div>
            <div className={classes.number_page}>...</div>
            <div className={classes.number_page}>10</div>
          </div>
          <div className={classes.wrapper_right__arrow}>
            <div className={classes.arrow}>
              <Icon id='MdChevronRight' />
            </div>
          </div>
        </div>
        <input id='number' type='number' value='3' className={classes.input_number} />
      </div>
    </div>
  );
}

PaginacionApis.defaultProps = {
  css_styles: '',
};

export default PaginacionApis;
