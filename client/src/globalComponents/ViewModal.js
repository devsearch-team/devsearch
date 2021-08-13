import React from "react"
import EmployerViewApplicationModal from '../modals/EmployerViewApplicationModal'
import EmployerAcceptedApplicationModal from '../modals/EmployerAcceptedApplicationModal'
import EmployerOfferMadeModal from '../modals/EmployerOfferMadeModal'
import EmployerOfferPositionModal from '../modals/EmployerOfferPositionModal'
import EmployerHiredModal from '../modals/EmployerHiredModal'
import EmployerRejectedApplicationModal from '../modals/EmployerRejectedApplicationModal'
import SeekerAppliedModal from '../modals/SeekerAppliedModal'
import SeekerInterviewOfferedModal from '../modals/SeekerInterviewOfferedModal'
import SeekerInterviewAcceptedModal from '../modals/SeekerInterviewAcceptedModal'
import SeekerPositionOfferedModal from '../modals/SeekerPositionOfferedModal'
import SeekerHiredModal from '../modals/SeekerHiredModal'
import SeekerRejectedApplicationModal from '../modals/SeekerRejectedApplication'
import { useGlobalState } from '../utils/globalContext'

const ViewModal = ({ app, stage, modalClicked, setModalClicked }) => {
  const { store } = useGlobalState()
  const { isEmployer } = store
  return (
    <>
      {(isEmployer === "true") ?
        <>
          {stage === "SUBMITTED" &&
            <EmployerViewApplicationModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "APPROVED_FOR_INTERVIEW" &&
            <EmployerAcceptedApplicationModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "SCHEDEULED_FOR_INTERVIEW" &&
            <EmployerOfferPositionModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "OFFER_MADE" &&
            <EmployerOfferMadeModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "HIRED" &&
            <EmployerHiredModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "REJECTED" &&
            <EmployerRejectedApplicationModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}
        </> :
        <>
          {stage === "SUBMITTED" &&
            <SeekerAppliedModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "APPROVED_FOR_INTERVIEW" &&
            <SeekerInterviewOfferedModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "SCHEDEULED_FOR_INTERVIEW" &&
            <SeekerInterviewAcceptedModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "OFFER_MADE" &&
            <SeekerPositionOfferedModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "HIRED" &&
            <SeekerHiredModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}

          {stage === "REJECTED" &&
            <SeekerRejectedApplicationModal app={app} setModalClicked={setModalClicked} modalClicked={modalClicked} />}
        </>
      }
    </>
  )

}

export default ViewModal