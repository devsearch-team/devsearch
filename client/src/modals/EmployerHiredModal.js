import React, { useRef, useEffect, useCallback} from "react";
import Moment from 'moment';
import {Heading,FileLink,Body,BodySubtitle,BodyContentP,Background,ModalWrapper,ModalContent,Header,FormContainer,ContractDownloadBtn ,ContractInfoContainer,DateApplied,CloseModalButton} from "../globalComponents/modalComponents"

import "react-datepicker/dist/react-datepicker.css";
import './DateEditor.css'
import './applications.css'



const EmployerHiredModal = ({app,modalClicked,setModalClicked}) => {
  
  const {seeker,stages}= app
  console.log("inside employer hired application modal")

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
                <BodySubtitle>{seeker.name} was Hired</BodySubtitle>
                <BodyContentP>
                  Congratulations on a successful application.
                </BodyContentP>
                <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                {(stages.OFFER_MADE.contract&&stages.OFFER_MADE.contract!=="undefined")&&
                <ContractInfoContainer>
                    <ContractDownloadBtn href={stages.OFFER_MADE.contract}>View Contract</ContractDownloadBtn>
                  </ContractInfoContainer>}
                <BodySubtitle>Feedback Given</BodySubtitle>
                <BodyContentP>
                {stages.OFFER_MADE.feedback?stages.OFFER_MADE.feedback:"No given feedback"}                </BodyContentP>
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

export default EmployerHiredModal;
