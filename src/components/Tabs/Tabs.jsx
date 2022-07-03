import React, { useState } from 'react';
import Tab from './Tab';

import './tabs.scss';

function Tabs({ children, line = false, direction = 'left', activeColor = 'primary', colorTab = 'primary', deTbas }) {

  const [activeTab, setActiveTab] = useState(children && children.length > 0 && children?.[0]?.props?.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
    if (deTbas !== undefined) {
      deTbas(tab);
    }
  };

  return (
    <div className='tabs'>
      <ol className={`${activeTab ? 'p5' : null} ${line ? 'tab-list' : 'tab-list_no_line'} ${direction === 'center' ? 'tab-list-center' : direction === 'right' ? 'tab-list-right' : 'tab-list-left'}  `}>
        {children && children.map((child) => {
          const { label, preIcon } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
              activeColor={activeColor}
              colorTab={colorTab}
              preIcon={preIcon}
            />
          );
        })}
      </ol>
      <div className='tab-content'>
        {children && children?.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );

}

export default Tabs;
