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

// button that actually toggles the dropdown
const StyledTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  min-width: 150px;
  background-color: white;
  color: var(--violet-11);
  border: 1px #ccc solid;
  &:hover {
    background-color: var(--mauve-3);
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
  &[data-placeholder] {
    color: var(--violet-9);
  }
  & > span {
    color: #999999;
  }
`;

// icons for closing/opening
const StyledIcon = styled(Select.Icon)`
  color: var(--violet-11);
`;

// the component the pops up/out when we open the dropdown
const StyledContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

// viewport of dropdown
const StyledViewport = styled(Select.Viewport)`
  padding: 5px;
`;

// if many items, scroll button will appear
const StyledScrollButton = styled(Select.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: var(--violet-11);
  cursor: default;
`;

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

// render when the item is selected
const StyledItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
    background-color: var(--violet-9);
    color: var(--violet-1);
  }
`;

export default function Dropdown({
  placeholder, // what dropdown will say before user selects anything
  children, // the possible dropdown options, see example below function
  defaultValue, // the default value of the dropdown
  ...props
}) {
  return (
    <Select.Root defaultValue={defaultValue} {...props}>
      <StyledTrigger aria-label='Dropdown'>
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

          {/* Scroll down - reuse same styled scroll button but pass the other component */}
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
  defaultValue: PropTypes.string,
};

Dropdown.defaultProps = {
  placeholder: 'Select an option...',
  defaultValue: undefined,
};
