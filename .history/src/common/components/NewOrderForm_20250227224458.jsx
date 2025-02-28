import React, { useState } from 'react';

import FormPopup from './FormPopup';
import { Input } from './form/Input';

export default function NewOrderForm() {
  const [orderName, setOrderName] = useState('');
  const [orderDescription, setOrderDescription] = useState('');

  const handleOrderNameChange = (e) => setOrderName(e.target.value);
  const handleOrderDescriptionChange = (e) =>
    setOrderDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle new order logic here
    console.log('New order created:', { orderName, orderDescription });
  };

  return (
    <FormPopup
      title='New Order'
      description='Enter the details for the new order'
      onSubmit={handleSubmit}
    >
      <Input.Text
        title='Order Name'
        value={orderName}
        onChange={handleOrderNameChange}
        placeholder='Enter order name'
        required
      />
      <Input.Text
        title='Order Description'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='Enter order description'
        required
      />
    </FormPopup>
  );
}
