// Used for New Order Form, Change Password Form
import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import { Dialog } from 'radix-ui';
import styled from 'styled-components';

// MAKE SURE TO STYLE COMPONENT IN SAME FILE IT IS BEING EXPORTED FROM!!
const StyledOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContent = styled(Dialog.Content)`
  background-color: var(--secondary-lightgrey);
  border-radius: 6px;
  box-shadow: var(--shadow-6);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: ${(props) => props.maxWidth || '500px'};
  max-height: 85vh;
  padding: 25px;
  overflow: hidden;
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

// const StyledFieldset = styled.fieldset`
//   display: flex;
//   gap: 20px;
//   align-items: center;
//   margin-bottom: 15px;
// `;

// const StyledLabel = styled.label`
//   font-size: 15px;
//   color: var(--violet-11);
//   width: 90px;
//   text-align: right;
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   flex: 1;
//   border-radius: 4px;
//   padding: 0 10px;
//   font-size: 15px;
//   line-height: 1;
//   color: var(--violet-11);
//   box-shadow: 0 0 0 1px var(--violet-7);
//   height: 35px;
//   &:focus {
//     box-shadow: 0 0 0 2px var(--violet-8);
//   }
// `;

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

  &.violet {
    background-color: var(--violet-4);
    color: var(--violet-12);
    outline-color: var(--violet-6);
    &:hover {
      background-color: var(--mauve-3);
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
  transition: all 0.1s ease;

  svg {
    height: 20px; // Set the height of the SVG
    width: 20px; // Set the width of the SVG
  }

  svg > path {
    fill: red;
  }

  &:hover {
    background-color: #ededed; // button gets darker when they hover
    svg > path {
      height: 50px;
      width: 50px;
    }
  }

  &:focus {
    box-shadow: 0 0 0 2px red; // button appears a tad bigger when clicked
  }
`;

export default function FormPopup({
  title,
  description,
  children,
  onSubmit,
  maxWidth,
  defaultSubmit,
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <StyledButton className='violet'>Open Form</StyledButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent maxWidth={maxWidth}>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription>{description}</StyledDescription>
          <form onSubmit={onSubmit}>
            {children}
            {/* if defaultSubmit is NOT true, caller is expected to have another button to submit form */}
            {defaultSubmit && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 25,
                  justifyContent: 'flex-end',
                }}
              >
                <Dialog.Close asChild>
                  <div
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                  >
                    <StyledButton className='green' type='submit'>
                      Save changes
                    </StyledButton>
                    <StyledButton className='violet' type='submit'>
                      Save changes
                    </StyledButton>
                  </div>
                </Dialog.Close>
              </div>
            )}
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

FormPopup.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  maxWidth: PropTypes.string,
  defaultSubmit: PropTypes.bool,
};

FormPopup.defaultProps = {
  description: '',
  maxWidth: '500px',
  defaultSubmit: true,
};
