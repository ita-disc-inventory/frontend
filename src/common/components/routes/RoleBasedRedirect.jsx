import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from 'common/contexts/UserContext';

const RoleBasedRedirect = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      // Handle /manageusers route specifically
      if (location.pathname === '/manageusers') {
        if (user.position_title !== 'admin' || user.specialization !== 'super_admin') {
          // Redirect non-super admins to their respective dashboards
          if (user.position_title === 'admin') {
            navigate('/admin', { replace: true });
          } else if (user.position_title === 'therapist') {
            navigate('/therapist', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }
        return;
      }

      // Handle other routes as before
      if (user.position_title === 'admin') {
        navigate('/admin', { replace: true });
      } else if (user.position_title === 'therapist') {
        navigate('/therapist', { replace: true });
      } else {
        // Optional: Handle unexpected roles or redirect to a default/error page
        console.warn('Unknown user role:', user.position_title);
        // navigate('/some-default-page', { replace: true });
      }
    }
  }, [user, loading, navigate, location]);

  // Render nothing or a loading indicator while checking the role
  return null; // Or <Spinner /> if you have one
};

export default RoleBasedRedirect;
