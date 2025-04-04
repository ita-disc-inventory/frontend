import React from 'react';
import YNPopup from 'common/components/templates/YNPopup';

export default function CancelOrder() {
  return (
    <YNPopup
      title='Cancel Order Confirmation'
      description='Are you sure you want to cancel this order?'
      buttonText='Cancel Order'
    />
  );
}
