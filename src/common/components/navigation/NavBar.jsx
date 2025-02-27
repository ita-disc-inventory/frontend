import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button } from "common/components/Button";
import { useUser } from "common/contexts/UserContext";

//import '/Users/zhangyixi/frontend/src/App.css';

const StyledNav = styled.nav`
  display: flex;
  background-color: #d9d9d920;
  height: 65px;
  width: 100%;
  font-size: 20px;
`;

const LeftAligned = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
`;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setIsModalOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  //if log in, show account seeting, if not, show log in. no setup.

  return (
    <StyledNav>
      <LeftAligned>
        <LogoPlaceholder onClick={() => navigate("/")}>
          <img id="ITAlogo" src="ITAlogo.png" alt="ITA Logo" />
        </LogoPlaceholder>
      </LeftAligned>
      <>
        {user ? ( // If user is logged in, show their name (clickable to Account Settings)
          <div onClick={() => navigate("/account")}>
            <span>
              {user.firstname}
              {user.lastname}
            </span>
          </div>
        ) : (
          <Button.Secondary onClick={() => navigate("/login")}>
            Login
          </Button.Secondary>
        )}
      </>
    </StyledNav>
  );
}
