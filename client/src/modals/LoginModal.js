import React, { useRef, useEffect, useCallback } from "react";

import styled from "styled-components";

import { MdClose } from "react-icons/md";
import { theme } from "../globalStyles";
import { ModalBtn } from "../globalComponents/Buttons";

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
  animation: unfoldOut 1s cubic-bezier(0.65, 0.84, 0.42, 1) forwards;

  @keyframes unfoldOut {
    0% {
      transform: scaleX(0.0005) scaleY(0);
      background: rgba(0, 0, 0, 1);
    }
    50% {
      transform: scaleX(0.003) scaleY(1);
      background: rgba(0, 0, 0, 1);
    }
    100% {
      transform: scaleX(1) scaleY(1);
      background: rgba(0, 0, 0, 0.9);
    }
  }
`;
const LoginModalWrapper = styled.div`
  width: 900px;
  height: 300px;
  box-shadow: 3px 3px 5px #333;
  background: ${(props) => theme.MainBg};
  color: ${(props) => theme.PrimaryTxt};
  display: grid;
  grid-template-columns: 1fr 1fr;
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
`;

const SecondBackground = styled.div`
  width: 450px;
  height: 100%;
  background: ${(props) => theme.NavBg};
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
`;
const EmployerRegisterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin: 0 3rem;
  width: 100%;
  height: 100%;
`;
const JobSeekerRegisterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  margin: 0 3rem;
  width: 100%;
  height: 100%;
`;

const Heading = styled.h1`
  margin: 1rem 0;
  width: 80%;
  word-wrap: wrap;
  font-size: 36px;
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

const LoginModal = ({ showLoginModal, setLoginModal }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setLoginModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showLoginModal) {
        setLoginModal(false);
      }
    },
    [setLoginModal, showLoginModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showLoginModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <LoginModalWrapper showLoginModal={showLoginModal}>
            <SecondBackground>
              <EmployerRegisterContent>
                <Heading>Login As Employer</Heading>
                <ModalBtn>Login</ModalBtn>
              </EmployerRegisterContent>
            </SecondBackground>
            <JobSeekerRegisterContent>
              <Heading>Login As Job Seeker </Heading>
              <ModalBtn>Login</ModalBtn>
            </JobSeekerRegisterContent>

            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setLoginModal((prev) => !prev)}
            />
          </LoginModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default LoginModal;
