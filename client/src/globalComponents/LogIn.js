import React,{useState} from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { MiddleContainer } from "../globalStyles";
import { InputButton } from "../globalComponents/Buttons";
import {Input} from "../globalComponents/Inputs"
import { validEmail } from "../utils/validators"
import {empLogIn} from '../services/authServices'
import {useGlobalState} from '../utils/globalContext'

export default function LogIn({header,callback}){

    const initialFormState = {
		email: '',
		password: ''
	}

	const [formState, setFormState] = useState(initialFormState)
    const [emailError,setEmailError]=useState("")

    const {dispatch,store} = useGlobalState()
    const {loggedInUser}=store

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
        else{
            empLogIn(formState)
		    .then(({username,jwt,isEmployer}) => {
			console.log(username, jwt,isEmployer);
			dispatch({type: 'setLoggedInUser', data: username})
            dispatch({type:'setRole',data: isEmployer})
			dispatch({type: 'setToken', data: jwt})
			
		})
		.catch((error) => console.log(error))
        }
    }
return(
    <MiddleContainer>
        <Header>Employer Login</Header>
        {loggedInUser? <p>logged in user is {loggedInUser}</p>:<></>}
        <Input type="text"  name="email" value={formState.email} onChange={handleChange} placeholder="yourEmail@email.com" ></Input>
        <div style={{color:"red"}}>{emailError}</div>
        <Input type="password"  name="password" value={formState.password} onChange={handleChange} placeholder="password"></Input>
        <InputButton onClick={handleSubmit}>
              Sign In
        </InputButton>
        <p style={{marginTop:"2rem"}}>Have an account? <Link to="/seeker/register">register</Link></p>
    </MiddleContainer>
)
}

const Header = styled.h1`
margin-bottom:3rem;
`