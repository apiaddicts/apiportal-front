import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

function CheckoutSuccessRedirect() {
  const { purchaseId } = useParams();
  return <Navigate to={`/developer/purchases/${purchaseId}`} replace />;
}

export default CheckoutSuccessRedirect;
