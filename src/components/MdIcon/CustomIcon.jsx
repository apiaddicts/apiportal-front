import React from 'react';
import { ReactComponent as AccountIcon } from '../../static/icons/AccountIcon.svg';
import { ReactComponent as Logo } from '../../static/img/logo.svg';
import { ReactComponent as ApiMarketIcon } from '../../static/img/LogoApiMarket.svg';
import { ReactComponent as FintechIcon } from '../../static/img/LogoFintech.svg';
import { ReactComponent as FintechWhiteIcon } from '../../static/img/LogoFintechWhite.svg';
import { ReactComponent as SettingsIcon } from '../../static/icons/SettingsIcon.svg';
import { ReactComponent as CodeIcon } from '../../static/icons/CodeIcon.svg';
import { ReactComponent as LaptopCodeIcon } from '../../static/icons/LaptopCodeIcon.svg';
import { ReactComponent as SettingsSwitchIcon } from '../../static/icons/SettingsSwitchIcon.svg';
import { ReactComponent as AddUserIcon } from '../../static/icons/AddUserIcon.svg';
import { ReactComponent as ChevronRightIcon } from '../../static/icons/ChevronRightIcon.svg';
import { ReactComponent as ApiMarketWhiteIcon } from '../../static/img/LogoApiMarketWhite.svg';
import { ReactComponent as SuccessWindow } from '../../static/icons/success-window.svg';
import { ReactComponent as Archivist } from '../../static/icons/archivist.svg';
import { ReactComponent as Elearning } from '../../static/icons/note-1.svg';

function CustomIcon({ name, ...rest }) {

  const renderIcon = {
    account: {
      render: (
        <AccountIcon />
      ),
    },
    logo: {
      render: (
        <Logo />
      ),
    },
    apimarket: {
      render: (
        <ApiMarketIcon />
      ),
    },
    apimarketwhite: {
      render: (
        <ApiMarketWhiteIcon />
      ),
    },
    fintech: {
      render: (
        <FintechIcon />
      ),
    },
    fintechwhite: {
      render: (
        <FintechWhiteIcon />
      ),
    },
    cog: {
      render: (
        <SettingsIcon />
      ),
    },
    code: {
      render: (
        <CodeIcon />
      ),
    },
    laptopcode: {
      render: (
        <LaptopCodeIcon />
      ),
    },
    settings: {
      render: (
        <SettingsSwitchIcon />
      ),
    },
    adduser: {
      render: (
        <AddUserIcon />
      ),
    },
    chevron_right: {
      render: (
        <ChevronRightIcon />
      ),
    },
    integration: {
      render: (
        <SuccessWindow />
      ),
    },
    catalogo: {
      render: (
        <Archivist />
      ),
    },
    elearning: {
      render: (
        <Elearning />
      ),
    },
    default: {
      render: (
        <CodeIcon />
      ),
    },
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {renderIcon[name] ? (renderIcon[name].render) : null}
    </>
  );
}

export default CustomIcon;
