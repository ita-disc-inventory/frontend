import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OrderTable from 'common/components/OrderTable';
import { Title as BaseTitle, Subtitle } from 'common/components/form/Text';
import NewMonthlyBudget from 'common/components/admin_modals/NewMonthlyBudget';

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
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  position: relative;
`;

const BudgetListContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  h2 {
    margin-top: 0;
    margin-bottom: 1.25rem;
    color: #333;
    font-weight: 600;
    text-align: center;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #eee;
  }
`;

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
`;

const BudgetCard = styled.div`
  padding: 1rem;
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
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #555;
    text-align: center;
  }

  .budget-amount {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--green-9, #2e7d32);
  }
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  color: ${(props) => (props.error ? 'red' : '#666')};
  font-style: italic;
`;

const SetBudgetButton = styled.button`
  display: flex;
  margin-left: auto;
  margin-right: 2rem;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: var(--green-9);
  border-radius: 6px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
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
      <h2>Program Budgets</h2>
      <BudgetGrid>
        {programBudgets.map((program) => (
          <BudgetCard key={program.program_id}>
            <div className='program-title'>
              {program.program_title || 'Unknown Program'}
            </div>
            <div className='budget-amount'>
              ${parseFloat(program.program_budget).toFixed(2)}
            </div>
          </BudgetCard>
        ))}
      </BudgetGrid>
    </BudgetListContainer>
  );
}

export default function AdminHome() {
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const handleBudgetUpdate = async (data) => {
    let budget = data.budget;
    let programID = data.programID;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/budget/${programID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            budget: budget,
          }),
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update budget: ${response.status}`);
      }
      const updatedBudget = await response.json();
      console.log('Budget updated successfully:', updatedBudget);
      // Increment the refresh trigger to force re-render and data refresh
      window.location.reload();
    } catch (error) {
      console.error('Error updating budget:', error);
    } finally {
      setShowBudgetPopup(false);
    }
  };
  return (
    <AdminHomePage>
      <ContentContainer>
        <LeftAlignedTitle>Admin Homepage</LeftAlignedTitle>
        <ProgramBudgetList />
        <SetBudgetButton
          onClick={() => {
            setShowBudgetPopup(true);
            console.log('Set Budget button clicked');
          }}
        >
          Set Budget
        </SetBudgetButton>
        {showBudgetPopup && (
          <NewMonthlyBudget
            onCancel={() => setShowBudgetPopup(false)}
            onConfirm={handleBudgetUpdate}
          />
        )}
      </ContentContainer>

      <ButtonContainer></ButtonContainer>
      <OrderTable />
    </AdminHomePage>
  );
}
