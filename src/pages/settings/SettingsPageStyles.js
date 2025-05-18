import styled from 'styled-components';

export const SettingsPage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

export const AddAdminButton = styled.button`
  background-color: var(--newadmin-purple);
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FieldLabel = styled.h1`
  font-size: 14px;
  color: #555;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const FieldValue = styled.div`
  font-size: 16px;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
`;

export const FieldDropdown = styled.select`
  font-size: 16px;
  padding: 0.5rem;
  border: 1px solid #000000;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
`;

export const ChangePasswordButton = styled.button`
  color: #0069ff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  align-self: center;
`;

export const LogoutButton = styled.button`
  background-color: #f66e6f;
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;

export const UpdateButton = styled.button`
  background-color: rgb(21, 33, 244);
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;