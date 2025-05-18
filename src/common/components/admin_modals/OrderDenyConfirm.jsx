import React from 'react';

import PropTypes from 'prop-types';

import YNPopup from 'common/components/templates/YNPopup/YNPopup';

export default function OrderApprovalConfirm({ open, onDeny, onCancel }) {
  return (
    <YNPopup
      open={open} // controlled open prop
      title='Deny Approval Confirmation'
      description='Deny this order?'
      yesText='Deny'
      yesColor='red'
      noColor='blue'
      noText='Cancel'
      yesOnClick={() => {
        if (onDeny) onDeny();
      }}
      noOnClick={() => {
        if (onCancel) onCancel();
      }}
    />
  );
}

OrderApprovalConfirm.propTypes = {
  open: PropTypes.bool,
  onDeny: PropTypes.func,
  onCancel: PropTypes.func,
};

OrderApprovalConfirm.defaultProps = {
  open: false,
  onDeny: () => {},
  onCancel: () => {},
};
