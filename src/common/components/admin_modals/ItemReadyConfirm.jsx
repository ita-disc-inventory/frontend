import React from 'react';
import PropTypes from 'prop-types';

import YNPopup from 'common/components/templates/YNPopup';

export default function ItemReadyConfirm({ open, onCancel, onConfirm }) {
  return (
    <YNPopup
      open={open}
      title='Item Ready Confirmation'
      description='Item ready for pick up?'
      buttonText='Item Ready Confirmation'
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

ItemReadyConfirm.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

ItemReadyConfirm.defaultProps = {
  open: false,
  onConfirm: () => {},
  onCancel: () => {},
};
