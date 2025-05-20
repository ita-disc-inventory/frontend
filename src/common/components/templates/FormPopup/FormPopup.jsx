// Used for New Order Form, Change Password Form
import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import { Dialog } from 'radix-ui';
import {
  StyledOverlay,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledButton,
  IconButton,
} from './FormPopupStyles';

export default function FormPopup({
  open, // new controlled prop
  onOpenChange, // required in controlled mode
  title = 'Form Popup', // title of the form
  noDesc = false, // if true, then no description
  description = 'Form Desc.', // form desc.
  children, // any additional DOM elts you would want to add to form
  onSubmit, // what happens when form is submitted
  onClose, // callback when form is closed
  maxWidth = '500px', // allows us to define how wide this form is
  defaultSubmit = true, // if true, then basic 'Submit' and 'Cancel' buttons. If false, then caller expected to provide buttons
  submitText = 'Submit', // default 'Submit' text
  cancelText = 'Cancel', // default 'Cancel' text
  buttonText = 'Open Form', // text that appears over form button --> click --> opens form
  submitColor = 'green',
  cancelColor = 'red',
  cancelOnClick = null,
  buttonColor = 'blue',
  customForm = false, // if false, then caller must provide input fields. If true, then caller must provide another form
  styles = '', // styles for button that opens form
}) {
  // Controlled mode: if open is defined, do not render trigger button.
  if (open !== undefined) {
    return (
      <Dialog.Root
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen && onClose) onClose();
          if (onOpenChange) onOpenChange(isOpen);
        }}
      >
        <Dialog.Portal>
          <StyledOverlay /> {/* allows for 'dimmed' background */}
          <StyledContent maxWidth={maxWidth}>
            <StyledTitle>{title}</StyledTitle>
            <StyledDescription>{description}</StyledDescription>
            {/* if custom form is true, then caller must be providing their own form (since form nested in a form is NOT allowed) */}
            {customForm && <div>{children}</div>}
            {/* if custom form is false, then caller is expecting to use supplied form (not providing their own) */}
            {!customForm && (
              <form onSubmit={onSubmit}>
                {children} {/* what will go in the form */}
                {/* if defaultSubmit is NOT true, caller is expected to have another button to submit form */}
                {defaultSubmit && (
                  <div
                    style={{
                      display: 'flex',
                      marginTop: 25,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        gap: '10px',
                      }}
                    >
                      <StyledButton className={submitColor} type='submit'>
                        {submitText}
                      </StyledButton>
                      <Dialog.Close asChild>
                        <StyledButton
                          className={cancelColor}
                          onClick={(e) => {
                            if (cancelOnClick) cancelOnClick(e);
                            if (onClose) onClose();
                          }}
                          type='button'
                        >
                          {cancelText}
                        </StyledButton>
                      </Dialog.Close>
                    </div>
                  </div>
                )}
              </form>
            )}
          </StyledContent>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
  // Uncontrolled mode: render trigger button.
  return (
    <Dialog.Root
      onOpenChange={(isOpen) => {
        if (!isOpen && onClose) onClose();
      }}
    >
      <Dialog.Trigger asChild>
        {/* specify the button color here as a prop */}
        <StyledButton className={buttonColor} style={styles}>
          {buttonText}
        </StyledButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay /> {/* allows for 'dimmed' background */}
        <StyledContent maxWidth={maxWidth}>
          <StyledTitle>{title}</StyledTitle>
          {!noDesc && <StyledDescription>{description}</StyledDescription>}
          {/* if custom form is true, then caller must be providing their own form (since form nested in a form is NOT allowed) */}
          {customForm && <div>{children}</div>}
          {/* if custom form is false, then caller is expecting to use supplied form (not providing their own) */}
          {!customForm && (
            <form onSubmit={onSubmit}>
              {children} {/* what will go in the form */}
              {/* if defaultSubmit is NOT true, caller is expected to have another button to submit form */}
              {defaultSubmit && (
                <div
                  style={{
                    display: 'flex',
                    marginTop: 25,
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      gap: '10px',
                    }}
                  >
                    <StyledButton className={submitColor} type='submit'>
                      {submitText}
                    </StyledButton>
                    <Dialog.Close asChild>
                      <StyledButton
                        className={cancelColor}
                        type='button'
                        onClick={() => {
                          if (onClose) onClose();
                        }}
                      >
                        {cancelText}
                      </StyledButton>
                    </Dialog.Close>
                  </div>
                </div>
              )}
            </form>
          )}
          {/* The 'X' close button that allows us to close the form */}
          <Dialog.Close asChild>
            <IconButton
              aria-label='Close'
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Form title, children nodes, and onSubmit functionality are required. Title because
// the user must know that the form does, children because the form must include some content, and
// onSubmit because the form must do something when it is completed
FormPopup.propTypes = {
  open: PropTypes.bool, // controlled mode open flag
  onOpenChange: PropTypes.func, // controlled mode handler
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func, // callback when form is closed
  maxWidth: PropTypes.string,
  defaultSubmit: PropTypes.bool,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  cancelOnClick: PropTypes.func,
  buttonText: PropTypes.string,
  submitColor: PropTypes.string,
  cancelColor: PropTypes.string,
  buttonColor: PropTypes.string,
  customForm: PropTypes.bool,
  styles: PropTypes.string,
  noDesc: PropTypes.bool,
};

FormPopup.defaultProps = {
  open: undefined,
  onOpenChange: () => {},
  description: '',
  maxWidth: '500px',
  defaultSubmit: true,
  submitText: 'Submit',
  cancelText: 'Cancel',
  cancelOnClick: null,
  buttonText: 'Open Form',
  submitColor: 'green',
  cancelColor: 'red',
  buttonColor: 'blue',
  customForm: false,
  styles: '',
  noDesc: false,
  onClose: () => {},
};
