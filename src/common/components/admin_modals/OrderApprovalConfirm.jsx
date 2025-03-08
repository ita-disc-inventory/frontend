import React from 'react';

import YNPopup from 'common/components/templates/YNPopup';

export default function OrderApprovalConfirm() {
  return (
    <YNPopup
      title='Order Approval Confirmation'
      description='Approve or Deny Order?'
      buttonText='Order Approval Confirmation'
      yesText='Approve'
      noText='Deny'
    />
  );
}
