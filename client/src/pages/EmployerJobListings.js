import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../utils/globalContext";
import Card from "../globalComponents/Cards";

const ListingContainer = styled.div`
  display: grid;
  grid-area: content;
  width: 80%;
  margin-top: 15rem;
  margin-left: 30rem;
  @media only screen and (max-width: 1200px) {
    margin-left: 15rem;
    width: 100%;
  }
  @media only screen and (max-width: 900px) {
    margin-left: 15rem;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    margin-left: 1rem;
    width: 100%;
  }
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 80%;
  flex-wrap: wrap;
`;

const EmployerJobListings = () => {
  const { store } = useGlobalState();
  const { isEmployer } = store;
  return (
    <>
      {isEmployer ? (
        <ListingContainer>
          <CardContainer>
            <Card
              jobTitle="Job Title"
              date={Date.now()}
              company="Company Name"
            />
            <Card
              jobTitle="2 Job Title"
              date={Date.now()}
              company="Company Name"
            />
            <Card
              jobTitle="Job Title"
              date={Date.now()}
              company="Company Name"
            />
            <Card
              jobTitle="Job Title"
              date={Date.now()}
              company="Company Name"
            />
          </CardContainer>
        </ListingContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default EmployerJobListings;