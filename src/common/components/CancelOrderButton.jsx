import React from 'react';

export default function CancelOrderButton() {
  return (
    <button
      onClick={() => window.alert('Button Clicked!')}
      style={{
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 12px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s ease',
      }}
    >
      Cancel
    </button>
  );
}
