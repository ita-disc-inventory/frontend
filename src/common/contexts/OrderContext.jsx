import React, { createContext, useContext, useState } from 'react';

import PropTypes from 'prop-types';

// Create a context for order operations
const OrderContext = createContext({
  orderVersion: 0,
  refreshOrders: () => {},
});

// Create a provider component
export function OrderProvider({ children }) {
  const [orderVersion, setOrderVersion] = useState(0);

  // Function to increment the version to trigger re-renders
  const refreshOrders = () => {
    setOrderVersion((prev) => prev + 1);
  };

  return (
    <OrderContext.Provider value={{ orderVersion, refreshOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the order context
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
