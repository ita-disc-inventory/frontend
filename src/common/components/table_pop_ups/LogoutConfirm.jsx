import React from 'react';

import YNPopup from 'common/components/templates/YNPopup/YNPopup';

export default function LogoutConfirm() {
  return (
    <YNPopup
      title='Logout Confirmation'
      description='Are you sure you want to logout?'
      buttonText='Logout Confirmation'
      yesText='Logout'
    />
  );
}
