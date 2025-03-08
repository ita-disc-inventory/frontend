import React, { useState } from 'react';

import * as Select from '@radix-ui/react-select';

import Dropdown, {
  StyledLabel,
  StyledSelectItem,
  StyledSeparator,
} from 'common/components/templates/Dropdown';
import { Filters } from 'common/utils/Filters';

export default function FilterDropdown() {
  const [filterValue, setFilter] = useState('');
  // each time filter is changed, update the value of the filter
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <Dropdown
      placeholder='Choose a filter...' // Placeholder text
      onValueChange={handleFilterChange} // Radix listener for changes
      defaultValue='' // No default selection
    >
      {Filters.map((groupOrSeparator, i) => {
        // If "separator" is true, render the StyledSeparator
        if (groupOrSeparator.separator) {
          return <StyledSeparator key={`sep-${i}`} />;
        }

        // Otherwise, render a category group
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
  );
}
