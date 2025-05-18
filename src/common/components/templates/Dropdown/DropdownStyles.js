// button that actually toggles the dropdown
import styled from 'styled-components';
import * as Select from '@radix-ui/react-select';

const StyledTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: ${(props) => (props.$forstatus ? '0px 10px' : '0 15px')};
  font-size: 13px;
  line-height: 1;
  height: 35px;
  ${(props) => (props.$forstatus ? 'width: 100px;' : 'min-width: 150px;')}
  background-color: white;
  color: var(--violet-11);
  border: 1px #ccc solid;
  &:hover {
    background-color: var(--mauve-3);
  }
  &[data-placeholder] {
    color: var(--violet-9);
  }
  & > span {
    color: black;
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
const StyledSeparator = styled(Select.Separator)`
  height: 1px;
  background-color: var(--violet-6);
  margin: 5px;
`;

// label for each item
const StyledLabel = styled(Select.Label)`
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
  & > span {
    color: black;
  }
`;

export {
  StyledTrigger,
  StyledIcon,
  StyledContent,
  StyledViewport,
  StyledScrollButton,
  StyledSeparator,
  StyledLabel,
  StyledItemIndicator,
};
