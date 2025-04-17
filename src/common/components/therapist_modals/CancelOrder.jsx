import React from 'react';
import YNPopup from 'common/components/templates/YNPopup';

export default function CancelOrder({ open, onConfirm, onCancel }) {
  return (
    <YNPopup
      open={open}
      title='Cancel Order Confirmation'
      description='Are you sure you want to cancel this order?'
      yesText='Yes, Cancel Order'
      noText='No, Keep Order'
      yesOnClick={onConfirm}
      noOnClick={onCancel}
      yesColor='red'
      noColor='blue'
    />
  );
}
