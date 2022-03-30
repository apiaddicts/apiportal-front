import React from 'react';
import PropTypes from 'prop-types';

function Tab({ activeTab, label, onClick }) {
  const onClickTab = () => {
    onClick(label);
  };

  let classNameTab = 'tab-list-item';

  if (activeTab === label) {
    classNameTab += ' tab-list-active';
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
};

export default Tab;
