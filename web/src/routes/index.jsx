import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { useEffect } from 'react';

import { AdminRoutes } from './admin.routes';
import { CustomerRoutes } from './customer.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';
import { USER_ROLE } from '../utils/role';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get("/users/validated", { withCredentials: true })
      .catch(error => signOut())
  }, [])

  function AccessRoutes() {
    switch(user.role) {
      case USER_ROLE.ADMIN:
        return <AdminRoutes />;
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />
      case USER_ROLE.SALE:
        return <SaleRoutes />
      default:
        return <CustomerRoutes />
    }
  }

  return (
    <BrowserRouter>
      {user ? <AccessRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}