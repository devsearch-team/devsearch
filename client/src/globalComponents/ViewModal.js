import React from "react"
import EmployerViewApplicationModal from '../modals/EmployerViewApplicationModal'
import EmployerAcceptedApplicationModal from '../modals/EmployerAcceptedApplicationModal'
import EmployerOfferMadeModal from '../modals/EmployerOfferMadeModal'
import EmployerOfferPositionModal from '../modals/EmployerOfferPositionModal'
import EmployerHiredModal from '../modals/EmployerHiredModal'
import EmployerRejectedApplicationModal from '../modals/EmployerRejectedApplicationModal'
const ViewModal=({app,stage,modalClicked,setModalClicked})=>{
    return(
        <>
        {console.log("inside view modal")}
            {stage==="SUBMITTED"&&
            <EmployerViewApplicationModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked}/>}
  
            {stage==="APPROVED_FOR_INTERVIEW"&&
              <EmployerAcceptedApplicationModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked}/>}
  
            {stage==="SCHEDEULED_FOR_INTERVIEW"&&
              <EmployerOfferPositionModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked}/>}
  
            {stage==="OFFER_MADE"&&
              <EmployerOfferMadeModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked}/>}
  
            {stage==="HIRED"&&
              <EmployerHiredModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked}/>}
  
            {stage==="REJECTED"&&
              <EmployerRejectedApplicationModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked}/>}
            
         </>   
    )
    
}

export default ViewModal