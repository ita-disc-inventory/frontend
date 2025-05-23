import styled from 'styled-components';

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
    background-color: white;
  }
`;
