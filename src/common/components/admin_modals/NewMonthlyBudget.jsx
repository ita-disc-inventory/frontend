import * as Select from '@radix-ui/react-select';
import Dropdown, {
  StyledLabel,
  StyledSelectItem,
} from 'common/components/templates/Dropdown/Dropdown';
import FormPopup from 'common/components/templates/FormPopup/FormPopup';
import { Dialog } from 'radix-ui';
import React, { useEffect, useState } from 'react';
import { StyledButton } from './NewMonthlyBudgetStyles';

const Programs = [
  {
    label: 'programs',
    items: [
      { label: 'Community', value: '0d3605b4-cb25-4874-ad4b-e6041aabe5f1' },
      { label: 'Private', value: '0d5c4507-ddbb-4011-a8a5-5d51279d8edb' },
      {
        label: 'Creative Knowledge Center',
        value: '4a7f12b8-c64d-4138-93ad-92f853f03fb7',
      },
      { label: 'School', value: '87f6bdcb-8c62-4f34-9455-eda35a28990e' },
    ],
  },
];

export default function NewMonthlyBudget({ onCancel, onConfirm }) {
  const [budget, setBudget] = useState('$');
  const [programID, setProgramID] = useState('');

  useEffect(() => {
    console.log('Selected Program (updated):', programID);
  }, [programID]);

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
    setProgramID(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (budget === '$' || programID === '') {
      alert('Please enter a valid budget and select a program.');
      return;
    }
    const numericBudget = parseFloat(budget.replace(/[$,]/g, ''));
    console.log('New Monthly Budget:', numericBudget);
    console.log('Selected Program:', programID);

    setBudget('$');
    setProgramID('');
    onConfirm({ budget: numericBudget, programID });
  };

  return (
    <FormPopup
      open={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel();
      }}
      title='New Monthly Budget'
      customForm={true}
      description={null}
      noDesc={true}
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
        styles={{ border: '1px solid black' }}
        placeholder='Program'
        onValueChange={handleProgramChange}
        value={programID}
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
