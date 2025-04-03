import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/Button';
import OrderTable from 'common/components/OrderTable';
import { Subtitle, Title } from 'common/components/Text';

const AdminHomePage = styled.div`
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
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <AdminHomePage>
      <TextContainer>
        <Title>Admin Homepage</Title>
        <Subtitle>Welcome to the admin dashboard!</Subtitle>
      </TextContainer>

      <ButtonContainer>
        <Button.Primary onClick={() => navigate('/settings')}>
          Admin Account Settings
        </Button.Primary>
      </ButtonContainer>
      <OrderTable />
    </AdminHomePage>
  );
}
