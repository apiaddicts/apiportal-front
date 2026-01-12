import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    if (lang) i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        startIcon={<LanguageIcon />}
        onClick={handleClick}
        style={{
          textTransform: 'none',
          backgroundColor: 'white',
          color: '#000',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '8px 12px',
        }}
      >
        {i18n.language === 'en' ? 'English' : 'Español'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          style: {
            borderRadius: 12,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem onClick={() => handleClose('es')}>Spanish</MenuItem>
        <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
      </Menu>
    </div>
  );
}

export default LanguageSelector;
