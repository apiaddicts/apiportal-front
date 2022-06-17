import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import Login from '../../Pages/Login';
import Register from '../../Pages/Register';

import Home from '../../Pages/Home';
import Apis from '../../Pages/Apis';
import ApiDetails from '../../Pages/ApiDetails';
import Faqs from '../../Pages/Faqs';
import Blog from '../../Pages/Blog';
import BlogDetails from '../../Pages/BlogDetails';

function PublicRoute() {
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      {isOpen && (
        <Login setIsOpen={setIsOpen} setOpenForm={setOpenForm} />
      )}
      {openForm && (
        <Register setOpenForm={setOpenForm} setIsOpen={setIsOpen} />
      )}
      <Navbar setIsOpen={setIsOpen} setOpenForm={setOpenForm} />
      <Routes>
        <Route path='/' element={<Home setIsOpen={setIsOpen} />} />
        <Route path='/apis' exact='true' element={<Apis setIsOpen={setIsOpen} />} />
        <Route path='/apis/:id' exact='true' element={<ApiDetails setIsOpen={setOpenForm} />} />
        <Route path='/faqs' exact='true' element={<Faqs />} />
        <Route path='/blog' exact='true' element={<Blog setIsOpen={setIsOpen} />} />
        <Route path='/blog/:id' exact='true' element={<BlogDetails setIsOpen={setIsOpen} />} />
      </Routes>
      <Footer />
    </>
  );

}

export default PublicRoute;
