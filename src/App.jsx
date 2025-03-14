import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  PrivateRoute,
  PublicOnlyRoute,
} from 'common/components/routes/ProtectedRoutes';
import { UserProvider } from 'common/contexts/UserContext';
import NavLayout from 'common/layouts/NavLayout';
import AuthCallback from 'pages/account/AuthCallback';
import Login from 'pages/account/Login';
import RequestPasswordReset from 'pages/account/RequestPasswordReset';
import ResetPassword from 'pages/account/ResetPassword';
import SignUp from 'pages/account/SignUp';
import AdminHome from 'pages/admin/AdminHome';
import AdminSettings from 'pages/admin/AdminSettings';
import Home from 'pages/home/Home';
import NotFound from 'pages/not-found/NotFound';
import TherapistHome from 'pages/therapist/TherapistHome';
// import TherapistSettings from 'pages/therapist/TherapistSettings';

import './App.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavLayout />}>
            <Route element={<PrivateRoute />}>
              <Route index element={<Home />} />
              <Route path='admin' element={<AdminHome />} />
              <Route path='admin/settings' element={<AdminSettings />} />
              <Route path='therapist' element={<TherapistHome />} />
              <Route path='therapist/settings' element={<AdminSettings />} />
            </Route>
            <Route element={<PublicOnlyRoute />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
            </Route>
            <Route path='forgot-password' element={<RequestPasswordReset />} />
            <Route path='auth/callback' element={<AuthCallback />} />
            <Route path='auth/reset-password' element={<ResetPassword />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
