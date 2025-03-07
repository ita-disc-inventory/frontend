import YNPopup from "common/components/YNPopup";
import React from "react";

export default function LogoutConfirm() {
  return (
    <YNPopup
      title="Logout Confirmation"
      description="Are you sure you want to logout?"
      buttonText="Logout Confirmation"
      yesText="Logout"
    />
  );
}
