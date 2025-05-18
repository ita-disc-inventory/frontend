import React, { useEffect, useState } from 'react';

import * as Select from '@radix-ui/react-select';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dropdown, {
  StyledLabel,
  StyledSelectItem,
  StyledSeparator,
} from 'common/components/templates/Dropdown/Dropdown';
import { ProgramOptions } from 'common/utils/ProgramOptions';

// Styled components to match other form elements
const DropdownContainer = styled.div`
  margin-bottom: 25px;
`;

const InputLabel = styled.h3`
  margin: 0;
  text-align: left;
  font-weight: normal;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const LabelText = styled.span`
  margin-right: 2px;
`;

const RequiredIndicator = styled.span`
  color: red;
`;

const BudgetText = styled.h6`
  position: absolute;
  left: 35px;
  padding: 0;
  color: blue;
  font-size: 14px;
  font-weight: normal;
`;

export default function BudgetDropdown({ value, onProgramChange, required }) {
  const [program, setProgram] = useState(value || '');
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userSelected, setUserSelected] = useState(false);

  // Keep internal state in sync with passed value only when value changes and user hasn't manually selected
  useEffect(() => {
    if (!userSelected && value !== program) {
      setProgram(value || '');
    }
  }, [value, program, userSelected]);

  // Fetch budget when program changes
  useEffect(() => {
    const fetchBudget = async () => {
      if (!program) {
        setBudget(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/budget`
        );

        if (!response.ok) {
          throw new Error(`Could not get budgets! Status: ${response.status}`);
        }

        const programs = await response.json();
        const selectedProgram = programs.find((p) => p.program_id === program);

        if (selectedProgram) {
          setBudget(selectedProgram.program_budget);
        } else {
          setBudget(null);
        }
      } catch (err) {
        setError(`Error fetching budget: ${err.message}`);
        setBudget(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [program]);

  const handleProgramChange = (newValue) => {
    setProgram(newValue);
    setUserSelected(true);
    if (onProgramChange) onProgramChange(newValue);
  };

  return (
    <DropdownContainer>
      <InputLabel>
        <LabelText>Program</LabelText>
        {required && <RequiredIndicator>*</RequiredIndicator>}
      </InputLabel>
      <Dropdown
        styles={{
          width: '100%',
          border: 'solid 2px var(--text)',
          borderRadius: '8px',
          height: '44px',
          padding: '0px 15px 0px 10px',
        }}
        placeholder='Select Program...'
        onValueChange={handleProgramChange}
        value={program}
        required={required}
      >
        {ProgramOptions.map((groupOrSeparator, i) => {
          if (groupOrSeparator.separator) {
            return <StyledSeparator key={`sep-${i}`} />;
          }
          return (
            <Select.Group key={`group-${i}`}>
              <StyledLabel>{groupOrSeparator.label}</StyledLabel>
              {groupOrSeparator.items.map((item) => (
                <StyledSelectItem
                  value={item.value}
                  key={item.value}
                  className='program-budget'
                >
                  {item.label}
                </StyledSelectItem>
              ))}
            </Select.Group>
          );
        })}
      </Dropdown>

      {/* Display budget information using the styled BudgetText component */}
      {program &&
        (loading ? (
          <BudgetText>Loading budget information...</BudgetText>
        ) : error ? (
          <BudgetText style={{ color: 'red' }}>{error}</BudgetText>
        ) : budget !== null ? (
          <BudgetText>Budget: ${Math.ceil(budget * 100) / 100}</BudgetText>
        ) : (
          <BudgetText>No budget information available</BudgetText>
        ))}
    </DropdownContainer>
  );
}

BudgetDropdown.propTypes = {
  value: PropTypes.string,
  onProgramChange: PropTypes.func,
  required: PropTypes.bool,
};

BudgetDropdown.defaultProps = {
  value: '',
  required: false,
};
