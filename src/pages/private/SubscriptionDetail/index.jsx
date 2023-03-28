/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Multiselect from 'multiselect-react-dropdown';
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

  const params = useParams();

  useEffect(() => {
    if (params.id && user) {
      subscriptionsService.listSubscriptionbyId(user.name, params.id).then((subscriptionDetail) => {
        if (subscriptionDetail) {
          setSubscriptionDetail(subscriptionDetail);
          subscriptionsService.getReportsbySubscription(params.id, subscriptionDetail.properties.createdDate).then((subscriptionReport) => {
            if (subscriptionReport) {
              setSubscriptionReport(subscriptionReport.value[0]);
            }
          });
        };
      });
    };
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    let search = '';
    selectedList.forEach((items, index) => {
      let data = '';
      if (search.length === 0) {
        data = `tags[${index}]=${items.name}`;
      } else {
        data = `&tags[${index}]=${items.name}`;
      }
      search = search + data;
    });
    subscriptionsService.getReportsbySubscription(params.id, subscriptionDetail.properties.createdDate).then((subscriptionReport) => {
      if (subscriptionReport) {
        setSubscriptionReport(subscriptionReport.value[0]);
      }
    });
  };

  const getMonthDifference = () => {
    return (
      (new Date()).getMonth() -
      (new Date('2022-09-15')).getMonth() +
      12 * ((new Date()).getFullYear() - (new Date('2022-09-15')).getFullYear())
    );
  };

  const selectData = () => {
    const options = [];
    const months = getMonthDifference();
    for (let i = 0; i < months; i++) {
      options[i] = {
        name: `Hace ${i + 1} mes(es)`,
        id: i,
      };
    };

    return options;
  };

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
                  <b>Tiempo</b>
                  {' '}
                  :
                </span>
                <Multiselect
                  className={`inputSelect ${classes.selectIn}`}
                  options={selectData()} // Options to display in the dropdown
                  // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  displayValue='name' // Property name to display in the dropdown options
                  // selectionLimit={2}
                  placeholder=''
                />

              </div>
            </Box>
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
                      <TableCell style={{ width: '255px' }}>
                        Tiempo de respuesta promedio
                      </TableCell>
                      <TableCell style={{ width: '255px' }}>
                        Ancho de banda
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
                      <TableCell>
                        <p>{subscriptionReport ? subscriptionReport.apiTimeAvg : '0.0'}</p>
                      </TableCell>
                      <TableCell>
                        <p>{subscriptionReport ? subscriptionReport.bandwidth : '0.0'}</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
        ) : (<SkeletonComponent />)}
      </Container>
    </>
  );
}

export default SubscriptionDetail;
