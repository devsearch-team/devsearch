import React,{useState,useEffect} from 'react'
import styled from "styled-components";
// import { getEmployerJobs } from '../services/jobServices';
import { useGlobalState } from "../utils/globalContext";
import SeekerTabs from '../globalComponents/SeekerTabs'
import Card from '../globalComponents/Cards'
import { ShowMoreButton } from "../globalComponents/Buttons";
import {getSeekerApplications} from "../services/applicationServices"

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
const SeekerApplications = () => {
    const { store } = useGlobalState();
    const { isEmployer } = store;
    const [stage,setStage]=useState("SUBMITTED")
    const [appList,setAppList]=useState([])
    const [serverError,setServerError]=useState("")

    useEffect(()=>{
      getSeekerApplications(stage)
      .then((res)=>{
        setAppList(res.data)
        console.log("applicatin list res",res.data)
       // console.log("employer is",res.data[0].employer.name)
      })
      .catch()
    },[stage])

    return (
        <>  
        
               <ApplicationsContainer>
               <SeekerTabs stage={stage} setStage={setStage} />
               
        
               <CardContainer>
               {appList && appList.map((app,index)=>{
                //  console.log("app list",appList)
                //  let date=app.stages[stage]&&app.stages[stage].actionDate
                 return (stage===app.stages[stage]?
                 <Card  app={app} stage={stage} jobTitle={app.job.title} company={app.employer.name} date={app.stages[stage].actionDate}/>:
                 <></>)
               })}
               
               
               </CardContainer>
               <BtnContainer>
                          
               <ShowMoreButton >Load More</ShowMoreButton>
               </BtnContainer>
               </ApplicationsContainer> 
               

            
            </>
            )
}

export default SeekerApplications
