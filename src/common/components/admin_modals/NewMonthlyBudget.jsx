import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { Dialog } from 'radix-ui';
import styled from 'styled-components';

import FormPopup from 'common/components/templates/FormPopup';
import Dropdown, {
  StyledLabel,
  StyledSelectItem,
} from 'common/components/templates/Dropdown';

const Programs = [
  {
    label: 'programs',
    items: [
      { label: 'program 1', value: '1' },
      { label: 'program 2', value: '2' },
      { label: 'program 3', value: '3' },
      { label: 'program 4', value: '4' },
    ],
  },
];

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  user-select: none;
  background-color: var(--green-4);
  color: var(--green-11);
  outline-color: var(--green-7);
  &:hover {
    background-color: var(--green-5);
  }
`;

export default function NewMonthlyBudget() {
  const [budget, setBudget] = useState('$');
  const [program, setProgram] = useState('');

  const handleBudgetChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith('$')) {
      value = '$' + value;
    }
    if (/^\$\d*\.?\d{0,2}$/.test(value) || value === '$') {
      setBudget(value);
    }
  };

  const handleProgramChange = (newValue) => {
    console.log(newValue);
    setProgram(newValue);
    console.log('Selected Program:', program);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the budget value to the server or perform any action needed
    console.log('New Monthly Budget:', budget);
  };

  return (
    <FormPopup
      title='New Monthly Budget'
      buttonText='Set Budget'
      customForm={true}
      noDesc={true}
      styles={{
        display: 'flex',
        marginLeft: 'auto',
        marginRight: '2rem',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '600',
        color: 'white',
        backgroundColor: 'var(--green-9)',
        borderRadius: '6px',
        border: 'none',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
    >
      <label
        style={{
          display: 'block',
          fontSize: '15px',
          color: 'black',
          marginBottom: '10px',
        }}
      >
        Please enter new monthly budget:
        <span style={{ color: 'red' }}>*</span>
      </label>
      <input
        type='text'
        value={budget}
        onChange={handleBudgetChange}
        placeholder='$0.00'
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
      <Dropdown
        styles={{ border: '1px solid black' }} // pass an object not a string
        placeholder='Program'
        onValueChange={handleProgramChange}
        value={program}
      >
        {Programs.map((group, i) => {
          return (
            <Select.Group key={`group-${i}`}>
              <StyledLabel>{group.label}</StyledLabel>
              {group.items.map((item) => (
                <StyledSelectItem value={item.value} key={item.value}>
                  {item.label}
                </StyledSelectItem>
              ))}
            </Select.Group>
          );
        })}
      </Dropdown>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Dialog.Close asChild>
          <StyledButton type='submit' onClick={handleSubmit}>
            Submit
          </StyledButton>
        </Dialog.Close>
      </div>
    </FormPopup>
  );
}
