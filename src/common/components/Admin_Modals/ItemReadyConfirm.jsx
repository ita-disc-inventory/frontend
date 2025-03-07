import YNPopup from "common/components/YNPopup";
import React from "react";

export default function ItemReadyConfirm() {
  return (
    <YNPopup
      title="Item Ready Confirmation"
      description="Item ready for pick up?"
      buttonText="Item Ready Confirmation"
    />
  );
}
