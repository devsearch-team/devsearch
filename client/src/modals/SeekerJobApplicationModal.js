import React, { useRef, useEffect, useCallback,useState } from "react";
import styled from "styled-components";
import { getJob } from "../services/jobServices";
import {useHistory, useParams} from 'react-router-dom'
import { theme } from "../globalStyles";
import {Heading,Body,FileLink,FormContainer,ModalBtn,CloseModalButton,BodySubtitle,Header,EmployerInfoData,Background,LongModalWrapper,ModalContent} from "../globalComponents/modalComponents"

import { getSeeker } from "../services/authServices";
import {createApplication} from "../services/applicationServices"



const FormContainerColumn = styled.div`
display:flex;
flex-direction:column;
margin:0.3rem 0;
`;

const CoverLetterInput = styled.input`
// width: 200px;
// padding: 10px;
border-radius: 5px;
// text-align:center;
margin: 0.5rem 3rem;
border: none;
color: ${theme.SecondaryTxt};
font-size: 18px;
@media only screen and (max-width: 768px) {
  font-size: 14px;
  max-width: 60%;
  width:400px;
}
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
   // console.log("{showJobApplicationModal}",showJobApplicationModal)
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
          <LongModalWrapper showJobApplicationModal={showJobApplicationModal}>
            
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
                  <FormContainer>
                  <FileLink href={seekerData.resumeFile}target="blank">View Resume</FileLink>
                  </FormContainer>
                  <FormContainerColumn>
                    <BodySubtitle>Upload Cover Letter</BodySubtitle>
                  <CoverLetterInput  type="file" placeholder="Upload Cover Letter" onChange={({target})=>{coverLetter=target.files[0]}}></CoverLetterInput>
                  </FormContainerColumn>
                </Body>
                <ModalBtn style={{margin: '1rem 3rem'}} onClick={handleSubmit}>Submit</ModalBtn>
              </ModalContent>
            

            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setJobApplicationModal((prev) => !prev)}
            />
          </LongModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default SeekerJobApplicationModal;
