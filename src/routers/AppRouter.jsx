import React from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

import Home from '../pages/Home';
import { Pagina1 } from '../pages/Pagina1';
import { Pagina2 } from '../pages/Pagina2';

function AppRouter() {
  const routes = [
    {to:'/', name: "Home"},
    {to:'/about', name: "APIs"},
    {to:'#', name: "DOCUMENTACIÓN"},
    {to:'#', name: "BLOG"},
    {to:'#', name: "CONTACTO"},
  ]
  return (
    <BrowserRouter>
      <Navbar ></Navbar>
      {/* <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Pagina1 />} />
        <Route path='/users' element={<Pagina2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
