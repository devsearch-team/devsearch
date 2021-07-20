import React from "react";
import styled from "styled-components";
import landingImage from "../assets/landingImage.svg";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#424A52" }}>
      <Container>
        <LeftSection>
          <Header>Hiring Staff? We got you!!</Header>
          <Header>Finding Work? We got you too!!</Header>
          <Text>
            Whether you are a job seeker looking for work or an employer looking
            for staff, we have the tools to help you succeed.
          </Text>
          <FormDiv>
            <Input placeHolder="yourEmail@email.com"></Input>
            <Button>sign up to divSearch</Button>
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
  margin: 10% 8%;
  justify-content: center;
  flex-wrap: wrap-reverse;
`;
const Header = styled.h1`
  font-size: 45px;
  font-family: roboto;
  color: white;
  margin: 0.5rem 0;
  @media only screen and (max-width: 800px) {
    font-size: 18px;
    margin: 0.5rem 0;
  }
`;
const Text = styled.p`
  font-size: 24px;
  color: white;
  max-width: 550px;
  margin: 1rem 0;
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;
const Image = styled.img`
  max-width: 450px;
  @media only screen and (max-width: 800px) {
    max-width: 170px;
  }
`;
const LeftSection = styled.div`
  max-width: 680px;
`;
const RightSection = styled.div`
  margin-bottom: 3rem;
  @media only screen and (max-width: 800px) {
    margin-bottom: 1rem;
  }
`;
const Input = styled.input`
  width: 300px;
  margin-right: 0.5rem;
  font-size: 18px;
  @media only screen and (max-width: 800px) {
    max-width: 200px;
    margin-bottom: 0.5rem;
  }
`;
const Button = styled.button`
  height: 26px;
  background-color: #f7b13e;
  color: white;
  max-width: 200px;
  @media only screen and (max-width: 800px) {
    max-width: 150px;
  }
`;
const FormDiv = styled.div`
  display: flex;
  margin-top: 5.5rem;
  flex-wrap: wrap;

  @media only screen and (max-width: 800px) {
    max-width: 200px;
    margin-top: 2rem;
  }
`;
