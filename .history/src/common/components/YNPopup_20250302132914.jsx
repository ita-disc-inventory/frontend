import React from 'react';

// CSS files used below for coloring
import '@radix-ui/colors/black-alpha.css';
import '@radix-ui/colors/green.css';
import '@radix-ui/colors/mauve.css';
import '@radix-ui/colors/red.css';
import '@radix-ui/colors/violet.css';
import { Cross2Icon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import { Dialog } from 'radix-ui';
import styled, { keyframes } from 'styled-components';

// Keyframes for open/close animations
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

// Converted CSS styles --> styled components
const StyledOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContent = styled(Dialog.Content)`
  background-color: white;
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

const StyledTitle = styled(Dialog.Title)`
  margin: 0;
  color: var(--mauve-12);
  font-size: 17px;
  font-weight: 500;
`;

const StyledDescription = styled(Dialog.Description)`
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

  &:hover {
    cursor: pointer;
  }

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

  &.green {
    background-color: var(--green-4);
    color: var(--green-11);
    outline-color: var(--green-7);
    &:hover {
      background-color: var(--green-5);
    }
  }
`;

const IconButton = styled.button`
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: inherit;
  transition: all 0.3s ease;

  svg {
    height: 20px; // Set the height of the SVG
    width: 20px; // Set the width of the SVG
  }

  svg > path {
    fill: red;
  }

  &:hover {
    background-color: #ededed; // button gets darker when they hover
  }

  &:focus {
    svg {
      height: 27px;
      width: 27px;
    }
  }
`;

export default function YNPopup({
  yesText = 'Yes',
  noText = 'No',
  noOnClick,
  yesOnClick,
  yesColor = 'green',
  noColor = 'red',
  title = 'Popup Title',
  description = 'Popup Desc.',
  onSubmit,
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <StyledButton className='violet'>Open YNPopup</StyledButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>{description}</StyledDescription>
          <form onSubmit={onSubmit}>
            {/* if defaultSubmit is NOT true, caller is expected to have another button to submit form */}
            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end',
              }}
            >
              {/* Caller must provide + define functions for both buttons when clicked */}
              <Dialog.Close asChild>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    gap: '10px',
                  }}
                >
                  <StyledButton className={yesColor} onClick={yesOnClick}>
                    {yesText}
                  </StyledButton>
                  <StyledButton className={noColor} onClick={noOnClick}>
                    {noText}
                  </StyledButton>
                </div>
              </Dialog.Close>
            </div>
          </form>
          <Dialog.Close asChild>
            <IconButton aria-label='Close'>
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

YNPopup.propTypes = {
  yesText: PropTypes.string,
  noText: PropTypes.string,
  noOnClick: PropTypes.func,
  yesOnClick: PropTypes.func,
  yesColor: PropTypes.string,
  noColor: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

YNPopup.defaultProps = {
  yesText: 'Yes',
  noText: 'No',
  yesColor: 'green',
  noColor: 'red',
  title: 'Popup Title',
  description: 'Popup Desc.',
};
