import React from 'react';

import PropTypes from 'prop-types';

// import styled from 'styled-components';

export default function YNPopup() {
  return (
    <div>
      <h1>FormPopup</h1>
    </div>
  );
}

YNPopup.propTypes = {
  yesText: PropTypes.string,
  noText: PropTypes.string,
};

YNPopup.defaultProps = {
  yesText: 'Yes',
  noText: 'No',
};
