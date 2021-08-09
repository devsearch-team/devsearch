import React, { useRef, useEffect, useCallback,useState } from "react";
import styled from "styled-components";
import { getJob } from "../services/jobServices";
import {useHistory, Link, useParams} from 'react-router-dom'
import { MdClose } from "react-icons/md";
import { theme } from "../globalStyles";
import { ModalBtn } from "../globalComponents/Buttons";
import { getSeeker } from "../services/authServices";
import {createApplication} from "../services/applicationServices"
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
  height: 500px;
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
width:70%;
height:150px;
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

const FileLink = styled(Link)`
margin: 0.1rem 3rem;
`;
const CoverLetterInput = styled.input`
width: 200px;
padding: 10px;
border-radius: 5px;
text-align:center;
margin: 0.3rem 3rem;
border: none;
color: ${theme.SecondaryTxt};
font-size: 18px;
@media only screen and (max-width: 768px) {
  font-size: 14px;
  max-width: 60%;
  width:400px;
}
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

const SeekerJobApplicationModal = ({showJobApplicationModal, setJobApplicationModal}) => {
  // Adds close functionality to ShowApplication Modal
  const modalRef = useRef();
  let history = useHistory()
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setJobApplicationModal(false);
    }
  };
  

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showJobApplicationModal) {
        setJobApplicationModal(false);
      }
    },
    [setJobApplicationModal, showJobApplicationModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // Get Job Information for header
  const [jobData, setJobData] = useState({})
  const [seekerData, setSeekerData] = useState({})
  let coverLetter

  let {id} = useParams()
  useEffect(() => {
    getJob(id)
    .then((res) => {
      setJobData(res.data)
      console.log("jobData",res.data)
    })
  }, [id])


  useEffect(() => {
    console.log("{showJobApplicationModal}",showJobApplicationModal)
    getSeeker()
    .then((res) => {
      setSeekerData(res)
      console.log("SeekerData",res)
    })
  }, [])
  function handleSubmit(){
    var form_data = new FormData()
    form_data.append("job",id)
    form_data.append("employer",jobData.employer._id)
    form_data.append("seeker",seekerData._id)
    form_data.append("coverLetter",coverLetter)
    createApplication(form_data)
    .then((res)=>{
      console.log("created application is ",res)
    })
    .catch()
    history.push('/seeker/jobs'); 
    setJobApplicationModal(false);
  }
  return (
    <>
      { showJobApplicationModal ?(
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper showJobApplicationModal={showJobApplicationModal}>
            
              <ModalContent>
                <Header>
                <Heading>{jobData.title}</Heading>
                <EmployerInfoData >{jobData.employer.name}</EmployerInfoData>
                <EmployerInfoData >{jobData.employer.email}</EmployerInfoData>
                {jobData.employer.phone &&(
                  <EmployerInfoData>{jobData.employer.phone}</EmployerInfoData>
                ) 
              }
                </Header>
                <Body>
                  <BodySubtitle>Resume</BodySubtitle>
                  <FileLink to={seekerData.resumeFile}target="blank">View Resume</FileLink>
                  <BodySubtitle>Cover Letter</BodySubtitle>
                  <CoverLetterInput  type="file" placeholder="Upload Cover Letter" onChange={({target})=>{coverLetter=target.files[0]}}></CoverLetterInput>
                  <FileLink to={seekerData.resumeFile}target="blank">View Cover Letter</FileLink>
                </Body>
                <ModalBtn style={{margin: '0.5rem 3rem'}} onClick={handleSubmit}>Submit</ModalBtn>
              </ModalContent>
            

            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setJobApplicationModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default SeekerJobApplicationModal;
