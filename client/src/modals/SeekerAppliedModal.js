import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { theme } from "../globalStyles";
import Moment from 'moment';

import './applications.css'

  const Background = styled.div`
  width: 100vw;
  height: 100%;
  background: #000;
  position: fixed;
  top: 0;
  z-index:5;
  
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0);
  transform: scaleY(0.01) scaleX(0);
  animation: unfoldIn 1s cubic-bezier(0.65, 0.84, 0.42, 1) forwards;
  
  @keyframes unfoldIn {
    0% {
      transform: scaleY(0.0005) scaleX(0);
      background: rgba(0, 0, 0, 1);
    }
    50% {
      transform: scaleY(0.003) scaleX(1);
      background: rgba(0, 0, 0, 1);
    }
    100% {
      transform: scaleY(1) scaleX(1);
      background: rgba(0, 0, 0, 0.9);
    }
  }
  `;
  const ModalWrapper = styled.div`
  max-width: 500px;
  max-height: 100%;
  margin-top:3rem;
  width:100%;
  overflow-x:visible !important;
  box-shadow: 3px 3px 5px #333;
  background: ${(props) => theme.MainBg};
  color: ${(props) => theme.PrimaryTxt};

  position: relative;
  z-index: 100 !important;
  border-radius: 10px;
  animation: hiddenBackground 1.5s ease-out;
  @keyframes hiddenBackground {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
@media only screen and (max-width: 768px) {
  // display:flex;
  position:absolute;
  top:0;
  z-index:100;
  overflow:auto !important;
  // flex-direction:column;
  width: 90%;
  // height: 600px;
  opacity: 1;
}
`;

const ModalContent = styled.div`
margin: 0rem 1rem;
width: 95%;


@media only screen and (max-width: 768px) {
  overflow-x:hidden !important;
  margin: 0 1rem;
  // justify-content: center;
  // align-items: left;
  width: 90%;
  max-width:90vw;
  // height: 100vh;
}
`;

const Header = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
border-radius: 5px;
margin: 1.5rem 1rem;
margin-top: 3rem;
background: ${theme.NavBg};
width: 70%;

overflow-x:hidden !important;
@media only screen and (max-width: 768px){
 
  width: 80%;
  }
  `;
  const Heading = styled.h1`
  margin: 0.5rem 1rem;
  width: 100%;
  word-wrap: wrap;
  color: ${theme.PrimaryBtnBg};
  font-size: 24px;
  @media only screen and (max-width: 768px) {
    font-size: 24px;
    text-align: left;
    // width: 100%;
  }
  @media only screen and (max-width: 360px) {
    text-align: left;
    width: 100%;

    font-size: 20px;
  }
`;

const DateApplied = styled.p`
  margin: 0.5rem 1rem;
  font-size:14px;
  color: ${theme.PrimaryTxt};
  width:100%;
`;
const EmployerInfoData = styled.p`
margin: 0.5rem 2rem;
color:${theme.PrimaryTxt}
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  // width: 100%;
`;

const BodySubtitle = styled.h6`
  margin: 0.5rem 1.5rem;
  font-size: 18px;
  font-weight: 600px;
`;

const BodyContentP = styled.p`
  outline: none;
  font-size: 14px;
  font-weight: 550;
  border-radius: 5px;
  background: ${theme.accentBg};
  width: 80%;
  line-height: 1.3;
  text-align: left;
  border: none;
  padding: 15px;
  height: 100%;
  margin: 0.5rem 1rem;
  color: ${theme.PrimaryTxt};

`;





const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const FormContainer = styled.div`
display:flex;
margin:1rem;
`;
const FileLink = styled.a`
margin: 0.1rem 3rem;
`;

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
