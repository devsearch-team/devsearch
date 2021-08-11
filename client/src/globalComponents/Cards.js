import React, {useState} from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";
import { FaChevronRight } from "react-icons/fa";
import RobotArm from "../Assets/robotArm.jpg";
import {useHistory} from 'react-router-dom'
import EmployerViewApplicationModal from '../modals/EmployerViewApplicationModal'
import EmployerAcceptedApplicationModal from '../modals/EmployerAcceptedApplicationModal'
import EmployerInterviewingApplicantModal from '../modals/EmployerInterviewingApplicantModal'
import EmployerOfferPositionModal from '../modals/EmployerOfferPositionModal'
import EmployerRejectedApplicationModal from '../modals/EmployerRejectedApplicationModal'
const CardSmall = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
  padding: 10px;
  height: 200px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
  margin-left: 1.5rem;
`;
const LogoContainer = styled.div`
  margin: 1rem 1rem;
  width: 50px;
  height: 50px;
  overflow: hidden !important;
  border-radius: 50%;
  `;
  const Logo = styled.img`
  border: none;
  object-fit: cover;
  width: 100%;
  height:100%;
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

export  default function EmployerApplicationsCard({ jobTitle, company, date, applicantName }) {
  const [showEmployerViewApplicationModal, setEmployerViewApplicationModal] = useState(false)
  const [showEmployerAcceptedApplicationModal, setEmployerAcceptedApplicationModal] =useState(false)
  const [showEmployerInterviewingApplicantModal, setEmployerInterviewingApplicantModal] =useState(false)
  const [showEmployerOfferPositionModal, setEmployerOfferPositionModal] =useState(false)
  const [showEmployerRejectedApplicationModal, setEmployerRejectedApplicationModal] =useState(false)
  
  const openEmployerViewApplicationModal= () => {  
    setEmployerViewApplicationModal((prev) => !prev);
  };

  const openEmployerAcceptedApplicationModal= () => {  
    setEmployerAcceptedApplicationModal((prev) => !prev);
  };

  const openEmployerInterviewingApplicantModal= () => {  
    setEmployerInterviewingApplicantModal((prev) => !prev);
  };

  const openEmployerOfferPositionModal= () => {  
    setEmployerOfferPositionModal((prev) => !prev);
  };

  const openEmployerRejectedApplicationModal= () => {  
    setEmployerRejectedApplicationModal((prev) => !prev);
  };

  console.log("jobTitle")
  console.log(jobTitle)
  console.log(company)
  return (
    <CardSmall>
      <CardLeft>
        <LogoContainer>
          <Logo src={RobotArm} alt="Company Logo"></Logo>
        </LogoContainer>
        <CardText>{date}</CardText>
        <CardText>{applicantName}</CardText>
        <CardText>{jobTitle}</CardText>
        <CardText>{company}</CardText>
      </CardLeft>
      <EmployerViewApplicationModal
            showEmployerViewApplicationModal={showEmployerViewApplicationModal}
            setEmployerViewApplicationModal={setEmployerViewApplicationModal}
          />
      <EmployerAcceptedApplicationModal
            showEmployerAcceptedApplicationModal={showEmployerAcceptedApplicationModal}
            setEmployerAcceptedApplicationModal={setEmployerAcceptedApplicationModal}
          />
      <EmployerInterviewingApplicantModal
            showEmployerInterviewingApplicantModal={showEmployerInterviewingApplicantModal}
            setEmployerInterviewingApplicantModal={setEmployerInterviewingApplicantModal}
          />
      <EmployerOfferPositionModal
            showEmployerOfferPositionModal={showEmployerOfferPositionModal}
            setEmployerOfferPositionModal={setEmployerOfferPositionModal}
          />
      <EmployerRejectedApplicationModal
            showEmployerRejectedApplicationModal={showEmployerRejectedApplicationModal}
            setEmployerRejectedApplicationModal={setEmployerRejectedApplicationModal}
          />
      <CardRight>
        <CardBtn  onClick={openEmployerViewApplicationModal}>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
        <CardBtn  onClick={openEmployerAcceptedApplicationModal}>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
        <CardBtn  onClick={openEmployerInterviewingApplicantModal}>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
        <CardBtn  onClick={openEmployerOfferPositionModal}>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
        <CardBtn  onClick={openEmployerRejectedApplicationModal}>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
      </CardRight>
    </CardSmall>
  );
}
export function EmployerJobListingCard({ jobTitle, company, date, jobId, applicantName }) {
  let history= useHistory()
  return (
    <CardSmall>
      <CardLeft>
        <LogoContainer>
          <Logo src={RobotArm} alt="Company Logo"></Logo>
        </LogoContainer>
        <CardText>{date}</CardText>
        <CardText>{jobTitle}</CardText>
        <CardText>{company}</CardText>
        <CardText>{applicantName}</CardText>
      </CardLeft>
      <CardRight>
        <CardBtn onClick={()=>{history.push(`/employer/jobs/update/${jobId}`)}}>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
      </CardRight>
    </CardSmall>
  );
}
