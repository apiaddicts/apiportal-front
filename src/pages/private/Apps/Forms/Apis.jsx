import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
//import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import FormikAutocomplete from '../../../../components/Autocomplete';
import { listApisProduct, showSelectedApis } from '../../../../redux/actions/libraryAction';

function Apis(props) {
  const {
    formField: {
      checkApis,
    },
  } = props;
  const { apisProduct, selectedApis } = useSelector((state) => state.library);
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  const arrApis = apisProduct && Object.keys(apisProduct).length > 0 ? apisProduct.map((api) => {
    return {
      value: api.id,
      label: api.displayName,
    };
  }) : [];

  const compareArrays = (array1, array2) => {
    return array1.filter((a) => {
      return array2.some((b) => {
        return a.id === b.value;
      });
    });
  };

  const setApisSelected = () => {
    const apis = compareArrays(apisProduct, values.checkApis);
    dispatch(showSelectedApis(apis));
  };

  useEffect(() => {
    dispatch(listApisProduct());
  }, []);

  return (
    <Container>
      <div className='row align-center justify-center'>
        <div className='flex-sm-12 flex-md-6'>
          <FormikAutocomplete
            options={arrApis}
            name={checkApis.name}
            value={values.checkApis}
            onChange={(value) => setFieldValue('checkApis', value)}
            placeholderText='Seleccione Apis'
            isMulti={true}
          />
        </div>
        <div className='flex-lg-3 flex-sm-12'>
          <Button
            onClick={() => setApisSelected()}
            styles='primary'
            className='custom__btn custom__btn__primary'
            fullWidth
          >
            Añadir
          </Button>
        </div>
      </div>

      <Grid item sx={{ marginButton: '31px', marginTop: '31px' }} xs={12}>
        <div className='wrapper__table__wide__display'>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '33%' }} size='small'>
                    <div className='custom__table__cell__title'>
                      <h2 className='text-uppercase'>API</h2>
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '33%' }} size='small'>
                    <div className='custom__table__cell__title'>
                      <h2 className='text-uppercase'>Producto</h2>
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '33%' }} size='small'>
                    <div className='custom__table__cell__title'>
                      <h2 className='text-uppercase'>Descripción</h2>
                    </div>
                  </TableCell>
                  {/* <TableCell style={{ width: '100%' }} size='small'>
                    <div />
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedApis && Object.keys(selectedApis).length > 0 ? selectedApis.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}>
                    <TableCell component='th' scope='row'>
                      <div className='flex__column'>
                        <p className='custom__table__cell__content custom__table__cell__content__link'>{row.displayName}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p>
                        {row.products.map((product, index) => (product ? (
                          <div key={index}>
                            <p>{product.displayName}</p>
                          </div>
                        ) : null))}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p>{row.description}</p>
                    </TableCell>
                    {/* <TableCell>
                      <IconButton>
                        <MdDelete color='#E4002B' />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3}>Sin Apis seleccionadas</TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Container>
  );
}

export default Apis;
