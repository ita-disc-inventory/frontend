import React from 'react';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  StyledTrigger,
  StyledIcon,
  StyledContent,
  StyledViewport,
  StyledScrollButton,
  StyledItemIndicator,
} from './DropdownStyles';

// separator between dropdown items
export const StyledSeparator = styled(Select.Separator)`
  height: 1px;
  background-color: var(--violet-6);
  margin: 5px;
`;

// label for each item
export const StyledLabel = styled(Select.Label)`
  padding: 0 25px;
  font-size: 12px;
  line-height: 25px;
  color: var(--mauve-11);
`;

// basically a wrapper for Select.Item, extracts the children and className while
// forwarding other props (...props)
const SelectItemBase = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <Select.Item ref={ref} {...props} className={classnames(className)}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </Select.Item>
  )
);

// allows us to refer it
SelectItemBase.displayName = 'SelectItemBase';

SelectItemBase.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
SelectItemBase.defaultProps = {
  className: '',
};

// using wrapper we can customize
export const StyledSelectItem = styled(SelectItemBase)`
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-disabled] {
    color: var(--mauve-8);
    pointer-events: none;
  }
  &[data-highlighted] {
    outline: none;
    background-color: lightgray; // responsible for changing text color of selected value
    color: var(--violet-1);
  }
`;

export default function Dropdown({
  placeholder,
  children,
  value, // renamed from defaultValue to value
  $forstatus,
  styles, // expecting an inline style object
  ...props
}) {
  return (
    <Select.Root value={value} onValueChange={props.onValueChange} {...props}>
      <StyledTrigger
        aria-label='Dropdown'
        $forstatus={$forstatus}
        style={styles} // updated: pass the styles object directly
      >
        <Select.Value placeholder={placeholder} />
        <StyledIcon>
          <ChevronDownIcon />
        </StyledIcon>
      </StyledTrigger>
      <Select.Portal>
        <StyledContent>
          {/* Scroll up */}
          <StyledScrollButton>
            <ChevronUpIcon />
          </StyledScrollButton>
          <StyledViewport>{children}</StyledViewport>
          <StyledScrollButton as={Select.ScrollDownButton}>
            <ChevronDownIcon />
          </StyledScrollButton>
        </StyledContent>
      </Select.Portal>
    </Select.Root>
  );
}

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  /* the items/groups to appear in the dropdown, typically <Select.Group> or <StyledSelectItem> elements */
  children: PropTypes.node.isRequired,
  /* the default value if you want a pre-selected item */
  value: PropTypes.string, // updated prop name
  /* $forstatus = for status dropdown; if true, custom styling applied to fit */
  $forstatus: PropTypes.bool,
  onValueChange: PropTypes.func,
  styles: PropTypes.object,
};

Dropdown.defaultProps = {
  placeholder: 'Select an option...',
  value: '', // updated default value
  $forstatus: false,
};
