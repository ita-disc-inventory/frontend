import PropTypes from 'prop-types';
import React, { useState } from 'react';

import FormPopup from 'common/components/templates/FormPopup/FormPopup';
import { TextAreaContainer } from './ReasonForDenialStyles';

export default function ReasonForDenial({
  open,
  onSubmit,
  onCancel,
  textAreaPlaceholder = 'This order is being denied because...',
}) {
  const [reasonForDenial, setReasonForDenial] = useState('');
  const handleReasonForDenialChange = (e) => setReasonForDenial(e.target.value);

  return (
    <FormPopup
      open={open}
      title='Reason for Denial'
      description='Please enter the reason for denial'
      buttonText='Submit Reason'
      onSubmit={() => {
        if (onSubmit) onSubmit(reasonForDenial);
      }}
      cancelOnClick={() => {
        if (onCancel) onCancel();
      }}
    >
      <TextAreaContainer>
        <textarea
          id='reasonForDenial'
          value={reasonForDenial}
          onChange={handleReasonForDenialChange}
          placeholder={textAreaPlaceholder}
        />
      </TextAreaContainer>
    </FormPopup>
  );
}

ReasonForDenial.propTypes = {
  textAreaPlaceholder: PropTypes.string,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

ReasonForDenial.defaultProps = {
  textAreaPlaceholder: 'This order is being denied because...',
  open: false,
  onCancel: () => {},
};
