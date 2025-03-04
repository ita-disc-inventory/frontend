import React, { useState } from 'react';

import { Input } from './form/Input';

// Adjust the import path as necessary

export default function SomeOtherComponent() {
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div>
      <Input.Text
        title='Username'
        value={textValue}
        onChange={handleTextChange}
        placeholder='Enter your username'
        required
      />
      <Input.Password
        title='Password'
        value={passwordValue}
        onChange={handlePasswordChange}
        placeholder='Enter your password'
        required
      />
    </div>
  );
}
