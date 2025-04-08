import React, { useEffect, useState } from 'react';

import * as Select from '@radix-ui/react-select';
import PropTypes from 'prop-types';

import Dropdown, {
  StyledLabel,
  StyledSelectItem,
  StyledSeparator,
} from 'common/components/templates/Dropdown';
import { AdminStatuses } from 'common/utils/AdminStatuses';

// Accept props for a controlled component
// Order of function calls when user changes the value of the dropdown:
//  1. onValueChange callback
//  2. handleStatusChange()
//  3. setStatus(newValue) ==> schedules a re-render (async operation)
//  4. onStatusChange(newValue)
//  5. on next render, useEffect() hook runs
export default function StatusDropdown({ value, onStatusChange }) {
  const [status, setStatus] = useState(value || '');

  // Keep internal state in sync with passed value
  useEffect(() => {
    setStatus(value || '');
  }, [value]);

  const handleStatusChange = (newValue) => {
    setStatus(newValue);
    if (onStatusChange) onStatusChange(newValue);
  };

  function determineBackgroundColor(status) {
    if (status === 'approved') {
      backgroundColor = 'var(--status-approved-green)';
    } else if (status === 'pending') {
      backgroundColor = 'var(--status-pending-yellow)';
    } else if (status === 'denied') {
      backgroundColor = 'inherit';
    } else if (status === 'arrived') {
      // item arrived
      backgroundColor = 'var(--status-arrived-blue)';
    } else if (status === 'ready' || status === 'picked up') {
      // read for pick up
      backgroundColor = 'orange';
    }
  }

  // Determine background color based on status
  let backgroundColor = 'green';
  // re-render occurs when user changes value, so we need to determine
  // the new background color
  determineBackgroundColor(status);

  return (
    <Dropdown
      styles={{ backgroundColor: backgroundColor, border: '1px solid black' }} // pass an object not a string
      placeholder='Status...'
      onValueChange={handleStatusChange}
      value={status} // changed from defaultValue to value
      $forstatus={true}
    >
      {AdminStatuses.map((groupOrSeparator, i) => {
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
  );
}

StatusDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

StatusDropdown.defaultProps = {
  value: '',
};
