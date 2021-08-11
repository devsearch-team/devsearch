import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";


import { useHistory, useParams, Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { theme } from "../globalStyles";





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

const BodyContent = styled.p`
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


const SeekerRejectedApplicationModal = ({
  showSeekerRejectedApplicationModal,
  setSeekerRejectedApplicationModal,
  
}) => {
  // Adds close functionality to ShowApplication Modal
  // const [value, onChange] = useState(new Date());
  const modalRef = useRef();
  let history = useHistory();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setSeekerRejectedApplicationModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showSeekerRejectedApplicationModal) {
        setSeekerRejectedApplicationModal(false);
      }
    },
    [setSeekerRejectedApplicationModal, showSeekerRejectedApplicationModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // Get Job Information for header
  // const [SeekerData, setSeekerData] = useState('')
  // const [seekerData, setSeekerData] = useState('')

  // let {id} = useParams()
  // useEffect(() => {
  //   getJob(id)
  //   .then((data) => {
  //     setSeekerData(data.data)
  //     console.log("SeekerData",data.data)
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
          
      {showSeekerRejectedApplicationModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper
            showSeekerRejectedApplicationModal={showSeekerRejectedApplicationModal}
            >
           
            <ModalContent>
              <Header>
                <Heading>Joe Blogs</Heading>
                <DateApplied>Applied {Date.now()}</DateApplied>
              </Header>
              <Body>
                <BodySubtitle>Application Status</BodySubtitle>
                <BodyContent>
                 We are sorry to inform you that your application with COMPANY NAME will not be progressing further.
                </BodyContent>
                <BodySubtitle>Feedback</BodySubtitle>
                <BodyContent>
                  Please add any feedback you have for the applicant.
                </BodyContent>
              </Body>
            </ModalContent>

            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setSeekerRejectedApplicationModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
     
    </>
  );
};

export default SeekerRejectedApplicationModal;
