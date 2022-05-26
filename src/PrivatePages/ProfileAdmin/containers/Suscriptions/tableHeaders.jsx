import React, { useState } from 'react';
import { IconButton, Chip, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const tableHeaders = [
  { name: 'NOMBRE', selector: (row) => row.name, sortable: true },
  { name: 'SOLICITUD', selector: (row) => row.dateRequest, sortable: true },
  { name: 'PRIMARY KEY', selector: (row) => row.primaryKey, sortable: true },
  { name: 'SECONDARY KEY', selector: (row) => row.secondaryKey, sortable: true },
  { name: 'PRODUCTO', selector: (row) => row.product, sortable: true },
  {
    name: 'ESTADO',
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
            }}
            onClick={() => setOpen(true)}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id='basic-menu'
            open={open}
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <EditSharpIcon />
              </ListItemIcon>
              <ListItemText>
                Renombrar
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DeleteOutlineSharpIcon />
              </ListItemIcon>
              <ListItemText>
                Cancelar
              </ListItemText>
            </MenuItem>
          </Menu>
        </>
      );
    },
  },
];

export default tableHeaders;
