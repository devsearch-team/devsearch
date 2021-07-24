import React,{useState} from "react";
import styled from "styled-components";
import { MiddleContainer,Label,ErrorMessage } from "../globalStyles";
import { InputButton } from "../globalComponents/Buttons";
import {Input} from "../globalComponents/Inputs"
import { validEmail,validPassword} from "../utils/validators"
import {useGlobalState} from '../utils/globalContext'

export default function Register({name,header,callback}){

    const initialFormState = {
        name:'',
		email: '',
		password: '',
        passwordConfirmation:''
	}

	const [formState, setFormState] = useState(initialFormState)
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")
    const [nameError,setnameError]=useState("")
    const [passwordConfirmationError,setPasswordConfirmationError]=useState("")

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
        let nameError=""
        let passwordConfirmationError=""
        if (!validEmail(formState.email)){
            emailError="Please enter a valid email address"         
       }

        if(!validPassword(formState.password)){
            passwordError="Please enter a strong password"     
       } 
       if(formState.password !== formState.passwordConfirmation){
        passwordConfirmationError="Passwords must match"
       }
       if(!formState.name){
        nameError="Please, enter a name"
       }
        setPasswordError(passwordError)
        setEmailError(emailError)
        setnameError(nameError)
        setPasswordConfirmationError(passwordConfirmationError)
    
        if( !nameError && !emailError && !passwordError && !passwordConfirmationError ){
            callback(formState)
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
        <Header>{header}</Header>
        {loggedInUser? <p>logged in user is {loggedInUser}</p>:<></>}
        <FormItem>
            <Label>{name}</Label>
            <div>
                <Input type="text"  name="name" value={formState.name} onChange={handleChange}></Input>
                <ErrorMessage style={{color:"red"}}>{nameError}</ErrorMessage>
            </div>
        </FormItem>
        <FormItem>
            <Label>Email</Label>
            <div>        
                <Input type="text"  name="email" value={formState.email} onChange={handleChange}></Input>
                <ErrorMessage style={{color:"red"}}>{emailError}</ErrorMessage>
            </div>
        </FormItem>     
        <FormItem>
            <Label>Password</Label>
            <div>
                <Input type="password"  name="password" value={formState.password} onChange={handleChange}></Input>
                <ErrorMessage style={{color:"red"}}>{passwordError}</ErrorMessage>
            </div>
        </FormItem>      
        <FormItem>
            <Label>Confirm<br></br>Password</Label>
            <div>
                <Input type="password"  name="passwordConfirmation" value={formState.passwordConfirmation} onChange={handleChange}></Input>
                <ErrorMessage style={{color:"red"}}>{passwordConfirmationError}</ErrorMessage>
            </div>
        </FormItem>
        <InputButton style={{marginTop:".5rem"}} onClick={handleSubmit} >
              Create Account
        </InputButton>
    </MiddleContainer>
)
}

const Header = styled.h1`
margin-bottom:3rem;
`
const FormItem=styled.div`
display:flex;
align-items: center;
justify-content: space-around
`