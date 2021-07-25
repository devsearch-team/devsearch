import styled from "styled-components";
import { theme } from "../globalStyles";

export const Input = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: ${theme.SecondaryTxt};
  margin-bottom: 1rem;
  font-size: 18px;
  @media only screen and (max-width: 800px) {
    max-width: 200px;
    margin-bottom: 0.5rem;
  }
`;
export const ProfileInput = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  margin-top: 1rem;
  border: none;
  color: ${theme.SecondaryTxt};
  font-size: 18px;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    max-width: 60%;
    width:400px;
  }
`;

export const ProfileLongInput = styled.input`
  width: 600px;
  padding: 10px;
  border-radius: 5px;
  margin-top: 1rem;
  border: none;
  color: ${theme.SecondaryTxt};
  font-size: 18px;
  @media only screen and (max-width: 900px) {
    max-width: 60%;
    
    }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    max-width: 80%;
    // width:600px;
  }
`;
export const ProfileShortInput = styled.input`
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-top: 1rem;
  color: ${theme.SecondaryTxt};
  font-size: 18px;
  // @media only screen and (max-width: 800px) {
  //   font-size: 14px;
  //   max-width: 160px;
  // }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    max-width: 60%;
    width:300px;
  }
`;
