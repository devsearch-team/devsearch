import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { theme } from "../globalStyles";
import "react-datepicker/dist/react-datepicker.css";
import {empAccept,empReject} from "../services/applicationServices"
import './DateEditor.css'
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
height: 120px;
overflow-x:hidden !important;
@media only screen and (max-width: 768px){
  height: 100px;
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

const BodyContent = styled.textarea`
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

const InterviewTime = styled.div`
  border-radius: 5px;
  background: ${theme.accentBg};

  text-align: left;
  border: none;
  padding: 15px;
  height: 100%;
  width:80%;
  margin: 0.5rem 1rem;
  // color: ${theme.PrimaryTxt};
  @media only screen and (max-width: 768px){
    
    // display:flex;
    height: 100%;
    // justify-content:center;
    padding-bottom:5px;
    
    width: 80%;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-evenly;
  // max-width:100%;
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
const ModalBtn = styled.button`
  margin: 1rem 0rem;
  width: 150px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 18px;
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
const FormContainer = styled.div`
display:flex;
margin:1rem;
`;
const FileLink = styled.a`
margin: 0.1rem 3rem;
`;

const EmployerViewApplicationModal = ({app,modalClicked,setModalClicked}) => {

  const {seeker,stages}= app
  const initialFormState = {
		interviewTime: new Date(),
		information: ''
	}
	const [formState, setFormState] = useState(initialFormState)
const [serverError,setServererror]= useState("")
console.log("inside employer view application modal")

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

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const handleOfferSubmit=()=>{
    const data={id:app._id,payload:formState}
    empAccept(data)
    .then(
      history.go("/employer/applications")
    ).catch(()=>{
      setServererror("something went wrong")
    })
  }

  // console.log("formState is",formState)
  function handleReject(){
    const data={id:app._id,payload:{feedback: formState.information}}
    empReject(data)
    .then(
      history.go("/employer/applications")
    ).catch(()=>{
      setServererror("something went wrong")
    })
  }
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
                <DateApplied>Applied {stages.SUBMITTED.actionDate}</DateApplied>
              </Header>
              <Body>
                <BodySubtitle>About {seeker.name}</BodySubtitle>
                <BodyContent readOnly defaultValue={seeker.about}>
                  
                </BodyContent>
                <FormContainer>
                  {((seeker.resumeFile)&&(seeker.resumeFile!=="undefined"))&&<FileLink href={seeker.resumeFile} target="_blank">View Resume</FileLink>}
                {(app.coverLetter&&app.coverLetter!=="undefined")&&<FileLink href={app.coverLetter} target="_blank">View Cover Letter</FileLink>}
                </FormContainer>
                <BodySubtitle>Set Interview Time</BodySubtitle>
                <InterviewTime>
                <DatePicker 
                name="interviewTime"
                    selected={formState.interviewTime}
                    //onChange={(date) => setStartDate(date)}
                    onChange={(value)=>{setFormState({...formState,"interviewTime":value})}}
                    dateFormat='dd/MM/yyyy h:mm aa'
                    minDate={new Date()}
                    showMonthDropdown
                    className='dateEditor'
                    wrapperClassName='dateTimeWrapper'
                    popperClassName='timeClass'
                    showTimeSelect={true}   
                    timeCaption="Time"              />
                </InterviewTime>
                <BodySubtitle>Important Information</BodySubtitle>
                <BodyContent onChange={(e)=>{setFormState({...formState,"information":e.target.value})}} value={formState.information} name="information" placeholder="Important Information regarding this Interview
">
                </BodyContent>
              </Body>
            </ModalContent>
            <BtnContainer>
              <ModalBtn
                onClick={handleOfferSubmit}
              >
                Offer Interview
              </ModalBtn>
              <ModalBtn onClick={handleReject}>
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

export default EmployerViewApplicationModal;
