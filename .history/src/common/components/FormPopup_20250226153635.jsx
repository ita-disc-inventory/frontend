import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
//import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Dialog } from 'radix-ui';

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
