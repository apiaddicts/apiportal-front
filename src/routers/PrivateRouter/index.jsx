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
import SwaggerUI from '../../pages/common/SwaggerUI';
import OAuthRedirect from '../../pages/common/OAuthRedirect';
import Subscriptions from '../../pages/private/Subscriptions';
import Logout from '../../pages/private/Logout/Logout';

import { getUser } from '../../redux/actions/userAction';
import classes from './private-router.module.scss';

function PrivateRouter({ children }) {
  // const [showModal, setShowModal] = useState(false);
  const { id, token, user, openModal } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.timer);
  const { checkSession } = useVerifySession();
  const { getTime } = useTimer();
  const privateSession = id !== '' && token !== '';
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== '' && token !== '' && user && Object.keys(user).length === 0) {
      const tokens = {
        id,
        token,
      };
      dispatch(getUser(tokens));
      getTime();
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [time]);

  return privateSession ? (
    <Box>
      {
        openModal &&
        (<Logout showModal={openModal} setShowModal={openModal} />)
      }
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
                <Route path='*' element={<Navigate to='/' replace />} />
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
