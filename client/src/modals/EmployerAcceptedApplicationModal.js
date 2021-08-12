import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Moment from 'moment';
import {Heading,FileLink,FormContainer,Body,InterviewTimeContainer,BodyContent,CloseModalButton,BodySubtitle,Header,DateApplied,Background,ModalWrapper,ModalContent} from "../globalComponents/modalComponents"
import "react-datepicker/dist/react-datepicker.css";
import './DateEditor.css'
import './applications.css'

const InterviewTime = styled.p`
font-size:16px;
`

const EmployerViewApplicationModal = ({app,modalClicked,setModalClicked}) => {

console.log("inside employer accepted application modal")
const {seeker,stages}= app
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
        
      {modalClicked ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper
            modalClicked={modalClicked}
            >
           
            <ModalContent>
              <Header>
                <Heading>{seeker.name}</Heading>
                
                <DateApplied>Applied on {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>
              </Header>
              <Body>
                <BodySubtitle>About {seeker.name}</BodySubtitle>
                <BodyContent readOnly>
                {seeker.about}
                </BodyContent>
                <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                <BodySubtitle>Interview offered on</BodySubtitle>
                <InterviewTimeContainer>
                    <InterviewTime>{Moment(stages.APPROVED_FOR_INTERVIEW.interviewTime).format('d MMM YYYY LT')}</InterviewTime>
                </InterviewTimeContainer>
                {stages.APPROVED_FOR_INTERVIEW.information&&
                <>
                <BodySubtitle>Important Information</BodySubtitle>
                <BodyContent readOnly>
                {stages.APPROVED_FOR_INTERVIEW.information}
                </BodyContent>
                </>}
              </Body>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setModalClicked((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
     
    </>
  );
};

export default EmployerViewApplicationModal;
