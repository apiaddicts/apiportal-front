import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import useTimer from '../hooks/useTimer';
import useVerifySession from '../hooks/useVerifySession';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Home from '../pages/public/Home';
import Apis from '../pages/public/Apis';
import ApiDetail from '../pages/public/ApiDetail';
import Faqs from '../pages/public/Faqs';
import Blog from '../pages/public/Blog';
import BlogPost from '../pages/public/BlogPost';

import Logout from '../pages/private/Logout/Logout';

function PublicRoute() {
  const { openModal } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.timer);
  const { checkSession } = useVerifySession();
  const { getTime } = useTimer();
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => { getTime(); }, []);
  useEffect(() => { checkSession(); }, [time]);

  return (
    <>
      {isOpen && (
        <Login setIsOpen={setIsOpen} setOpenForm={setOpenForm} />
      )}
      {openForm && (
        <Register setOpenForm={setOpenForm} setIsOpen={setIsOpen} />
      )}
      { openModal && (
        <Logout showModal={openModal} setShowModal={openModal} />
      )}
      <Navbar setIsOpen={setIsOpen} setOpenForm={setOpenForm} />
      <Routes>
        <Route path='/' element={<Home setIsOpen={setIsOpen} />} />
        <Route path='/apis' exact='true' element={<Apis setIsOpen={setIsOpen} />} />
        <Route path='/apis/:id' exact='true' element={<ApiDetail setIsOpen={setOpenForm} />} />
        <Route path='/faqs' exact='true' element={<Faqs />} />
        <Route path='/blog' exact='true' element={<Blog setIsOpen={setIsOpen} />} />
        <Route path='/blog/:id' exact='true' element={<BlogPost setIsOpen={setIsOpen} />} />
      </Routes>
      <Footer />
    </>
  );

}

export default PublicRoute;
