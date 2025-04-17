import React from 'react';

import 'App.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/Button';
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
  cursor: pointer;
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
            <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={handleNavigation}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15H22.4M19.4 9H22.4M4.6 15H1.6M4.6 9H1.6M15 19.4V22.4M9 19.4V22.4M15 4.6V1.6M9 4.6V1.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
