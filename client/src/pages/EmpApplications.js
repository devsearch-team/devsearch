import React,{useEffect, useState} from 'react'
import styled from "styled-components";
import { getEmployerJobs } from '../services/jobServices';
// import { useGlobalState } from "../utils/globalContext";
import EmployerTabs from '../globalComponents/EmployerTabs'
import EmployerApplicationsCard from '../globalComponents/Cards'
import { ShowMoreButton } from "../globalComponents/Buttons";

const ApplicationsContainer = styled.div`
display:grid;
grid-area: content;
margin-top: 15rem;
margin-left:25rem;
@media only screen and (max-width: 1200px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 900px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 768px) {
  margin-left:1rem;
  width:100%;
}
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 80%;
  flex-wrap: wrap;
`;
const BtnContainer = styled.div`
display: flex;
justify-content:center;
width:80%;
`;
const EmpApplications = () => {
    // const { store } = useGlobalState();
    // const { isEmployer } = store;

    const [jobList, setJobList] = useState([]);
    const [serverError, setServerError] = useState("")
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true)
      getEmployerJobs(page)
        .then((res) => {
        //   console.log("my jobs",res)
          setJobList(jobList => [...jobList, ...res.data.jobs])
          setTotalPages(res.data.totalPages)
          setLoading(false)
        })
        .catch((error) =>{ 
          // console.log("err from catch",error.message)
          setServerError(error.message)
        });
      }, [page]);
      // console.log("serverError",serverError)
      
    return (
        <>
             <>
             {/* {console.log("pages",totalPages)}
            total pages:{totalPages}   page:{page} */}
        <ApplicationsContainer>
         
            <EmployerTabs />

            <CardContainer>
            {console.log("jobListApplications",jobList)}
            {jobList.map((job,index)=>   
              <EmployerApplicationsCard
              key={index}
              jobId={job._id}
              jobTitle={job.title}
              date={job.created_at}
              company={job.employer.name}
              />)}  
              </CardContainer>
              <BtnContainer>
          {(totalPages-1 ) >= page && <ShowMoreButton onClick={()=>setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</ShowMoreButton>}
            </BtnContainer>
        </ApplicationsContainer> 
         </>

    </>
    )
}

export default EmpApplications
