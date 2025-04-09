import FormPopup from 'common/components/templates/FormPopup';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AdminFormPopup({ open, onCancel, onConfirm }) {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ role, email, password });
  };

  return (
    <FormPopup
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel();
      }}
      title='Admin Access'
      description='Please choose a role and provide your credentials'
      onSubmit={handleSubmit}
      submitText='Save'
      cancelText='Close'
      cancelOnClick={onCancel}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value='admin'>Admin</option>
            <option value='super_admin'>Super Admin</option>
          </select>
        </label>

        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
    </FormPopup>
  );
}

AdminFormPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
