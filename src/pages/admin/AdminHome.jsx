import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OrderTable from 'common/components/OrderTable';
import { Title as BaseTitle, Subtitle } from 'common/components/form/Text';

const AdminHomePage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const ContentContainer = styled.div`
  margin-left: 2vw;
  margin-right: 2vw;
  text-align: left;
`;

const LeftAlignedTitle = styled(BaseTitle)`
  text-align: left;
`;

const BudgetListContainer = styled.div`
  display: flex-column;
  margin: 2rem 0;
  width: 100%;
  max-width: 800px;
  text-align: left;
`;

const BudgetItem = styled.div`
  padding: 0;
  font-size: 16px;
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  color: ${(props) => (props.error ? 'red' : '#666')};
  font-style: italic;
`;

function ProgramBudgetList() {
  const [programBudgets, setProgramBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramBudgets = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/budget`
        );

        if (!response.ok) {
          throw new Error(`Could not get budgets! Status: ${response.status}`);
        }

        const programs = await response.json();
        setProgramBudgets(programs);
      } catch (err) {
        setError(`Error fetching budgets: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramBudgets();
  }, []);

  if (loading) {
    return <StatusMessage>Loading program budgets...</StatusMessage>;
  }

  if (error) {
    return <StatusMessage error>{error}</StatusMessage>;
  }

  if (programBudgets.length === 0) {
    return <StatusMessage>No program budgets available</StatusMessage>;
  }

  return (
    <BudgetListContainer>
      <Subtitle>Budgets:</Subtitle>
      {programBudgets.map((program) => (
        <BudgetItem key={program.program_id}>
          {program.program_title || 'Unknown Program'}: $
          {parseFloat(program.program_budget).toFixed(2)}
        </BudgetItem>
      ))}
    </BudgetListContainer>
  );
}

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <AdminHomePage>
      <ContentContainer>
        <LeftAlignedTitle>Admin Homepage</LeftAlignedTitle>
        <ProgramBudgetList />
      </ContentContainer>

      <ButtonContainer></ButtonContainer>
      <OrderTable />
    </AdminHomePage>
  );
}
