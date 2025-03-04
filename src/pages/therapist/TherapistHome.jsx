import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Title, Subtitle } from 'common/components/Text';
import { Button } from 'common/components/Button';

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

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

export default function TherapistHome() {
  const navigate = useNavigate();

  return (
    <TherapistHomePage>
      <TextContainer>
        <Title>Therapist Homepage</Title>
        <Subtitle>Welcome to the therapist dashboard!</Subtitle>
      </TextContainer>
      
      <ButtonContainer>
        <Button.Primary onClick={() => navigate('/therapist/settings')}>Therapist Account Settings</Button.Primary>
      </ButtonContainer>
    </TherapistHomePage>
  );
}
