import React from 'react';

import YNPopup from 'common/components/templates/YNPopup';

export default function ItemReadyConfirm() {
  return (
    <YNPopup
      title='Item Ready Confirmation'
      description='Item ready for pick up?'
      buttonText='Item Ready Confirmation'
    />
  );
}
