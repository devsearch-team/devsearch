import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory} from 'react-router-dom'
import { theme } from "../globalStyles";
import {Heading,Body,BodySubtitle,Header,Background,BodyContentP,LongModalWrapper,ContractInfoContainer,ModalContent,DateApplied,EmployerInfoData,FormContainer,CloseModalButton,ContractDownloadBtn ,InterviewTime,FileLink,BtnContainer} from "../globalComponents/modalComponents"

import { seekerAccept, seekerReject} from "../services/applicationServices";
import Moment from 'moment';



const ModalBtn = styled.button`
  margin: 1rem 0rem;
  width: 130px;
  min-height: 40px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.2);
  transition: 3s all ease-out;
  background: ${(props) => theme.PrimaryBtnBg};
  &:hover {
    box-shadow: 7px 3px 5px rgba(0, 0, 0, 0.8);
  }
  @media only screen and (max-width: 768px ){
    width:100px;
    font-size:18px;
    margin-top:0.5rem;
    margin-bottom:2rem;
    min-height:40px;
  }
  @media only screen and (max-height: 600px ){
    width:180px;
    font-size:16px;
    margin-top:0.5rem;
    margin-bottom:2rem;
    min-height:40px;
  }
`;

const SeekerPositionOfferedModal = ({ app, modalClicked, setModalClicked }) => {
  const { seeker, employer, job, stages } = app
  const [serverError, setServererror] = useState("")

  // Adds close functionality to ShowApplication Modal
  const modalRef = useRef();
  let history = useHistory()
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setModalClicked(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && modalClicked) {
        setModalClicked(false);
      }
    },
    [setModalClicked, modalClicked]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);


  const handleAccept=()=>{
    console.log("handle accept")
    seekerAccept({id:app._id})
    .then(
      history.go("/seeker/applications")
  
    ).catch(()=>{
      setServererror("something went wrong")
    })
  }
  
  const handleReject=()=>{
    seekerReject({id:app._id})
    .then(
      history.go("/seeker/applications")
  
    ).catch(()=>{
      setServererror("something went wrong")
    })
  }
   

  return (
    <>
      {modalClicked ? (
        <Background ref={modalRef} onClick={closeModal}>
          <LongModalWrapper modalClicked={modalClicked}>

            <ModalContent>
              <Header>
                {serverError && <p style={{ color: "red" }}>{serverError}</p>}
                <Heading>{job.title}</Heading>
                <EmployerInfoData >{employer.name}</EmployerInfoData>
                {employer.address && <EmployerInfoData >{employer.address}</EmployerInfoData>}
                <EmployerInfoData >{employer.email}</EmployerInfoData>
                {employer.phone &&
                  <EmployerInfoData>{employer.phone}</EmployerInfoData>
                }
                <DateApplied>Applied on {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>     
              </Header>
              <Body>
                <BodySubtitle>Position Offered</BodySubtitle>
                <BodyContentP>
                  Dear {seeker.name}  we are pleased to inform you that your application for {job.title} with {employer.name} was successful and we would like to offer you an a Position within our company. See below for more information.
                </BodyContentP>
                <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                <BodySubtitle>Interviewed on</BodySubtitle>
                <InterviewTime>{Moment(stages.APPROVED_FOR_INTERVIEW.interviewTime).format('d MMM YYYY')}</InterviewTime>
                <BodySubtitle>Feedback Given</BodySubtitle>
                <BodyContentP >
                  {stages.OFFER_MADE.feedback ? stages.OFFER_MADE.feedback : "No feedback was given"}
                </BodyContentP>
                {(stages.OFFER_MADE.contract && stages.OFFER_MADE.contract !== "undefined") &&
                  <ContractInfoContainer>
                    <ContractDownloadBtn href={stages.OFFER_MADE.contract}>View Contract</ContractDownloadBtn>
                  </ContractInfoContainer>}
              </Body>
            </ModalContent>
            <BtnContainer>
                <ModalBtn onClick={handleAccept}>Accept Offer</ModalBtn>
                <ModalBtn onClick={handleReject}>Deny</ModalBtn>
                </BtnContainer>


            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setModalClicked((prev) => !prev)}
            />
          </LongModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default SeekerPositionOfferedModal;
