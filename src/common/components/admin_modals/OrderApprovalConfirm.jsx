import React from 'react';

import PropTypes from 'prop-types';

import YNPopup from 'common/components/templates/YNPopup';

export default function OrderApprovalConfirm({ open, onApprove, onDeny }) {
  return (
    <YNPopup
      open={open} // controlled open prop
      title='Order Approval Confirmation'
      description='Approve or Deny Order?'
      yesText='Approve'
      noText='Deny'
      yesOnClick={() => {
        if (onApprove) onApprove();
      }}
      noOnClick={() => {
        if (onDeny) onDeny();
      }}
    />
  );
}

OrderApprovalConfirm.propTypes = {
  open: PropTypes.bool,
  onApprove: PropTypes.func,
  onDeny: PropTypes.func,
};

OrderApprovalConfirm.defaultProps = {
  open: false,
  onApprove: () => {},
  onDeny: () => {},
};
