import React, { useState } from "react";
import styled from "styled-components";
import landingImage from "../Assets/landingImage.svg";
import { theme } from "../globalStyles";
import { InputButton } from "../globalComponents/Buttons";
import SelectUserModal from "../modals/SelectUserModal";
import { useGlobalState } from "../utils/globalContext";

// import EmployerProfilePage from "./EmployerProfilePage";

export default function LandingPage() {
  // Using state to open a Select User modal when a User Clicks Register
  const [showSelectUserModal, setSelectUserModal] = useState(false);
  const {  setLandingEmail } = useGlobalState();
  // This function runs when the Register button after prefilling the email address is selected
  const openSelectUserModal = () => {
    
    setSelectUserModal((prev) => !prev);
  };

  return (
    <div>
      <Container>
        <LeftSection>
          <Header>Hiring Staff? We got you!!</Header>
          <Header>Finding Work? We got you too!!</Header>
          <Text>
            Whether you are a job seeker looking for work or an employer looking
            for staff, we have the tools to help you succeed.
          </Text>
          <SelectUserModal
            showSelectUserModal={showSelectUserModal}
            setSelectUserModal={setSelectUserModal}
          />
          <FormDiv>
            <Input placeHolder="yourEmail@email.com" onChange={(e)=>{setLandingEmail(e.target.value)}}></Input>
            <InputButton onClick={openSelectUserModal}>
              Sign Up to DevSeach
            </InputButton>
          </FormDiv>
        </LeftSection>
        <RightSection>
          <Image src={landingImage} />
        </RightSection>
      </Container>
    </div>
  );
}

//styles
const Container = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 960px) {
    flex-direction: column-reverse;
    width: 100%;
    // height: 100%;
    margin: 3rem 2rem;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    width: 80%;
    // height: 100%;
    margin: 1rem 2rem;
  }
`;
const Header = styled.h1`
  font-size: 45px;
  font-family: roboto;
  color: ${(props) => theme.PrimaryTxt};
  margin: 0.5rem 0;
  @media only screen and (max-width: 960px) {
    font-size: 20px;
    text-align: left;
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    text-align: left;
  }
`;
const Text = styled.p`
  font-size: 24px;
  color: ${(props) => theme.PrimaryTxt};
  max-width: 550px;
  margin: 1rem 0;
  @media only screen and (max-width: 960px) {
    font-size: 16px;
    text-align: left;
  }
  @media only screen and (max-width: 768px) {
    text-align: left;
    font-size: 14px;
  }
`;
const Image = styled.img`
  max-width: 450px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const LeftSection = styled.div`
  max-width: 680px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const RightSection = styled.div`
  margin-bottom: 3rem;
  @media only screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;
const Input = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: ${(props) => theme.SecondaryTxt};
  margin-right: 0.5rem;
  font-size: 18px;
  @media only screen and (max-width: 768px) {
    max-width: 100%;
    font-size: 14px;

    margin-bottom: 0.5rem;
  }
`;

const FormDiv = styled.div`
  display: flex;
  margin-top: 5.5rem;
  @media only screen and (max-width: 960px) {
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  @media only screen and (max-width: 768px) {
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
`;
