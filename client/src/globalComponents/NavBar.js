import React from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";

const NavWrapper = styled.nav`
  width: 100%;
  background: ${(props) => theme.NavBg};
  height: 95px;
  border-bottom: 1px solid ${(props) => theme.PrimaryBtnBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;
const LogoWrapper = styled.div`
  text-align: center;
  margin-left: 10%;
`;
const Logo = styled.p`
  font-weight: 400;
  color: #fff;
  font-size: 36px;
  cursor: pointer;
`;
const NavLinks = styled.ul`
  display: flex;
  margin-right: 10%;
`;
const NavItem = styled.li`
  list-style: none;
  font-size: 24px;
  color: white;
  margin: 0 1.5rem;
  &:hover {
    cursor: pointer;
    color: ${(props) => theme.Accent};
  }
`;
const Line = styled.div`
  width: 1px;
  background: ${(props) => theme.Accent};
  height: 24px;
  position: relative;
  margin: 0.5rem;
`;

const NavBar = () => {
  return (
    <NavWrapper>
      <LogoWrapper>
        <Logo> DevSearch.io</Logo>
      </LogoWrapper>
      <NavLinks>
        <NavItem>Login</NavItem>
        <Line />
        <NavItem>Register</NavItem>
      </NavLinks>
    </NavWrapper>
  );
};

export default NavBar;
