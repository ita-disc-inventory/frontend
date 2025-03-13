import React from 'react';

import YNPopup from 'common/components/templates/YNPopup';

export default function ItemArrivedConfirm() {
  return (
    <YNPopup
      title='Item Arrived Confirmation'
      description='Item Arrived?'
      buttonText='Item Arrived Confirmation'
    />
  );
}
