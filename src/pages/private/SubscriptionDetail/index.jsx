/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import { Box, TableHead, TableRow, TableCell, Table, TableContainer, TableBody, Container } from '@mui/material';
import subscriptionsService from '../../../services/subscriptionsService';
import Title from '../../../components/Title';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import Icon from '../../../components/MdIcon/Icon';
import classes from './subscription-detail.module.scss';

function SubscriptionDetail(props) {
  const { user } = useSelector((state) => state.user);
  const [subscriptionDetail, setSubscriptionDetail] = useState();
  const [subscriptionReport, setSubscriptionReport] = useState();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(1);
  const params = useParams();

  useEffect(() => {
    if (params.id && user) {
      subscriptionsService.listSubscriptionbyId(user.name, params.id).then((subscriptionDetail) => {
        if (subscriptionDetail) {
          setSubscriptionDetail(subscriptionDetail);
          setLoading(true);
          const actual = moment(new Date(subscriptionDetail?.properties?.createdDate)).subtract(1, 'months').toISOString();
          subscriptionsService.getReportsbySubscription(params.id, actual).then((subscriptionReport) => {
            if (subscriptionReport) {
              setSubscriptionReport(subscriptionReport.value[0]);
              setLoading(false);
            }
          });
        };
      });
    };
  }, []);

  const getMonthDifference = () => {
    return (
      ((new Date()).getMonth() + 1) -
      ((new Date(subscriptionDetail?.properties?.createdDate)).getMonth() + 1) +
      12 * ((new Date()).getFullYear() - (new Date(subscriptionDetail?.properties?.createdDate)).getFullYear())
    );
  };

  const selectData = getMonthDifference() === 0 ? () => {
    return (
      [
        {
          name: 'Mes actual',
          id: 1,
        },
      ]);
  } : () => {
    const options = [];
    for (let i = 0; i < getMonthDifference(); i++) {
      options[i] = {
        name: i === 0 ? `Hace ${i + 1} mes` : `Hace ${i + 1} meses`,
        id: i + 1,
      };
    };
    return options;
  };

  const handleChange = (event) => {
    setTime(event.target.value);
    const timestamp = moment(new Date(subscriptionDetail?.properties?.createdDate)).subtract(event.target.value, 'months').toISOString();
    setLoading(true);
    subscriptionsService.getReportsbySubscription(params.id, timestamp).then((subscriptionReport) => {
      if (subscriptionReport) {
        setSubscriptionReport(subscriptionReport.value[0]);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    console.log('listen', loading, subscriptionReport);

  }, [loading, subscriptionReport]);

  return (
    <>
      <div className={classes.back__btn}>
        <Link to={-1}>
          <div className={classes.return}>
            <div>
              <Icon id='MdKeyboardBackspace' />
            </div>
            <span>VOLVER</span>
          </div>
        </Link>
      </div>
      <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
        { subscriptionDetail ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={classes.box__title}>
              <Title text={subscriptionDetail?.properties?.displayName ? subscriptionDetail.properties.displayName : 'Demo Subscription'} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={classes.box__title}>
              <div className={classes.wrapper__filters__search}>
                <span className={classes.filter}>
                  Filtrar por
                  {' '}
                  <b>Tiempo </b>
                  {'  '}
                  :
                </span>

                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={time}
                    defaultValue={1}
                    onChange={handleChange}
                    autoWidth
                  >
                    {selectData().map((time) => (
                      <MenuItem key={time.id} value={time.id}>
                        {time.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Box>
            {
              loading ? (<SkeletonComponent />) :
                (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={classes.box__title}>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead className={classes.table_head}>
                          <TableRow>
                            <TableCell style={{ width: '255px' }}>
                              Llamadas correctas
                            </TableCell>
                            <TableCell style={{ width: '255px' }}>
                              Llamadas bloqueadas
                            </TableCell>
                            <TableCell style={{ width: '255px' }}>
                              Llamadas con error
                            </TableCell>
                            <TableCell style={{ width: '255px' }}>
                              Otras llamadas
                            </TableCell>
                            <TableCell style={{ width: '255px' }}>
                              Total llamadas
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, zIndex: 6 }}
                          >
                            <TableCell>
                              <p>{subscriptionReport ? subscriptionReport.callCountSuccess : '0'}</p>
                            </TableCell>
                            <TableCell>
                              <p>{subscriptionReport ? subscriptionReport.callCountBlocked : '0'}</p>
                            </TableCell>
                            <TableCell>
                              <p>{subscriptionReport ? subscriptionReport.callCountFailed : '0'}</p>
                            </TableCell>
                            <TableCell>
                              <p>{subscriptionReport ? subscriptionReport.callCountOther : '0'}</p>
                            </TableCell>
                            <TableCell>
                              <p>{subscriptionReport ? subscriptionReport.callCountTotal : '0'}</p>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )
            }
          </div>
        ) : (<SkeletonComponent />)}
      </Container>
    </>
  );
}

export default SubscriptionDetail;
