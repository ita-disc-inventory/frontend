// Created this component that is basically same as Input.jsx but we can edit width
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const CustomInputContainer = styled.div`
  margin-bottom: 25px;
`;

const CustomInputName = styled.h3`
  margin: 0;
  text-align: left;
  font-weight: normal;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const CustomInputTitle = styled.span`
  margin-right: 2px;
`;

const CustomRedSpan = styled.span`
  color: red;
`;

const CustomStyledInput = styled.input`
  font-size: 1rem;
  padding: 8px;
  border: solid 2px var(--text);
  border-radius: 8px;
  width: 100%;
`;

const CustomPasswordContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const CustomIconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: var(--white);
  cursor: pointer;
`;

function CustomTitledInput({ title, required, children }) {
  return (
    <CustomInputContainer>
      <CustomInputName>
        <CustomInputTitle>{title}</CustomInputTitle>
        {required && <CustomRedSpan>*</CustomRedSpan>}
      </CustomInputName>
      {children}
    </CustomInputContainer>
  );
}

CustomTitledInput.propTypes = {
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const CustomInputPropTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
};

function CustomTextField(props) {
  props.placeholder ??= 'Text Here';
  return <CustomStyledInput type='text' {...props} />;
}

CustomTextField.propTypes = CustomInputPropTypes;

function CustomInputText({ title, ...rest }) {
  return (
    <CustomTitledInput title={title} required={rest.required}>
      <CustomTextField {...rest} />
    </CustomTitledInput>
  );
}

CustomInputText.propTypes = {
  title: PropTypes.string.isRequired,
  ...CustomInputPropTypes,
};

function CustomPasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CustomPasswordContainer>
      <CustomStyledInput type={showPassword ? 'text' : 'password'} {...props} />
      <CustomIconContainer onClick={toggleShowPassword}>
        {showPassword ? '🙈' : '👁️'}
      </CustomIconContainer>
    </CustomPasswordContainer>
  );
}

CustomPasswordField.propTypes = CustomInputPropTypes;

function CustomInputPassword({ title, ...rest }) {
  return (
    <CustomTitledInput title={title} required={rest.required}>
      <CustomPasswordField {...rest} />
    </CustomTitledInput>
  );
}

CustomInputPassword.propTypes = {
  title: PropTypes.string.isRequired,
  ...CustomInputPropTypes,
};

export const CustomInput = {
  Text: CustomInputText,
  Password: CustomInputPassword,
};
