import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { getJob } from "../services/jobServices";

import { useHistory, useParams, Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { theme } from "../globalStyles";
import "react-datepicker/dist/react-datepicker.css";
import { getSeeker } from "../services/authServices";
import './DateEditor.css'
import EmpApplications from "../pages/EmpApplications";

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

const InterviewTimeContainer = styled.div`
  border-radius: 5px;
  background: ${theme.accentBg};

  text-align: left;
  border: none;
  padding: 15px;
  height: 100%;
  width:80%;
  margin: 0.5rem 1rem;

  @media only screen and (max-width: 768px){
    
    // display:flex;
    height: 100%;
    // justify-content:center;
    padding-bottom:5px;
    
    width: 80%;
  }
`;
const InterviewTime = styled.p`
font-size:16px;
`
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
const FormContainer = styled.div`
display:flex;
margin:1rem;
`;
const ContractContainer = styled.div`
display:flex;
justify-center:space-evenly;
align-items:center;
width: 100%;
// margin: 0 -1rem;
`;
const FileLink = styled(Link)`
margin: 0.1rem 3rem;
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
  // Adds close functionality to ShowApplication Modal
  // const [value, onChange] = useState(new Date());
console.log("inside employer offer application modal")

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

  // Get Job Information for header
  // const [employerData, setEmployerData] = useState('')
  // const [seekerData, setSeekerData] = useState('')

  // let {id} = useParams()
  // useEffect(() => {
  //   getJob(id)
  //   .then((data) => {
  //     setEmployerData(data.data)
  //     console.log("EmployerData",data.data)
  //   })
  // }, [id])

  // useEffect(() => {
  //   getSeeker()
  //   .then((data) => {
  //     setSeekerData(data)
  //     console.log("SeekerData",data)
  //   })
  // }, [])
  // console.log(seekerData)

  // Get the date from interview time

  return (
    <>
          
      {modalClicked ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper
            modalClicked={modalClicked}
            >
           
            <ModalContent>
              <Header>
                <Heading>Joe Blogs</Heading>
                <DateApplied>Applied {Date.now()}</DateApplied>
              </Header>
              <Body>
                <BodySubtitle>About Joe Blogs</BodySubtitle>
                <BodyContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor nam a viverra sed id nulla laoreet accumsan. Cursus et
                  fermentum turpis ut suspendisse rhoncus nec neque. Dui, sed
                  amet maecenas sollicitudin. Est proin pulvinar imperdiet morbi
                  nulla senectus. Id in est, etiam aenean. Tincidunt dignissim
                  tristique suspendisse arcu, accumsan..
                </BodyContent>
                <FormContainer>
                  <FileLink to={'/'}target="blank">View Resume</FileLink>
                  <FileLink to={'/'}target="blank">View Cover Letter</FileLink>
                </FormContainer>
                <BodySubtitle>Interview arranged on</BodySubtitle>
                <InterviewTimeContainer>
                    <InterviewTime>09/11/21 9:30am</InterviewTime>
                </InterviewTimeContainer>
                <BodySubtitle>Important Information</BodySubtitle>
                <BodyContent>
                  Important Information regarding this Interview
                </BodyContent>
                <BodySubtitle>Feedback</BodySubtitle>
                <BodyContent>
                  Please add any feedback you have for the applicant.
                </BodyContent>
              <ContractContainer>
                <BodySubtitle>Upload Contract</BodySubtitle>
                <ContractInput  type="file" placeholder="Upload Contract" onChange={({target})=>{}}></ContractInput>
                  

              </ContractContainer>
              </Body>
            </ModalContent>
            <BtnContainer>
              <ModalBtn
                onClick={() => {
                  history.push("/employer/applications");
                  setModalClicked(false);
                }}
              >
                Offer Position
              </ModalBtn>
              <ModalBtn
                onClick={() => {
                  history.push("/employer/applications");
                  setModalClicked(false);
                }}
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