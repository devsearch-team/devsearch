import React from "react";
import styled from "styled-components";
import { Input } from "../globalComponents/Inputs";
import { ThemeConsumer, Container } from "../globalStyles";
import RobotArm from "../Assets/robotArm.jpg";
const ProfileContainer = styled.div`
  position: absolute;
  top: 25%;
  border: 1px solid red;
  margin-left: 7rem;
  display: flex;
  flex-direction: column;
  width: 60vw;
 height 100vh;
`;

const Heading = styled.h1`
  margin: 1rem 0;
`;
const Name = styled.h2`
  margin: 1rem 0;
`;
const CompanyLogo = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  width: 100%;
`;
const Logo = styled.img`
  max-width: 350px;
  max-height: 150px;
  object-fit: contain;
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 80%;
`;

const InputLabel = styled.label`
  font-weight: 500;
  font-size: 18px;
  margin: 0.5rem 0;
`;

const EmployerProfilePage = () => {
  return (
    <ProfileContainer>
      <Heading>Company Profile</Heading>
      <CompanyLogo>
        <p>Company Logo</p>
        <Logo src={RobotArm} alt="Company Logo"></Logo>
      </CompanyLogo>
      <FormDiv>
        <Name>RoboDev</Name>

        <InputLabel>Email</InputLabel>
        <Input placeholder="Email"></Input>
        <InputLabel>Email</InputLabel>
        <Input placeholder="Phone"></Input>
        <InputLabel>Phone</InputLabel>
        <Input placeholder="website"></Input>
        <InputLabel>website</InputLabel>
        <Input placeholder="street Address"></Input>
        <InputLabel>street Address</InputLabel>
        <Input placeholder="Email"></Input>
        <InputLabel>Street Address Line 2</InputLabel>
        <Input placeholder="Street Address Line 2"></Input>
      </FormDiv>
    </ProfileContainer>
  );
};

export default EmployerProfilePage;
