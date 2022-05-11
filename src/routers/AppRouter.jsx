import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
// Ejemplos
import Swagger from '../Pages/ejemplos/Swagger';
import Redoc from '../Pages/ejemplos/Redoc';

function AppRouter() {
  const { email, password } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const privateSession = email !== '' && password !== '';

  return (
    <BrowserRouter>
      {isOpen && (
        <Login setIsOpen={setIsOpen} />
      )}
      {openForm && (
        <Register setOpenForm={setOpenForm} />
      )}
      {!privateSession && (
        <>
          <Navbar setIsOpen={setIsOpen} setOpenForm={setOpenForm} privateSession={privateSession} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<Pagina1 />} />
            <Route path='/users' element={<Pagina2 />} />
            <Route path='/apis' exact element={<Apis />} />
            <Route path='/faqs' exact element={<Faqs />} />
            <Route path='/blog' exact element={<Blog />} />
            <Route path='/componentes' exact element={<Components />} />
            <Route path='/blog/:id' exact element={<BlogDetails />} />
            <Route path='/api/:id' exact element={<ApiDetails setIsOpen={setIsOpen} />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <Footer />
        </>
      )}
      {privateSession && (
        <Box sx={{ display: 'flex', backgroundColor: '#fbfbfb' }}>
          <SidebarDrawer />
          <Routes>
            <Route path='/' element={<Admin />} />
            <Route path='/apis' exact element={<Apis />} />
            <Route path='/api/:id' exact element={<ApiDetails />} />
            <Route path='/documentation/api' exact element={<ApiDocumentation />} />
            <Route path='/apps' exact element={<Apps />} />
            <Route path='/apps/:id' exact element={<AppsDetail />} />
            <Route path='/newApp' exact element={<AddApp />} />
            <Route path='/ApiLibrary' exact element={<ApiLibrary />} />
            <Route path='/swagger' exact element={<Swagger />} />
            <Route path='/redoc' exact element={<Redoc />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Box>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
