import React, { useState } from 'react'
import { logOut } from "../services/authServices";
import { useGlobalState } from '../utils/globalContext'
 import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { ModalBtn } from './Buttons'
import LoginModal from "../modals/LoginModal";
import SelectUserModal from "../modals/SelectUserModal";
import styled from 'styled-components'
import { theme } from "../globalStyles";
import { FaBars, FaTimes } from 'react-icons/fa'

const MobileContainer = styled.div`
max-width:768px;
width:100%;

border-bottom: 1px solid ${(props) => theme.PrimaryBtnBg};
background: ${(props) => theme.NavBg};
display: flex;
justify-content: space-between;
align-items:center;
height:8vh;
`;

const MobileIcon = styled.div`
display: block;
transform: translate(-50%, 10%);
font-size: 1.8rem;
cursor: pointer;
`;

const NavMenu = styled.ul`
z-index:25;
text-align:center;
display: flex;
flex-direction: column;
justify-content:center;
align-items:center;
border:red solid 2px;
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


const NavItem = styled.li`
transition: all 0.8s ease-out;
box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.25);
background: ${(props) => {
    const id = parseInt(props.id)
    const active= parseInt(activeButton)
    return id === active
      ? theme.PrimaryBtnBg
      : theme.SecondaryBtnBg;
  }};

width:400px;
border: none;
font-size: 24px;
margin: 2rem;
`;


const NavLinks = styled.a`
text-decoration:none;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;

padding: 1rem;
color: ${(props) => {
  const id = parseInt(props.id)

  return id === parseInt(activeButton)

    ? theme.PrimaryTxt
    : theme.SecondaryTxt;
}};
`;
// const NavButton = styled.button`
// display:flex;
// align-items:center;
// justify-content:center;
// margin: 2rem;
// height:50px;
// font-size:18px;
// font-weight:500;
// width:200px;
// background:${(props) => theme.PrimaryBtnBg};
// `;


const Logo = styled.h1`
margin-left:2rem;
color: ${(props) => theme.PrimaryTxt};
font-size: 18px; 
`;

const NavMobile = () => {
  let history = useHistory()

  const { dispatch, store } = useGlobalState()
  const { loggedInUser, isEmployer } = store

  // Using state to open a select user to Login modal when a User Clicks Login
  const [showLoginModal, setLoginModal] = useState(false);

  // Using state to open a Select User modal when a User Clicks Register
  const [showSelectUserModal, setSelectUserModal] = useState(false);

  // Opens The Mobile Nav Menu
  const [click, setClick] = useState(false);
  // Tracks what button has been selected for highlighting purposes
  const [activeButton, setActiveButton] = useState(1);

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
    setClick((prev) => !prev)
  };

  const closeMobileMenu = () => setClick(false);

  const handleIdChange = (e) => {
    console.log(activeButton)
    setActiveButton(e.target.id);
  };
  // 
  function handleLogout(event) {
    event.preventDefault()
    logOut(loggedInUser)
      .then(() => {

        dispatch({ type: 'setLoggedInUser', data: null })
        history.push("/")
      })
  }

  return (
    <MobileContainer>
      <Logo onClick={closeMobileMenu}>DevSearch</Logo>
      <MobileIcon onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </MobileIcon>
      {loggedInUser ?
        isEmployer ?
          <NavMenu onClick={handleClick} click={click}>
            <NavItem onClick={handleIdChange} 
              id={1}>
              <NavLinks 
                id={1} to="/">Profile</NavLinks>
            </NavItem>
            <NavItem onClick={handleIdChange} 
              id={2}>
              <NavLinks 
                id={2} href="javascript:void(0)">Job Listings</NavLinks>
            </NavItem>
            <NavItem onClick={handleIdChange} 
              id={3}>
              <NavLinks 
                id={3} to="/">Applications</NavLinks>
            </NavItem>
            <NavItem onClick={handleIdChange} 
              id={4}>
              <NavLinks to="/">Add New Job</NavLinks>
            </NavItem>
            <ModalBtn onClick={handleLogout}>Logout</ModalBtn>
          </NavMenu>
          : <NavMenu onClick={handleClick} click={click}>
            <NavItem onClick={handleIdChange} 
              id={1}>
              <NavLinks 
                id={1} to="/">Profile</NavLinks>
            </NavItem>
            <NavItem onClick={handleIdChange} 
              id={2}>
              <NavLinks 
                id={2} href="http://localhost:3000/">Job Listings</NavLinks>
            </NavItem>
            <NavItem onClick={handleIdChange} 
              id={3}>
              <NavLinks 
                id={3} to="/">Applications</NavLinks>
            </NavItem>
            <ModalBtn onClick={handleLogout}>Logout</ModalBtn>
          </NavMenu>
        :
        <NavMenu onClick={handleClick} click={click}>
          <LoginModal
            showLoginModal={showLoginModal}
            setLoginModal={setLoginModal}
          ></LoginModal>
          <SelectUserModal
            showSelectUserModal={showSelectUserModal}
            setSelectUserModal={setSelectUserModal}
          />
          <ModalBtn onClick={openLoginModal} >Login</ModalBtn>
          <ModalBtn onClick={openSelectUserModal} >Register</ModalBtn>
        </NavMenu>
      }
    </MobileContainer>
  )
}

export default NavMobile
