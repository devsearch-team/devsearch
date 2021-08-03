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
  const [jobList, setJobList] = useState("");

  useEffect(() => {
    getJobs()
      .then((data) => {
        console.log(data);
        setJobList(data);
      })
      .catch();
  }, []);

  // if (jobList.length > 0) {
  return (
    <>
      {jobList ? (
        jobList.data.map((job, index) => {
          console.log("jobs", job);

          return (
            <ListingContainer>
              <Heading>Job Listings</Heading>
              <div key={index}>
                <p>{job.title}</p>
              </div>
              {console.log("jobList", jobList.data)}
              <JobCard job={job} />
            </ListingContainer>
          );
        })
      ) : (
        <><Heading>No Jobs Yet</Heading></>
      )}
    </>
  );
  // }else {
  // return (<h3 style={{color:"#fff"}}>Not Jobs Yet</h3>)
  // }
};

export default JobSeekerJobListings;
