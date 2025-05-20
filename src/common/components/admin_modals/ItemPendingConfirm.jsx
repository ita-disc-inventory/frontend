import React from 'react';
import PropTypes from 'prop-types';

import YNPopup from 'common/components/templates/YNPopup/YNPopup';

export default function ItemPendingConfirm({ open, onCancel, onConfirm }) {
  return (
    <YNPopup
      open={open}
      title='Item Review Confirmation'
      description="Change item's status to pending?"
      buttonText='Item Review Confirmation'
      yesText='Confirm'
      noText='Cancel'
      yesOnClick={() => {
        if (onConfirm) onConfirm();
      }}
      noOnClick={() => {
        if (onCancel) onCancel();
      }}
    />
  );
}

ItemPendingConfirm.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

ItemPendingConfirm.defaultProps = {
  open: false,
  onConfirm: () => {},
  onCancel: () => {},
};
