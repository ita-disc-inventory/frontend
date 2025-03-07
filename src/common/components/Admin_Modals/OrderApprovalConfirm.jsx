import YNPopup from "common/components/YNPopup";
import React from "react";

export default function OrderApprovalConfirm() {
  return (
    <YNPopup
      title="Order Approval Confirmation"
      description="Approve or Deny Order?"
      buttonText="Order Approval Confirmation"
      yesText="Approve"
      noText="Deny"
    />
  );
}
