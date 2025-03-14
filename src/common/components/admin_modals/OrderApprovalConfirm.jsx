import React from 'react';

import PropTypes from 'prop-types';

import YNPopup from 'common/components/templates/YNPopup';

export default function OrderApprovalConfirm({ open, onApprove, onCancel }) {
  return (
    <YNPopup
      open={open} // controlled open prop
      title='Order Approval Confirmation'
      description='Approve this order?'
      yesText='Approve'
      noText='Cancel'
      yesOnClick={() => {
        if (onApprove) onApprove();
      }}
      noOnClick={() => {
        if (onCancel) onCancel();
      }}
    />
  );
}

OrderApprovalConfirm.propTypes = {
  open: PropTypes.bool,
  onApprove: PropTypes.func,
  onCancel: PropTypes.func,
};

OrderApprovalConfirm.defaultProps = {
  open: false,
  onApprove: () => {},
  onCancel: () => {},
};
