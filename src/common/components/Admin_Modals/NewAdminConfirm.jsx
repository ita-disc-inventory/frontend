import YNPopup from "common/components/YNPopup";
import React from "react";

export default function NewAdminConfirm() {
  return (
    <YNPopup
      title="New Admin Confirmation"
      description="Are you sure you want to make [Admin User] a new Admin?"
      buttonText="New Admin Confirmation"
      yesText="Confirm"
    />
  );
}
