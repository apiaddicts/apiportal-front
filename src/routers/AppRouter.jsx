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

function AppRouter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar setIsOpen={setIsOpen} />
      {isOpen && (
        <Login setIsOpen={setIsOpen} />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Pagina1 />} />
        <Route path='/users' element={<Pagina2 />} />
        <Route path='/apis' exact element={<Apis />} />
        <Route path='/faqs' exact element={<Faqs />} />
        <Route path='/blog' exact element={<Blog />} />
        <Route path='/componentes' exact element={<Components />} />
        <Route path='/blog/:id' exact element={<BlogDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
