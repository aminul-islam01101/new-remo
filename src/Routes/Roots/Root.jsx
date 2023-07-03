/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardNavbar from '../../Pages/CommonPages/DashboardNavbar';

import Footer from '../../Pages/CommonPages/Footer';
import Navbar from '../../Pages/CommonPages/Navbar';

const Root = () => {
  const location = useLocation();
  const dashboard = location.pathname;
  const remoforceDashboard = location.pathname;
  const checkDashboard = dashboard.includes('dashboard');
  const checkRemoForceDashboard = remoforceDashboard.includes('remoforce-dashboard');

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        {checkRemoForceDashboard || checkDashboard ? (
          checkRemoForceDashboard ? (
            <DashboardNavbar />
          ) : (
            ''
          )
        ) : (
          <Navbar />
        )}

        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
