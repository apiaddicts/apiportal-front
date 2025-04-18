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
import Logout from '../../pages/private/Logout/Logout';


import { getUser, logout } from '../../redux/actions/userAction';
import classes from './private-router.module.scss';
import config from '../../services/config';

function PrivateRouter({ children }) {
  const { id, token, user, openModal, userGroups } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.timer);
  const { checkSession,isSessionValid } = useVerifySession();
  const { getTime } = useTimer();
  const privateSession = token !== '';
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== '' && user && Object.keys(user).length === 0) {
      dispatch(getUser(token));
      getTime();
    }
  }, []);

  useEffect(() => {
    // checkSession();
    isSessionValid();
    if(openModal) dispatch(logout());
  }, [time]);

  return privateSession ? (
    <Box>
      {/* {
        openModal &&
        (<Logout showModal={openModal} setShowModal={openModal} />)
      } */}
      {user && Object.keys(user).length > 0 ? (
        <Box>
          <Box sx={{ display: 'flex', flex: '1', minHeight: '100vh' }} className={classes.custom__body}>
            <Toaster
              position='top-right'
              toastOptions={{
                icon: '👏',
              }}
            />
            <SidebarDrawer user={user} />
            <div className={`container ${classes.wrapper}`}>
              <Routes>
                <Route path='profile' element={<Profile />} />
                <Route path='products' exact='true' element={<Products />} />
                <Route path='products/:id' exact='true' element={<ProductDetail />} />
                <Route path='apis' exact='true' element={<Apis />} />
                <Route path='apis/:id' exact='true' element={<ApiDetail />} />
                <Route path='apis/:id/swagger-ui' exact='true' element={<SwaggerUI />} />
                <Route path='subscriptions' exact='true' element={<Subscriptions />} />
                <Route path='subscriptions/:id' exact='true' element={<SubscriptionDetail />} />
                <Route path='*' element={<Navigate to='/' replace />} />
                {/* {isAdmin && (
                  <>
                    <Route path='users' exact='true' element={<Users />} />
                    <Route path='users/:id' exact='true' element={<UsersDetail />} />
                    <Route path='groups' exact='true' element={<Groups />} />
                    <Route path='groups/:id' exact='true' element={<GroupDetailed />} />
                  </>
                )}
                <Route path='apps' element={<Apps />} />
                <Route path='apps/:id' element={<AppDetailed />} />
                <Route path='apps/new-app' element={<AddApp />} />
                <Route path='apps/user-b2c' element={<AddUserB2c />} /> */}
                {/* <Route path='getting-started' element={<GettingStarted />} /> */}
              </Routes>
            </div>
          </Box>
          <Box sx={{ zIndex: 1300, position: 'absolute', width: '100%' }} className={classes.container__footer}>
            <CustomFooter />
          </Box>

        </Box>
      ) : (<SkeletonComponent />)}

    </Box>
  ) : (
    <Routes>
      <Route path='apis/swagger-ui/oauth-redirect' exact='true' element={<OAuthRedirect />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default PrivateRouter;
