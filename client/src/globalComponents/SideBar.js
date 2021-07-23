import React, { useState } from "react";
import styled from "styled-components";
import profilePhoto from "../Assets/robotArm.jpg";
import { theme } from "../globalStyles";

const SideBarContainer = styled.div`
position fixed;
width: 300px;
// top:10%;
left: 0;
z-index: -1;
background: #242E38;
height: 100vh;

@media only screen and (max-width: 720px) {
    display: none;
}
`;
const ContentWrapper = styled.div`
  left: 1%;
  height: 80vh;
  //   padding: 10px;
  position: fixed;
  top: 15%;
  width: 300px;
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;
const LogoWrapper = styled.div`
  margin-left: 2rem;
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;
const CompanyName = styled.h4`
  margin-top: 15px;
  font-size: 24px;
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;
const Logo = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 87px;
  height: 87px;
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 300px;
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 7rem;
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;
const SideBarButton = styled.button`
  cursor: pointer;
  width: 220px;
  height: 50px;
  font-weight: bold;
  box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.25);
  background: ${(props) => {
    return props.id == props.activeButton
      ? theme.PrimaryBtnBg
      : theme.SecondaryBtnBg;
  }};
  color: ${(props) => {
    return props.id == props.activeButton
      ? theme.PrimaryTxt
      : theme.SecondaryTxt;
  }};
  border: none;
  font-size: 24px;
  margin: 1rem;
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;

const SideBar = () => {
  const [activeButton, setActiveButton] = useState(1);

  const handleClick = (e) => {
    setActiveButton(e.target.id);
  };
  return (
    <>
      <SideBarContainer className="SideBarContainer"></SideBarContainer>
      <ContentWrapper className="ContentWrapper">
        <LogoWrapper>
          <Logo src={profilePhoto} />
          <CompanyName>Company Name</CompanyName>
        </LogoWrapper>
        <ButtonWrapper className="ButtonWrapper">
          <SideBarButton
            activeButton={activeButton}
            id={1}
            onClick={handleClick}
          >
            Profile
          </SideBarButton>
          <SideBarButton
            activeButton={activeButton}
            id={2}
            onClick={handleClick}
          >
            Applications
          </SideBarButton>
          <SideBarButton
            activeButton={activeButton}
            id={3}
            onClick={handleClick}
          >
            Job Listings
          </SideBarButton>
          <SideBarButton
            activeButton={activeButton}
            id={4}
            onClick={handleClick}
          >
            Add New Job
          </SideBarButton>
        </ButtonWrapper>
      </ContentWrapper>
    </>
  );
};

export default SideBar;