import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import classes from './mcp-ui.module.scss';

function Section({ title, items, type, selectedItem, onSelect }) {
  const { t } = useTranslation();

  return (
    <div className={classes.section}>
      <span className={classes.section__title}>{title}</span>
      {items.length === 0 ? (
        <span className={classes.section__empty}>{t('McpUI.noItems')}</span>
      ) : (
        <ul className={classes.tools_list}>
          {items.map((item, i) => {
            const key = item.id || item.name || i;
            const tagged = { ...item, _type: type };
            const isActive = selectedItem?._type === type && selectedItem?.name === item.name;
            const btnClass = isActive
              ? [classes.tool_item, classes.tool_item__active].join(' ')
              : classes.tool_item;
            return (
              <li key={key}>
                <button type="button" className={btnClass} onClick={() => onSelect(tagged)}>
                  <span className={classes.tool_name}>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  type: PropTypes.string.isRequired,
  selectedItem: PropTypes.shape({ _type: PropTypes.string, name: PropTypes.string }),
  onSelect: PropTypes.func.isRequired,
};

Section.defaultProps = {
  selectedItem: null,
};

export default Section;
