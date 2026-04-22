import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, Typography, Card, CardContent, Button, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Checkbox, ListItemText, Chip, CircularProgress, Alert, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getApimConfigs } from '../../../redux/actions/apimAction';
import { getKongApis } from '../../../redux/actions/libraryAction';
import { createProduct } from '../../../redux/actions/productsAction';
import classes from './products.module.scss';

function CreateProduct({ onBack }) {
  const dispatch = useDispatch();

  const apimConfigs = useSelector(state => state.apim.apimConfigs);
  const allKongApis = useSelector(state => state.library.kongApis);
  const { spinnerCreateProduct, errorCreateProduct } = useSelector(state => state.products);

  const [name, setName]             = useState('');
  const [description, setDescription] = useState('');
  const [selectedApim, setSelectedApim] = useState('');
  const [selectedApis, setSelectedApis] = useState([]);
  const [attempted, setAttempted]   = useState(false);

  useEffect(() => {
    dispatch(getApimConfigs());
    dispatch(getKongApis());
  }, [dispatch]);

  const isKong = c => c?.configurations?.[0]?.__component === 'config.kong';

  useEffect(() => {
    if (selectedApim || apimConfigs.length === 0) return;
    const firstKong = apimConfigs.find(isKong);
    if (firstKong) setSelectedApim(firstKong.documentId);
  }, [apimConfigs, selectedApim]);

  const kongApis = allKongApis.filter(api => api.providerId === selectedApim);

  const handleSubmit = () => {
    setAttempted(true);
    if (!name.trim()) return;

    const data = {
      name,
      description,
      providerId: selectedApim,
      ...(selectedApis.length > 0 && {
        library_apis: { connect: selectedApis.map(docId => ({ documentId: docId })) },
      }),
    };

    dispatch(createProduct(data, () => onBack()));
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box className={classes.form_header}>
          <IconButton onClick={onBack} size='small'>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6'>Nuevo Producto</Typography>
        </Box>

        <TextField
          fullWidth
          label='Nombre'
          value={name}
          onChange={e => setName(e.target.value)}
          className={classes.field}
          size='small'
          error={attempted && !name.trim()}
          helperText={attempted && !name.trim() ? 'El nombre es obligatorio' : ''}
        />

        <TextField
          fullWidth
          label='Descripción'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={classes.field}
          size='small'
          multiline
          rows={3}
        />

        <FormControl fullWidth className={classes.field}>
          <InputLabel>Provider</InputLabel>
          <Select
            value={selectedApim}
            label='Provider'
            onChange={e => {
              setSelectedApim(e.target.value);
              setSelectedApis([]);
            }}
          >
            {apimConfigs.map(c => {
              const kong = isKong(c);
              const item = (
                <MenuItem key={c.documentId} value={c.documentId} disabled={!kong}>
                  {c.name}
                  {!kong && (
                    <Chip
                      label='Próximamente'
                      size='small'
                      className={classes.chip_coming_soon}
                    />
                  )}
                </MenuItem>
              );
              if (!kong) {
                return (
                  <Tooltip key={c.documentId} title='Próximamente' placement='right'>
                    <span>{item}</span>
                  </Tooltip>
                );
              }
              return item;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth className={classes.field_last} disabled={!selectedApim}>
          <InputLabel>APIs</InputLabel>
          <Select
            multiple
            value={selectedApis}
            onChange={e => setSelectedApis(e.target.value)}
            input={<OutlinedInput label='APIs' />}
            renderValue={selected => (
              <Box className={classes.chips_wrapper}>
                {selected.map(docId => {
                  const api = kongApis.find(a => a.documentId === docId);
                  return (
                    <Chip
                      key={docId}
                      label={api?.title ?? docId}
                      size='small'
                    />
                  );
                })}
              </Box>
            )}
          >
            {kongApis.map(api => (
              <MenuItem key={api.documentId} value={api.documentId}>
                <Checkbox checked={selectedApis.includes(api.documentId)} />
                <ListItemText primary={api.title} />  {/* library-api usa "title" */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {attempted && errorCreateProduct && Object.keys(errorCreateProduct).length > 0 && (
          <Alert severity='error' className={classes.alert}>
            Error al crear el producto. Por favor intenta de nuevo.
          </Alert>
        )}

        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={spinnerCreateProduct || !name.trim()}
          startIcon={spinnerCreateProduct ? <CircularProgress size={16} /> : null}
        >
          Crear Producto
        </Button>
      </CardContent>
    </Card>
  );
}

CreateProduct.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default CreateProduct;