import React from 'react';
import styled from 'styled-components';

import { Title, Subtitle } from 'common/components/Text';

const SettingsPage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function AdminSettings() {
  return (
    <SettingsPage>
      <TextContainer>
        <Title>Admin Account Settings</Title>
        <Subtitle>Manage your admin account settings here</Subtitle>
      </TextContainer>
    </SettingsPage>
  );
}
