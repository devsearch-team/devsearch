import React from "react";
import styled from "styled-components";
import JobCard from "../globalComponents/JobCard";

const ListingContainer = styled.div`
  display: grid;
  grid-area: content;
  width: 80%;
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
    margin-bottom: 2rem;
    margin-left: 1rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

const Heading = styled.h1`
  font-size: 36px;
  margin: 3rem 0;
`;

const JobSeekerJobListings = () => {
  return (
    <ListingContainer>
      <Heading>Job Listings</Heading>
      <JobCard />
      <JobCard />
      <JobCard />
    </ListingContainer>
  );
};

export default JobSeekerJobListings;
