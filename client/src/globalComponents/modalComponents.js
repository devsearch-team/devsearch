import styled from "styled-components";
import { theme } from "../globalStyles";
import { MdClose } from "react-icons/md";
export const Heading = styled.h1`
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

export const Background = styled.div`
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

  export const ModalWrapper = styled.div`
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
export const LongModalWrapper = styled.div`
  max-width: 500px;
  max-height: 100%;
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

export const ModalContent = styled.div`
margin: 0rem 1rem;
width: 95%;


@media only screen and (max-width: 768px) {
  overflow-x:hidden !important;
  margin: 0 .5rem;
  // justify-content: center;
  // align-items: left;
  width: 95%;
  max-width:90vw;
  // height: 100vh;
}
`;
export const Header = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
border-radius: 5px;
margin: 1.5rem 1rem;
margin-top: 3rem;
padding-bottom:.5rem;
background: ${theme.NavBg};
width: 70%;
overflow-x:hidden !important;
@media only screen and (max-width: 768px){
  width: 80%;
  }
  `;

  export const BodyContentP = styled.p`
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

export const DateApplied = styled.p`
  margin: 0.5rem 1rem;
  font-size:14px;
  color: ${theme.PrimaryTxt};
  width:100%;
`;
export const Body = styled.div`
display: flex;
flex-direction: column;
margin: 1rem 0;
// width: 100%;
`;
export const EmployerInfoData = styled.p`
margin: 0.5rem 2rem;
color:${theme.PrimaryTxt}
`;
export const BodySubtitle = styled.h6`
margin: 0.5rem 1.5rem;
font-size:18px;
font-weight:600px;
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
export const InterviewTime = styled.p`
font-size:14px;
font-weight:550;
border-radius:5px;
background: ${theme.accentBg};
width:80%;
line-height:1.3;
text-align:left;
border:none;
padding:5px;
height:30px;
margin: 0.5rem 1rem;
color:${theme.PrimaryTxt}
`;

export const FileLink = styled.a`
margin: 0.1rem 3rem;
`;

export const ModalBtn = styled.button`
margin: 0.5rem 0;
width: 150px;
height: 40px;
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
@media only screen and (max-width: 768px ){
  width:200px;
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

export const BodyContent = styled.textarea`
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

export const BtnContainer = styled.div`
display: flex;
width: 90%;
justify-content: space-evenly;
// max-width:100%;
`;

export const FormContainer = styled.div`
display:flex;
margin:1rem;
`;

export const InterviewTimeContainer = styled.div`
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

export const ContractInfoContainer = styled.div`
display:flex;
width:100%;
margin: 1rem -2rem;
justify-content:center;
// max-width:100%;
`;

export const ContractDownloadBtn = styled.a`
// width:200px;
text-decoration: none;

&:hover{
  text-decoration: underline;
  font-weight:600;
}
`;