import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";

const JobSeekerStatusTabs = [
    {
      displayName: "Applied",
      name:"SUBMITTED",
      id: 0,
    },
    {
      displayName: "Interview Offered",
      name:"APPROVED_FOR_INTERVIEW",
      id: 1,
    },
    {
      displayName: "Interviewing",
      name:"SCHEDEULED_FOR_INTERVIEW",
      id: 2,
    },
    {
      displayName: "Offers Recieved",
      name:"OFFER_MADE",
      id: 3,
    },
    {
      displayName: "Hired",
      name:"HIRED",
      id: 4,
    },
    {
      displayName: "Rejected",
      name:"REJECTED",
      id: 5,
    },
  ];



const SeekerTabs = ({stage,setStage}) => {

    const [activeTab, setActiveTab] = useState(stage);
    console.log("stage is ",stage);
    const handleTab = (e) => {
      setActiveTab(e.target.name);
      setStage(e.target.name)
      // setActiveTab(e.target.id);
    };
    //   console.log("ActiveTab", activeTab);
  
    return (
      <TabsContainer>
        {JobSeekerStatusTabs.map((tab, index) => {
          return (
            <Tab
              name={tab.name}
              activeTab={activeTab}
              key={index}
              setSelectedTab={setActiveTab}
              onClick={handleTab}
            >
              {tab.displayName}
            </Tab>
          );
        })}
      </TabsContainer>
    );
  };
  
  
  
  const TabsContainer = styled.div`
  display: flex;
  width:80%;
  height 100px;
  margin:1rem 0;
  `;
  
  const Tab = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin: 1rem;
    width: 130px;
    height: 60px;
    font-size: 18px;
  
    background: ${(props) => {
      // console.log("active tab", props.activeTab);
      //const id = parseInt(props.id);
  
      return props.name === props.activeTab ? theme.PrimaryBtnBg : theme.SecondaryBtnBg;
    }};
    color: ${(props) => {
      // console.log("active tab", props.activeTab);
      // const id = parseInt(props.id);
  
      return props.name === props.activeTab ? theme.PrimaryTxt : theme.SecondaryTxt;
    }};
  
    cursor: pointer;
    &:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
    }
  `;
  
  export default SeekerTabs;