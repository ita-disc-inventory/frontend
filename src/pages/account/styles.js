import styled from 'styled-components';

import { Button } from 'common/components/form/Button';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`;

export const InputTitle = styled.span`
  margin-right: 2px;
  text-align: left;
`;
export const StyledInput = styled.input`
  font-size: 1rem;
  padding: 8px;
  border-radius: 8px;
  width: 375px;
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: fit-content;
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: var(--white);
  cursor: pointer;
`;

export const StyledPage = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button.Primary)`
  font-size: 1.1rem;
  width: content;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: auto;
  margin-right: auto;
`;
