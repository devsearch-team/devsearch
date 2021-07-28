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
const SelectUserModalWrapper = styled.div`
  width: 900px;
  height: 400px;
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

const SelectUserModal = ({ showSelectUserModal, setSelectUserModal }) => {
  // Adds close functionality to SelectUser Modal
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setSelectUserModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showSelectUserModal) {
        setSelectUserModal(false);
      }
    },
    [setSelectUserModal, showSelectUserModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showSelectUserModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <SelectUserModalWrapper showSelectUserModal={showSelectUserModal}>
            <SecondBackground>
              <EmployerRegisterContent>
                <Heading>Need help hiring new staff? </Heading>
                <ModalBtn>Register Now</ModalBtn>
              </EmployerRegisterContent>
            </SecondBackground>
            <JobSeekerRegisterContent>
              <Heading>Need help to find your next career? </Heading>
              <ModalBtn>Register Now</ModalBtn>
            </JobSeekerRegisterContent>

            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setSelectUserModal((prev) => !prev)}
            />
          </SelectUserModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default SelectUserModal;
