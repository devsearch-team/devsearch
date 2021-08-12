import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import styled from "styled-components";
import SeekerJobApplicationModal from '../modals/SeekerJobApplicationModal'
import SeekerAppliedModal from '../modals/SeekerAppliedModal'
import SeekerInterviewOfferedModal from '../modals/SeekerInterviewOfferedModal'
import SeekerInterviewAcceptedModal from '../modals/SeekerInterviewAcceptedModal'
import SeekerPositionOfferedModal from '../modals/SeekerPositionOfferedModal'
import SeekerHiredModal from '../modals/SeekerHiredModal'
import SeekerRejectedApplicationModal from '../modals/SeekerRejectedApplication'
import { getJob } from '../services/jobServices';
import { InputButton } from '../globalComponents/Buttons';
import { theme } from "../globalStyles";
import RobotArm from "../Assets/robotArm.jpg";
import ReactHtmlParser from "react-html-parser";

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
  overflow: hidden !important;
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
  height:100%;
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
const SubHeading = styled.h6`
  margin: 1rem 0rem;
  color: ${theme.PrimaryTxt};
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 0rem;
    font-size: 20px;
  }
  @media only screen and (max-width: 900px) {
    margin: 0.2rem 0;
    font-size: 18px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 16px;
    width: 100%;
    margin:0.4rem 0;
  }
  @media only screen and (max-width: 460px) {
    font-size: 16px;
  }
`;
// const MinorSubHeading = styled.h6`
//   margin: 1rem 0rem;
//   color: ${theme.PrimaryBtnBg};
//   text-decoration: none;
//   font-weight: 600;
//   font-size: 14px;
//   @media only screen and (max-width: 1080px) {
//     margin: 0.3rem 0rem;
//     font-size: 16px;
//   }
//   @media only screen and (max-width: 900px) {
//     margin: 0.2rem 0;
//     font-size: 14px;
//   }
//   @media only screen and (max-width: 768px) {
//     font-size: 14px;
//     width: 100%;
//     margin:0.4rem 0;
//   }
//   @media only screen and (max-width: 460px) {
//     font-size: 12px;
//   }
// `;


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
// const Category = styled.p`
//   font-weight: 550;
//   margin: 0.5rem 1rem;
//   color: ${theme.PrimaryTxt};
//   font-size: 14px;
//   @media only screen and (max-width: 1080px) {
//     margin: 0.3rem 1rem;
//     font-size: 12px;
//   }
//   @media only screen and (max-width: 460px) {
//     font-size: 10px;
//   }
// `;
const JobInfo = styled.div`
width:100%;
margin: 1rem 1rem;
`;
// const AboutCompany = styled.p`
//   font-weight: 300;
//   margin: 0.4rem 1rem;
//   line-height:1.5;
//   color: ${theme.SecondaryFadedTxt};
//   width:100%;
//   //   opacity: 0.7;
//   font-size: 14px;
//   @media only screen and (max-width: 1080px) {
//     margin: 0.3rem 1rem;
//     font-size: 12px;
// }
// @media only screen and (max-width: 460px) {
//       margin: 0.1rem 1rem;
//     font-size: 10px;
//   }
// `;
// const RoleDescription = styled.p`
//   font-weight: 300;
//   margin: 0.4rem 1rem;
//   line-height:1.5;
//   color: ${theme.SecondaryFadedTxt};
//   width:100%;
//   //   opacity: 0.7;
//   font-size: 14px;
//   @media only screen and (max-width: 1080px) {
//     margin: 0.3rem 1rem;
//     font-size: 12px;
//   }
//   @media only screen and (max-width: 460px) {
//     font-size: 10px;
//   }
// `;

const SeekerViewJob = () => {
  
  // Show Application Modal
  const [showJobApplicationModal, setJobApplicationModal] = useState(false)
  const [showSeekerAppliedModal, setSeekerAppliedModal] = useState(false)
  const [showInterviewOfferedModal, setInterviewOfferedModal] = useState(false)
  const [showInterviewAcceptedModal, setInterviewAcceptedModal] = useState(false)
  const [showSeekerPositionOfferedModal, setSeekerPositionOfferedModal] = useState(false)
  const [showSeekerHiredModal, setSeekerHiredModal] = useState(false)
  const [showSeekerRejectedApplicationModal , setSeekerRejectedApplicationModal ] = useState(false)



  const openJobApplicationModal= () => {
    setJobApplicationModal((prev) => !prev);
  };
  const openSeekerAppliedModal= () => {
    setSeekerAppliedModal((prev) => !prev);
  };

  const openInterviewModal= () => {
    setInterviewOfferedModal((prev) => !prev);
  };

  const openInterviewAcceptedModal= () => {
    setInterviewAcceptedModal((prev) => !prev);
  };

  const openSeekerPositionOfferedModal= () => {
    setSeekerPositionOfferedModal((prev) => !prev);
  };

  const openSeekerHiredModal= () => {
    setSeekerHiredModal((prev) => !prev);
  };


  const openSeekerRejectedApplicationModal = () => {
    setSeekerRejectedApplicationModal ((prev) => !prev);
  };
  

    const [job, setJob] = useState("")
    let {id} = useParams()
  // console.log("id", id)
    useEffect(() => {
      getJob(id)
        .then((data) => {
          // console.log("data",data);
          //console.log("employer name",data.data.employer.name)
          setJob(data.data);
        })
        .catch();
    }, [id]);

    return (
      
      <ViewJobContainer>
        
      { job &&
        <JobInfoContainer>
        <CompanyLogo>
        <Logo src={RobotArm} alt="Company Logo"></Logo>
        </CompanyLogo>
        <Header>
        <Heading>{job.title}</Heading>
        <TimeSincePost>{job.created_at}</TimeSincePost>
        </Header>
        <CompanyInfoContainer>
        <CompanyName>{job.employer.name}</CompanyName>
        <Location>{job.location}</Location>
        {job.minPay && <Salary>Min Pay: {job.minPay} </Salary>}
        {job.maxPay && <Salary>Max Pay:{job.maxPay} </Salary>}
        {/* <Category>Developers/Programmers</Category> */}
        </CompanyInfoContainer>
        <SeekerJobApplicationModal
            showJobApplicationModal={showJobApplicationModal}
            setJobApplicationModal={setJobApplicationModal}
          />

        {/* <SeekerAppliedModal
            showSeekerAppliedModal={showSeekerAppliedModal}
            setSeekerAppliedModal={setSeekerAppliedModal}
          /> */}

        {/* <SeekerInterviewOfferedModal
            showInterviewOfferedModal={showInterviewOfferedModal}
            setInterviewOfferedModal={setInterviewOfferedModal}
          /> */}

        <SeekerInterviewAcceptedModal
            showInterviewAcceptedModal={showInterviewAcceptedModal}
            setInterviewAcceptedModal={setInterviewAcceptedModal}
          />

        <SeekerPositionOfferedModal
            showSeekerPositionOfferedModal={showSeekerPositionOfferedModal}
            setSeekerPositionOfferedModal={setSeekerPositionOfferedModal}
          />
          
        <SeekerHiredModal
            showSeekerHiredModal={showSeekerHiredModal}
            setSeekerHiredModal={setSeekerHiredModal}
          />

        <SeekerRejectedApplicationModal
            showSeekerRejectedApplicationModal={showSeekerRejectedApplicationModal}
            setSeekerRejectedApplicationModal={setSeekerRejectedApplicationModal}
          />
        <JobInfo>
          {
            job.employer.about && <>
            <SubHeading>About {job.employer.name}</SubHeading>
            {job.employer.about}
            </>
          }   
        <SubHeading>Description</SubHeading>
        {ReactHtmlParser(job.description)}
        </JobInfo>
        <InputButton style={{margin: "1rem 0"}}onClick={openJobApplicationModal}>
              Apply
            </InputButton>

          {/* <InputButton style={{margin: "1rem 0"}}onClick={openInterviewModal}>
              Interview Offered
            </InputButton> */}

            <InputButton style={{margin: "1rem 0", height: 'auto', padding:'5px'}}onClick={openInterviewAcceptedModal}>
              Interview Accepted Modal
            </InputButton>

        <InputButton style={{margin: "1rem 0"}}onClick={openSeekerPositionOfferedModal}>
              Position Offered
            </InputButton>

        <InputButton style={{margin: "1rem 0", height: 'auto', padding:'5px'}}onClick={openSeekerHiredModal}>
              Hired
            </InputButton>

        <InputButton style={{margin: "1rem 0", height: 'auto', padding:'5px'}}onClick={openSeekerRejectedApplicationModal}>
              Application Rejected
            </InputButton>
        </JobInfoContainer>
      }
        </ViewJobContainer>
        )
      }
      
      export default SeekerViewJob
