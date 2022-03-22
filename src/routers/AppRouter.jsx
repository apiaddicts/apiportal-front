import React from 'react'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";

import { Home } from '../Pages/Home';
import { Pagina1 } from '../Pages/Pagina1';
import { Pagina2 } from '../Pages/Pagina2';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Pagina1 />} />
        <Route path="/users" element={<Pagina2 />} />
      </Routes>
    </BrowserRouter>
  )
}
