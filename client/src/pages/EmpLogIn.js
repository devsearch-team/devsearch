import React,{useState} from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { MiddleContainer } from "../globalStyles";
import { InputButton } from "../globalComponents/Buttons";
import {Input} from "../globalComponents/Inputs"
import { validEmail } from "../utils/validators"

export default function EmpLogIn(){

    const initialFormState = {
		email: '',
		password: ''
	}

	const [formState, setFormState] = useState(initialFormState)
    const [emailError,setEmailError]=useState("")

    const formInvalid =!validEmail(formState.email) 
    
    function handleChange(event) {
		setFormState({
			...formState,
			[event.target.name]: event.target.value
		})
	}
    function handleSubmit(event) {
		event.preventDefault()
        setEmailError("")
        
        if(formInvalid){
            setEmailError("Invalid email")
        }
    }
    console.log("formStae.email",formState.email)
return(
    <MiddleContainer>
        <Header>Employer Login</Header>
        <Input type="text"  name="email" value={formState.email} onChange={handleChange} placeholder="yourEmail@email.com" ></Input>
        <div style={{color:"red"}}>{emailError}</div>
        <Input type="password"  name="password" value={formState.password} onChange={handleChange} placeholder="password"></Input>
        <InputButton onClick={handleSubmit} disabled={formInvalid}>
              Sign In
        </InputButton>
        <p style={{marginTop:"2rem"}}>Have an account? <Link to="/employer/register">register</Link></p>
    </MiddleContainer>
)
}

const Header = styled.h1`
margin-bottom:3rem;
`