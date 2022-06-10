import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';

import SidebarDrawer from '../../components/SidebarDrawer/SidebarDrawer';
import CustomFooter from '../../components/common/CustomFooter/CustomFooter';
import SkeletonComponent from '../../components/SkeletonComponent/SkeletonComponent';

import Apps from '../../Pages/Apps';
import ApiLibrary from '../../Pages/ApiLibrary';
import Swagger from '../../Pages/ejemplos/Swagger';
import Admin from '../../PrivatePages/ProfileAdmin';
import AppsDetail from '../../PrivatePages/DetailApp';
import ApiDetailed from '../../PrivatePages/ApiDetails/ApiDetailed';
import ApiSubscriptions from '../../PrivatePages/ApiSubscriptions';

import { getUser } from '../../redux/actions/userAction';

function DashboardRoutes() {

  const { id, token, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== '' && token !== '' && user && Object.keys(user).length === 0) {
      const tokens = {
        id,
        token,
      };
      dispatch(getUser(tokens));
    }
  }, []);
  return (
    <Box>
      {user && Object.keys(user).length > 0 ? (
        <Box>
          <Box sx={{ display: 'flex', flex: '1', backgroundColor: '#fbfbfb', minHeight: '100vh' }}>
            <SidebarDrawer user={user} />
            <div className='container' style={{ marginTop: '152px', marginBottom: '87px' }}>
              <Routes>
                <Route path='user' element={<Admin />} />
                <Route path='products' exact element={<Apps />} />
                <Route path='products/:id' exact element={<AppsDetail />} />
                <Route path='apis' exact element={<ApiLibrary />} />
                <Route path='apis/:id' exact element={<ApiDetailed />} />
                <Route path='apis/try/:id' exact element={<Swagger />} />
                <Route path='subscriptions' exact element={<ApiSubscriptions />} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </div>
          </Box>
          <Box sx={{ zIndex: 1300, position: 'absolute', background: '#fff' }}>
            <CustomFooter />
          </Box>

        </Box>
      ) : (<SkeletonComponent />)}

    </Box>
  );

}

export default DashboardRoutes;
