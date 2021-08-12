import React,{useEffect, useState} from 'react'
import { getEmpApplications } from '../services/applicationServices';
// import { useGlobalState } from "../utils/globalContext";
import {ApplicationCard} from '../globalComponents/Cards'
import EmployerTabs from '../globalComponents/EmployerTabs'
import {ApplicationsContainer,CardContainer} from '../globalComponents/styledComponents'

import MobileApplicationTabs from '../globalComponents/MobileApplicationTabs'



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
