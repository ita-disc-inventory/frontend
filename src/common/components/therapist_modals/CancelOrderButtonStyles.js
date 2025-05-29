import styled from 'styled-components';

export const StyledCancelButton = styled.button`
  font-size: 14px;
  background-color:rgb(235, 33, 53);
  color: var(--white);
  font-weight: 500;
  border-radius: 10px;
  transition: background-color 0.2s ease;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #c82333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: 2px solid rgb(220, 53, 69);
    outline-offset: 2px;
  }
`;
