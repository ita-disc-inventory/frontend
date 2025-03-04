import React, { useState } from 'react';

import FormPopup from './FormPopup';
import { Input } from './form/Input';

export default function NewOrderForm() {
  const [orderName, setOrderName] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [reasonForBuying, setReasonForBuying] = useState('');

  const handleBudgetChange = (e) => setOrderName(e.target.value);
  const handleOrderDescriptionChange = (e) =>
    setOrderDescription(e.target.value);
  const handleReasonForBuyingChange = (e) => setReasonForBuying(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle new order logic here
    console.log('New order created:', {
      orderName,
      orderDescription,
      reasonForBuying,
    });
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
        placeholder='x.xx'
        required
      />
      {/* Quantity Field - Text Input */}
      <Input.Text
        title='Quantity'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='Enter Quantity'
        required
      />
      {/* Priority Level Field - Dropdown */}
      <Input.Text
        title='Priority Level'
        value={orderDescription}
        onChange={handleOrderDescriptionChange}
        placeholder='REPLACE WITH PRIORITY LEVEL DROPDOWN'
        required
      />
      {/* Reason for Buying Field - Textarea */}
      <div style={{ marginBottom: '15px' }}>
        <label
          htmlFor='reasonForBuying'
          style={{
            display: 'block',
            fontSize: '15px',
            color: 'var(--violet-11)',
          }}
        >
          Reason for buying (150 characters max)
          <span style={{ color: 'red' }}>*</span>
        </label>
        <textarea
          id='reasonForBuying'
          value={reasonForBuying}
          onChange={handleReasonForBuyingChange}
          placeholder='Enter reason for buying'
          required
          style={{
            width: '375px',
            borderRadius: '4px',
            padding: '10px',
            fontSize: '15px',
            lineHeight: '1.5',
            color: 'var(--violet-11)',
            boxShadow: '0 0 0 1px var(--violet-7)',
            height: '100px',
            resize: 'vertical',
          }}
        />
      </div>
    </FormPopup>
  );
}
