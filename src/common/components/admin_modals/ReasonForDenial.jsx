import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormPopup from 'common/components/templates/FormPopup';

const TextAreaContainer = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    font-size: 15px;
    color: black;
  }
  textarea {
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    font-size: 15px;
    line-height: 1.5;
    color: black;
    border: solid 2px var(--text);
    height: 100px;
    resize: none;
    background-color: white;
  }
`;

export default function ReasonForDenial({
  textAreaPlaceholder = 'This order is being denied because...',
}) {
  const [reasonForDenial, setReasonForDenial] = useState('');

  const handleReasonForDenialChange = (e) => setReasonForDenial(e.target.value);
  return (
    <FormPopup
      title='Reason for Denial'
      description='Please enter the reason for denial'
      buttonText='Open Denial Reasoning'
    >
      <TextAreaContainer>
        <textarea
          id='reasonForDenial'
          value={reasonForDenial}
          onChange={handleReasonForDenialChange}
          placeholder={textAreaPlaceholder}
          required
        />
      </TextAreaContainer>
    </FormPopup>
  );
}

ReasonForDenial.propTypes = {
  textAreaPlaceholder: PropTypes.string,
};

ReasonForDenial.defaultProps = {
  textAreaPlaceholder: 'This order is being denied because...',
};
