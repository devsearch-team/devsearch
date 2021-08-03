import React,{useEffect, useState} from 'react'
import styled from "styled-components";
import { getEmployerJobs } from '../services/jobServices';
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
  const [jobList, setJobList] = useState([]);
  const [serverError, setServerError] = useState("")


  useEffect(() => {
    getEmployerJobs()
      .then((data) => {
        console.log(data);
        setJobList(data.data);
      })
      .catch((error) =>{ 
        // console.log("err from catch",error.message)
        setServerError(error.message)
        });
  }, []);

  return (
    <>
      {isEmployer ? (
        <ListingContainer>
          <CardContainer>
            {jobList.map((job,index)=>   
            <Card
              key={index}
              jobId={job._id}
              jobTitle={job.title}
              date={job.created_at}
              company={job.employer.name}
            />)}  
          </CardContainer>
        </ListingContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default EmployerJobListings;
