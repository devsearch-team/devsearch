import React, { useState } from "react";
import { logOut } from "../services/authServices";
import { useGlobalState } from "../utils/globalContext";
 import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ModalBtn } from "./Buttons";
import LoginModal from "../modals/LoginModal";
import SelectUserModal from "../modals/SelectUserModal";
import styled from "styled-components";
import { theme } from "../globalStyles";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileContainer = styled.div`
  max-width: 768px;
  width: 100%;
  border-bottom: 1px solid ${(props) => theme.PrimaryBtnBg};
  background: ${(props) => theme.NavBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  `;
  
  const MobileIcon = styled.div`
  display: block;
  transform: translate(-50%, 10%);
  font-size: 1.8rem;
  cursor: pointer;
  `;
  const UserName = styled.h1`
  font-weight:600;
  font-size: 24px;
  margin-top:-3rem;
  margin-bottom:1rem;
  `;
  const NavMenu = styled.div`
  z-index: 25;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 100vw;
  height: 100vh;
  border-top: 1px solid ${(props) => theme.PrimaryBtnBg};
  position: absolute;
  top: 8vh;
  left: ${({ click }) => (click ? 0 : "-300%")};
  opacity: 1;
  transition: all 1s ease;
  background: ${(props) => theme.NavBg};
`;


  const NavLinks = styled(Link)`
  border: 1px solid ${theme.Accent};
  text-decoration: none;
  width: 200px;
  height:55px;
  margin:0.5rem 0rem;
  transition: all 0.8s ease-out;
  box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${(props) => {
    const id = parseInt(props.id);
    const active = parseInt(props.activebutton);
    return id === active ? theme.PrimaryBtnBg : theme.TransparentBtnBg;
  }};
  color: ${(props) => {
    const id = parseInt(props.id);
    const active = parseInt(props.activebutton);
    return id === active
      ? theme.PrimaryTxt
      : theme.SecondaryFadedTxt;
  }};
  padding: 1rem;
  @media only screen and (max-height: 600px){
    width: 150px;
    height:45px;
  }
  @media only screen and (max-height: 550px){
    width: 150px;
    height:40px;
  }
`;


const Logo = styled.h1`
  margin-left: 2rem;
  color: ${(props) => theme.PrimaryTxt};
  font-size: 18px;
`;

const NavMobile = () => {
  let history = useHistory();

  const { dispatch, store } = useGlobalState();
  const { loggedInUser, isEmployer } = store;

  // Using state to open a select user to Login modal when a User Clicks Login
  const [showLoginModal, setLoginModal] = useState(false);

  // Using state to open a Select User modal when a User Clicks Register
  const [showSelectUserModal, setSelectUserModal] = useState(false);

  // Opens The Mobile Nav Menu
  const [click, setClick] = useState(false);
  // Tracks what button has been selected for highlighting purposes
  const [activebutton, setActiveButton] = useState(1);

  // This function runs when the Login button is pressed
  const openLoginModal = () => {
    setClick((prev) => !prev);
    setLoginModal((prev) => !prev);
  };

  // This function runs when the Register button is pressed
  const openSelectUserModal = () => {
    setClick((prev) => !prev);
    setSelectUserModal((prev) => !prev);
  };

  const handleClick = (e) => {
    setClick((prev) => !prev);
  };

  const closeMobileMenu = () => setClick(false);

  const handleIdChange = (e) => {
    console.log(activebutton);
    setActiveButton(e.target.id);
  };
  //
  function handleLogout(event) {
    event.preventDefault();
    logOut(loggedInUser).then(() => {
      dispatch({ type: "setLoggedInUser", data: null });
      history.push("/");
    });
  }

  return (
    <MobileContainer>
      <Logo onClick={closeMobileMenu}>DevSearch</Logo>
      <MobileIcon onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </MobileIcon>
      {loggedInUser ? (
        isEmployer ? (
          // Employer
          
          <NavMenu onClick={handleClick} click={click}>
            <UserName>{loggedInUser}</UserName>  
              <NavLinks onClick={handleIdChange} id={1}  to="/employer/profile" activebutton={activebutton}>
                Profile
              </NavLinks>
           
            
              <NavLinks onClick={handleIdChange} id={2}  to="/employer/jobs" activebutton={activebutton}>
                Job Listings
              </NavLinks>
            
            
              <NavLinks onClick={handleIdChange} id={3} to="/employer/applications" activebutton={activebutton}>
                Applications
              </NavLinks>
            
            
              <NavLinks  onClick={handleIdChange} id={4} to="/employer/newjob" activebutton={activebutton}>Add New Job</NavLinks>
            
            <ModalBtn onClick={handleLogout}>Logout</ModalBtn>
          </NavMenu>
        ) : (
          // Job Seeker
          <NavMenu onClick={handleClick} click={click}>
            <UserName>{loggedInUser}</UserName> 
              <NavLinks onClick={handleIdChange} id={1} to="/seeker/profile" activebutton={activebutton}>
                Profile
              </NavLinks>
            
            
              <NavLinks onClick={handleIdChange} id={2} to="/seeker/jobs" activebutton={activebutton}>
                Job Listings
              </NavLinks>
            
              <NavLinks onClick={handleIdChange} id={3} to="/seeker/applications" activebutton={activebutton}>
                Applications
              </NavLinks>
            
            <ModalBtn onClick={handleLogout}>Logout</ModalBtn>
          </NavMenu>
        )
      ) : (
        // Not Logged In
        <NavMenu onClick={handleClick} click={click}>
          <LoginModal
            showLoginModal={showLoginModal}
            setLoginModal={setLoginModal}
          ></LoginModal>
          <SelectUserModal
            showSelectUserModal={showSelectUserModal}
            setSelectUserModal={setSelectUserModal}
          />
          <ModalBtn onClick={openLoginModal}>Login</ModalBtn>
          <ModalBtn onClick={openSelectUserModal}>Register</ModalBtn>
        </NavMenu>
      )}
    </MobileContainer>
  );
};

export default NavMobile;
