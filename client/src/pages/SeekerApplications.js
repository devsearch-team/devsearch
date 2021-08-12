import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import SeekerTabs from '../globalComponents/SeekerTabs'
import {ApplicationCard} from '../globalComponents/Cards'

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
const SeekerApplications = () => {
    
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
      .catch((error) =>{ 
        setServerError("something went wrong")
        });
    },[stage])

    return (
        <>  
        
               <ApplicationsContainer>
               <SeekerTabs stage={stage} setStage={setStage} />          
               {serverError && <p style={{color:"red"}}>{serverError}</p>}
               <CardContainer>
               {appList && appList.map((app,index)=>{
                 return (stage===app.currentStage?
                 <ApplicationCard  app={app} stage={stage}/>:
                 <></>)
               })}        
               </CardContainer>
               </ApplicationsContainer> 
               

            
            </>
            )
}

export default SeekerApplications
