import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

const routes = [
  {
    path: '/',
    title: 'Landing',
    component: <Landing/>,
    isPublic: true,
  },
  {
    path: '/login',
    title: 'Login',
    component: <Login/>,
    isPublic: true,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: <Dashboard/>,
    isPublic: false,
  },
  {
    path: '*',
    title: 'Not Found',
    component: <NotFound />,
    isPublic: true,
  },
]

export default routes;