import React from "react";
import styled from "styled-components";
import RobotArm from "../Assets/robotArm.jpg";
import { useGlobalState } from "../utils/globalContext";

import { theme } from "../globalStyles";

const AddJobContainer = styled.div`
  display: grid;
  grid-area: content;
  margin-top: 15rem;
  margin-left: 15rem;
  @media only screen and (max-width: 1200px) {
    margin-left: 15rem;
    width: 100%;
  }
  @media only screen and (max-width: 900px) {
    margin-left: 15rem;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 3rem;
    margin-left: 1rem;
    width: 100%;
  }
`;
const CompanyLogo = styled.div`
  margin: 1rem 0rem;
  width: 86px;
  height: 86px;
  overflow-y: hidden;
  border-radius: 50%;
`;
const Logo = styled.img`
  border: none;
  object-fit: cover;
  width: 100%;
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
    width: 100vw;
  }
`;
const TextBoxContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  justify-content: start;
  width: 100%;
  //   margin: 0rem 1rem;
`;

const InputField = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  margin: 1rem 0rem;
  border: none;
  color: ${theme.SecondaryTxt};
  font-size: 18px;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    max-width: 60%;
    width: 400px;
  }
`;
const InputButton = styled.button`
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  margin: 0rem 1rem;
  font-weight: 400;
  color: #fff;
  background: ${(props) => theme.PrimaryBtnBg};
  cursor: pointer;
  &:hover {
    font-weight: bold;
    box-shadow: 3px 3px 5px #333;
  }
  &:disabled {
    font-weight: 400;
    box-shadow: unset;
    cursor: unset;
    background: ${(props) => theme.DisabledPrimaryBtnBg};
  }
  @media only screen and (max-width: 800px) {
    width: 8rem;
    font-size: 14px;
  }
  @media only screen and (max-width: 768px) {
    // margin-left: 1.4rem;
    // text-align: center;
    font-size: 16px;
    max-width: 60%;
    width: 100%;
  }
`;
const ShortInput = styled.input`
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 1rem 0rem;
  color: ${theme.SecondaryTxt};
  font-size: 18px;
  // @media only screen and (max-width: 800px) {
  //   font-size: 14px;
  //   max-width: 160px;
  // }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    max-width: 60%;
    width: 300px;
  }
`;
// const InputLabel = styled.label`
//   font-weight: 500;
//   //   display: flex;
//   font-size: 18px;
//   padding-left: 0.5rem;
//   opacity: 0.5;
//   @media only screen and (max-width: 768px) {
//     font-size: 14px;
//     opacity: 0.5;
//   }
// `;
const DescContainer = styled.textarea`
  width: 600px;
  height: 400px;
  background: ${theme.NavBg};
  font-size: 18px;
  border: 1px solid ${theme.Accent};
  resize: none;
  padding: 10px;
  @media only screen and (max-width: 900px) {
    width: 500px;
  }
  @media only screen and (max-width: 800px) {
    // width: 400px;
    max-width: 80%;
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    // width: 400px;
    max-width: 80%;

    height: 300px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin: 0 1rem;
  @media only screen and (max-width: 768px) {
    margin: 0;
    font-size: 16px;
    max-width: 75%;
    width: 100%;
  }
`;
const AddNewJob = () => {
  const { store } = useGlobalState();
  const { loggedInUser } = store;

  return (
    <>
      {loggedInUser ? (
        <>
          <AddJobContainer>
            <CompanyLogo>
              <Logo src={RobotArm} alt="Company Logo"></Logo>
            </CompanyLogo>
            <Heading>Position Title</Heading>
            <FormDiv>
              <TextBoxContainer>
                <InputField placeholder="Location"></InputField>
              </TextBoxContainer>
              <TextBoxContainer>
                <ShortInput placeholder="Minimum Pay Rate"></ShortInput>
              </TextBoxContainer>
              <TextBoxContainer>
                <ShortInput placeholder="Maximum Pay Rate"></ShortInput>
              </TextBoxContainer>
              <TextBoxContainer>
                <InputField placeholder="Category"></InputField>
              </TextBoxContainer>
            </FormDiv>

            <FormDiv>
              <SubHeading>About Company</SubHeading>
              <DescContainer placeholder="About your company!!!"></DescContainer>
            </FormDiv>
            <FormDiv>
              <SubHeading>Role Description</SubHeading>
              <DescContainer placeholder="Describe the role!!!"></DescContainer>
            </FormDiv>
            <FormDiv>
              <SubHeading>Role Requirements</SubHeading>
              <DescContainer placeholder="Describe the role!!!"></DescContainer>
            </FormDiv>
            <BtnContainer>
              <InputButton>Save</InputButton>
              <InputButton
                style={{
                  background: theme.SecondaryBtnBg,
                  color: theme.SecondaryTxt,
                }}
              >
                Cancel
              </InputButton>
            </BtnContainer>
            <div style={{ margin: "2rem" }}> </div>
          </AddJobContainer>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default AddNewJob;
