import { Dialog } from 'radix-ui';
import React, { useState } from 'react';

import FormPopup from 'common/components/templates/FormPopup/FormPopup';
import { StyledButton } from './OrderTrackingNumberStyles';

export default function OrderTrackingNumber() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackingNumberChange = (e) => {
    let value = e.target.value;

    if (/^[a-zA-Z0-9]*$/.test(value) || value === '') {
      setTrackingNumber(value);
    }
  };

  return (
    <FormPopup
      title='Order Tracking Number'
      buttonText='Order Tracking Number'
      customForm={true}
    >
      <label
        style={{
          display: 'block',
          fontSize: '15px',
          color: 'black',
          marginBottom: '10px',
        }}
      >
        Please enter your tracking number:
        <span style={{ color: 'red' }}>*</span>
      </label>
      <input
        type='text'
        value={trackingNumber}
        onChange={handleTrackingNumberChange}
        placeholder='xxx-xxx-xxx'
        style={{
          width: '100%',
          borderRadius: '4px',
          padding: '10px',
          fontSize: '15px',
          lineHeight: '1.5',
          color: 'black',
          border: 'solid 2px var(--text)',
          height: '40px',
          marginBottom: '20px',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Dialog.Close asChild>
          <StyledButton type='submit'>Submit</StyledButton>
        </Dialog.Close>
      </div>
    </FormPopup>
  );
}
