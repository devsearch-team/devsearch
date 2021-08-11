import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../globalStyles";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/components/navigation/navigation.scss';

import './swiperTabs.css';
import 'swiper/swiper.min.css';
SwiperCore.use([Navigation]);

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

const MobileApplicationTabs = () => {
    

    
    return (
            <TabsContainer>
        <Swiper spaceBetween={60} slidesPerView={1} navigation >
            {/* <TabsContainer> */}
           
       { EmployerStatusTabs.map((index, slide) => (
           
           <SwiperSlide key={slide}> <Tab>{index.name} </Tab> </SwiperSlide>
           )
           )
        }
 
           {/* </TabsContainer> */}
    

    </Swiper>
        </TabsContainer>
  );
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
