import React from 'react';
import PropTypes from 'prop-types';

import YNPopup from 'common/components/templates/YNPopup';

export default function ItemArrivedConfirm({ open, onCancel, onConfirm }) {
  return (
    <YNPopup
      open={open}
      title='Item Arrived Confirmation'
      description='Item Arrived?'
      buttonText='Item Arrived Confirmation'
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

ItemArrivedConfirm.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

ItemArrivedConfirm.defaultProps = {
  open: false,
  onConfirm: () => {},
  onCancel: () => {},
};
