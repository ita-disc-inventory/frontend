import React from 'react';

// Import CSS files
import '@radix-ui/colors/black-alpha.css';
import '@radix-ui/colors/mauve.css';
import '@radix-ui/colors/red.css';
import '@radix-ui/colors/violet.css';
import PropTypes from 'prop-types';
import { AlertDialog } from 'radix-ui';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

// Styled components
const StyledOverlay = styled(AlertDialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContent = styled(AlertDialog.Content)`
  background-color: var(--gray-1);
  border-radius: 6px;
  box-shadow: var(--shadow-6);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`;

const StyledTitle = styled(AlertDialog.Title)`
  margin: 0;
  color: var(--mauve-12);
  font-size: 17px;
  font-weight: 500;
`;

const StyledDescription = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: var(--mauve-11);
  font-size: 15px;
  line-height: 1.5;
`;

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

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  &:focus-visible {
    outline: 2px solid var(--violet-6);
    outline-offset: 1px;
  }

  &.violet {
    background-color: var(--violet-4);
    color: var(--violet-12);
    outline-color: var(--violet-6);
    &:hover {
      background-color: var(--mauve-3);
    }
  }

  &.red {
    background-color: var(--red-4);
    color: var(--red-11);
    outline-color: var(--red-7);
    &:hover {
      background-color: var(--red-5);
    }
  }

  &.mauve {
    background-color: var(--mauve-4);
    color: var(--mauve-11);
    outline-color: var(--mauve-7);
    &:hover {
      background-color: var(--mauve-5);
    }
  }
`;

export default function YNPopup({ yesText, noText, noOnClick, yesOnClick }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <StyledButton className='violet'>Delete account</StyledButton>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>Are you absolutely sure?</StyledTitle>
          <StyledDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </StyledDescription>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <StyledButton className='mauve' onClick={noOnClick}>
                {noText}
              </StyledButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <StyledButton className='red' onClick={yesOnClick}>
                {yesText}
              </StyledButton>
            </AlertDialog.Action>
          </div>
        </StyledContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

YNPopup.propTypes = {
  yesText: PropTypes.string,
  noText: PropTypes.string,
  noOnClick: PropTypes.func,
  yesOnClick: PropTypes.func,
};

YNPopup.defaultProps = {
  yesText: 'Yes',
  noText: 'No',
};
