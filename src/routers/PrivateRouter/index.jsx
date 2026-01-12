import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Toaster } from 'react-hot-toast';
import useTimer from '../../hooks/useTimer';
import useVerifySession from '../../hooks/useVerifySession';

import SidebarDrawer from '../../components/SidebarDrawer/SidebarDrawer';
import CustomFooter from '../../components/common/CustomFooter/CustomFooter';
import SkeletonComponent from '../../components/SkeletonComponent/SkeletonComponent';

import Profile from '../../pages/private/Profile';
import Products from '../../pages/private/Products';
import ProductDetail from '../../pages/private/ProductDetail';
import Apis from '../../pages/private/Apis';
import ApiDetail from '../../pages/private/ApiDetail';
import SubscriptionDetail from '../../pages/private/SubscriptionDetail';
import SwaggerUI from '../../pages/common/SwaggerUI';
import OAuthRedirect from '../../pages/common/OAuthRedirect';
import Subscriptions from '../../pages/private/Subscriptions';
import Dashboard from '../../pages/private/Dashboard';
import ApiToken from '../../pages/private/ApiToken';
import FaqsPriv from '../../pages/private/Faqs';
import BlogPriv from '../../pages/private/Blog';
import NewsPriv from '../../pages/private/News';
import SupportPriv from '../../pages/private/Support';
import Billings from '../../pages/private/Billings';
import ApiDoc from '../../pages/private/ApiDoc';
import CodeSamples from '../../pages/private/codeSamples';
import CodeSampleDetailss from '../../pages/private/codeSamplesDetail';

import { getUser, logout } from '../../redux/actions/userAction';
import classes from './private-router.module.scss';

function PrivateRouter({ isAppReady }) {
  const dispatch = useDispatch();
  const { token, user, openModal } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.timer);
  const { checkSession, isSessionValid } = useVerifySession();
  const { getTime } = useTimer();

  const hasToken = token || localStorage.getItem('token');

  useEffect(() => {
    if (token && Object.keys(user).length === 0) {
      dispatch(getUser(token, 'Mulesoft'));
      getTime();
    }
  }, []);

  useEffect(() => {
    isSessionValid();
    if (openModal) dispatch(logout());
  }, [time]);


  if (!isAppReady) return <SkeletonComponent />;


  if (!hasToken) {
    return (
      <Routes>
        <Route path='apis/swagger-ui/oauth-redirect' element={<OAuthRedirect />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    );
  }


  if (Object.keys(user).length === 0) return <SkeletonComponent />;


  return (
    <Box>
      <Box sx={{ display: 'flex', flex: '1', minHeight: '93vh' }} className={classes.custom__body}>
        <Toaster position='top-right' toastOptions={{ icon: '👏' }} />
        <SidebarDrawer user={user} />
        <div className={`container ${classes.wrapper}`}>
          <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='billings' element={<Billings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<ProductDetail />} />
            <Route path='apis' element={<Apis />} />
            <Route path='apis/:id' element={<ApiDetail />} />
            <Route path='apis/:id/swagger-ui' element={<SwaggerUI />} />
            <Route path='subscriptions' element={<Subscriptions />} />
            <Route path='subscriptions/:id' element={<SubscriptionDetail />} />
            <Route path='code-samples' element={<CodeSamples />} />
            <Route path='code-samples/:id' element={<CodeSampleDetailss />} />
            <Route path='support' element={<SupportPriv />} />
            <Route path='docs' element={<ApiDoc />} />
            <Route path='faqs' element={<FaqsPriv />} />
            <Route path='blog' element={<BlogPriv />} />
            <Route path='news' element={<NewsPriv />} />
            <Route path='api-token' element={<ApiToken />} />
            <Route path='*' element={<Navigate to='dashboard' replace />} />
          </Routes>
        </div>
      </Box>
      <Box sx={{ zIndex: 1300, position: 'absolute', width: '100%' }} className={classes.container__footer}>
        <CustomFooter />
      </Box>
    </Box>
  );
}

export default PrivateRouter;
