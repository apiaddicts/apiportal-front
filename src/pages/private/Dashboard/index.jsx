/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import { billingsProducts, billingDataChart } from '../../../redux/actions/billingsAction';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useTranslation } from 'react-i18next';

import styles from './dashboard.module.scss';

const TIME_RANGES = ['1h', '3h', '1d', '7d', '1m', '3m', '1y'];

// 🧪 Datos simulados por 7 días con hora
const mockTimeSeries = Array.from({ length: 48 }, (_, i) => {
  const timestamp = new Date(Date.now() - (48 - i) * 30 * 60 * 1000); // cada 30 minutos
  return {
    [timestamp.toISOString()]: {
      count: Math.floor(Math.random() * 50) + 1
    }
  };
});
function Dashboard(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { time_series_15m = [] } = useSelector((state) => state.billing.billingDataCharts || {});
  const { billings = {} } = useSelector((state) => state.billing);

  const [range, setRange] = useState('1m');
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    if (!billings.data || billings.data.length === 0) {
      dispatch(billingsProducts('Mulesoft'));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (time_series_15m.length === 0) {
  //     dispatch(billingDataChart());
  //   }
  // }, [dispatch]);

  // console.log('billingDataCharts', time_series_15m);



  const getDurationMinutes = (range) => {
    switch (range) {
      case '1h': return 60;
      case '3h': return 180;
      case '1d': return 1440;
      case '7d': return 10080;
      case '1m': return 43200; // 30 días
      case '3m': return 129600;
      case '1y': return 525600;
      default: return 43200;
    }
  };

  useEffect(() => {
    const now = Date.now();
    const durationMs = getDurationMinutes(range) * 60 * 1000;

    const transformed = mockTimeSeries
      .map(entry => {
        const [timestamp, value] = Object.entries(entry)[0];
        const date = new Date(timestamp);
        return {
          time: date.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
          count: value.count,
          timestamp: date.getTime()
        };
      })
      .filter(item => item.timestamp >= now - durationMs);

    setChartData(transformed);
  }, [range]);


  const currentProduct = billings?.data?.[0];
  const productName = currentProduct?.name || 'N/A';
  const monthlyQuota = currentProduct?.prices?.[0]?.metadata?.monthlyRequests || '0';
  const dailyQuota = currentProduct?.prices?.[0]?.metadata?.dailyRequests || '0';
  const priceDecimal = currentProduct?.prices?.[0]?.unitAmountDecimal || '0';

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' }, paddingTop: '50px' }}>

      <Grid container spacing={2}>
        {/* Current Plan */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={styles.cardBox} >
            <CardContent>
              <Typography className={styles.cardTitle}>{t('currentPlan')}</Typography>
              <span className={styles.statusBadge}>● {t('active')}</span>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Quota */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={styles.cardBox}>
            <CardContent>
              <Typography className={styles.cardTitle}>{t('monthlyQuota')}</Typography>
              <span className={styles.quotaBadge} >{monthlyQuota} {t('perMonth')}</span>
            </CardContent>
          </Card>
        </Grid>

        {/* API Calls Used */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={styles.cardBox}>
            <CardContent>
              <Typography className={styles.cardTitle}>{t('apiCallsUsed')}</Typography>
              <Typography className={styles.cardValue}>18</Typography>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: '18%' }}></div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Faces in Storage */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className={styles.cardBox}>
            <CardContent>
              <Typography className={styles.cardTitle}>{t('facesInStorage')}</Typography>
              <Typography className={styles.cardValue}>{dailyQuota}</Typography>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: '73%' }}></div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <br />  <br />
      <div>
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          <ButtonGroup>
            {TIME_RANGES.map((r) => (
              <Button
                key={r}
                onClick={() => setRange(r)}
                className={`${styles.timeButton} ${range === r ? styles.timeButtonActive : ''}`}
              >
                {r}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </Container>
  );
}

Dashboard.propTypes = {};

export default Dashboard;

