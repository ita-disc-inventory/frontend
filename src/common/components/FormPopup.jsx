import PropTypes from "prop-types";
import { Dialog } from "radix-ui";
import React, { useState } from "react";
import styled from "styled-components";

const StyledOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
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
  width: 90vw;
  max-width: ${(props) => props.maxWidth || "500px"};
  max-height: 85vh;
  padding: 25px;
  overflow: auto;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`;

const StyledTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: var(--mauve-12);
  font-size: 17px;
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
  &.violet {
    background-color: var(--violet-4);
    color: var(--violet-12);
    &:hover {
      background-color: var(--mauve-3);
    }
  }
  &.green {
    background-color: var(--green-4);
    color: var(--green-11);
    outline-color: var(--green-7);
    &:hover {
      background-color: var(--green-5);
    }
  }
`;

const TextAreaContainer = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    font-size: 15px;
    color: black;
  }
  textarea {
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    font-size: 15px;
    line-height: 1.5;
    color: black;
    border: solid 2px var(--text);
    height: 100px;
    resize: none;
    background-color: white;
  }
`;

export default function FormPopup({
  title = "Form Popup",
  children,
  onSubmit,
  maxWidth = "500px",
  defaultSubmit = true,
  ApproveText = "Approve",
  buttonText = "Open Form",
  customForm = false,
  textAreaLabel = "Reason for buying (150 characters max)",
  textAreaPlaceholder = "Enter reason for buying",
}) {
  const [reasonForBuying, setReasonForBuying] = useState("");

  const handleReasonForBuyingChange = (e) => setReasonForBuying(e.target.value);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <StyledButton className="violet">{buttonText}</StyledButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent maxWidth={maxWidth}>
          <StyledTitle>{title}</StyledTitle>
          {customForm && <div>{children}</div>}
          {!customForm && (
            <form onSubmit={onSubmit}>
              {children}
              <TextAreaContainer>
                <label htmlFor="reasonForBuying">
                  {textAreaLabel}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  id="reasonForBuying"
                  value={reasonForBuying}
                  onChange={handleReasonForBuyingChange}
                  placeholder={textAreaPlaceholder}
                  required
                />
              </TextAreaContainer>
              {defaultSubmit && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <Dialog.Close asChild>
                    <StyledButton className="green" type="submit">
                      {ApproveText}
                    </StyledButton>
                  </Dialog.Close>
                </div>
              )}
            </form>
          )}
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

FormPopup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  maxWidth: PropTypes.string,
  defaultSubmit: PropTypes.bool,
  ApproveText: PropTypes.string,
  buttonText: PropTypes.string,
  customForm: PropTypes.bool,
  textAreaLabel: PropTypes.string,
  textAreaPlaceholder: PropTypes.string,
};
