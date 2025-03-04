import React, { useState } from 'react';

import FormPopup from './FormPopup';
import { Input } from './form/Input';

export default function NewOrderForm() {
  const [orderName, setOrderName] = useState('');
  const [orderDescription, setOrderDescription] = useState('');

  const handleBudgetChange = (e) => setOrderName(e.target.value);
  const handleOrderDescriptionChange = (e) =>
    setOrderDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle new order logic here
    console.log('New order created:', { orderName, orderDescription });
  };

  // const guidelinesLink = <Link />;

  return (
    <FormPopup
      title='New Order Form'
      description='Please fill out all fields of the form below for your requested
                item and read the Order Guidelines.'
      onSubmit={handleSubmit}
    >
      {/* Program Budget Field - Dropdown */}
      <Input.Text
        title='Select Program Budget '
        value={orderName}
        onChange={handleBudgetChange}
        placeholder='REPLACE WITH DROPDOWN'
        required
      />
      <h6 style={{ color: 'blue', fontSize: '14px', marginBottom: '5px' }}>
        Selected program budget: 4
      </h6>
      {/* Link Field - Text Input */}
      <Input.Text
        title='Link to Purchase Item'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='https://ExampleSite.com'
        required
      />
      {/* PPU Field - Text Input */}
      <Input.Text
        title='Price Per Unit'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='Enter order description'
        required
      />
      {/* Quantity Field - Text Input */}
      <Input.Text
        title='Link to Purchase Item'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='Enter order description'
        required
      />
      {/* Priority Level Field - Dropdown */}
      <Input.Text
        title='Link to Purchase Item'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='Enter order description'
        required
      />
      {/* Reason for Buying Field - Text Field */}
      <Input.Text
        title='Link to Purchase Item'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='Enter order description'
        required
      />
    </FormPopup>
  );
}
