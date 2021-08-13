import styled from "styled-components";
import { theme } from "../globalStyles";

export const ApplicationsContainer = styled.div`
display:grid;
grid-area: content;
margin-top: 15rem;
margin-left:25rem;
@media only screen and (max-width: 1200px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 900px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 768px) {
  margin-left:1rem;
  margin-top: 3rem;
  width:100%;
}
`;

export const CardContainer = styled.div`
display: flex;
flex-direction: row;
justify-content:center;
// border:1px solid red;
max-width: 80%;
flex-wrap: wrap;

@media only screen and (max-width: 768px){
justify-content:center;
margin-left:4rem;
}
`;
export const Heading = styled.h1`
margin: 1rem 0;
@media only screen and (max-width: 768px) {
  font-size: 24px;
  margin: 1rem 1rem;
}
`;
export const ProfileContainer = styled.div`
display:grid;
grid-area: content;
margin-top: 15rem;
margin-left:15rem;
@media only screen and (max-width: 1200px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 900px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 768px) {
  margin-left:1rem;
  width:100%;
}

`;

export const SubHeading = styled.h3`
margin: 1rem 0;
@media only screen and (max-width: 768px) {
  font-size: 18px;
  
}
`;
export const FormDiv = styled.div`
display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
  @media only screen and (max-width: 768px) {
    margin: 1rem 1rem;
    width:100vw;
  }
`;
export const SideBySideInputContainer = styled.div`
  width: 600px;
  display: grid;
  grid-template-rows: 1fr, 1fr;
  grid-template-areas: "left right" "leftLabel rightLabel";
 
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width:100%;
    // max-width: 600px;
  }

`;
export const InputLabel = styled.label`
font-weight: 500;
font-size: 14px;
margin: 5px;
opacity: 0.5;
@media only screen and (max-width: 768px) {
  font-size: 10px;
  opacity: 0.5;
}
`;

export const About= styled.textarea`
  width: 600px;
  height: 400px;
  background: ${theme.NavBg};
  font-size: 18px;
  border: 1px solid ${theme.Accent};
  resize: none;
  padding: 10px;
  @media only screen and (max-width: 900px) {
    width:500px;
    }
    @media only screen and (max-width: 800px) {
      // width: 400px;
      max-width:80%;
    }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    // width: 400px;
    max-width:80%;
    
    height: 300px;
  }
`;
export const Email = styled.h5`
font-weight:500;
font-size:16px;
`;