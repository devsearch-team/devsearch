import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";
import LoginModal from "../modals/LoginModal";
import SelectUserModal from "../modals/SelectUserModal";

const NavWrapper = styled.nav`
  width: 100%;
  // visibility:hidden;
  background: ${(props) => theme.NavBg};
  display: grid;
  grid-area:navbar;
  z-index: 25;
  // margin-top:10px;
  border-bottom: 1px solid ${(props) => theme.PrimaryBtnBg};
  position: fixed;
  top: 0;
  `;
  const InnerNavWrapper = styled.div`
  // position:fixed;
  justify-content: space-between;
  width: 100%;
  display:flex;
  height: 95px;
  align-items: center;
  
  `;

const LogoWrapper = styled.div`
  text-align: center;
  align-items:center;
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
  const [showLoginModal, setLoginModal] = useState(false);

  // This function runs when the Login button is pressed
  const openLoginModal = () => {
    setLoginModal((prev) => !prev);
  };
  // Using state to open a Select User modal when a User Clicks Register
  const [showSelectUserModal, setSelectUserModal] = useState(false);

  // This function runs when the Register button after prefilling the email address is selected
  const openSelectUserModal = () => {
    setSelectUserModal((prev) => !prev);
  };
  return (
    <NavWrapper>
      <InnerNavWrapper>

      <LogoWrapper>
        <Logo> DevSearch.io</Logo>
      </LogoWrapper>
      <NavLinks>
        <NavItem onClick={openLoginModal}>Login</NavItem>
        <Line />
        <NavItem onClick={openSelectUserModal}>Register</NavItem>
      </NavLinks>
      <LoginModal
        showLoginModal={showLoginModal}
        setLoginModal={setLoginModal}
        ></LoginModal>
      <SelectUserModal
        showSelectUserModal={showSelectUserModal}
        setSelectUserModal={setSelectUserModal}
        />
        </InnerNavWrapper>
    </NavWrapper>
  );
};

export default NavBar;
