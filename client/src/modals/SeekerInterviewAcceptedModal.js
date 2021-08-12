import React, { useRef, useEffect, useCallback,useState } from "react";
import styled from "styled-components";
import { getJob } from "../services/jobServices";
import {useParams} from 'react-router-dom'
import { MdClose } from "react-icons/md";
import { theme } from "../globalStyles";

import { getSeeker } from "../services/authServices";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  top: 0;
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
  box-shadow: 3px 3px 5px #333;
  background: ${(props) => theme.MainBg};
  color: ${(props) => theme.PrimaryTxt};

  position: relative;
  z-index: 10;
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
  display:flex;
  flex-direction:column;
  width: 100vw;
  height: 90vh;
}
`;


const ModalContent = styled.div`

  margin: 0rem 1rem;
  width: 95%;
  
  
  // @media only screen and (max-width: 768px) {  
  //   margin: 0 3rem;
  //   justify-content: center;
  //   align-items: left;
  //   width: 100vw;
  // }
`;

const Header = styled.div`
display: flex;
flex-direction:column;
border-radius: 5px;
margin: 1.5rem 1rem;
margin-top:3rem;
background: ${theme.NavBg};
width:80%;
height:200px;
`;
const Heading = styled.h1`
  margin: 0.5rem 2rem;
  width: 100%;
  word-wrap: wrap;
  color:${theme.PrimaryBtnBg};
  font-size:24px;
  @media only screen and (max-width: 768px) {  
    font-size: 24px;
    text-align:left;
    // width: 100%;
  }
  @media only screen and (max-width: 360px) {  

    text-align:left;
    width: 100%;
    
    font-size: 20px;
  }
`;

const EmployerInfoData = styled.p`
margin: 0.5rem 2rem;
color:${theme.PrimaryTxt}
`;


const Body = styled.div`
display: flex;
flex-direction:column;
margin: 1rem 0;
// width: 100%;
`;

const BodySubtitle = styled.h6`
margin: 0.5rem 3rem;
font-size:18px;
font-weight:600px;
`;

const BodyContent = styled.p`
outline:none;
font-size:14px;
font-weight:550;
border-radius:5px;
background: ${theme.accentBg};
width:80%;
line-height:1.3;
text-align:left;
border:none;
padding:15px;
height:100%;
margin: 0.5rem 1rem;
color:${theme.PrimaryTxt}
`;

const InterviewTime = styled.p`
font-size:14px;
font-weight:550;
border-radius:5px;
background: ${theme.accentBg};
width:80%;
line-height:1.3;
text-align:left;
border:none;
padding:5px;
height:30px;
margin: 0.5rem 1rem;
color:${theme.PrimaryTxt}
`;

const FormContainer = styled.div`
display:flex;
margin:1rem;
`;
const FileLink = styled.a`
margin: 0.1rem 3rem;
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


const SeekerInterviewAcceptedModal = ({showInterviewAcceptedModal, setInterviewAcceptedModal}) => {
  // Adds close functionality to ShowApplication Modal
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setInterviewAcceptedModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showInterviewAcceptedModal) {
        setInterviewAcceptedModal(false);
      }
    },
    [setInterviewAcceptedModal, showInterviewAcceptedModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // Get Job Information for header
  const [employerData, setEmployerData] = useState('')
  const [seekerData, setSeekerData] = useState('')

  let {id} = useParams()
  useEffect(() => {
    getJob(id)
    .then((data) => {
      setEmployerData(data.data)
      console.log("EmployerData",data.data)
    })
  }, [id])


  useEffect(() => {
    getSeeker()
    .then((data) => {
      setSeekerData(data)
      console.log("SeekerData",data)
    })
  }, [])
  console.log(seekerData)
  return (
    <>
      { showInterviewAcceptedModal ?(
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper showInterviewAcceptedModal={showInterviewAcceptedModal}>
            
              <ModalContent>
                <Header>
                <Heading>{employerData.title}</Heading>
                <EmployerInfoData >{employerData.employer.name}</EmployerInfoData>
                <EmployerInfoData >{employerData.employer.address}</EmployerInfoData>
                <EmployerInfoData >{employerData.employer.email}</EmployerInfoData>
                {employerData.employer.phone ?(
                  <EmployerInfoData>{employerData.employer.phone}</EmployerInfoData>
                ) :(
                  <></>
                )
              }
                </Header>
                <Body>
                  <BodySubtitle>Application Information</BodySubtitle>
                    <BodyContent>
                    Dear {seekerData.name} we are pleased to inform you that your application for {employerData.title} with {employerData.employer.name} was successful and we would like to offer you an interview. See below for more information.  
                    </BodyContent>
                    <FormContainer>
                  <FileLink href={'/'}target="blank">View Resume</FileLink>
                  <FileLink hres={'/'}target="blank">View Cover Letter</FileLink>
                  </FormContainer>
                  <BodySubtitle>Interview arranged on</BodySubtitle>
                    <InterviewTime>Monday, 27th March, 11am</InterviewTime>
                  <BodySubtitle>Important Information</BodySubtitle>
                    <BodyContent >
                    Important Information regarding this Interview
                    </BodyContent>
                </Body>
              </ModalContent>

            

            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setInterviewAcceptedModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default SeekerInterviewAcceptedModal;
