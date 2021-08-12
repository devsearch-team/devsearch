import React, { useRef, useEffect, useCallback } from "react";
import Moment from 'moment';
import {Heading,Body,BodySubtitle,Background,ModalWrapper,ModalContent,BodyContentP,Header,DateApplied,CloseModalButton} from "../globalComponents/modalComponents"
import './applications.css'


const SeekerRejectedApplicationModal = ({app,modalClicked,setModalClicked}) => {
  
  const {employer,job,stages}= app

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
          <ModalWrapper modalClicked={modalClicked}>
            <ModalContent>
              <Header>
              <Heading>{job.title}</Heading>
              <DateApplied>Applied on {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>     
              </Header>
              <Body>
                <BodySubtitle>Application Status</BodySubtitle>
                <BodyContentP>
                 We are sorry to inform you that your application with {employer.name} will not be progressing further.
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

export default SeekerRejectedApplicationModal;
