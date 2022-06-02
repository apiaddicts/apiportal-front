import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import Navbar from '../components/Navbar/Navbar';

import Home from '../Pages/Home';
import Pagina1 from '../Pages/Pagina1';
import Pagina2 from '../Pages/Pagina2';
import Apis from '../Pages/Apis';
import Components from '../Pages/Components';
import Footer from '../components/Footer/Footer';
import Faqs from '../Pages/Faqs';
import Blog from '../Pages/Blog';
import BlogDetails from '../Pages/BlogDetails';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ApiDetails from '../Pages/ApiDetails';
import ApiDocumentation from '../Pages/ApiDocumentation';
import Apps from '../Pages/Apps';
import ApiLibrary from '../Pages/ApiLibrary';
import SidebarDrawer from '../components/SidebarDrawer/SidebarDrawer';
import Admin from '../PrivatePages/ProfileAdmin';
import AddApp from '../PrivatePages/AddApp';
import AppsDetail from '../PrivatePages/DetailApp';
import ApiDetailed from '../PrivatePages/ApiDetails/ApiDetailed';
import ChooseApi from '../PrivatePages/ChooseApi';
import CustomFooter from '../components/common/CustomFooter/CustomFooter';
// import CustomContainer from '../components/common/CustomContainer/CustomContainer';

// Ejemplos
import Swagger from '../Pages/ejemplos/Swagger';
import Redoc from '../Pages/ejemplos/Redoc';

import { getUser } from '../redux/actions/userAction';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';

function AppRouter() {
  const { id, token, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

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
    <BrowserRouter>
      {isOpen && (
        <Login setIsOpen={setIsOpen} />
      )}
      {openForm && (
        <Register setOpenForm={setOpenForm} setIsOpen={setIsOpen} />
      )}
      {!privateSession && (
        <>
          <Navbar setIsOpen={setIsOpen} setOpenForm={setOpenForm} privateSession={privateSession} />
          <Routes>
            <Route path='/' element={<Home setIsOpen={setIsOpen} />} />
            <Route path='/about' element={<Pagina1 />} />
            <Route path='/users' element={<Pagina2 />} />
            <Route path='/apis' exact element={<Apis setIsOpen={setIsOpen} />} />
            <Route path='/faqs' exact element={<Faqs />} />
            <Route path='/blog' exact element={<Blog setIsOpen={setIsOpen} />} />
            <Route path='/componentes' exact element={<Components />} />
            <Route path='/blog/:id' exact element={<BlogDetails setIsOpen={setIsOpen} />} />
            <Route path='/api/:id' exact element={<ApiDetails setIsOpen={setIsOpen} />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <Footer />
        </>
      )}
      {privateSession && (
        <Box>
          {user && Object.keys(user).length > 0 ? (
            <Box>
              <Box sx={{ display: 'flex', flex: '1', backgroundColor: '#fbfbfb', overflow: 'auto', height: '79vh' }}>
                <SidebarDrawer user={user} />
                <Routes>
                  <Route path='/user' element={<Admin />} />
                  <Route path='/apps' exact element={<Apps />} />
                  <Route path='/documentation/api' exact element={<ApiDocumentation />} />
                  <Route path='/apps/:id' exact element={<AppsDetail />} />
                  <Route path='/apps/apis' exact element={<ChooseApi />} />
                  <Route path='/newApp' exact element={<AddApp />} />
                  <Route path='/ApiLibrary' exact element={<ApiLibrary />} />
                  <Route path='/ApiLibrary/:id' exact element={<ApiDetailed />} />
                  <Route path='/ApiLibrary/try/:id' exact element={<Swagger />} />
                  <Route path='/redoc' exact element={<Redoc />} />
                  <Route path='*' element={<Navigate to='/apps' replace />} />
                </Routes>
              </Box>
              <Box sx={{ zIndex: 1300, position: 'absolute', background: '#fff' }}>
                <CustomFooter />
              </Box>

            </Box>
          ) : (<SkeletonComponent />)}

        </Box>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
