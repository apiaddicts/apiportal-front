/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import moment from 'moment';
import { Box, TableHead, TableRow, TableCell, Table, TableContainer, TableBody, Container } from '@mui/material';
import subscriptionsService from '../../../services/subscriptionsService';
import Title from '../../../components/Title';
import Select from '../../../components/Input/InputUI/Select';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import Icon from '../../../components/MdIcon/Icon';
import classes from './subscription-detail.module.scss';

function SubscriptionDetail(props) {
  const { user } = useSelector((state) => state.user);
  const [subscriptionDetail, setSubscriptionDetail] = useState();
  const [periods, setPeriods] = useState([]);
  const [subscriptionReport, setSubscriptionReport] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState();
  const params = useParams();

  const isLeapYear = (year) => {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
  };

  const getDaysInMonth = (date) => {
    return [31, (isLeapYear(date.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
  };

  const addSubsMonths = (date, months) => {
    const date_ = new Date(date);
    date_.setDate(1);
    date_.setMonth(date_.getMonth() + months);
    date_.setDate(Math.min(date.getDate(), getDaysInMonth(date_)));
    return date_;
  };

  const calculatePeriods = (creationDateStr) => {
    const createdDate = new Date(creationDateStr);
    const currentDate = new Date();
    const yearsDifference = Math.abs(currentDate.getFullYear() - createdDate.getFullYear());
    let monthsDifference = currentDate.getMonth() - createdDate.getMonth() + 12 * yearsDifference;
    if (addSubsMonths(createdDate, monthsDifference) > currentDate) monthsDifference -= 1;
    const currentPeriodInitDate = addSubsMonths(createdDate, monthsDifference);
    const currentPeriodLimitDate = addSubsMonths(createdDate, monthsDifference + 1);
    const prevPeriodInitDate = addSubsMonths(createdDate, monthsDifference - 1);
    const prevPeriodLimitDate = new Date(currentPeriodInitDate);
    prevPeriodLimitDate.setDate(currentPeriodInitDate.getDate() - 1);

    const lastSevenDaysInitDate = new Date(currentDate);
    lastSevenDaysInitDate.setDate(currentDate.getDate() - 6);

    const lastNintyDaysInitDate = new Date(currentDate);
    lastNintyDaysInitDate.setDate(currentDate.getDate() - 89);

    const periods = [
      {
        id: 'current',
        text: `Periodo actual - Desde ${currentPeriodInitDate.toLocaleDateString('en-GB')} hasta ${currentPeriodLimitDate.toLocaleDateString('en-GB')}`,
        value: 'current',
        init: currentPeriodInitDate,
        limit: currentPeriodLimitDate,
      },
      {
        id: 'prev',
        text: `Periodo anterior - Desde ${prevPeriodInitDate.toLocaleDateString('en-GB')} hasta ${prevPeriodLimitDate.toLocaleDateString('en-GB')}`,
        value: 'prev',
        init: prevPeriodInitDate,
        limit: prevPeriodLimitDate,
      },
      {
        id: 'last7',
        text: `Últimos 7 días - Desde ${lastSevenDaysInitDate.toLocaleDateString('en-GB')} hasta ${currentDate.toLocaleDateString('en-GB')}`,
        value: 'last7',
        init: lastSevenDaysInitDate,
        limit: currentDate,
      },
      {
        id: 'last90',
        text: `Últimos 90 días - Desde ${lastNintyDaysInitDate.toLocaleDateString('en-GB')} hasta ${currentDate.toLocaleDateString('en-GB')}`,
        value: 'last90',
        init: lastNintyDaysInitDate,
        limit: currentDate,
      },
    ];
    return periods;
  };

  useEffect(() => {
    if (params.id && user) {
      subscriptionsService.listSubscriptionbyId(user.name, params.id).then((subscriptionDetail) => {
        if (subscriptionDetail) {
          setSubscriptionDetail(subscriptionDetail);
          setLoading(true);
          const periods = calculatePeriods(subscriptionDetail?.properties?.createdDate);
          setPeriods(periods);
          const selectedPeriod = periods[0];
          setSelectedPeriod(selectedPeriod);
          subscriptionsService.getReportsbySubscription(params.id, selectedPeriod.init.toISOString()).then((subscriptionReport) => {
            if (subscriptionReport) {
              setSubscriptionReport(subscriptionReport.value[0]);
              setLoading(false);
            }
          });
        };
      });
    };
  }, []);

  const handlePeriods = (selectedPeriod) => {
    setSelectedPeriod(selectedPeriod);
    setLoading(true);
    subscriptionsService.getReportsbySubscription(params.id, selectedPeriod.init.toISOString(), selectedPeriod.limit.toISOString()).then((subscriptionReport) => {
      if (subscriptionReport) {
        setSubscriptionReport(subscriptionReport.value[0]);
        setLoading(false);
      }
    });
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
              <Title text={subscriptionDetail?.properties?.displayName ? subscriptionDetail.properties.displayName : ''} />
            </Box>
            <div className='row mt-6'>
              <div className='flex-sm-12 flex-md-12 flex-lg-12'>
                <Select label='Periodo' disabled={!periods.length > 0} placeholder='Seleccione un periodo' items={periods} defaultValue={selectedPeriod} itemText='text' itemValue='value' onChange={(e) => handlePeriods(e)} />
              </div>
            </div>
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
