import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";

const JobSeekerStatusTabs = [
    {
      name: "Applied",
      id: 0,
    },
    {
      name: "Interview Offered",
      id: 1,
    },
    {
      name: "Interviewing",
      id: 2,
    },
    {
      name: "Offers Recieved",
      id: 3,
    },
    {
      name: "Hired",
      id: 4,
    },
    {
      name: "Rejected",
      id: 5,
    },
  ];



const SeekerTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTab = (e) => {
      if (JobSeekerStatusTabs.id === e.target.id) {
        console.log(JobSeekerStatusTabs.id);
        setActiveTab(false);
      } else {
        console.log(JobSeekerStatusTabs.id);
      }
      setActiveTab(e.target.id);
      console.log(e.target.id);
    };
    //   console.log("ActiveTab", activeTab);
  
    return (
      <TabsContainer>
        {JobSeekerStatusTabs.map((tab, index) => {
          return (
            <Tab
              id={index}
              activeTab={activeTab}
              key={index}
              setSelectedTab={setActiveTab}
              onClick={handleTab}
            >
              {tab.name}
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
      const id = parseInt(props.id);
  
      return id === props.activeTab ? theme.PrimaryBtnBg : theme.SecondaryBtnBg;
    }};
    color: ${(props) => {
      // console.log("active tab", props.activeTab);
      const id = parseInt(props.id);
  
      return id === props.activeTab ? theme.PrimaryTxt : theme.SecondaryTxt;
    }};
  
    cursor: pointer;
    &:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
    }
  `;
  
  export default SeekerTabs;