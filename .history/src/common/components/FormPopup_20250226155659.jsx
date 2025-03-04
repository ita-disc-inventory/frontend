import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
//import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Dialog } from 'radix-ui';

/* reset */
// button,
// fieldset,
// input {
//   all: unset;
// }

// .DialogOverlay {
//   background-color: var(--black-a9);
//   position: fixed;
//   inset: 0;
//   animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
// }

// .DialogContent {
//   background-color: var(--secondary-lightgrey);
//   border-radius: 6px;
//   box-shadow: var(--shadow-6);
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 90vw;
//   max-width: 500px;
//   max-height: 85vh;
//   padding: 25px;
//   animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
// }
// .DialogContent:focus {
//   outline: none;
// }

// .DialogTitle {
//   margin: 0;
//   font-weight: 500;
//   color: var(--mauve-12);
//   font-size: 17px;
// }

// .DialogDescription {
//   margin: 10px 0 20px;
//   color: var(--mauve-11);
//   font-size: 15px;
//   line-height: 1.5;
// }

// .Button {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 4px;
//   padding: 0 15px;
//   font-size: 15px;
//   line-height: 1;
//   font-weight: 500;
//   height: 35px;
//   user-select: none;
// }
// .Button:focus:not(:focus-visible) {
//   outline: 0;
// }
// .Button:focus-visible {
//   outline: 2px solid var(--violet-6);
//   outline-offset: 1px;
// }
// .Button.violet {
//   background-color: var(--violet-4);
//   color: var(--violet-12);
//   outline-color: var(--violet-6);
// }
// .Button.violet:hover {
//   background-color: var(--mauve-3);
// }
// .Button.green {
//   background-color: var(--green-4);
//   color: var(--green-11);
//   outline-color: var(--green-7);
// }
// .Button.green:hover {
//   background-color: var(--green-5);
// }

// .IconButton {
//   all: unset;
//   font-family: inherit;
//   border-radius: 100%;
//   height: 25px;
//   width: 25px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--violet-11);
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background-color: var(--gray-3);
// }
// .IconButton:hover {
//   background-color: var(--violet-4);
// }
// .IconButton:focus {
//   box-shadow: 0 0 0 2px var(--violet-7);
// }

// .Fieldset {
//   display: flex;
//   gap: 20px;
//   align-items: center;
//   margin-bottom: 15px;
// }

// .Label {
//   font-size: 15px;
//   color: var(--violet-11);
//   width: 90px;
//   text-align: right;
// }

// .Input {
//   width: 100%;
//   flex: 1;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 4px;
//   padding: 0 10px;
//   font-size: 15px;
//   line-height: 1;
//   color: var(--violet-11);
//   box-shadow: 0 0 0 1px var(--violet-7);
//   height: 35px;
// }
// .Input:focus {
//   box-shadow: 0 0 0 2px var(--violet-8);
// }

// @keyframes overlayShow {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }

// @keyframes contentShow {
//   from {
//     opacity: 0;
//     transform: translate(-50%, -48%) scale(0.96);
//   }
//   to {
//     opacity: 1;
//     transform: translate(-50%, -50%) scale(1);
//   }
// }

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className='Button violet'>Edit profile</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='DialogOverlay' />
      <Dialog.Content className='DialogContent'>
        <Dialog.Title className='DialogTitle'>Edit profile</Dialog.Title>
        <Dialog.Description className='DialogDescription'>
          Make changes to your profile here. Click save when you&apos;re done.
        </Dialog.Description>
        <fieldset className='Fieldset'>
          <label className='Label' htmlFor='name'>
            Name
          </label>
          <input className='Input' id='name' defaultValue='Pedro Duarte' />
        </fieldset>
        <fieldset className='Fieldset'>
          <label className='Label' htmlFor='username'>
            Username
          </label>
          <input className='Input' id='username' defaultValue='@peduarte' />
        </fieldset>
        <div
          style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}
        >
          <Dialog.Close asChild>
            <button className='Button green'>Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className='IconButton' aria-label='Close'>
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;

// export default function FormPopup() {
//   return (
//     <div>
//       <h1>FormPopup</h1>
//     </div>
//   );
// }

// FormPopup.propTypes = {
//   promptText: PropTypes.string,
//   placeholderText: PropTypes.string,
//   submitButtonText: PropTypes.string,
//   cancelButtonText: PropTypes.string,
//   onSubmit: PropTypes.func,
// };

// FormPopup.defaultProps = {
//   promptText: 'Prompt',
//   placeholderText: 'Enter text here',
//   submitButtonText: 'Submit',
//   cancelButtonText: 'Cancel',
// };
