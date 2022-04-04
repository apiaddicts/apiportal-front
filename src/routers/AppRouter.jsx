import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

import Home from '../Pages/Home';
import Pagina1 from '../Pages/Pagina1';
import Pagina2 from '../Pages/Pagina2';
import Apis from '../Pages/Apis';
import Components from '../Pages/Components';
import Footer from '../components/Footer/Footer';
import Faqs from '../Pages/Faqs';

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
