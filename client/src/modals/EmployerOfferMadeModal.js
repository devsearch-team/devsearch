import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";
import {Heading,FileLink,Body,BodySubtitle,Background,ModalWrapper,ModalContent,Header,DateApplied,CloseModalButton,ContractDownloadBtn ,FormContainer,BodyContent,ContractInfoContainer} from "../globalComponents/modalComponents"

import "react-datepicker/dist/react-datepicker.css";
import './DateEditor.css'
import './applications.css'
import Moment from 'moment';


const TimeContainer = styled.div`
  border-radius: 5px;
  background: ${theme.accentBg};

  text-align: left;
  border: none;
  padding: 15px;
  height: 100%;
  width:80%;
  margin: 0.5rem 1rem;

  @media only screen and (max-width: 768px){
    
    // display:flex;
    height: 100%;
    // justify-content:center;
    padding-bottom:5px;
    
    width: 80%;
  }
`;
const Time = styled.p`
font-size:16px;
`


const EmployerOfferMadeModal = ({app,modalClicked,setModalClicked}) => {
  
  const {seeker,stages}= app
  console.log("inside employer offer made application modal")

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
                <BodyContent readOnly defaultValue={seeker.about}>
                
                </BodyContent>
                <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                <BodySubtitle>Offer Made on</BodySubtitle>
                <TimeContainer>
                  {console.log("seeker resume",seeker.resumeFile)}
                <Time>{Moment(stages.OFFER_MADE.actionDate).format('d MMM YYYY')}</Time>
                </TimeContainer>
                {(stages.OFFER_MADE.contract&&stages.OFFER_MADE.contract!=="undefined")&&
                <ContractInfoContainer>
                    <ContractDownloadBtn href={stages.OFFER_MADE.contract}>View Contract</ContractDownloadBtn>
                  </ContractInfoContainer>}
                
                <BodySubtitle>Feedback Given</BodySubtitle>
                <BodyContent readOnly defaultValue={stages.OFFER_MADE.feedback?stages.OFFER_MADE.feedback:"No given feedback"}>
                 
                </BodyContent>
                
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

export default EmployerOfferMadeModal;
