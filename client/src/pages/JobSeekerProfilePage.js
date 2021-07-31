import React from "react";
import styled from "styled-components";
import {useGlobalState} from '../utils/globalContext'
import {
  ProfileInput,
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
const AboutUser = styled.textarea`
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
const JobSeekerProfilePage = () => {

  
  const { store} = useGlobalState()
  const {loggedInUser}=store


  return (
    <>
    { loggedInUser? 
    <>
      <ProfileContainer>
      <Heading>User Profile</Heading>
      <FormDiv>
      <SubHeading>Jo Bloggs</SubHeading>
      <ProfileInput placeholder="Email"></ProfileInput>
      <InputLabel>Email</InputLabel>
      <ProfileInput placeholder="Phone"></ProfileInput>
      <InputLabel>Phone</InputLabel>
      <ProfileInput placeholder="Website"></ProfileInput>
      <InputLabel>Website</InputLabel>
      </FormDiv>
      <FormDiv>

        <SubHeading>About You</SubHeading>
        <AboutUser placeholder="All about you!!!"></AboutUser>
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
        </> : <> </>
      }
      </>
        );
      };
      
      export default JobSeekerProfilePage;
      