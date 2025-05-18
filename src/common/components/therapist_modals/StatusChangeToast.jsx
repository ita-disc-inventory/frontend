import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';

import {
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  CloseButton,
} from './StatusChangeToastStyles';

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
