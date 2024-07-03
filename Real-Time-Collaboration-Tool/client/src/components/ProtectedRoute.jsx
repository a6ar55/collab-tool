import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import NavDash from './NavDash';
import Footer from './Footer';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const currentUser = useSelector(state => state.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavDash />
      <div className='max-w-7xl mx-auto pt-20 px-6'>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default ProtectedRoute;
