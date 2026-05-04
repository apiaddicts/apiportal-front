import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import useTimer from '../hooks/useTimer';
import useVerifySession from '../hooks/useVerifySession';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Home from '../pages/public/Home';
import AppPartners from '../pages/public/AppPartners';
import Apis from '../pages/public/Apis';
import ApiDetail from '../pages/public/ApiDetail';
import Faqs from '../pages/public/Faqs';
import Blog from '../pages/public/Blog';
import BlogPost from '../pages/public/BlogPost';
import SwaggerUI from '../pages/common/SwaggerUI';
import AsyncApiUI from '../pages/common/AsyncApiUI';
import Catalog from '../pages/public/Catalogs';
import CatalogDetail from '../pages/public/CatalogDetail';

import Logout from '../pages/private/Logout/Logout';
import Wiki from '../pages/public/Wiki';
import Contacto from '../pages/public/Contacto';
import Subscriptions from '../pages/public/Subscriptions';
import SubscriptionDetail from '../pages/public/SubscriptionDetail';
import SubscriptionDetailContact from '../pages/public/SubscriptionDetailContact';
import ResetPassword from '../pages/public/ResetPassword';
import EmailConfirmed from '../pages/public/EmailConfirmed';
import CheckoutSuccess from '../pages/public/Checkout/CheckoutSuccess';
import CheckoutCancel from '../pages/public/Checkout/CheckoutCancel';
import PurchasesList from '../pages/public/Purchases/PurchasesList';
import PurchaseDetail from '../pages/public/Purchases/PurchaseDetail';

function PublicRoute() {
  const location = useLocation();
  const hideLayoutPaths = ['/auth/reset-password', '/auth/email-confirmed'];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  const { openModal } = useSelector((state) => state.user);
  const { time } = useSelector((state) => state.timer);
  const { checkSession,isSessionValid } = useVerifySession();
  const { getTime } = useTimer();
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => { getTime(); }, []);
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      isSessionValid();
    }
  }, [time, user]);

  return (
    <>
      {isOpen && (
        <Login setIsOpen={setIsOpen} setOpenForm={setOpenForm} />
      )}
      {openForm && (
        <Register setOpenForm={setOpenForm} setIsOpen={setIsOpen} />
      )}
      {openModal && Object.keys(user).length > 0 && (
        <Logout showModal={openModal} />
      )}
      {!hideLayout && <Navbar setIsOpen={setIsOpen} setOpenForm={setOpenForm} />}

      <main style={{ marginTop: hideLayout ? '0' : window.innerWidth < 768 ? '120px' : '96px', minHeight: hideLayout ? '100vh' : window.innerWidth < 768 ? 'calc(100vh - 120px)' : 'calc(100vh - 96px)' }}>
        <Routes>
          <Route path='/' element={<Home setIsOpen={setIsOpen} setOpenForm={setOpenForm} />} />
          <Route path='/apis' element={<Apis setIsOpen={setIsOpen} />} />
          <Route path='/apis/:id' element={<ApiDetail setIsOpen={setOpenForm} />} />
          <Route path='/catalogs' element={<Catalog />} />
          <Route path='/catalogs/:id' element={<CatalogDetail setIsOpen={setOpenForm} />} />
          <Route path='/catalogs/:id/assets' element={<CatalogDetail initialSection={'assets'} />} />
          <Route path='/catalogs/:id/policies' element={<CatalogDetail initialSection={'policies'} />} />
          <Route path='/catalogs/:id/contracts' element={<CatalogDetail initialSection={'contracts'} />} />
          <Route path='/catalogs/:id/dataresources' element={<CatalogDetail initialSection={'dataresources'} />} />
          <Route path='/catalogs/:id/participants' element={<CatalogDetail initialSection={'participants'} />} />
          <Route path='/catalogs/:id/softwareresource' element={<CatalogDetail initialSection={'softwareresource'} />} />
          <Route path='/catalogs/:id/infrastructureresource' element={<CatalogDetail initialSection={'infrastructureresource'} />} />
          <Route path='/catalogs/:id/contractdefinition' element={<CatalogDetail initialSection={'contractdefinition'} />} />
          <Route path='/app-partners' element={<AppPartners />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/apis/:id/swagger-ui' element={<SwaggerUI setIsOpen={setOpenForm} />} />
          <Route path='/apis/:id/asyncapi-ui' element={<AsyncApiUI setIsOpen={setOpenForm} />} />
          <Route path='/blog' element={<Blog setIsOpen={setIsOpen} />} />
          <Route path='/blog/:id' element={<BlogPost setIsOpen={setIsOpen} />} />
          <Route path='/documentacion' element={<Wiki />} />
          <Route path='/auth/reset-password' element={<ResetPassword />} />
          <Route path='/auth/email-confirmed' element={<EmailConfirmed />} />
          <Route path='/soporte' element={<Contacto />} />
          <Route path='/suscripciones' element={<Subscriptions setOpenForm={setOpenForm} />} />
          <Route path='/suscripciones/:id' element={<SubscriptionDetail />} />
          <Route path='/suscripciones/:id/contact' element={<SubscriptionDetailContact />} />
          <Route path='/checkout/:purchaseId/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/:purchaseId/cancel' element={<CheckoutCancel />} />
          <Route path='/purchases' element={<PurchasesList />} />
          <Route path='/purchases/:id' element={<PurchaseDetail />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );

}

export default PublicRoute;
