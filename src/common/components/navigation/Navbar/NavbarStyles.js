import styled from 'styled-components';
import { Button } from 'common/components/form/Button';

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
  gap: 20px;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export { StyledNav, LeftAligned, RightAligned, LogoPlaceholder, NavLink };
