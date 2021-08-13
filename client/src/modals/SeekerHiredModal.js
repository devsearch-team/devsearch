import React, { useRef, useEffect, useCallback } from "react";
import {Heading,Body,ContractDownloadBtn ,FormContainer,CloseModalButton,ContractInfoContainer,FileLink,BodySubtitle,BodyContentP,EmployerInfoData,Header,Background,ModalWrapper,DateApplied,ModalContent} from "../globalComponents/modalComponents"
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import './DateEditor.css'
import './applications.css'


const SeekerHiredModal = ({app, modalClicked,setModalClicked}) => {
  const { seeker, employer, job, stages } = app

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
                <Heading>{job.title}</Heading>
                <EmployerInfoData >{employer.name}</EmployerInfoData>
                {employer.address && <EmployerInfoData >{employer.address}</EmployerInfoData>}
                <EmployerInfoData >{employer.email}</EmployerInfoData>
                {employer.phone && (
                  <EmployerInfoData>{employer.phone}</EmployerInfoData>
                )}
                <DateApplied>Applied on {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>     
              </Header>
              <Body>
                <BodySubtitle>You have been Hired</BodySubtitle>
                <BodyContentP>
                  Congratulations on your new position at {employer.name}.
                </BodyContentP>
                <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                {(stages.OFFER_MADE.contract && stages.OFFER_MADE.contract !== "undefined") &&
                  <ContractInfoContainer>
                    <ContractDownloadBtn href={stages.OFFER_MADE.contract}>View Contract</ContractDownloadBtn>
                  </ContractInfoContainer>}
                <BodySubtitle>Feedback Given</BodySubtitle>
                <BodyContentP >
                  {stages.OFFER_MADE.feedback ? stages.OFFER_MADE.feedback : "No feedback was given"}
                </BodyContentP>
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

export default SeekerHiredModal;
