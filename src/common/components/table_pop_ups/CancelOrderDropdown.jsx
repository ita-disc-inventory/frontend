import React, { useEffect, useState } from 'react';

import * as Select from '@radix-ui/react-select';
import PropTypes from 'prop-types';

import Dropdown, {
  StyledLabel,
  StyledSelectItem,
  StyledSeparator,
} from 'common/components/templates/Dropdown/Dropdown';

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
    } else if (status === 'cancel') {
      backgroundColor = 'var(--status-cancel-red)';
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
      <Select.Group>
        <StyledLabel>Status Option</StyledLabel>
        <StyledSelectItem value={value}>{value}</StyledSelectItem>
        <StyledSeparator />
        <StyledSelectItem value='cancel'>Cancel</StyledSelectItem>
      </Select.Group>
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
