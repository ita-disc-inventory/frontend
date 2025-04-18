import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/Button';
import { Subtitle, Title } from 'common/components/Text';
import OrderTable from 'common/components/OrderTableTherapist';
import NewOrderForm from 'common/components/NewOrderForm';

const TherapistHomePage = styled.div`
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

const FormDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

export default function TherapistHome() {
  const navigate = useNavigate();

  return (
    <TherapistHomePage>
      <TextContainer>
        <Title>Therapist Homepage</Title>
      </TextContainer>

      <ButtonContainer>
        <Button.Primary onClick={() => navigate('/settings')}>
          Therapist Account Settings
        </Button.Primary>
      </ButtonContainer>
      <FormDiv>
        <NewOrderForm />
      </FormDiv>
      <OrderTable />
    </TherapistHomePage>
  );
}
