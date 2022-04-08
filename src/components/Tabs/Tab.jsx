import React from 'react';
import PropTypes from 'prop-types';

function Tab({ activeTab, label, onClick, activeColor, colorTab }) {
  const onClickTab = () => {
    onClick(label);
  };

  let classNameTab = colorTab === 'primary' ? 'tab-list-item-primary' : 'tab-list-item-secundary';

  if (activeTab === label) {
    classNameTab += activeColor === 'primary' ? ' tab-list-active-primary' : ' tab-list-active-secundary';
  }
  return (
    <li className={classNameTab} onClick={onClickTab}>
      {label}
    </li>
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
