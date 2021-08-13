import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";



const EmployerStatusTabs = [
  {
    displayName: "Recieved",
    name:"SUBMITTED",
    id: 0,
  },
  {
    displayName: "Accepted",
    name:"APPROVED_FOR_INTERVIEW",
    id: 1,
  },
  {
    displayName: "Interviewing",
    name:"SCHEDEULED_FOR_INTERVIEW",
    id: 2,
  },
  {
    displayName: "Offer Made",
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

 const EmployerTabs = ({stage,setStage}) => {
  const [activeTab, setActiveTab] = useState(stage);

  const handleTab = (e) => {
    setActiveTab(e.target.name);
    setStage(e.target.name)
    // setActiveTab(e.target.id);
  };
   // console.log("ActiveTab", activeTab);

  return (
    <TabsContainer>
      {EmployerStatusTabs.map((tab, index) => {
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

export default EmployerTabs;






const TabsContainer = styled.div`
display: flex;
width:80%;
height 100px;
margin:1rem 6rem;
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
    return props.name === props.activeTab ? theme.PrimaryBtnBg : theme.SecondaryBtnBg;
  }};
  color: ${(props) => {
    // console.log("active tab", props.activeTab);
    return props.name === props.activeTab ? theme.PrimaryTxt : theme.SecondaryTxt;
  }};

  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
  }
`;
