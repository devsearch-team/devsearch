import React, { useState } from "react";
import { useGlobalState } from "../utils/globalContext";
import styled from "styled-components";
import profilePhoto from "../Assets/robotArm.jpg";
import { theme } from "../globalStyles";
import { Link } from "react-router-dom";
const SideBarContainer = styled.div`
position fixed;
width: 300px;
display:grid;
grid-area: sidebar;
z-index: -1;
background: #242E38;
height: 100vh;
@media only screen and (max-width: 1400px) {
  width:250px
}
@media only screen and (max-width: 1200px) {
width:230px;
}
@media only screen and (max-width: 768px) {
  display: none;
}
`;
const ContentWrapper = styled.div`
  display: grid;
  top: 20%;
  position: fixed;
  grid-area: sidebar;
  width: 300px;
  @media only screen and (max-width: 1400px) {
    width: 250px;
  }
  @media only screen and (max-width: 1200px) {
    width: 230px;
    max-width: 60%;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const LogoWrapper = styled.div`
  margin-left: 2rem;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const Heading = styled.h4`
  margin-top: 15px;
  margin-left: 1rem;
  font-size: 22px;
  @media only screen and (max-width: 1200px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const Logo = styled.img`
  object-fit: cover;
  margin-left: 1rem;
  border-radius: 50%;
  width: 87px;
  height: 87px;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  width: 250px;
  z-index: 3;
  margin-left: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 3rem;
  @media only screen and (max-width: 1400px) {
    width: 230px;
  }
  @media only screen and (max-width: 1200px) {
    width: 200px;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const SideBarButton = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  // width: 220px;
  height: 100px;
  text-align: center;
  font-weight: bold;
  // box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.25);
  background: ${(props) => {
    const id = parseInt(props.id);
    const active = parseInt(props.activebutton);
    return id === active ? theme.PrimaryBtnBg : theme.TransparentBtnBg;
  }};
  color: ${(props) => {
    const id = parseInt(props.id);
    const active = parseInt(props.activebutton);
    return id === active ? theme.PrimaryTxt : theme.MainBg;
  }};
  border: 1px solid ${theme.Accent};
  font-size: 24px;
  margin: 1rem;
  &:hover {
    background: ${theme.PrimaryBtnBg};
    color: ${theme.PrimaryTxt};
  }
  @media only screen and (max-width: 1400px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 1200px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const SideBar = () => {
  const {  store } = useGlobalState();
  const { loggedInUser, isEmployer } = store;


  //  activebutton is used to controll what button is active, the reason for all lowercase is due to a warning when using uppercase letters on DOM elements
  const [activebutton, setActiveButton] = useState(1);
  const handleClick = (e) => {
    setActiveButton(e.target.id);
  };
  return (
    <>
    {loggedInUser ? (
        isEmployer ? (
        // Employer
          <>
      <SideBarContainer className="SideBarContainer"></SideBarContainer>
      <ContentWrapper className="ContentWrapper">
        <LogoWrapper>
          <Logo src={profilePhoto} />
          <Heading>{loggedInUser}</Heading>
        </LogoWrapper>
        <ButtonWrapper className="ButtonWrapper">
          <SideBarButton
            activebutton={activebutton}
            id={1}
            onClick={handleClick}
            to="/employer/profile"
          >
            Profile
          </SideBarButton>
          <SideBarButton
            to="/employer/applications"
            activebutton={activebutton}
            id={2}
            onClick={handleClick}
          >
            Applications
          </SideBarButton>
          <SideBarButton
            activebutton={activebutton}
            id={3}
            onClick={handleClick}
            to="/employer/jobs"
          >
            Job Listings
          </SideBarButton>
          <SideBarButton
            activebutton={activebutton}
            id={4}
            onClick={handleClick}
            to="/employer/newjob"
          >
            Add New Job
          </SideBarButton>
        </ButtonWrapper>
      </ContentWrapper>
      </>
        ) : (
             //  JobSeeker
       <>
      <SideBarContainer className="SideBarContainer"></SideBarContainer>
      <ContentWrapper className="ContentWrapper">
        <LogoWrapper>
          <Logo src={profilePhoto} />
          <Heading>Company Name</Heading>
        </LogoWrapper>
        <ButtonWrapper className="ButtonWrapper">
          <SideBarButton
            activebutton={activebutton}
            id={1}
            onClick={handleClick}
            to="/seeker/profile"
          >
            Profile
          </SideBarButton>
          <SideBarButton
            to="/seeker/applications"
            activebutton={activebutton}
            id={2}
            onClick={handleClick}
          >
            Applications
          </SideBarButton>
          <SideBarButton
            activebutton={activebutton}
            id={3}
            onClick={handleClick}
            to="/seeker/jobs"
          >
            Job Listings
          </SideBarButton>
        </ButtonWrapper>
      </ContentWrapper>
      </>
             
           )
        ) : (
           
           //  Not Logged In
           <></>
           )}
           
  </>
  );
};
export default SideBar;
