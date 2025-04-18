import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useUser } from 'common/contexts/UserContext';

export function PrivateRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to='/login' replace />;
}

export function AdminRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user exists and has admin role
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // Redirect non-admin users to their appropriate page
  if (user.position_title !== 'admin') {
    if (user.position_title === 'therapist') {
      return <Navigate to='/therapist' replace />;
    }
    // For any other role, redirect to home or another appropriate page
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export function TherapistRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user exists and has therapist role
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // Redirect non-therapist users to their appropriate page
  if (user.position_title !== 'therapist') {
    if (user.position_title === 'admin') {
      return <Navigate to='/admin' replace />;
    }
    // For any other role, redirect to home or another appropriate page
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return !user ? <Outlet /> : <Navigate to='/' replace />;
}
