import React from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";
import { FaChevronRight } from "react-icons/fa";
import RobotArm from "../Assets/robotArm.jpg";

const CardSmall = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  padding: 10px;
  height: 160px;
  margin: 1rem;
  background: ${theme.SecondaryBtnBg};
  color: ${theme.SecondaryTxt};
  border: 1px solid ${theme.Accent};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CardLeft = styled.div`
  display: flex;
  justify-content: center;
  // padding: 3px;
  flex-direction: column;
  height: 100%;
  width: 60%;
`;
const CardRight = styled.div`
  display: felx;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  margin-left: 1.5rem;
`;
const CompanyLogo = styled.div`
  margin: 1rem 1rem;
  width: 40px;
  height: 40px;
  overflow-y: hidden;
  border-radius: 50%;
`;
const Logo = styled.img`
  border: none;
  object-fit: cover;
  width: 100%;
`;
const CardText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.SecondaryTxt};
  margin: 5px 1rem;
`;

const CardBtn = styled.button`
  width: 50px;
  border-radius: 50%;
  font-size: 24px;
  text-align: center;
  height: 50px;
  cursor: pointer;
  border: 1px solid ${theme.Accent};

  transition: 3s all ease-out;
  background: ${(props) => theme.PrimaryBtnBg};
  &:hover {
    transform: scale(1.2);
  }
`;

export default function Card({ jobTitle, company, date }) {
  return (
    <CardSmall>
      <CardLeft>
        <CompanyLogo>
          <Logo src={RobotArm} alt="Company Logo"></Logo>
        </CompanyLogo>
        <CardText>{date}</CardText>
        <CardText>{jobTitle}</CardText>
        <CardText>{company}</CardText>
      </CardLeft>
      <CardRight>
        <CardBtn>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
      </CardRight>
    </CardSmall>
  );
}