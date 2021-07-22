import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";

const jobSeekerStatusTabs = [
  {
    name: "Applied",
    id: 1,
  },
  {
    name: "Interview Offered",
    id: 2,
  },
  {
    name: "Interviewing",
    id: 3,
  },
  {
    name: "Offers Recieved",
    id: 4,
  },
  {
    name: "Hired",
    id: 5,
  },
  {
    name: "Rejected",
    id: 6,
  },
];
const EmployerStatusTabs = [
  {
    name: "Recieved",
    id: 0,
  },
  {
    name: "Accepted",
    id: 1,
  },
  {
    name: "Interviewing",
    id: 2,
  },
  {
    name: "Offer Made",
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

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTab = (e) => {
    // if (EmployerStatusTabs.id === e.target.id) {
    //   console.log(EmployerStatusTabs.id);
    //   setActiveTab(false);
    // } else {
    //   console.log(EmployerStatusTabs.id);
    // }
    setActiveTab(e.target.id);
    // console.log(e.target.id);
  };
  //   console.log("ActiveTab", activeTab);

  return (
    <TabsContainer>
      {EmployerStatusTabs.map((tab, index) => {
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

export default Tabs;

const TabsContainer = styled.div`
position:absolute;
top:25%;
margin-left: 7rem;
display: flex;
width:80%;
height 100px;
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
    console.log(props.id);
    console.log("active tab", props.activeTab);
    return props.id == props.activeTab
      ? theme.PrimaryBtnBg
      : theme.SecondaryBtnBg;
  }};
  color: ${(props) => theme.PrimaryTxt};
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
  }
`;
