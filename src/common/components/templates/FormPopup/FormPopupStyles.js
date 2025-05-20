import styled from 'styled-components';
import { Dialog } from 'radix-ui';
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

export {
  StyledOverlay,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledButton,
  IconButton,
};
