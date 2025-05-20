import styled from 'styled-components';

export const StyledCancelButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e04344;
  }
`;
