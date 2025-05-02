import { useUser } from 'common/contexts/UserContext';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BudgetListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1rem auto;
  width: 100%;
  max-width: 1000px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  justify-content: space-evenly;
`;

const BudgetHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  h2 {
    color: #333;
    font-weight: 700;
    text-align: left;
  }
`;

const BudgetButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: var(--green-9);
  border-radius: 6px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 0.5rem;
  align-self: flex-start;
`;

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
`;

const BudgetCard = styled.div`
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  .program-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
    font-size: 0.85rem;
    color: #555;
    text-align: center;
  }

  .budget-amount {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--green-9, #2e7d32);
  }
`;

const StatusMessage = styled.div`
  margin-top: 0.75rem;
  color: ${(props) => (props.error ? 'red' : '#666')};
  font-style: italic;
`;

export default function ProgramBudgetList({ onSetBudgetClick }) {
  const { user } = useUser();
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

  // Check if user is admin to determine whether to show the button
  const isAdmin = user && user.position_title === 'admin';

  return (
    <BudgetListContainer>
      <BudgetHeader>
        <h2>Budget</h2>
        {isAdmin && onSetBudgetClick && (
          <BudgetButton onClick={onSetBudgetClick}>Set Budget</BudgetButton>
        )}
      </BudgetHeader>
      <BudgetGrid>
        {programBudgets.map((program) => {
          // Helper function to capitalize first letter
          const capitalizeFirstLetter = (string) => {
            if (!string) return 'Unknown Program';
            return string.charAt(0).toUpperCase() + string.slice(1);
          };
          return (
            <BudgetCard key={program.program_id}>
              <div className='program-title'>
                {capitalizeFirstLetter(program.program_title)}
              </div>
              <div className='budget-amount'>
                ${parseFloat(program.program_budget).toFixed(2)}
              </div>
            </BudgetCard>
          );
        })}
      </BudgetGrid>
    </BudgetListContainer>
  );
}
