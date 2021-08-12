import React, {useState} from "react"
import styled from "styled-components"
import { theme } from "../globalStyles"
import { FaChevronRight } from "react-icons/fa"
import RobotArm from "../Assets/robotArm.jpg"
import {useHistory} from 'react-router-dom'
import {useGlobalState} from '../utils/globalContext'
import ViewModal from './ViewModal'
const CardSmall = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  padding: 10px;
  height: 250px;
  margin: 1rem;
  background: ${theme.accentBg};
  color: ${theme.PrimaryTxt};
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
  color: ${theme.PrimaryTxt};
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


export function ApplicationCard({ app,stage }) {

  const [modalClicked,setModalClicked]=useState(false)
  const {store} = useGlobalState()
  const {isEmployer}=store
  const handleModalClicked=()=>{
    setModalClicked(true)
  }
  return (
    <CardSmall>
      <CardLeft>
        <LogoContainer>
          <Logo src={RobotArm} alt="Company Logo"></Logo>
        </LogoContainer>
        <CardText>{app.job.title}</CardText>
        <CardText>{app.stages[stage].actionDate}</CardText>
        <CardText>{(isEmployer==="true") ?app.seeker.name:app.employer.name}</CardText>
        <CardText style={{color: `${theme.PrimaryBtnBg}`}} >{app.job.title}</CardText>
      </CardLeft>
      {console.log("modalClicked",modalClicked)}
        {modalClicked&&<ViewModal app={app} stage={stage} setModalClicked={setModalClicked} modalClicked={modalClicked}/>}
      <CardRight>
       <CardBtn  onClick={handleModalClicked}>
          <FaChevronRight style={{ fontSize: "24px", paddingTop: "3px" }} />
        </CardBtn>
      </CardRight>
    </CardSmall>
  );
}
export function EmpJobCard({ jobTitle, company, date, jobId, applicantName }) {
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
