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
