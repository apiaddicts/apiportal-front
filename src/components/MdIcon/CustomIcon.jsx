import React, { useState } from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SettingsInputSvideoOutlinedIcon from '@mui/icons-material/SettingsInputSvideoOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import { ReactComponent as AccountIcon } from '../../static/icons/AccountIcon.svg';
import { ReactComponent as Logo } from '../../static/img/LogoApiMarket.svg';
import { ReactComponent as LogoWhite } from '../../static/img/LogoApiMarketWhite.svg';
import { ReactComponent as FintechIcon } from '../../static/img/LogoFintech.svg';
import { ReactComponent as FintechWhiteIcon } from '../../static/img/LogoFintechWhite.svg';
import { ReactComponent as SettingsIcon } from '../../static/icons/SettingsIcon.svg';
import { ReactComponent as CodeIcon } from '../../static/icons/CodeIcon.svg';
import { ReactComponent as LaptopCodeIcon } from '../../static/icons/LaptopCodeIcon.svg';
import { ReactComponent as SettingsSwitchIcon } from '../../static/icons/SettingsSwitchIcon.svg';
import { ReactComponent as AddUserIcon } from '../../static/icons/AddUserIcon.svg';
import { ReactComponent as ChevronRightIcon } from '../../static/icons/ChevronRightIcon.svg';
import { ReactComponent as SuccessWindow } from '../../static/icons/success-window.svg';
import { ReactComponent as Archivist } from '../../static/icons/archivist.svg';
import { ReactComponent as Elearning } from '../../static/icons/note-1.svg';
import { ReactComponent as IconoBilling } from '../../static/icons/icono-billing.svg';
import { ReactComponent as IconoDashboard } from '../../static/icons/IconoDashboard.svg';
import { ReactComponent as IconoApitoken } from '../../static/icons/IconoToken.svg';
import { ReactComponent as IconoLiveApi } from '../../static/icons/IconoLive.svg';
// import { ReactComponent as IconoCodeSample } from '../../static/icons/icono.svg';
import { ReactComponent as IconoNews } from '../../static/icons/IconoNews.svg';
import { ReactComponent as IconoBlog } from '../../static/icons/IconoBlog.svg';
import { ReactComponent as IconoSupport } from '../../static/icons/IconoSupport.svg';
import { ReactComponent as IconoFAQs } from '../../static/icons/IconoFAQs.svg';
import { ReactComponent as LogoNeuro } from '../../static/img/LogoNeurologyca.svg';
import { ReactComponent as LogoNeuroBlanco } from '../../static/img/neurologyca.svg';

function CustomIcon({ name, isActive, label, isHovered, ...rest }) {
  const renderIcon = {
    account: {
      render: (
        <AccountIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    logo: {
      render: (
        <Logo style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    logoNeuro: {
      render: (
        <LogoNeuro style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    logoNeuroBlanco: {
      render: (
        <LogoNeuroBlanco style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    logowhite: {
      render: (
        <LogoWhite style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    fintech: {
      render: (
        <FintechIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    fintechwhite: {
      render: (
        <FintechWhiteIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    cog: {
      render: (
        <SettingsIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    code: {
      render: (
        <CodeIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    laptopcode: {
      render: (
        <LaptopCodeIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    settings: {
      render: (
        <SettingsSwitchIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    adduser: {
      render: (
        <AddUserIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    chevron_right: {
      render: (
        <ChevronRightIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    integration: {
      render: (
        <SuccessWindow style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    billing: {
      render: (
        <IconoBilling style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    dashboard: {
      render: (
        <IconoDashboard style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    apitoken: {
      render: (
        <IconoApitoken style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    liveApi: {
      render: (
        <IconoLiveApi style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    news: {
      render: (
        <IconoNews style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    blog: {
      render: (
        <IconoBlog style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    support: {
      render: (
        <IconoSupport style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    faqs: {
      render: (
        <IconoFAQs style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    catalogo: {
      render: (
        <Archivist style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    elearning: {
      render: (
        <Elearning style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    idea: {
      render: (
        <LightbulbOutlinedIcon sx={{ width: 60, height: 60, fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    link: {
      render: (
        <AttachmentOutlinedIcon sx={{ width: 60, height: 60, fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    like: {
      render: (
        <ThumbUpOutlinedIcon sx={{ width: 60, height: 60, fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    setting: {
      render: (
        <SettingsInputSvideoOutlinedIcon sx={{ width: 60, height: 60, fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    add: {
      render: (
        <LibraryAddOutlinedIcon sx={{ width: 60, height: 60, fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    world: {
      render: (
        <LanguageOutlinedIcon sx={{ width: 60, height: 60, fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    organizer: {
      render: (
        <SchemaOutlinedIcon sx={{ width: 60, height: 60, fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
    default: {
      render: (
        <CodeIcon style={{ fill: isHovered || isActive ? 'var(--primary-color)' : 'black' }} />
      ),
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      {...rest}
    >
      {renderIcon[name] ? renderIcon[name].render : null}
      {label && (
        <span
          style={{
            marginLeft: '8px',
            color: isHovered || isActive ? 'var(--primary-color)' : 'black',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export default CustomIcon;
