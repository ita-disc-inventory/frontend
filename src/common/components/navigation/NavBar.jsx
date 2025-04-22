import React from 'react';

import 'App.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/form/Button';
import { useUser } from 'common/contexts/UserContext';

const StyledNav = styled.nav`
  display: flex;
  background-color: #d9d9d920;
  height: 60px;
  width: 100%;
  font-size: 20px;
`;

const LeftAligned = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;
const RightAligned = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 20px;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
`;

export default function NavBar() {
  const navigate = useNavigate();
  const { user } = useUser();

  //if log in, show account seeting, if not, show log in. no setup.
  const handleNavigation = () => {
    navigate('/settings');
  };

  return (
    <StyledNav>
      <LeftAligned>
        <LogoPlaceholder onClick={() => navigate('/')}>
          <img
            id='ITAlogo'
            src={`${process.env.PUBLIC_URL}/ITAlogo.png`}
            alt='ITA Logo'
          />
        </LogoPlaceholder>
      </LeftAligned>
      <>
        {user && ( // If user is logged in, show their name and settings icon
          <RightAligned>
            <span id='userName_display'>
              {user.firstname} {user.lastname}
            </span>
            <span
              style={{ marginLeft: '10px', cursor: 'pointer' }}
              onClick={handleNavigation}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19.4 15.1C19.6 14.4 19.7 13.7 19.7 13C19.7 12.3 19.6 11.6 19.4 10.9L21.5 9.2C21.7 9 21.8 8.7 21.7 8.4L20.1 5.6C20 5.4 19.7 5.3 19.5 5.4L17 6.3C16.2 5.7 15.3 5.2 14.3 4.9L13.9 2.3C13.9 2.1 13.7 2 13.5 2H10.5C10.3 2 10.1 2.1 10.1 2.3L9.7 4.9C8.7 5.2 7.8 5.7 7 6.3L4.5 5.4C4.3 5.3 4 5.4 3.9 5.6L2.3 8.4C2.2 8.7 2.3 9 2.5 9.2L4.6 10.9C4.4 11.6 4.3 12.3 4.3 13C4.3 13.7 4.4 14.4 4.6 15.1L2.5 16.8C2.3 17 2.2 17.3 2.3 17.6L3.9 20.4C4 20.6 4.3 20.7 4.5 20.6L7 19.7C7.8 20.3 8.7 20.8 9.7 21.1L10.1 23.7C10.1 23.9 10.3 24 10.5 24H13.5C13.7 24 13.9 23.9 13.9 23.7L14.3 21.1C15.3 20.8 16.2 20.3 17 19.7L19.5 20.6C19.7 20.7 20 20.6 20.1 20.4L21.7 17.6C21.8 17.3 21.7 17 21.5 16.8L19.4 15.1Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <circle
                  cx='12'
                  cy='13'
                  r='4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLine='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
          </RightAligned>
        )}
      </>
    </StyledNav>
  );
}
//user.position === 'admin'
//user.position == 'therapist'
