import React from 'react'
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
const SubHeading = styled.h6`
  margin: 0.5rem 0rem;
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
const MinorSubHeading = styled.h6`
  margin: 1rem 0rem;
  color: ${theme.PrimaryBtnBg};
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 0rem;
    font-size: 16px;
  }
  @media only screen and (max-width: 900px) {
    margin: 0.2rem 0;
    font-size: 14px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    margin:0.4rem 0;
  }
  @media only screen and (max-width: 460px) {
    font-size: 12px;
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
const AboutCompany = styled.p`
  font-weight: 300;
  margin: 0.4rem 1rem;
  line-height:1.5;
  color: ${theme.SecondaryFadedTxt};
  width:100%;
  //   opacity: 0.7;
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 12px;
}
@media only screen and (max-width: 460px) {
      margin: 0.1rem 1rem;
    font-size: 10px;
  }
`;
const RoleDescription = styled.p`
  font-weight: 300;
  margin: 0.4rem 1rem;
  line-height:1.5;
  color: ${theme.SecondaryFadedTxt};
  width:100%;
  //   opacity: 0.7;
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 12px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 10px;
  }
`;
const RoleRequirments = styled.p`
  font-weight: 300;
  margin: 0.4rem 1rem;
  line-height:1.5;
  color: ${theme.SecondaryFadedTxt};
  width:100%;
  //   opacity: 0.7;
  font-size: 14px;
  @media only screen and (max-width: 1080px) {
    margin: 0.3rem 1rem;
    font-size: 12px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 10px;
  }
`;
const SeekerViewJob = () => {
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
            
        <JobInfo>
            <AboutCompany>
            <SubHeading>About Us</SubHeading>
            RoboCorp are seeking to hire a Front-End Developer to join our team of experts in the eCommerce space. 

Applicants with Mid to Senior levels of experience are encouraged to apply - If you’re already working for an agency, particularly in the eCommerce space (including on other platforms such as WooCommerce etc) or brand side developing eCommerce sites for a retailer, we would love to hear from you.

This role is open to applicants residing anywhere in Australia. You’ll be joining a team based in a number of Australian cities, with embedded systems and processes to support work from home and remote working.
            </AboutCompany>
            <RoleDescription>
            <SubHeading>Role Description</SubHeading>
            In this role you’ll work directly within a team of exceptionally talented individuals responsible for delivering some of the most complex, beautifully designed and high performing eCommerce builds globally on the Shopify Plus platform. If eCommerce is your thing, there is no better place to sharpen your skills.
            </RoleDescription>
            <RoleRequirments>
            <SubHeading>Role Requirements</SubHeading>
            <MinorSubHeading>Things we value:</MinorSubHeading>
            Collaboration: nothing great was ever built by one person. You’ll enjoy working as a team – learning from others and sharing what you know.
            Integrity: you’re reliable, honest and will always deliver on your word.
            Motivation & leadership: we’re an ambitious bunch – for ourselves, our teammates and our clients. We are committed to achieving incredible results for our clients and solving problems where others can’t.
            Delivery: We value performant code, accessible HTML5, well-structured SCSS and humorous banter on Slack.
            <MinorSubHeading>About You:</MinorSubHeading>
            You code clean, modern HTML5, CSS & JS (you know when to use avs a )
            You take pride in the readability & maintainability of your code
            You understand and implement cross-browser compatibility
            You strategically choose solutions that support efficiency in rendering, loading, and painting of the page on the full spectrum of devices and networks without sacrificing UX
            You value design aesthetics while seeking opportunities to leverage new techniques
            <MinorSubHeading>Other things about you:</MinorSubHeading>
            You use Git
            You have built something with React, Vue or Ember 
            You have experience retrieving and posting data via REST or GraphQL
            You take personal responsibility for your deadlines, code quality, and tasks
            You can communicate your ideas clearly
            <MinorSubHeading>Even more things that might describe you:</MinorSubHeading>
            You can write your JavaScript without using jQuery & friends
            You contribute to open source projects, maintain a blog, Twitter
            account, or seek to contribute to the community in some way (not
            necessarily the tech community!)
            You have a willingness to help co-workers with their JS issues and
            love to share what you know

            <MinorSubHeading>Job benefits and perks:</MinorSubHeading>
            Competitive salary with annual reviews
            Professional development support and training
            A Macbook Pro and Apple accessories
            Lots of internal education from your colleagues & external education from industry experts
            Most likely some new friends
            Teammates based in Melbourne, Sydney, Perth and Adelaide
            </RoleRequirments>
        </JobInfo>
      
        </JobInfoContainer>
        </ViewJobContainer>
    )
}

export default SeekerViewJob
