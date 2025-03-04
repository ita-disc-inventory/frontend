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

  return (
    <StyledNav>
      <LeftAligned>
        <LogoPlaceholder onClick={() => navigate('/')}>
          <img id='ITAlogo' src='ITAlogo.png' alt='ITA Logo' />
        </LogoPlaceholder>
      </LeftAligned>
      <>
        {user ? ( // If user is logged in, show their name (clickable to Account Settings)
          <RightAligned onClick={() => navigate('/setting')}>
            <span id='userName_display'>
              {user.firstname} {user.lastname}
            </span>
          </RightAligned>
        ) : (
          <Button.Secondary onClick={() => navigate('/login')}>
            Login
          </Button.Secondary>
        )}
      </>
    </StyledNav>
  );
}
