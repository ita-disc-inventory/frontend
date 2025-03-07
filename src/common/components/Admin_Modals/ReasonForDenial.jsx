import FormPopup from "common/components/FormPopup";
import React from "react";

export default function ReasonForDenial() {
  return (
    <FormPopup
      title="Reason for Denial"
      textAreaLabel="Please enter the reason for denial:"
      textAreaPlaceholder="This order is being denied because"
    />
  );
}
