/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Container, IconButton, Chip, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import DataGridMUI from '../components/common/DataGridMUI/DataGridMUI';
import Title from '../components/Title/Title';
import jsonApis from '../data-table.json';

function Apps(props) {
  const headers = [
    {
      name: 'APP',
      selector: (row) => row.app,
      sortable: true,
    },
    {
      name: 'ENTORNOS',
      selector: (row) => row.enviroment,
      sortable: true,
    },
    {
      name: 'APIS',
      selector: (row) => row.apis,
      sortable: true,
    },
    {
      name: 'TRÁFICO 24H',
      selector: (row) => row.traffic,
      sortable: true,
    },
    {
      name: 'ORGANIZACIÓN',
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: 'FECHA DE CREACIÓN',
      selector: (row) => row.creationDate,
      sortable: true,
    },
    {
      name: 'ÚLTIMA MODIFICACIÓN',
      selector: (row) => row.lastModification,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        if (row.status.toUpperCase() === 'SOLICITADO') {
          return (
            <Chip
              color='secondary'
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
        } if (row.status.toUpperCase() === 'APROBADO') {
          return (
            <Chip
              color='primary'
              icon={<FiberManualRecordIcon sx={{ fontSize: '16px' }} />}
              label={row.status.toUpperCase()}
              sx={{
                background: 'rgba(152, 215, 0, 0.10)',
                color: '#97D700',
                fontWeight: '700',
                fontSize: '0.625rem',
                letterSpacing: '0.8 px',
              }}
            />
          );
        }
      },
    },
    {
      cell: () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
        return (
          <>
            <IconButton
              sx={{
                borderRadius: '6px',
                padding: '1px',
                background: '#ECF0F1',
              }}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
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
                  <RemoveRedEyeSharpIcon />
                </ListItemIcon>
                <ListItemText>
                  Ver App
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <EditSharpIcon />
                </ListItemIcon>
                <ListItemText>
                  Editar App
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteOutlineSharpIcon />
                </ListItemIcon>
                <ListItemText>
                  Eliminar App
                </ListItemText>
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
  const data = jsonApis;
  return (
    <Container fixed className='my-10 py-10'>
      <Title text='Apps' />
      <DataGridMUI headers={headers} data={data} paginationPerPage={20} />
    </Container>
  );
}

Apps.propTypes = {};

export default Apps;
