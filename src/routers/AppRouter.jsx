import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

import Home from '../pages/Home';
import Pagina1 from '../pages/Pagina1';
import Pagina2 from '../pages/Pagina2';
import Apis from '../pages/Apis';
import Components from '../pages/Components';
import Footer from '../components/Footer/Footer';
import Faqs from '../pages/Faqs';

function AppRouter() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Pagina1 />} />
        <Route path='/users' element={<Pagina2 />} />
        <Route path='/apis' exact element={<Apis />} />
        <Route path='/faqs' exact element={<Faqs />} />
        <Route path='/componentes' exact element={<Components />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
