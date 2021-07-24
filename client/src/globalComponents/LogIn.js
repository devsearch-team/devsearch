import React,{useState} from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { MiddleContainer } from "../globalStyles";
import { InputButton } from "../globalComponents/Buttons";
import {Input} from "../globalComponents/Inputs"
import { validEmail,validPassword} from "../utils/validators"
import {empLogIn} from '../services/authServices'
import {useGlobalState} from '../utils/globalContext'

export default function LogIn({callback,isEmployer}){

    const initialFormState = {
		email: '',
		password: ''
	}
	const [formState, setFormState] = useState(initialFormState)
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")

    const {dispatch,store} = useGlobalState()
    const {loggedInUser}=store
    function handleChange(event) {
		setFormState({
			...formState,
			[event.target.name]: event.target.value
		})
	}
    function handleSubmit(event) {

		event.preventDefault()
        let emailError=""
        let passwordError=""
       if (!formState.email){
        emailError="Please, enter an email address"
       }
       if(!formState.password){
        passwordError="Please, enter a password"
       } 
        setEmailError(emailError)
        setPasswordError(passwordError)
    
        if(!emailError&&!passwordError){
            callback(formState)
            .then(({username,jwt,isEmployer}) => {
            dispatch({type: 'setLoggedInUser', data: username})
            dispatch({type:'setRole',data: isEmployer})
            dispatch({type: 'setToken', data: jwt})
			
		})
		.catch((error) => console.log(error))
        }
    }
return(
    <MiddleContainer>
        <Header>{isEmployer?"Employer Login":"Job Seeker Login"}</Header>
        {loggedInUser? <p>logged in user is {loggedInUser}</p>:<></>}
        <Input type="text"  name="email" value={formState.email} onChange={handleChange} placeholder="youremail@email.com" ></Input>
        <div style={{color:"red"}}>{emailError}</div>
        <Input type="password"  name="password" value={formState.password} onChange={handleChange} placeholder="password"></Input>
        <div style={{color:"red"}}>{passwordError}</div>
        <InputButton style={{marginTop:".5rem"}} onClick={handleSubmit} >
              Sign In
        </InputButton>
        <p style={{marginTop:"2rem"}}>Have an account? <Link to={isEmployer?"/employer/register":"/seeker/register"}>register</Link></p>
    </MiddleContainer>
)
}

const Header = styled.h1`
margin-bottom:3rem;
`