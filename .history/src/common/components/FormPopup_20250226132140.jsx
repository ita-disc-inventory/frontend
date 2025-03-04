import React from 'react';

import PropTypes from 'prop-types';

// import styled from 'styled-components';

export default function FormPopup() {
    return (
        <div>
            <h1>FormPopup</h1>
        </div>
    );
}

FormPopup.propTypes = {
    promptText: PropTypes.string,
    placeholderText: PropTypes.string,
    submitButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    onSubmit: PropTypes.func,
};

FormPopup.defaultProps = {
    promptText: 'Prompt',
    placeholderText: 'Enter text here',
    submitButtonText: 'Submit',
    cancelButtonText: 'Cancel',
};
