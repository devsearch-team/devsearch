import React, {useState} from 'react'
import styled from 'styled-components'
import { theme } from "../globalStyles";
import {faBars} from 'react-icons/fa'

const MobileContainer = styled.div`
max-width:768px;
width:100%;
background: ${(props) => theme.NavBg};
display: flex;
justify-content: space-between;
align-items:center;
height:50px;
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;


const Logo = styled.h1`
margin-left:2rem;
color: ${(props) => theme.PrimaryTxt};
font-size: 18px; 
`;
const NavMobile = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    return (
        <MobileContainer>
            <Logo>DevSearch</Logo>
            <MobileIcon  onClick={handleClick}/>

            
            
        </MobileContainer>
    )
}

export default NavMobile
