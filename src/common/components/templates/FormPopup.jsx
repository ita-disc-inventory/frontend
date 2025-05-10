// Used for New Order Form, Change Password Form
import React from 'react';

// CSS files used below for coloring
import '@radix-ui/colors/black-alpha.css';
import '@radix-ui/colors/blue.css';
import '@radix-ui/colors/gray.css';
import '@radix-ui/colors/green.css';
import '@radix-ui/colors/mauve.css';
import '@radix-ui/colors/orange.css';
import '@radix-ui/colors/red.css';
import '@radix-ui/colors/violet.css';
import '@radix-ui/colors/white-alpha.css';
import '@radix-ui/colors/yellow.css';
import { Cross2Icon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import { Dialog } from 'radix-ui';
import styled from 'styled-components';

// MAKE SURE TO STYLE COMPONENT IN SAME FILE IT IS BEING EXPORTED FROM!!
// Below is styling for FormPopup, translated from CSS to styled components
const StyledOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  z-index: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: var(--shadow-6);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: ${(props) => props.maxWidth || '500px'};
  max-height: 85vh;
  padding: 25px;
  overflow-y: auto; /* changed from scroll to auto to remove persistent scrollbar space */
  overflow-x: hidden;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const StyledTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: var(--mauve-12);
  font-size: 17px;
`;

const StyledDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
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

  &.red {
    background-color: var(--red-4);
    color: var(--red-11);
    outline-color: var(--red-7);
    &:hover {
      background-color: var(--red-5);
    }
  }

  &.green {
    background-color: var(--green-4);
    color: var (--green-11);
    outline-color: var(--green-7);
    &:hover {
      background-color: var(--green-5);
    }
  }

  &.blue {
    background-color: var(--blue-4);
    color: var(--blue-11);
    outline-color: var(--blue-7);
    &:hover {
      background-color: var(--blue-5);
    }
  }

  &.yellow {
    background-color: var(--yellow-4);
    color: var(--yellow-11);
    outline-color: var(--yellow-7);
    &:hover {
      background-color: var(--yellow-5);
    }
  }

  &.gray {
    background-color: var(--gray-4);
    color: var(--gray-12);
    outline-color: var(--gray-7);
    box-shadow: 0 5px 5px -4px var(--gray-9);
    &:hover {
      background-color: var(--gray-6);
    }
  }

  &.white {
    background-color: var(--white-a4);
    color: black;
    outline-color: var(--white-a7);
    box-shadow: 0 5px 5px -4px var(--gray-9);
    &:hover {
      background-color: var(--gray-4);
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

  &:active {
    svg {
      height: 27px;
      width: 27px;
    }
  }
`;

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
