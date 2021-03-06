import React from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";
import RobotArm from "../Assets/robotArm.jpg";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Moment from 'moment';
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 740px;
  border-radius: 5px;
  height: 400px;
  border: 1px solid ${theme.Accent};
  background: ${theme.accentBg};
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  @media only screen and (max-width: 1080px) {
    width: 540px;
    height: 300px;
  }
  @media only screen and (max-width: 768px) {
    width: 440px;
  }
  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 350px;
  }
`;

const CompanyLogo = styled.div`
  margin: 0.5rem 1rem;
  width: 66px;
  max-height: 66px;
  height100%;
  overflow-y: hidden !important;
  border-radius: 50%;
  @media only screen and (max-width: 460px) {
    width: 46px;
    height: 46px;
  }
`;
const Logo = styled.img`
  border: none;
  object-fit: fit;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 12%;
`;
const JobTitleLink = styled(Link)`
  margin: 0.3rem 1rem;
  color: ${theme.PrimaryBtnBg};
  text-decoration: none;
  font-weight: 600;
  font-size: 22px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 20px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    width: 100%;
  }
  @media only screen and (max-width: 460px) {
    font-size: 16px;
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
    font-size: 14px;
  }
`;
const CompanyInfoContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;

  width: 60%;
  height: 45%;
  @media only screen and (max-width: 1080px) {
    margin: 0.2rem 0rem;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 25%;
    // margin: 0.2rem 0rem;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 460px) {
    width: 100%;
    height: 25%;
  }
`;
const JobInfoContainer = styled.div`
  height: 35%;

  margin: 0.5rem 0rem;
  width: 70%;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 25%;
    margin: 0.2rem 0rem;
  }
  @media only screen and (max-width: 460px) {
    width: 100%;
    margin: 0.2rem 0rem;
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
    font-size: 14px;
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
`;
// const Category = styled.p`
//   font-weight: 550;
//   margin: 0.5rem 1rem;
//   color: ${theme.PrimaryTxt};
//   font-size: 14px;
//   @media only screen and (max-width: 1080px) {
//     margin: 0.3rem 1rem;
//     font-size: 12px;
//   }
// `;
const JobInfo = styled.p`
  font-weight: 300;
  margin: 0.4rem 1rem;
  color: ${theme.SecondaryFadedTxt};

  //   opacity: 0.7;
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 12px;
  }
`;
export default function JobCard({ job }) {
  return (
    <>
    {job&&<CardContainer>
      <CompanyLogo>
        <Logo src={RobotArm} alt="Company Logo"></Logo>
      </CompanyLogo>
      <Header>
        <JobTitleLink to={`/seeker/jobs/${job._id}`} >{job.title}</JobTitleLink>
        <TimeSincePost>{Moment(job.created_at).format('d MMM YYYY')}</TimeSincePost>
      </Header>
      <CompanyInfoContainer>
        <CompanyName>{job.employer.name}</CompanyName>
        <Location>{job.location}</Location>
        {job.minPay && <Salary>Min Pay: {job.minPay} </Salary>}
        {job.maxPay && <Salary>Max Pay:{job.maxPay} </Salary>}
      </CompanyInfoContainer>
      <JobInfoContainer>
        <JobInfo>{ReactHtmlParser(job.description)}</JobInfo>
      </JobInfoContainer>
    </CardContainer>}
    </>
  );
}
