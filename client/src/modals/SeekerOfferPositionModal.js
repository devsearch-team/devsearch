import React, { useRef, useEffect, useCallback,useState } from "react";
import styled from "styled-components";
import { getJob } from "../services/jobServices";
import {useHistory,  useParams, Link} from 'react-router-dom'
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
  height:60%;
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
height:100px;
margin: 0.5rem 1rem;
color:${theme.PrimaryTxt}
`;

const InterviewTime = styled.p`
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
height:20px;
margin: 0.5rem 1rem;
color:${theme.PrimaryTxt}
`;

const BtnContainer = styled.div`

display:flex;
width:90%;
justify-content:space-evenly;
// max-width:100%;
`;
const ContractInfoContainer = styled.div`
display:flex;
width:100%;
margin: 1rem 1rem;
justify-content:center;
// max-width:100%;
`;
const ContractDownloadBtn = styled(Link)`
width:200px;
text-decoration: none;

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
  width: 130px;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.2);
  transition: 3s all ease-out;
  background: ${(props) => theme.PrimaryBtnBg};
  &:hover {
    box-shadow: 7px 3px 5px rgba(0, 0, 0, 0.8);
  }
  @media only screen and (max-width: 768px ){
    width:100px;
    font-size:18px;
    margin-top:0.5rem;
    margin-bottom:2rem;
    height:40px;
  }
  @media only screen and (max-height: 600px ){
    width:180px;
    font-size:16px;
    margin-top:0.5rem;
    margin-bottom:2rem;
    height:40px;
  }
`;

const SeekerOfferPositionModal = ({showOfferPositionModal, setOfferPositionModal}) => {
  // Adds close functionality to ShowApplication Modal
  const modalRef = useRef();
  let history = useHistory()
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOfferPositionModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showOfferPositionModal) {
        setOfferPositionModal(false);
      }
    },
    [setOfferPositionModal, showOfferPositionModal]
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
      { showOfferPositionModal ?(
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper showOfferPositionModal={showOfferPositionModal}>
            
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
                  <BodySubtitle>Position Offered</BodySubtitle>
                    <BodyContent>
                    Dear {seekerData.name}  we are pleased to inform you that your application for {employerData.title} with {employerData.employer.name} was successful and we would like to offer you an a Position within our company. See below for more information.    
                    </BodyContent>
                  <BodySubtitle>Interviewed on</BodySubtitle>
                    <InterviewTime>Monday, 27th March, 11am</InterviewTime>
                  <BodySubtitle>Important Information</BodySubtitle>
                    <BodyContent >
                    Important Information regarding the offer you have recieved
                    </BodyContent>
                  <ContractInfoContainer>
                    <ContractDownloadBtn>View Contract</ContractDownloadBtn>
                  </ContractInfoContainer>
                </Body>
              </ModalContent>
                <BtnContainer>
                <ModalBtn onClick={() => {history.push('/seeker/jobs'); setOfferPositionModal(false);}}>Accept</ModalBtn>
                <ModalBtn onClick={() => {history.push('/seeker/jobs'); setOfferPositionModal(false);}}>Deny</ModalBtn>
                </BtnContainer>
            

            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setOfferPositionModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default SeekerOfferPositionModal;
