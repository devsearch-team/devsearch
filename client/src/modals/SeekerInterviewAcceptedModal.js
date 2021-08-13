import React, { useRef, useEffect, useCallback } from "react";

import {Heading,Body,FormContainer,FileLink,CloseModalButton,InterviewTime,BodyContentP,BodySubtitle,EmployerInfoData,Header,DateApplied,Background,LongModalWrapper,ModalContent} from "../globalComponents/modalComponents"
import Moment from 'moment';



const SeekerInterviewAcceptedModal = ({app,modalClicked, setModalClicked}) => {
  
const {seeker,employer,job,stages}= app

  // Adds close functionality to ShowApplication Modal
  const modalRef = useRef();
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

  return (
    <>
      { modalClicked ?(
        <Background ref={modalRef} onClick={closeModal}>
          <LongModalWrapper modalClicked={modalClicked}>
            
              <ModalContent>
                  <Header>
                <Heading>{job.title}</Heading>
                <EmployerInfoData >{employer.name}</EmployerInfoData>
                {employer.address&&<EmployerInfoData >{employer.address}</EmployerInfoData>}
                <EmployerInfoData >{employer.email}</EmployerInfoData>
                {employer.phone &&(
                  <EmployerInfoData>{employer.phone}</EmployerInfoData>
                )}
                <DateApplied>Applied on {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>     
                </Header>
                <Body>
                  <BodySubtitle>Interview Offered</BodySubtitle>
                    <BodyContentP>
                    Dear {seeker.name} we are pleased to inform you that your application for {job.title} with {employer.name} was successful and we would like to offer you an interview. See below for more information.  
                    </BodyContentP>
                    <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                  <BodySubtitle>Interview Arranged On</BodySubtitle>
                  <InterviewTime>{Moment(stages.APPROVED_FOR_INTERVIEW.interviewTime).format('d MMM YYYY LT')}</InterviewTime>
                  <BodySubtitle>Important Information</BodySubtitle>
                    <BodyContentP >
                    {stages.APPROVED_FOR_INTERVIEW.information?stages.APPROVED_FOR_INTERVIEW.information:"Not provided"}</BodyContentP>
                </Body>
              </ModalContent>

            

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

export default SeekerInterviewAcceptedModal;
