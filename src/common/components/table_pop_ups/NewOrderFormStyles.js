import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1400px) {
    flex-direction: column;
    gap: 0px;
  }
`;

export const Column = styled.div`
  flex: 1 1 45%;

  @media (max-width: 1400px) {
    flex: 1 1 100%;
  }
`;

export const TextAreaContainer = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-size: 15px;
    color: black;
  }

  textarea {
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    font-size: 15px;
    line-height: 1.5;
    color: black;
    border: solid 2px var(--text);
    height: 100px;
    resize: none;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 14px;
`;
