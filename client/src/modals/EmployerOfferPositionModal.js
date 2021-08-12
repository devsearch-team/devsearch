import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory} from "react-router-dom";

import { theme } from "../globalStyles";
import {Heading,Body,BodyContent,InterviewTimeContainer,FormContainer,BtnContainer,FileLink,CloseModalButton,BodySubtitle,Background,DateApplied,Header,ModalWrapper,ModalContent} from "../globalComponents/modalComponents"
import "react-datepicker/dist/react-datepicker.css";
import {empAccept,empReject} from "../services/applicationServices"
import Moment from 'moment';
import './DateEditor.css'
import './applications.css'


const InterviewTime = styled.p`
font-size:16px;
`
const ModalBtn = styled.button`
  margin: 1rem 0rem;
  width: 150px;
  height: auto;
  padding:10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.2);
  transition: 3s all ease-out;
  background: ${(props) => theme.PrimaryBtnBg};
  &:hover {
    box-shadow: 7px 3px 5px rgba(0, 0, 0, 0.8);
  }
  @media only screen and (max-width: 768px) {
    width: 110px;
    font-size: 16px;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    height: 40px;
  }
  @media only screen and (max-height: 600px) {
    width: 180px;
    font-size: 14px;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    height: 40px;
  }
`;

const ContractContainer = styled.div`
display:flex;
justify-center:space-evenly;
align-items:center;
width: 100%;
// margin: 0 -1rem;
`;
const ContractInput = styled.input`
width: 55%;
padding: 10px;
border-radius: 5px;
text-align:center;
// margin: 0.3rem 3rem;
border: none;
color: ${theme.SecondaryTxt};
font-size: 18px;
@media only screen and (max-width: 768px) {
  font-size: 14px;
  max-width: 60%;
  width:400px;
}
`;
const EmployerOfferPositionModal = ({app,modalClicked,setModalClicked}) => {

  const initialFormState = {
		feedback: "",
		contract: ""
	}
const [formState, setFormState] = useState(initialFormState)
const [serverError,setServererror]= useState("")

console.log("inside employer offer application modal")
const {seeker,stages}= app

  const modalRef = useRef();
  let history = useHistory();
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

  function handleAccept(){
    var form_data = new FormData();
    for ( var key in formState ) {
      form_data.append(key, formState[key]);
    }
    const data={id:app._id,payload: form_data}
    empAccept(data)
    .then(
      history.go("/employer/applications")
    ).catch(()=>{
      setServererror("something went wrong")
    })
  }

  function handleReject(){
    const data={id:app._id,payload:{feedback: formState.feedback}}
    empReject(data)
    .then(
      history.go("/employer/applications")
    ).catch(()=>{
      setServererror("something went wrong")
    })
  }

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  console.log("formState is",formState)

  return (
    <>
          
      {modalClicked ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper
            modalClicked={modalClicked}
            >
        {serverError && <p style={{color:"red"}}>{serverError}</p>}          
            <ModalContent>
              <Header>
                <Heading>{seeker.name}</Heading>
                <DateApplied>Applied {Moment(stages.SUBMITTED.actionDate).format('d MMM YYYY')}</DateApplied>
              </Header>
              <Body>
                <BodySubtitle>About {seeker.name}</BodySubtitle>
                <BodyContent readOnly defaultValue={seeker.about}>        
                </BodyContent>
                <FormContainer>
                {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                <BodySubtitle>Interview arranged on</BodySubtitle>
                <InterviewTimeContainer>
                    <InterviewTime>{Moment(stages.SCHEDEULED_FOR_INTERVIEW.actionDate).format('d MMM YYYY LT')}</InterviewTime>
                </InterviewTimeContainer>
                <BodySubtitle>Feedback</BodySubtitle>
                <BodyContent onChange={(e)=>{setFormState({...formState,"feedback":e.target.value})}} value={formState.feedback} name="feedback" placeholder="Please add any feedback you have for the applicant.">
                  
                </BodyContent>
              <ContractContainer>
                <BodySubtitle>Upload Contract</BodySubtitle>
                <ContractInput  type="file" placeholder="Upload Contract" onChange={({target})=>{setFormState({...formState,"contract":target.files[0]})}}></ContractInput>
                  

              </ContractContainer>
              </Body>
            </ModalContent>
            <BtnContainer>
              <ModalBtn
                onClick={handleAccept}
              >
                Offer Position
              </ModalBtn>
              <ModalBtn
                onClick={handleReject}
              >
                Reject
              </ModalBtn>
            </BtnContainer>
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

export default EmployerOfferPositionModal;
