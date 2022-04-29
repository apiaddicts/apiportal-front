import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
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

function AppRouter() {
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [privateSession, setPrivateSession] = useState(false);

  return (
    <BrowserRouter>
      <Navbar setIsOpen={setIsOpen} setOpenForm={setOpenForm} privateSession={privateSession} />
      {isOpen && (
        <Login setIsOpen={setIsOpen} setPrivateSession={setPrivateSession} />
      )}
      {openForm && (
        <Register setOpenForm={setOpenForm} />
      )}
      {!privateSession && (
        <>
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
          </Routes>
          <Footer />
        </>
      )}
      {privateSession && (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/apis' exact element={<Apis />} />
          <Route path='/api/:id' exact element={<ApiDetails />} />
          <Route path='/documentation/api' exact element={<ApiDocumentation />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
