import styled from "styled-components";
import { theme } from "../globalStyles";

export const ModalBtn = styled.button`
  width: 250px;
  height: 50px;
  background: ${(props) => theme.PrimaryBtnBg};
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
`;
