import React from 'react'
// import ReactHtmlParser from "react-html-parser";

import styled from "styled-components";
import { theme } from "../globalStyles";
import RobotArm from "../Assets/robotArm.jpg";
const ViewJobContainer = styled.div`
display:grid;
grid-area: content;
margin-top: 15rem;
margin-left:15rem;
margin-bottom: 5rem;
@media only screen and (max-width: 1200px) {
    margin-left:15rem;
    width:100%;
}
@media only screen and (max-width: 900px) {
    margin-left:15rem;
    width:100%;
}
@media only screen and (max-width: 768px) {
    margin-top: 1rem;
  margin-left:2.3rem;
  width:100%;
}
`;

const JobInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  
  width: 740px;
  border-radius: 5px;
  
  border: 1px solid ${theme.Accent};
  background: ${theme.accentBg};
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  
  @media only screen and (max-width: 1080px) {
      width: 540px;
      max-width:60%;
    }
    @media only screen and (max-width: 768px) {
        
        
        width: 440px;
    }
    @media only screen and (max-width: 468px) {
        width: 300px;  
    }
    `;
const TimeSincePost = styled.h2`
  margin: 0 1rem;
  font-weight: 500;
  color: ${theme.PrimaryTxt};
  font-size: 18px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 16px;
  }
  @media only screen and (max-width: 768px) {
    display:block;
    // margin: 0;
    padding:5px;
    white-space: nowrap;
    font-size: 12px;
    width:20%;
    // height:100%;
  }
  @media only screen and (max-width: 468px) {
    // margin-left:1rem;
    padding:5px;
    white-space: nowrap;
    font-size: 10px;
    width:30%;
    // height:100%;
  }
`;
const CompanyLogo = styled.div`
  margin: 0.5rem 1rem;
  width: 66px;
  height: 66px;
  overflow-y: hidden;
  border-radius: 50%;
  @media only screen and (max-width: 460px) {
    width: 46px;
    height: 46px;
  }
`;
const Logo = styled.img`
  border: none;
  object-fit: cover;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width:100%;
  margin-top:0.5rem;
`;

const Heading = styled.h4`
  margin: 0.3rem 1rem;
  color: ${theme.PrimaryBtnBg};
  text-decoration: none;
  font-weight: 600;
  font-size: 24px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 20px;
  }
  @media only screen and (max-width: 900px) {
    margin: 0.3rem 1rem;
    font-size: 18px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    width: 100%;
  }
  @media only screen and (max-width: 460px) {
    font-size: 16px;
    
    width: 100%;
  }
`;


const CompanyInfoContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  width: 100%;
  
  @media only screen and (max-width: 1080px) {
      margin: 0.2rem 0rem;
    }
    @media only screen and (max-width: 768px) {
        width: 100%;

        margin-bottom: 0.1rem;
    
    }
  @media only screen and (max-width: 460px) {
    width: 100%;
    // height: 100%;
  }
`;

const CompanyName = styled.h2`
  margin: 0.3rem 1rem;
  margin-bottom: 0.5rem;
  color: ${theme.PrimaryTxt};
  font-size: 18px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 16px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 14px;
  }

`;
const Location = styled.p`
  font-weight: 550;
  margin: 0.5rem 1rem;
  color: ${theme.PrimaryTxt};
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 12px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 10px;
  }
`;
const Salary = styled.p`
  font-weight: 550;
  margin: 0.5rem 1rem;
  color: ${theme.PrimaryTxt};
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 12px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 10px;
  }
`;
const Category = styled.p`
  font-weight: 550;
  margin: 0.5rem 1rem;
  color: ${theme.PrimaryTxt};
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 12px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 10px;
  }
`;
const JobInfo = styled.div`
width:100%;

`;

const SeekerViewJob = () => {
  
  // const wysiwyg = wysiwyg
    let date = new Date();
    let hour = date.getHours();
    return (
        <ViewJobContainer>
        <JobInfoContainer>
            <CompanyLogo>
                <Logo src={RobotArm} alt="Company Logo"></Logo>
             </CompanyLogo>
             <Header>
             <Heading>Front End Developer</Heading>
                <TimeSincePost>{hour}h ago</TimeSincePost>
             </Header>
             <CompanyInfoContainer>
                 <CompanyName>RoboCorp</CompanyName>
                 <Location>Brisbane</Location>
                 <Salary>$85,000 to $100,000</Salary>
                 <Category>Developers/Programmers</Category>
             </CompanyInfoContainer>
            
        <JobInfo >
        {/* {ReactHtmlParser(wysiwyg)} */}
        </JobInfo>
      
        </JobInfoContainer>
        </ViewJobContainer>
    )
}

export default SeekerViewJob
