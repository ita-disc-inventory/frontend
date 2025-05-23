import React from 'react';

import * as Select from '@radix-ui/react-select';
import PropTypes from 'prop-types';

import Dropdown, {
  StyledLabel,
  StyledSelectItem,
  StyledSeparator,
} from 'common/components/templates/Dropdown/Dropdown';
import {
  DropdownContainer,
  InputLabel,
  LabelText,
  RequiredIndicator,
} from './PriorityDropdownStyles';

// Priority options
const PriorityOptions = [
  {
    label: 'Priority Level',
    items: [
      {
        label: 'Regular',
        value: 'regular',
      },
      {
        label: '< 2 weeks',
        value: '< 2 weeks',
      },
    ],
  },
];

export default function PriorityDropdown({
  value,
  onPriorityChange,
  required,
}) {
  const handlePriorityChange = (newValue) => {
    if (onPriorityChange) onPriorityChange({ target: { value: newValue } });
  };

  return (
    <DropdownContainer>
      <InputLabel>
        <LabelText>Priority Level</LabelText>
        {required && <RequiredIndicator>*</RequiredIndicator>}
      </InputLabel>
      <Dropdown
        styles={{
          width: '100%',
          border: 'solid 2px var(--text)',
          borderRadius: '8px',
          height: '44px',
        }}
        placeholder='Select Priority...'
        onValueChange={handlePriorityChange}
        value={value}
        required={required}
      >
        {PriorityOptions.map((groupOrSeparator, i) => {
          if (groupOrSeparator.separator) {
            return <StyledSeparator key={`sep-${i}`} />;
          }
          return (
            <Select.Group key={`group-${i}`}>
              <StyledLabel>{groupOrSeparator.label}</StyledLabel>
              {groupOrSeparator.items.map((item) => (
                <StyledSelectItem value={item.value} key={item.value}>
                  {item.label}
                </StyledSelectItem>
              ))}
            </Select.Group>
          );
        })}
      </Dropdown>
    </DropdownContainer>
  );
}

PriorityDropdown.propTypes = {
  value: PropTypes.string,
  onPriorityChange: PropTypes.func,
  required: PropTypes.bool,
};

PriorityDropdown.defaultProps = {
  value: '',
  required: false,
};
