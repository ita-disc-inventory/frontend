import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import GoogleButton from 'common/components/GoogleButton';
import { Form, FormTitle } from 'common/components/form/Form';
import { Input } from 'common/components/form/Input';
import SubmitButton from 'common/components/form/SubmitButton';
import { useUser } from 'common/contexts/UserContext';

import { StyledPage } from './styles';

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  align-self: center;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { googleAuth } = useUser();

  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
  });

  const handleChangeFirstname = (e) => {
    setFormState({ ...formState, firstname: e.target.value });
    setError('');
  };

  const handleChangeLastname = (e) => {
    setFormState({ ...formState, lastname: e.target.value });
    setError('');
  };

  const handleChangeEmail = (e) => {
    setFormState({ ...formState, email: e.target.value });
    setError('');
  };

  const handleChangePassword = (e) => {
    setFormState({ ...formState, password: e.target.value });
    setError('');
  };

  const handleChangeUsername = (e) => {
    setFormState({ ...formState, username: e.target.value });
    setError('');
  };

  const handleGoogleSignup = async () => {
    try {
      await googleAuth();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.email,
            password: formState.password,
            username: formState.username || undefined,
            firstname: formState.firstname || undefined,
            lastname: formState.lastname || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }
      alert(
        'Account created successfully! Please check your email to verify your account.'
      );
      navigate('/login', {
        state: {
          message:
            'Account created successfully! Please check your email to verify your account.',
        },
      });
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPage>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Create an account</FormTitle>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
        <Input.Text
          title='First name'
          placeholder='John'
          value={formState.firstname}
          onChange={handleChangeFirstname}
        />
        <Input.Text
          title='Last name'
          placeholder='Smith'
          value={formState.lastname}
          onChange={handleChangeLastname}
        />
        <Input.Text
          title='Email'
          placeholder='j@example.com'
          value={formState.email}
          onChange={handleChangeEmail}
          required
        />
        <Input.Text
          title='Username'
          placeholder='johnsmith'
          value={formState.username}
          onChange={handleChangeUsername}
        />
        <Input.Password
          title='Password'
          value={formState.password}
          onChange={handleChangePassword}
          required
        />
        <SubmitButton onClick={() => {}} disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </SubmitButton>
        <StyledLink to='/login'>
          Already have an account? Log in here!
        </StyledLink>
        <GoogleButton
          onClick={handleGoogleSignup}
          isLoading={isLoading}
          text='Sign up with Google'
        />
      </Form>
    </StyledPage>
  );
}
