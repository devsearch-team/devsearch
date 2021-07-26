import React from "react";
import styled from "styled-components";
import {
  ProfileInput,
  ProfileLongInput,
  ProfileShortInput,
} from "../globalComponents/Inputs";
import { InputButton } from "../globalComponents/Buttons";
import { theme } from "../globalStyles";

const ProfileContainer = styled.div`
display:grid;
grid-area: content;
margin-top: 15rem;
margin-left:15rem;
@media only screen and (max-width: 1200px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 900px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 768px) {
  margin-left:1rem;
  width:100%;
}

`;

const Heading = styled.h1`
margin: 1rem 0;
@media only screen and (max-width: 768px) {
  font-size: 24px;
  margin: 1rem 1rem;
}
`;
const SubHeading = styled.h3`
margin: 1rem 0;
@media only screen and (max-width: 768px) {
  font-size: 18px;
  
}
`;


const FormDiv = styled.div`
display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
  @media only screen and (max-width: 768px) {
    margin: 1rem 1rem;
    width:100vw;
  }
`;

const SideBySideInputContainer = styled.div`
  width: 600px;
  display: grid;
  grid-template-rows: 1fr, 1fr;
  grid-template-areas: "left right" "leftLabel rightLabel";
 
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width:100%;
    // max-width: 600px;
  }

`;

const InputLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin: 5px;
  opacity: 0.5;
  @media only screen and (max-width: 768px) {
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
  @media only screen and (max-width: 900px) {
    width:500px;
    }
    @media only screen and (max-width: 800px) {
      // width: 400px;
      max-width:80%;
    }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    // width: 400px;
    max-width:80%;
    
    height: 300px;
  }
`;
const EmployerProfilePage = () => {
  return (
    <>
      {/* <CompanyLogo> */}
        {/* <Logo src={RobotArm} alt="Company Logo"></Logo> */}
      {/* </CompanyLogo> */}
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
        <FormDiv>
        <SubHeading>About Company</SubHeading>
        <AboutCompany placeholder="About your company!!!"></AboutCompany>

        </FormDiv>
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
