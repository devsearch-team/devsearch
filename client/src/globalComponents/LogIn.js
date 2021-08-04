import React,{useState} from "react";
import {useHistory} from 'react-router-dom'
import styled from "styled-components";
import { InputButton } from "../globalComponents/Buttons";
import {Input} from "../globalComponents/Inputs"
import {useGlobalState} from '../utils/globalContext'
import { validEmail,validPassword} from "../utils/validators"

export default function LogIn({callback,header}){

  let history = useHistory()

    const initialFormState = {
		email: '',
		password: ''
	}
	const [formState, setFormState] = useState(initialFormState)
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")
    const [serverError, setServerError] = useState("")

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
       if (!validEmail(formState.email)){
        emailError="Please, enter a valid email address"
       }
       if(!validPassword(formState.password)){
        passwordError="Please, enter a valid password"
       } 
        setEmailError(emailError)
        setPasswordError(passwordError)
    
        if(!emailError&&!passwordError){
            callback(formState)
            .then((user) => {
              console.log("logIn component user",user)
              localStorage.setItem("username", user.username)
              localStorage.setItem("token", user.jwt)
              localStorage.setItem("isEmployer", user.isEmployer)
              dispatch({type: 'setLoggedInUser', data: user.username})
              dispatch({type:'setRole',data: user.isEmployer})
              dispatch({type: 'setToken', data: user.jwt})
              return user.isEmployer==="true"? history.push("/employer/profile") : history.push("/seeker/profile")
		})
		.catch((error) =>{ 
      console.log("err from catch",error.message)
      setServerError(error.message)
      })
        }
    }
return(
        <>
        <Header>{header}</Header>
        {serverError && <p style={{color:"red"}}>{serverError}</p>}
        {loggedInUser? <p>logged in user is {loggedInUser}</p>:<></>}
        <Input type="text"  name="email" value={formState.email} onChange={handleChange} placeholder="youremail@email.com" ></Input>
        <div style={{color:"red"}}>{emailError}</div>
        <Input type="password"  name="password" value={formState.password} onChange={handleChange} placeholder="password"></Input>
        <div style={{color:"red"}}>{passwordError}</div>
        <InputButton style={{marginTop:".5rem"}} onClick={handleSubmit} >
              Sign In
        </InputButton>
        </>
    
)
}

const Header = styled.h1`
margin-bottom:3rem;
@media only screen and (max-width: 800px) {
    margin-bottom:1.5rem;
    font-size:24px;
  }
`