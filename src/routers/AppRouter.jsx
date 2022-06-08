import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import Navbar from '../components/Navbar/Navbar';

import Home from '../Pages/Home';
import Apis from '../Pages/Apis';
import Components from '../Pages/Components';
import Footer from '../components/Footer/Footer';
import Faqs from '../Pages/Faqs';
import Blog from '../Pages/Blog';
import BlogDetails from '../Pages/BlogDetails';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ApiDetails from '../Pages/ApiDetails';
import Apps from '../Pages/Apps';
import ApiLibrary from '../Pages/ApiLibrary';
import SidebarDrawer from '../components/SidebarDrawer/SidebarDrawer';
import Admin from '../PrivatePages/ProfileAdmin';
import AppsDetail from '../PrivatePages/DetailApp';
import ApiDetailed from '../PrivatePages/ApiDetails/ApiDetailed';
// import ChooseApi from '../PrivatePages/ChooseApi';
import CustomFooter from '../components/common/CustomFooter/CustomFooter';
import ApiSubscriptions from '../PrivatePages/ApiSubscriptions';

import Swagger from '../Pages/ejemplos/Swagger';

import { getUser } from '../redux/actions/userAction';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';
import ResetPassword from '../Pages/ResetPassword';
import ConfirmAccount from '../Pages/ConfirmAccount';

function AppRouter() {
  const { id, token, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const privateSession = id !== '' && token !== '';

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
    <>
      {isOpen && (
        <Login setIsOpen={setIsOpen} />
      )}
      {openForm && (
        <Register setOpenForm={setOpenForm} setIsOpen={setIsOpen} />
      )}
      {!privateSession && (
        <>
          {
            location.pathname !== '/confirmPassword' &&
            location.pathname !== '/confirmAccount' &&
            <Navbar setIsOpen={setIsOpen} setOpenForm={setOpenForm} privateSession={privateSession} />
          }
          <Routes>
            <Route path='/' element={<Home setIsOpen={setIsOpen} />} />
            <Route path='/apis' exact element={<Apis setIsOpen={setIsOpen} />} />
            <Route path='/api/:id' exact element={<ApiDetails setIsOpen={setOpenForm} />} />
            <Route path='/faqs' exact element={<Faqs />} />
            <Route path='/blog' exact element={<Blog setIsOpen={setIsOpen} />} />
            <Route path='/blog/:id' exact element={<BlogDetails setIsOpen={setIsOpen} />} />
            <Route path='/componentes' exact element={<Components />} />
            <Route path='/confirmPassword' exact element={<ResetPassword />} />
            <Route path='/confirmAccount' exact element={<ConfirmAccount setIsOpen={setIsOpen} />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          {
            location.pathname !== '/confirmPassword' &&
            location.pathname !== '/confirmAccount' &&
            <Footer />
          }
        </>
      )}
      {privateSession && (
        <Box>
          {user && Object.keys(user).length > 0 ? (
            <Box>
              <Box sx={{ display: 'flex', flex: '1', backgroundColor: '#fbfbfb', minHeight: '100vh' }}>
                <SidebarDrawer user={user} />
                <div className='container' style={{ marginTop: '152px', marginBottom: '87px' }}>
                  <Routes>
                    <Route path='/user' element={<Admin />} />
                    <Route path='/products' exact element={<Apps />} />
                    <Route path='/products/:id' exact element={<AppsDetail />} />
                    <Route path='/apiBookstores' exact element={<ApiLibrary />} />
                    <Route path='/apiBookstores/:id' exact element={<ApiDetailed />} />
                    <Route path='/apiBookstores/try/:id' exact element={<Swagger />} />
                    {/* <Route path='/apps/apis' exact element={<ChooseApi />} /> */}
                    <Route path='/subscriptions' exact element={<ApiSubscriptions />} />
                    <Route path='*' element={<Navigate to='/products' replace />} />
                  </Routes>
                </div>
              </Box>
              <Box sx={{ zIndex: 1300, position: 'absolute', background: '#fff' }}>
                <CustomFooter />
              </Box>

            </Box>
          ) : (<SkeletonComponent />)}

        </Box>
      )}
    </>
  );
};

export default AppRouter;
