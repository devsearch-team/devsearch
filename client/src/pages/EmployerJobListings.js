import React,{useEffect, useState} from 'react'
import styled from "styled-components";
import { getEmployerJobs } from '../services/jobServices';
import { useGlobalState } from "../utils/globalContext";
import Card from "../globalComponents/Cards";
import { InputButton } from "../globalComponents/Buttons";

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
    margin-top: 5rem;
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
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    getEmployerJobs(page)
      .then((res) => {
        console.log("my jobs",res)
        setJobList([...jobList, ...res.data.jobs])
        setTotalPages(res.data.totalPages)
        setLoading(false)
      })
      .catch((error) =>{ 
        // console.log("err from catch",error.message)
        setServerError(error.message)
        });
  }, [page]);

  return (
    <>
      {isEmployer ? (
        <>
        total pages:{totalPages}   page:{page}
          <ListingContainer>
        {serverError && <p style={{color:"red"}}>{serverError}</p>}
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
          {!(totalPages-1 <= page) && <InputButton onClick={()=>setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</InputButton>}

          </ListingContainer>
        </>  
      ) : (
        <></>
      )}
    </>
  );
};

export default EmployerJobListings;
