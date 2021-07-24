import styled from "styled-components";
import { theme } from "../globalStyles";

export const ModalBtn = styled.button`
  margin: 1rem 0;
  width: 250px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.2);
  transition: 3s all ease-out;
  background: ${(props) => theme.PrimaryBtnBg};
  &:hover {
    box-shadow: 7px 3px 5px rgba(0, 0, 0, 0.8);
  }
`;

export const InputButton = styled.button`
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  background: ${(props) => theme.PrimaryBtnBg};
  cursor: pointer;
  &:hover {
    font-weight: bold;
    box-shadow: 3px 3px 5px #333;
  }
  @media only screen and (max-width: 800px) {
    font-size: 14px;
    max-width: 150px;
  }
`;
