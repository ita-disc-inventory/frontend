import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from 'common/contexts/UserContext';
import { Title } from 'common/components/form/Text';
import OrderTable from 'common/components/OrderTableTherapist';
import NewOrderForm from 'common/components/table_pop_ups/NewOrderForm';
import ProgramBudgetList from 'common/components/ProgramBudgetList';

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
  justify-content: center;
  padding-bottom: 10px;
`;

export default function TherapistHome() {
  const { user } = useContext(UserContext);

  return (
    <TherapistHomePage>
      <TextContainer>
        <Title>Welcome, {user?.firstname}!</Title>
      </TextContainer>
      <ProgramBudgetList />
      <FormDiv>
        <NewOrderForm />
      </FormDiv>
      <OrderTable />
    </TherapistHomePage>
  );
}
