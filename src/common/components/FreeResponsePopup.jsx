import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog } from "radix-ui";
import React from "react";
import styled from "styled-components";

const StyledOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContent = styled(Dialog.Content)`
  background-color: white;
  border: 1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 1221px;
  max-width: 100vw;
  height: 497px;
  padding: 25px;
  border-radius: 4px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    content: "";
    display: block;
    background-color: #e0e0e0;
    width: 100%;
    position: absolute;
    left: 0;
    height: 56px;
    border-radius: 4px;
  }

  &::before {
    content: "Reason for Denial";
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const StyledDescription = styled(Dialog.Description)`
  margin: 70px 0 20px;
  line-height: 1.5;
  text-align: center;
`;

const StyledInput = styled.input`
  background-color: #f4f4f4;
  border: 2px solid #b2b2b2;
  width: 399px;
  flex: 1;
  border-radius: 4px;
  font-size: 21px;
  height: 46px;
  padding: 0 15px;
  display: block;
  margin: 0 auto;
  text-align: center;
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 21px;
  line-height: 1;
  height: 60px;
  width: 136px;
  user-select: none;
  background-color: #8dfb91;
  border: 2px solid #36a73b;
  font-weight: bold;
`;

const StyledButton1 = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 21px;
  line-height: 1;
  height: 60px;
  width: 136px;
  user-select: none;
  background-color: #8dfb91;
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
  color: whi;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: inherit;
  transition: all 0.3s ease;

  svg {
    height: 20px;
    width: 20px;
  }

  svg > path {
    fill: red;
  }

  &:hover {
    background-color: hsl(0, 0%, 92.9%);
  }

  &:focus {
    svg {
      height: 27px;
      width: 27px;
    }
  }
`;

export default function FreeResponsePopup() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <StyledButton1>Reason for Denial</StyledButton1>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledDescription>
            Please enter the reason for denial:
          </StyledDescription>
          <div style={{ height: "30px" }} /> {/* Spacer div to add more gap */}
          <StyledInput
            id="reason"
            defaultValue="This order is being denied because..."
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              bottom: "70px",
              right: "20px",
              width: "100%",
            }}
          >
            <Dialog.Close asChild>
              <StyledButton>Approve</StyledButton>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
