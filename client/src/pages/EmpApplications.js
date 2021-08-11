import React,{useEffect, useState} from 'react'
import styled from "styled-components";
import { getEmpApplications } from '../services/applicationServices';
// import { useGlobalState } from "../utils/globalContext";
import {ApplicationCard} from '../globalComponents/Cards'
import EmployerTabs from '../globalComponents/EmployerTabs'


import MobileApplicationTabs from '../globalComponents/MobileApplicationTabs'
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
  justify-content:center;
  // border:1px solid red;
  max-width: 80%;
  flex-wrap: wrap;

@media only screen and (max-width: 768px){
  justify-content:center;
  margin-left:4rem;
}
`;
const EmpApplications = () => {
    // const { store } = useGlobalState();
    // const { isEmployer } = store;
    const [stage,setStage]=useState("SUBMITTED")
    const [appList,setAppList]=useState([])
    const [serverError,setServerError]=useState("")

    useEffect(()=>{
      getEmpApplications(stage)
      .then((res)=>{
        setAppList(res.data)
        console.log("applicatin list res",res.data)
      })
      .catch(() =>{ 
        setServerError("something went wrong")
        });
    },[stage])


      // Change to Mobile Applications Component when reach mobile screen size
      const [width, setWidth] = useState(window.innerWidth);
      const breakpoint = 768;
      useEffect(()=> {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
      })  
    return (
        <ApplicationsContainer>
           { width < breakpoint ? <MobileApplicationTabs />:<EmployerTabs stage={stage} setStage={setStage} />}
        {serverError && <p style={{color:"red"}}>{serverError}</p>}
               <CardContainer>
               {appList && appList.map((app,index)=>{
                return (stage===app.currentStage&&
                  <ApplicationCard key={index} app={app} stage={stage}/>
                  )
               })}   
               </CardContainer>
        </ApplicationsContainer> 
    )
}

export default EmpApplications
