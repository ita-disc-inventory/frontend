import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  PrivateRoute,
  PublicOnlyRoute,
  AdminRoute,
  TherapistRoute,
} from 'common/components/routes/ProtectedRoutes';
import { UserProvider } from 'common/contexts/UserContext';
import NavLayout from 'common/layouts/NavLayout';
import AuthCallback from 'pages/account/AuthCallback';
import Login from 'pages/account/Login';
import RequestPasswordReset from 'pages/account/RequestPasswordReset';
import ResetPassword from 'pages/account/ResetPassword';
import SignUp from 'pages/account/SignUp';
import AdminHome from 'pages/admin/AdminHome/AdminHome';
import SettingsPage from 'pages/settings/SettingsPage';
import NotFound from 'pages/not-found/NotFound';
import TherapistHome from 'pages/therapist/TherapistHome';
// import TherapistSettings from 'pages/therapist/TherapistSettings';
import RoleBasedRedirect from 'common/components/routes/RoleBasedRedirect';
import PeopleManagement from 'pages/admin/PeopleManagement/PeopleManagement';

import './App.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavLayout />}>
            <Route element={<PrivateRoute />}>
              <Route index element={<RoleBasedRedirect />} />
              <Route path='/settings' element={<SettingsPage />} />
              {/* Role-protected routes */}
              <Route element={<AdminRoute />}>
                <Route path='admin' element={<AdminHome />} />
                <Route path='manageusers' element={<PeopleManagement />} />
              </Route>
              <Route element={<TherapistRoute />}>
                <Route path='therapist' element={<TherapistHome />} />
              </Route>
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
