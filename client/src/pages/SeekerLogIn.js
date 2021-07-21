import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { MiddleContainer } from "../globalStyles";
import { InputButton } from "../globalComponents/Buttons";
import {Input} from "../globalComponents/Inputs"
export default function EmpLogIn(){
return(
    <MiddleContainer>
        <Header>Job Seeker Login</Header>
        <Input type="text" placeHolder="yourEmail@email.com"></Input>
        <Input type="password" placeHolder="password"></Input>
        <InputButton>
              Sign In
        </InputButton>
        <p style={{marginTop:"2rem"}}>Have an account? <Link to="/seeker/register">register</Link></p>
    </MiddleContainer>
)
}

const Header = styled.h1`
margin-bottom:3rem;
`