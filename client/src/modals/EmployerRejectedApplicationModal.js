import React, { useRef, useEffect, useCallback } from "react";
import {Heading,Body,BodySubtitle,Background,ModalWrapper,BodyContentP,ModalContent,Header,DateApplied,CloseModalButton} from "../globalComponents/modalComponents"
import Moment from 'moment';
import './applications.css'



const EmployerRejectedApplicationModal = ({app,modalClicked,setModalClicked}) => {

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
                <DateApplied>Applied On {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>
              </Header>
              <Body>
                <BodySubtitle>Application Status</BodySubtitle>
                <BodyContentP >
                Applicant rejected.
                </BodyContentP>
                {stages.REJECTED.feedback&&
                  <>
                  <BodySubtitle>Feedback</BodySubtitle>
                <BodyContentP>
                 {stages.REJECTED.feedback}
                </BodyContentP></>}
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

export default EmployerRejectedApplicationModal;
