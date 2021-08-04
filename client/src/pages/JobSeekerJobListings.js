import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getJobs } from "../services/jobServices";
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

  const [jobList, setJobList] = useState([]);
  const [serverError, setServerError] = useState("")
  useEffect(() => {
    getJobs()
      .then((res) => {
        // console.log(data);
       
        setJobList(res.data.jobs);
      })
      .catch((error) =>{ 
        // console.log("err from catch",error.message)
        setServerError(error.message)
        })
  }, []);

  // console.log("jobs", jobList.data);
  // if (jobList.length > 0) {
  return (
    <>
      <ListingContainer>
        <Heading>Job Listings</Heading>
        {serverError && <p style={{color:"red"}}>{serverError}</p>}
        {console.log(jobList)}
        {jobList.map((job, index) => (
          <JobCard job={job} key={index} />
        ))}
      </ListingContainer>
      {/* {jobList ? (
       
      ) : (
        <><Heading>No Jobs Yet</Heading></>
      )} */}
    </>
  );
  // }else {
  // return (<h3 style={{color:"#fff"}}>Not Jobs Yet</h3>)
  // }
};

export default JobSeekerJobListings;
