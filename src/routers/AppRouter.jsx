import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
import AddApp from '../Pages/AddApp';
import ApiLibrary from '../Pages/ApiLibrary';
import SidebarDrawer from '../components/SidebarDrawer/SidebarDrawer';
import Admin from '../PrivatePages/ProfileAdmin';

function AppRouter() {
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [privateSession, setPrivateSession] = useState(true);

  return (
    <BrowserRouter>
      {isOpen && (
        <Login setIsOpen={setIsOpen} setPrivateSession={setPrivateSession} />
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
            <Route path='/admin' exact element={<Admin />} />
          </Routes>
          <Footer />
        </>
      )}
      {privateSession && (
        <Box sx={{ display: 'flex' }}>
          <SidebarDrawer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/apis' exact element={<Apis />} />
            <Route path='/api/:id' exact element={<ApiDetails />} />
            <Route path='/documentation/api' exact element={<ApiDocumentation />} />
            <Route path='/apps' exact element={<Apps />} />
            <Route path='/apps/nuevaApp' exact element={<AddApp />} />
            <Route path='/ApiLibrary' exact element={<ApiLibrary />} />
          </Routes>
        </Box>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
