import React, { useState } from 'react';
import {
  AdminHomePage,
  ContentContainer,
  LeftAlignedTitle,
} from './AdminHomeStyles';
import NewMonthlyBudget from 'common/components/admin_modals/NewMonthlyBudget';
import OrderTable from 'common/components/OrderTable';
import ProgramBudgetList from 'common/components/ProgramBudgetList';

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
        <ProgramBudgetList
          onSetBudgetClick={() => {
            setShowBudgetPopup(true);
            console.log('Set Budget button clicked');
          }}
        />
        {showBudgetPopup && (
          <NewMonthlyBudget
            onCancel={() => setShowBudgetPopup(false)}
            onConfirm={handleBudgetUpdate}
          />
        )}
      </ContentContainer>
      <OrderTable />
    </AdminHomePage>
  );
}
