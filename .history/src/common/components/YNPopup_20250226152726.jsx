import React from 'react';

import PropTypes from 'prop-types';

// import styled from 'styled-components';

// YNPopup == Yes/No Popup. This will be used for when basic actions + when admins need to edit order table
// such as 'Are you sure you want to Logout?', 'Item arrived?', 'Item ready for pickup?', etc.
export default function YNPopup({ yesText, noText, noOnClick, yesOnClick }) {
  return (
    <div onClick={yesOnClick}>
      <h1 onClick={noOnClick}>
        {yesText}
        {noText}
      </h1>
    </div>
  );
}

YNPopup.propTypes = {
  yesText: PropTypes.string,
  noText: PropTypes.string,
  noOnClick: PropTypes.func,
  yesOnClick: PropTypes.func,
};

YNPopup.defaultProps = {
  yesText: 'Yes',
  noText: 'No',
};
