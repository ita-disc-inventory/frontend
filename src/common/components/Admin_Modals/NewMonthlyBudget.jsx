import FormPopup from "common/components/FormPopup";
import { Dialog } from "radix-ui";
import React, { useState } from "react";
import styled from "styled-components";

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
  background-color: var(--green-4);
  color: var(--green-11);
  outline-color: var(--green-7);
  &:hover {
    background-color: var(--green-5);
  }
`;

export default function NewMonthlyBudget() {
  const [budget, setBudget] = useState("$");

  const handleBudgetChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("$")) {
      value = "$" + value;
    }
    if (/^\$\d*\.?\d{0,2}$/.test(value) || value === "$") {
      setBudget(value);
    }
  };

  return (
    <FormPopup
      title="New Monthly Budget"
      buttonText="Set Budget"
      customForm={true}
    >
      <label
        style={{
          display: "block",
          fontSize: "15px",
          color: "black",
          marginBottom: "10px",
        }}
      >
        Please enter new monthly budget:
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        value={budget}
        onChange={handleBudgetChange}
        placeholder="$0.00"
        style={{
          width: "100%",
          borderRadius: "4px",
          padding: "10px",
          fontSize: "15px",
          lineHeight: "1.5",
          color: "black",
          border: "solid 2px var(--text)",
          height: "40px",
          marginBottom: "20px",
        }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dialog.Close asChild>
          <StyledButton type="submit">Submit</StyledButton>
        </Dialog.Close>
      </div>
    </FormPopup>
  );
}
