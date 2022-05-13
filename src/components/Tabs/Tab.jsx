import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../MdIcon/Icon';

function Tab({ activeTab, label, onClick, activeColor, colorTab, preIcon }) {
  const onClickTab = () => {
    onClick(label);
  };

  let classNameTab = colorTab === 'primary' ? 'tab-list-item-primary' : 'tab-list-item-secundary';
  let classIcon = colorTab === 'primary' ? 'icon-active' : 'icon';

  if (activeTab === label) {
    classNameTab += activeColor === 'primary' ? ' tab-list-active-primary' : ' tab-list-active-secundary';
    classIcon += activeColor === 'primary' ? 'icon' : ' icon-active';
  }
  return (
    <div>
      { !preIcon ? (
        <li className={`${classNameTab}`} onClick={onClickTab}>
          {label}
        </li>
      ) : (
        <div style={{ display: 'flex' }} className={`${classIcon}`}>
          <Icon id={preIcon} />
          <li className={`${classNameTab}`} onClick={onClickTab}>
            {label}
          </li>
        </div>
      )}
    </div>
  );
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeColor: PropTypes.string.isRequired,
  colorTab: PropTypes.string.isRequired,
};

export default Tab;
