import React, { useState } from 'react';

import { CustomInput } from 'common/components/form/CustomInput';
import FormPopup from 'common/components/templates/FormPopup/FormPopup';
import { useOrders } from 'common/contexts/OrderContext';
import { useUser } from 'common/contexts/UserContext';
import {
  getProgramIdByName,
  getProgramNameById,
} from 'common/utils/ProgramMapping';
import BudgetDropdown from './BudgetDropdown';
import {
  Column,
  ErrorMessage,
  FormContainer,
  TextAreaContainer,
} from './NewOrderFormStyles';
import PriorityDropdown from './PriorityDropdown';

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

  const resetForm = () => {
    setProgram('');
    setItemName('');
    setQuantity('');
    setLink('');
    setPriorityLevel('');
    setPPU('');
    setReasonForBuying('');
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed', formErrors);
      return false;
    }

    const reqDate = new Date().toISOString().split('T')[0].replace(/-/g, '-');
    const total = Math.round(quantity * PPU * 100) / 100;
    const progId = getProgramIdByName(program);
    const userId = user.id;

    const budgetResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/budget`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        credentials: 'include',
      }
    );
    if (!budgetResponse.ok) {
      throw new Error(
        `Could not get budgets! Status: ${budgetResponse.status}`
      );
    }
    const programs = await budgetResponse.json();
    const selectedProgram = programs.find((p) => p.program_id === progId);
    if (selectedProgram.program_budget < total) {
      console.log('Cannot submit order! Insufficient budget.');
      setFormErrors((prev) => ({
        ...prev,
        budget: `Insufficient budget. The order total ($${total}) exceeds the available budget for ${program} ($${selectedProgram.program_budget}).`,
      }));
      return false;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/therapist/order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        credentials: 'include',
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

    refreshOrders();
    document.querySelector('button[aria-label="Close"]')?.click();
    resetForm();
    window.location.reload();
    return true;
  };

  return (
    <FormPopup
      title='New Order Form'
      description='Please fill out all fields of the form below for your requested
                item and read the Order Guidelines.'
      onSubmit={handleSubmit}
      onClose={resetForm}
      maxWidth='50%'
      defaultSubmit={true}
      buttonText='Place New Order'
      styles={{
        fontSize: '14px',
        backgroundColor: 'var(--primary-green)',
        color: 'var(--white)',
        fontWeight: '500',
        borderRadius: '5px',
        transition: 'background-color 0.2s ease',
        border: 'none',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: '#19d93d',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
        },
        '&:focus': {
          outline: '2px solidrgb(11, 154, 37)',
          outlineOffset: '2px',
        },
      }}
    >
      {formErrors.budget && (
        <ErrorMessage style={{ marginBottom: '15px' }}>
          {formErrors.budget}
        </ErrorMessage>
      )}
      <FormContainer>
        <Column>
          <BudgetDropdown
            value={program}
            onProgramChange={handleProgramChange}
            required={true}
          />
          {formErrors.program && (
            <ErrorMessage>{formErrors.program}</ErrorMessage>
          )}

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

          <CustomInput.Text
            title='Link to Purchase Item'
            value={link}
            onChange={handleLinkChange}
            placeholder='https://ExampleSite.com'
            required
          />
          {formErrors.link && <ErrorMessage>{formErrors.link}</ErrorMessage>}

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

          <PriorityDropdown
            value={priorityLevel}
            onPriorityChange={handlePriorityLevelChange}
            required={true}
          />
          {formErrors.priorityLevel && (
            <ErrorMessage>{formErrors.priorityLevel}</ErrorMessage>
          )}

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
