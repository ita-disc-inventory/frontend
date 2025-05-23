import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  user-select: none;
  background-color: var(--green-4);
  color: var(--green-11);
  outline-color: var(--green-7);
  &:hover {
    background-color: var(--green-5);
  }
`;

const InputField = styled.input`
  width: 100%;
  border-radius: 4px;
  padding: 10px;
  font-size: 15px;
  line-height: 1.5;
  color: black;
  border: solid 2px var(--text);
  height: 40px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  color: black;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled(StyledButton)`
  background-color: var(--red-4);
  color: var(--red-11);
`;

export { ButtonContainer, CancelButton, InputField, Label, StyledButton };
