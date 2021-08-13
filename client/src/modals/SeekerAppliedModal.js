import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {Heading,Body,FileLink,BodySubtitle,BodyContentP,Background,ModalWrapper,ModalContent,Header,FormContainer,DateApplied,EmployerInfoData,CloseModalButton} from "../globalComponents/modalComponents"
import Moment from 'moment';
import './applications.css'


const LinkContainer = styled.div`
display:flex;
width:100%;
margin: 1rem -2rem;
justify-content:center;
// max-width:100%;
`;
const ViewJobBtn = styled(Link)`
// width:200px;
text-decoration: none;

&:hover{
  text-decoration: underline;
  font-weight:600;
}
`;

const SeekerAppliedModal = ({app,modalClicked,setModalClicked,}) => {
  const {seeker,employer,job,stages}= app
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
                <EmployerInfoData >{employer.email}</EmployerInfoData>
                {employer.phone &&
                (<EmployerInfoData>{employer.phone}</EmployerInfoData>)}
                <DateApplied>Applied on {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>     
              </Header>
              <Body>
                <BodySubtitle>Application Information</BodySubtitle>
                <BodyContentP>
                  You have applied for the postion of {job.title} at {employer.name}
                </BodyContentP>
                <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                <LinkContainer>
                    <ViewJobBtn to={`/seeker/jobs/${job._id}`}>View Job Listing</ViewJobBtn>
                  </LinkContainer>
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

export default SeekerAppliedModal;
