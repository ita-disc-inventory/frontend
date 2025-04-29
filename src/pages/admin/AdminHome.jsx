import React, { useState } from 'react';
import styled from 'styled-components';

import OrderTable from 'common/components/OrderTable';
import { Title as BaseTitle } from 'common/components/form/Text';
import NewMonthlyBudget from 'common/components/admin_modals/NewMonthlyBudget';
import ProgramBudgetList from 'common/components/ProgramBudgetList';

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
