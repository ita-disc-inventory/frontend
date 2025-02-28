import styled from 'styled-components';

const ButtonBase = styled.button`
  font-size: 0.8em;
  padding: 8px 20px;
  border-radius: 5px;
  border: solid 1px var(--text);
  color: var(--text);
  cursor: pointer;
`;

const ButtonPrimary = styled(ButtonBase)`
  background-color: var(--primary-green);
  border-color: var(--primary-green);
  color: var(--white);
`;

const ButtonSecondary = styled(ButtonBase)`
  background-color: var(--secondary-lightgrey);
  border-color: var(--text);
`;

const ButtonTransparent = styled(ButtonBase)`
  background-color: transparent;
`;

const ButtonInvisible = styled(ButtonBase)`
  background-color: transparent;
  border-color: transparent;
`;

export const Button = {
  Primary: ButtonPrimary,
  Secondary: ButtonSecondary,
  Transparent: ButtonTransparent,
  Invisible: ButtonInvisible,
};
