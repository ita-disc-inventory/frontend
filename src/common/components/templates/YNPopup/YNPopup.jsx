// YNPopup === Yes/No Popup -- used for simple Confirm/Deny actions
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
import '@radix-ui/colors/yellow.css';
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
} from './YNPopupStyles';

export default function YNPopup({
  open, // new controlled prop
  onOpenChange, // required when in controlled mode
  yesText = 'Yes', // default text for the 'Yes/Confirm' button
  noText = 'No', // default text for the 'No/Deny' button
  noOnClick, // functionality for what happens when user clicks 'No'
  yesOnClick, // functionality for what happens when user clicks 'Yes'
  yesColor = 'green', // default color styling for 'Yes' button
  noColor = 'red', // default color styling for 'No' button
  buttonColor = 'blue', // default color for button that opens popup
  title = 'Popup Title', // default Title text for YNPopup
  description = 'Popup Desc.', // default description for YNPopup
  buttonText = 'Open YNPopup', // text that appears over form button --> click --> opens form
}) {
  // Controlled mode: if open is defined, do not render trigger.
  if (open !== undefined) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <StyledOverlay />
          <StyledContent>
            <StyledTitle>{title}</StyledTitle>
            <StyledDescription>{description}</StyledDescription>
            <form>
              <div
                style={{
                  display: 'flex',
                  marginTop: 25,
                  justifyContent: 'flex-end',
                }}
              >
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
          </StyledContent>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
  // Uncontrolled mode: render trigger button.
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <StyledButton className={buttonColor}>{buttonText}</StyledButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>{description}</StyledDescription>
          <form>
            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end',
              }}
            >
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
  open: PropTypes.bool, // added for controlled mode
  onOpenChange: PropTypes.func, // added for controlled mode
  yesText: PropTypes.string,
  noText: PropTypes.string,
  noOnClick: PropTypes.func,
  yesOnClick: PropTypes.func,
  yesColor: PropTypes.string,
  noColor: PropTypes.string,
  buttonColor: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
};

YNPopup.defaultProps = {
  yesText: 'Yes',
  noText: 'No',
  yesColor: 'green',
  noColor: 'red',
  buttonColor: 'blue',
  title: 'Popup Title',
  description: 'Popup Desc.',
  buttonText: 'Open YNPopup',
};
