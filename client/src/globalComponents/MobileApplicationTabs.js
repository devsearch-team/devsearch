import React, { useRef } from "react";
import { useGlobalState } from "../utils/globalContext";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/components/navigation/navigation.scss';

import './swiperTabs.css';
import 'swiper/swiper.min.css';
SwiperCore.use([Navigation]);

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

const MobileApplicationTabs = ({setStage}) => {
    
  const {  store } = useGlobalState();
  const {  isEmployer } = store;
  const swiperSlideID = useRef(0)

  const handleTab = (e) => {
    setStage(e.target.name)
    // setActiveTab(e.target.id);
  };

    return (
      <>
      {(isEmployer==="true") ? (

        <TabsContainer>
        <Swiper spaceBetween={60} slidesPerView={1} navigation ref={swiperSlideID}>
           
       { EmployerStatusTabs.map((slide,index) => (
           
           <SwiperSlide key={index}> <Tab name={slide.name} onClick={handleTab}>{slide.displayName} </Tab> </SwiperSlide>
           )
           )
        }
 
    

    </Swiper>
        </TabsContainer>
  ) : (
    <TabsContainer>
    <Swiper spaceBetween={60} slidesPerView={1} navigation >
 
       
   { JobSeekerStatusTabs.map((slide,index) => (
       
       <SwiperSlide key={index}> <Tab name={slide.name} onClick={handleTab}>{slide.displayName} </Tab> </SwiperSlide>
       )
       )
    }

     


</Swiper>
    </TabsContainer>
  )
      }
  </>
    )
};

export default MobileApplicationTabs;


const TabsContainer = styled.div`

text-align:center;
width:100vw;

height 10vh;
margin:1rem rem;
`;

const Tab = styled.button`
  border: none;
  margin: 1rem 0rem;
  width: 160px;
  height: 60px;
  font-size: 24px;
    font-weight:600;
  background: rgb(247, 177, 62);
  color: #fff;
 

  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
  }
`;
