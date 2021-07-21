import React from "react";
import styled from "styled-components";
import { MiddleContainer } from "../globalStyles";
import { InputButton } from "../globalComponents/Buttons";
import {Input} from "../globalComponents/Inputs"
export default function EmpSignIn(){
return(
    <MiddleContainer>
        <Header>Employer Login</Header>
        <Input type="text" placeHolder="yourEmail@email.com"></Input>
        <Input type="password" placeHolder="password"></Input>
        <InputButton>
              Sign In
        </InputButton>
    </MiddleContainer>
)
}

const Header = styled.h1`
margin-bottom:3rem;
`