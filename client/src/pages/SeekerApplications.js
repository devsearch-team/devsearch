import React,{useState,useEffect} from 'react'
import SeekerTabs from '../globalComponents/SeekerTabs'
import {ApplicationCard} from '../globalComponents/Cards'
import {ApplicationsContainer,CardContainer} from '../globalComponents/styledComponents'
import { theme } from "../globalStyles";

import {getSeekerApplications} from "../services/applicationServices"

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
        {(!appList.length)&&<p style={{color:theme.Accent,fontSize:"18px"}}>No applications at this stage yet</p>}

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
