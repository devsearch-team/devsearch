import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { theme } from "../globalStyles";
import {Heading,Body,FormContainer,FileLink,BodyContent,BtnContainer,CloseModalButton,BodySubtitle,Background,DateApplied,ModalWrapper,Header,ModalContent} from "../globalComponents/modalComponents"
import "react-datepicker/dist/react-datepicker.css";
import {empAccept,empReject} from "../services/applicationServices"
import './DateEditor.css'
import './applications.css'
import Moment from 'moment';

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
                <BodySubtitle>Set Interview Time</BodySubtitle>
                <InterviewTime>
                <DatePicker 
                name="interviewTime"
                    selected={formState.interviewTime}
                    //onChange={(date) => setStartDate(date)}
                    onChange={(value)=>{console.log("date picker time",value);setFormState({...formState,"interviewTime":value})}}
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
