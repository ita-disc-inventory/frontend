import React, { useState } from 'react';

import styled from 'styled-components';

import { CustomInput } from './form/CustomInput';
import FormPopup from './templates/FormPopup';

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

const RelativeContainer = styled.div`
  position: relative;
`;

const AbsoluteH6 = styled.h6`
  position: absolute;
  top: 100%;
  left: 0;
  color: blue;
  font-size: 14px;
`;

export default function NewOrderForm() {
  const [budget, setBudget] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [link, setLink] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [PPU, setPPU] = useState('');
  const [reasonForBuying, setReasonForBuying] = useState('');

  const handleBudgetChange = (e) => setBudget(e.target.value);
  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);
  const handlePriorityLevelChange = (e) => setPriorityLevel(e.target.value);
  const handlePPUChange = (e) => setPPU(e.target.value);
  const handleReasonForBuyingChange = (e) => setReasonForBuying(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FormPopup
      title='New Order Form'
      description='Please fill out all fields of the form below for your requested
                item and read the Order Guidelines.'
      onSubmit={handleSubmit}
      maxWidth='50%'
      defaultSubmit={true}
    >
      <FormContainer>
        <Column>
          <RelativeContainer>
            {/* Program Budget Field - Dropdown */}
            <CustomInput.Text
              title='Select Program'
              value={budget}
              onChange={handleBudgetChange}
              placeholder='REPLACE WITH DROPDOWN'
              required
            />
            <AbsoluteH6>Selected program budget: 4 BILLION</AbsoluteH6>
          </RelativeContainer>
          {/* Item Name Field - Text Input */}
          <CustomInput.Text
            title='Item Name'
            value={itemName}
            onChange={handleItemNameChange}
            placeholder='Markers'
            required
          />
          {/* Link Field - Text Input */}
          <CustomInput.Text
            title='Link to Purchase Item'
            value={link}
            onChange={handleLinkChange}
            placeholder='https://ExampleSite.com'
            required
          />
          {/* PPU Field - Text Input */}
          <CustomInput.Text
            title='Price Per Unit'
            value={PPU}
            onChange={handlePPUChange}
            placeholder='x.xx'
            required
          />
        </Column>
        <Column>
          {/* Quantity Field - Text Input */}
          <CustomInput.Text
            title='Quantity'
            value={quantity}
            onChange={handleQuantityChange}
            placeholder='Enter Quantity'
            required
          />
          {/* Priority Level Field - Dropdown */}
          <CustomInput.Text
            title='Priority Level'
            value={priorityLevel}
            onChange={handlePriorityLevelChange}
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
