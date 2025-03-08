import React from 'react';

import FormPopup from 'common/components/templates/FormPopup';

export default function ReasonForDenial() {
  return (
    <FormPopup
      title='Reason for Denial'
      textAreaLabel='Please enter the reason for denial:'
      textAreaPlaceholder='This order is being denied because'
    />
  );
}
