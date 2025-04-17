import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';
import { Cross2Icon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';

// Animation keyframes
const hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    transform: translateX(0);
  }
`;

const swipeOut = keyframes`
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
`;

// Styled components
const ToastViewport = styled(Toast.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

const ToastRoot = styled(Toast.Root)`
  background-color: white;
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
  border-left: 4px solid #dc3545;

  &[data-state='open'] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: ${hide} 100ms ease-in;
  }

  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }

  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }

  &[data-swipe='end'] {
    animation: ${swipeOut} 100ms ease-out;
  }
`;

const ToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: #dc3545;
  font-size: 15px;
`;

const ToastDescription = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  color: #333;
  font-size: 13px;
  line-height: 1.3;
`;

const ToastAction = styled(Toast.Action)`
  grid-area: action;
`;

const CloseButton = styled.button`
  all: unset;
  font-family: inherit;
  height: 25px;
  width: 25px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #777;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const StatusChangeToast = ({ open, setOpen, title, description }) => {
  return (
    <Toast.Provider swipeDirection='right' duration={4000}>
      <ToastRoot open={open} onOpenChange={setOpen}>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
        <ToastAction asChild altText='Dismiss'>
          <CloseButton onClick={() => setOpen(false)}>
            <Cross2Icon />
          </CloseButton>
        </ToastAction>
      </ToastRoot>
      <ToastViewport />
    </Toast.Provider>
  );
};

StatusChangeToast.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

StatusChangeToast.defaultProps = {
  title: 'Invalid Status Change',
  description:
    'This status change is not allowed. Please select a valid status.',
};

export default StatusChangeToast;
