import React from "react";
import styled from "styled-components";
import {
  ProfileInput,
  ProfileLongInput,
  ProfileShortInput,
} from "../globalComponents/Inputs";
import { InputButton } from "../globalComponents/Buttons";
import { theme } from "../globalStyles";
import RobotArm from "../Assets/robotArm.jpg";
const ProfileContainer = styled.div`
  position: absolute;
  top: 25%;
  margin-left: 7rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 60vw;
  @media only screen and (max-width: 600px) {
    top: 25%;
    left: 0%;
    width: 100%;
    margin: 0rem 2rem;
  }
`;

const Heading = styled.h1`
  margin: 1rem 0;
  @media only screen and (max-width: 600px) {
    font-size: 24px;
  }
`;
const SubHeading = styled.h3`
  margin: 1rem 0;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const CompanyLogo = styled.div`
  position: absolute;
  top: 35%;
  left: 58%;
  width: 100%;
  @media only screen and (max-width: 600px) {
    top: 15%;
    left: 10%;
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
`;
const Logo = styled.img`
  max-width: 350px;
  max-height: 150px;
  object-fit: fill;
  @media only screen and (max-width: 600px) {
    object-fit: fill;
    border-radius: 50%;
    width: 75px;
    height: 75px;
  }
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 80%;
`;

const SideBySideInputContainer = styled.div`
  width: 600px;
  display: grid;
  grid-template-rows: 1fr, 1fr;
  grid-template-areas: "left right" "leftLabel rightLabel";

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
`;

const InputLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin: 5px;
  opacity: 0.5;
  @media only screen and (max-width: 600px) {
    font-size: 10px;
    opacity: 0.5;
  }
`;
const AboutCompany = styled.textarea`
  width: 600px;
  height: 400px;
  background: ${theme.NavBg};
  font-size: 18px;
  border: 1px solid ${theme.Accent};
  resize: none;
  padding: 10px;
  @media only screen and (max-width: 600px) {
    font-size: 14px;
    width: 250px;
    height: 300px;
  }
`;
const EmployerProfilePage = () => {
  return (
    <>
      <CompanyLogo>
        <Logo src={RobotArm} alt="Company Logo"></Logo>
      </CompanyLogo>
      <ProfileContainer>
        <Heading>Company Profile</Heading>
        <FormDiv>
          <SubHeading>RoboDev</SubHeading>
          <ProfileInput placeholder="Email"></ProfileInput>
          <InputLabel>Email</InputLabel>
          <ProfileInput placeholder="Phone"></ProfileInput>
          <InputLabel>Phone</InputLabel>
          <ProfileInput placeholder="Website"></ProfileInput>
          <InputLabel>Website</InputLabel>
        </FormDiv>
        <FormDiv>
          <SubHeading>Address</SubHeading>
          <ProfileLongInput placeholder="Street Address"></ProfileLongInput>
          <InputLabel>Street Address</InputLabel>
          <ProfileLongInput placeholder="Street Address Line 2"></ProfileLongInput>
          <InputLabel>Street Address Line 2</InputLabel>
          <SideBySideInputContainer>
            <ProfileShortInput
              style={{ gridArea: "left" }}
              placeholder="City"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "leftLabel" }}>City</InputLabel>
            <ProfileShortInput
              style={{ gridArea: "right" }}
              placeholder="State"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "rightLabel" }}>State</InputLabel>
          </SideBySideInputContainer>
          <SideBySideInputContainer>
            <ProfileShortInput
              style={{ gridArea: "left" }}
              placeholder="Postcode"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "leftLabel" }}>Postcode</InputLabel>
            <ProfileShortInput
              style={{ gridArea: "right" }}
              placeholder="Country"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "rightLabel" }}>Country</InputLabel>
          </SideBySideInputContainer>
        </FormDiv>
        <SubHeading>About Company</SubHeading>
        <AboutCompany placeholder="About your company!!!"></AboutCompany>
        <FormDiv>
          <SubHeading>Social Media</SubHeading>
          <SideBySideInputContainer>
            <ProfileShortInput
              style={{ gridArea: "left" }}
              placeholder="Facebook"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "leftLabel" }}>Facebook</InputLabel>
            <ProfileShortInput
              style={{ gridArea: "right" }}
              placeholder="Instagram"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "rightLabel" }}>
              Instagram
            </InputLabel>
          </SideBySideInputContainer>
          <SideBySideInputContainer>
            <ProfileShortInput
              style={{ gridArea: "left" }}
              placeholder="Twitter"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "leftLabel" }}>Twitter</InputLabel>
            <ProfileShortInput
              style={{ gridArea: "right" }}
              placeholder="Other"
            ></ProfileShortInput>
            <InputLabel style={{ gridArea: "rightLabel" }}>Other</InputLabel>
          </SideBySideInputContainer>
        </FormDiv>
        <InputButton>Save</InputButton>
        <div style={{ margin: "2rem" }}> </div>
      </ProfileContainer>
    </>
  );
};

export default EmployerProfilePage;
