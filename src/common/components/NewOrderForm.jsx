import React, { useState } from 'react';

import styled from 'styled-components';

import { CustomInput } from './form/CustomInput';
import FormPopup from './templates/FormPopup';
import BudgetDropdown from './BudgetDropdown';
import PriorityDropdown from './PriorityDropdown';
import {
  getProgramNameById,
  getProgramIdByName,
} from 'common/utils/ProgramMapping';
import { useUser } from 'common/contexts/UserContext';
import { useOrders } from 'common/contexts/OrderContext';

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1400px) {
    flex-direction: column;
    gap: 0px;
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

export default function NewOrderForm() {
  const [program, setProgram] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [link, setLink] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [PPU, setPPU] = useState('');
  const [reasonForBuying, setReasonForBuying] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const { user } = useUser();
  const { refreshOrders } = useOrders();

  const handleProgramChange = (selectedProgram) => {
    if (selectedProgram) {
      const programName = getProgramNameById(selectedProgram);
      setProgram(programName);
      // Clear any previous error for program
      setFormErrors((prev) => ({ ...prev, program: '' }));
    }
  };

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
    if (e.target.value) {
      setFormErrors((prev) => ({ ...prev, itemName: '' }));
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.value) {
      setFormErrors((prev) => ({ ...prev, quantity: '' }));
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    if (e.target.value) {
      setFormErrors((prev) => ({ ...prev, link: '' }));
    }
  };

  const handlePriorityLevelChange = (e) => {
    setPriorityLevel(e.target.value);
    if (e.target.value) {
      setFormErrors((prev) => ({ ...prev, priorityLevel: '' }));
    }
  };

  const handlePPUChange = (e) => {
    setPPU(e.target.value);
    if (e.target.value) {
      setFormErrors((prev) => ({ ...prev, PPU: '' }));
    }
  };

  const handleReasonForBuyingChange = (e) => {
    setReasonForBuying(e.target.value);
    if (e.target.value) {
      setFormErrors((prev) => ({ ...prev, reasonForBuying: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check all required fields
    if (!program) {
      errors.program = 'Please select a program';
    }

    if (!itemName.trim()) {
      errors.itemName = 'Item name is required';
    }

    if (!quantity.trim()) {
      errors.quantity = 'Quantity is required';
    }

    if (!link.trim()) {
      errors.link = 'Link is required';
    }

    if (!priorityLevel.trim()) {
      errors.priorityLevel = 'Priority level is required';
    }

    if (!PPU.trim()) {
      errors.PPU = 'Price per unit is required';
    }

    if (!reasonForBuying.trim()) {
      errors.reasonForBuying = 'Reason for buying is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      console.log('Form validation failed', formErrors);
      return false; // Prevent form submission
    }

    const reqDate = new Date().toISOString().split('T')[0].replace(/-/g, '-');
    const total = Math.round(quantity * PPU * 100) / 100;
    const progId = getProgramIdByName(program);
    const userId = user.id;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/therapist/order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_link: link,
          price_per_unit: PPU,
          item_name: itemName,
          request_date: reqDate,
          priority_level: priorityLevel,
          quantity: quantity,
          total_cost: total,
          program_id: progId,
          requestor_id: userId,
          order_description: reasonForBuying,
        }),
      }
    );

    if (!response.ok) {
      console.error('Error with form submission.');
      return false;
    }

    // Refresh the orders table
    refreshOrders();

    // Close the dialog by finding and clicking the close button
    document.querySelector('button[aria-label="Close"]')?.click();

    return true; // Allow form submission
  };

  return (
    <FormPopup
      title='New Order Form'
      description='Please fill out all fields of the form below for your requested
                item and read the Order Guidelines.'
      onSubmit={handleSubmit}
      maxWidth='50%'
      defaultSubmit={true}
      buttonText='Place New Order'
    >
      <FormContainer>
        <Column>
          {/* Program Budget Field - Required Dropdown */}
          <BudgetDropdown
            value={program}
            onProgramChange={handleProgramChange}
            required={true}
          />
          {formErrors.program && (
            <ErrorMessage>{formErrors.program}</ErrorMessage>
          )}

          {/* Item Name Field - Text Input */}
          <CustomInput.Text
            title='Item Name'
            value={itemName}
            onChange={handleItemNameChange}
            placeholder='Markers'
            required
          />
          {formErrors.itemName && (
            <ErrorMessage>{formErrors.itemName}</ErrorMessage>
          )}

          {/* Link Field - Text Input */}
          <CustomInput.Text
            title='Link to Purchase Item'
            value={link}
            onChange={handleLinkChange}
            placeholder='https://ExampleSite.com'
            required
          />
          {formErrors.link && <ErrorMessage>{formErrors.link}</ErrorMessage>}

          {/* PPU Field - Text Input */}
          <CustomInput.Text
            title='Price Per Unit'
            value={PPU}
            onChange={handlePPUChange}
            placeholder='x.xx'
            required
          />
          {formErrors.PPU && <ErrorMessage>{formErrors.PPU}</ErrorMessage>}
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
          {formErrors.quantity && (
            <ErrorMessage>{formErrors.quantity}</ErrorMessage>
          )}

          {/* Priority Level Field - Dropdown */}
          <PriorityDropdown
            value={priorityLevel}
            onPriorityChange={handlePriorityLevelChange}
            required={true}
          />
          {formErrors.priorityLevel && (
            <ErrorMessage>{formErrors.priorityLevel}</ErrorMessage>
          )}

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
            {formErrors.reasonForBuying && (
              <ErrorMessage>{formErrors.reasonForBuying}</ErrorMessage>
            )}
          </TextAreaContainer>
        </Column>
      </FormContainer>
    </FormPopup>
  );
}
