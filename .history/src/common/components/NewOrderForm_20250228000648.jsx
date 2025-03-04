import React, { useState } from 'react';

import styled from 'styled-components';

import FormPopup from './FormPopup';
import { CustomInput } from './form/CustomInput';

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1 1 45%;

  @media (max-width: 1400px) {
    flex: 1 1 100%;
  }
`;

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
  }
`;

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

  return (
    <FormPopup
      title='New Order Form'
      description='Please fill out all fields of the form below for your requested
                item and read the Order Guidelines.'
      onSubmit={handleSubmit}
      maxWidth='50%'
    >
      <FormContainer>
        <Column>
          {/* Program Budget Field - Dropdown */}
          <CustomInput.Text
            title='Select Program Budget '
            value={orderName}
            onChange={handleBudgetChange}
            placeholder='REPLACE WITH DROPDOWN'
            required
          />
          <h6 style={{ color: 'blue', fontSize: '14px', marginTop: '-15px' }}>
            Selected program budget: 4 BILLION
          </h6>
          {/* Link Field - Text Input */}
          <CustomInput.Text
            title='Link to Purchase Item'
            value={orderDescription}
            onChange={handleOrderDescriptionChange}
            placeholder='https://ExampleSite.com'
            required
          />
          {/* PPU Field - Text Input */}
          <CustomInput.Text
            title='Price Per Unit'
            value={orderDescription}
            onChange={handleOrderDescriptionChange}
            placeholder='x.xx'
            required
          />
        </Column>
        <Column>
          {/* Quantity Field - Text Input */}
          <CustomInput.Text
            title='Quantity'
            value={orderDescription}
            onChange={handleOrderDescriptionChange}
            placeholder='Enter Quantity'
            required
          />
          {/* Priority Level Field - Dropdown */}
          <CustomInput.Text
            title='Priority Level'
            value={orderDescription}
            onChange={handleOrderDescriptionChange}
            placeholder='REPLACE WITH PRIORITY LEVEL DROPDOWN'
            required
          />
          {/* Reason for Buying Field - Textarea */}
          <TextAreaContainer>
            <label
              htmlFor='reasonForBuying'
              style={{
                display: 'block',
                fontSize: '15px',
                color: 'black',
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
                width: '100%',
                borderRadius: '4px',
                padding: '10px',
                fontSize: '15px',
                lineHeight: '1.5',
                color: 'black',
                border: 'solid 2px var(--text)',
                height: '100px',
                resize: 'none',
              }}
            />
          </TextAreaContainer>
        </Column>
      </FormContainer>
    </FormPopup>
  );
}
