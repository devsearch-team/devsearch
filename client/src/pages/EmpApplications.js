import React,{useEffect, useState} from 'react'
import styled from "styled-components";
import { getEmpApplications } from '../services/applicationServices';
// import { useGlobalState } from "../utils/globalContext";
import Card from '../globalComponents/Cards'
import EmployerTabs from '../globalComponents/EmployerTabs'
import EmployerApplicationsCard from '../globalComponents/Cards'
import { ShowMoreButton } from "../globalComponents/Buttons";
import MobileEmpApplications from './MobileEmpApplicationsPage';
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
  border:1px solid red;
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
    const [stage,setStage]=useState("SUBMITTED")
    const [appList,setAppList]=useState([])
    const [serverError,setServerError]=useState("")

    useEffect(()=>{
      getEmpApplications(stage)
      .then((res)=>{
        setAppList(res.data)
      })
      .catch()
    },[stage])
      // console.log("serverError",serverError)


      // Change to Mobile Applications Component when reach mobile screen size
      const [width, setWidth] = useState(window.innerWidth);
      const breakpoint = 768;
      useEffect(()=> {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
      })  
    return (
        <>
        { width < breakpoint ?
             <> 
       
        <MobileApplicationTabs />
      
         </>
      : 
        <ApplicationsContainer>
            <EmployerTabs stage={stage} setStage={setStage} />
               
        
               <CardContainer>
               {appList && appList.map((app,index)=>{
                // let date=app.stages[stage].actionDate
                 return (<Card  jobTitle={app.job.title} company={app.employer.name} />)
               })}   
               </CardContainer>
        </ApplicationsContainer> 

    }
    </>
    )
}

export default EmpApplications
