import React, { useState } from 'react';
import { IconButton, Chip, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useTranslation } from 'react-i18next';

const tableHeaders = () => {
  const { t } = useTranslation();

  return [
    { name: t('Suscriptions.name'), selector: (row) => row.name, sortable: true },
    { name: t('Suscriptions.request'), selector: (row) => row.dateRequest, sortable: true },
    { name: t('Suscriptions.primaryKey'), selector: (row) => row.primaryKey, sortable: true },
    { name: t('Suscriptions.secondaryKey'), selector: (row) => row.secondaryKey, sortable: true },
    { name: t('Suscriptions.product'), selector: (row) => row.product, sortable: true },
    {
      name: t('Suscriptions.state'),
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return (
          <Chip
            color='secondary'
            title={row.status}
            icon={<FiberManualRecordIcon sx={{ fontSize: '16px' }} />}
            label={row.status.toUpperCase()}
            sx={{
              background: 'rgba(241, 180, 52, 0.10)',
              color: '#F1B434',
              fontWeight: '700',
              fontSize: '0.625rem',
              letterSpacing: '0.8 px',
            }}
          />
        );
      },
    },
    {
      cell: (row) => {
        const [open, setOpen] = useState(false);
        const handleClose = () => {
          //Your code
          setOpen(false);
        };
        return (
          <>
            <IconButton
              sx={{
                borderRadius: '6px',
                padding: '1px',
                background: '#ECF0F1',
                position: 'relative',
              }}
              onClick={() => setOpen(true)}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id='basic-menu'
              open={open}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <EditSharpIcon />
                </ListItemIcon>
                <ListItemText>
                  {t('Suscriptions.renameOption')}
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteOutlineSharpIcon />
                </ListItemIcon>
                <ListItemText>
                  {t('Suscriptions.cancelOption')}
                </ListItemText>
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
};

export default tableHeaders;
