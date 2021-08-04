import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {useGlobalState} from '../utils/globalContext'
import {updateSeeker,getSeeker} from '../services/authServices'
import {
  ProfileInput,
  ProfileShortInput,
} from "../globalComponents/Inputs";
import { InputButton } from "../globalComponents/Buttons";
import { theme } from "../globalStyles";
import { Link } from "react-router-dom";

const ProfileContainer = styled.div`
display:grid;
grid-area: content;
margin-top: 15rem;
margin-left:15rem;
@media only screen and (max-width: 1200px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 900px) {
  margin-left:15rem;
  width:100%;
}
@media only screen and (max-width: 768px) {
  margin-left:1rem;
  width:100%;
}

`;

const Heading = styled.h1`
margin: 1rem 0;
@media only screen and (max-width: 768px) {
  font-size: 24px;
  margin: 1rem 1rem;
}
`;
const SubHeading = styled.h3`
margin: 1rem 0;
@media only screen and (max-width: 768px) {
  font-size: 18px;
  
}
`;


const FormDiv = styled.div`
display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
  @media only screen and (max-width: 768px) {
    margin: 1rem 1rem;
    width:100vw;
  }
`;

const SideBySideInputContainer = styled.div`
  width: 600px;
  display: grid;
  grid-template-rows: 1fr, 1fr;
  grid-template-areas: "left right" "leftLabel rightLabel";
 
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width:100%;
    // max-width: 600px;
  }

`;

const InputLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin: 5px;
  opacity: 0.5;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    opacity: 0.5;
  }
`;
const AboutUser = styled.textarea`
  width: 600px;
  height: 400px;
  background: ${theme.NavBg};
  font-size: 18px;
  border: 1px solid ${theme.Accent};
  resize: none;
  padding: 10px;
  @media only screen and (max-width: 900px) {
    width:500px;
    }
    @media only screen and (max-width: 800px) {
      // width: 400px;
      max-width:80%;
    }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    // width: 400px;
    max-width:80%;
    
    height: 300px;
  }
`;
const JobSeekerProfilePage = () => {

  const initialFormState = {
    name:'',
    email:'',
    resumeFile:'',
    phone: '',
    website:'',
    about:'',
    facebook:'',
    instagram:'',
    twitter:'',
    other:''
}
const [resMessage, setResMessage]=useState("")
const [formState, setFormState] = useState(initialFormState)



  const [file, setFile] = useState("");

  const handleFileChange = ({ target }) => {
    setFormState({...formState, ["resumeFile"]: target.files[0]});
    setFile(target.value);
    console.log(target.files[0])
  };

  const { store} = useGlobalState()
  const {loggedInUser,isEmployer}=store
  console.log("isEmployer",isEmployer)

  useEffect(()=>{
    getSeeker().then((data)=>{
      setFormState(data)
      }
    ).catch()
  },[])
  
  function handleChange(event) {
    console.log("formState",formState)
    console.log("file value",file)
    setFormState({
        ...formState,
        [event.target.name]: event.target.value
      })
    }
  function handleSubmit(event){
    
    var form_data = new FormData();
    for ( var key in formState ) {
      form_data.append(key, formState[key]);
    }
    //console.log("submit formState",formState)
    updateSeeker(form_data)
    .then((data)=>
      { setFormState(data)
        console.log("job seeker profile",data)
        setResMessage("Your profile is successfully updated")}
    )
    .catch((error) =>{ 
      setResMessage(error.message)
    })
  }

  return (
    <>
    {console.log("return isEmployer",( isEmployer)) }
    {(isEmployer==="false")? 
    <>
      <ProfileContainer>
      {resMessage && <p>{resMessage}</p>}
      <Heading>User Profile</Heading>
      <FormDiv>
        <SubHeading>Jo Bloggs</SubHeading>
        <ProfileInput value={formState.email}  placeholder="Email"></ProfileInput>
        <InputLabel>Email</InputLabel>
        <ProfileInput placeholder="Phone" name="phone" value={formState.phone} onChange={handleChange}></ProfileInput>
        <InputLabel>Phone</InputLabel>
        <ProfileInput placeholder="Website" name="website" value={formState.website} onChange={handleChange}></ProfileInput>
        <InputLabel>Website</InputLabel>
        {formState.resumeFile? <a href={formState.resumeFile} target="blank" >Your resume</a>: <p>No resume uploaded yet</p>}
        <ProfileInput type="file"  value={file} name="file" accept=".pdf" onChange={handleFileChange} placeholder="upload file"/>
      </FormDiv>
      <FormDiv>

        <SubHeading>About You</SubHeading>
        <AboutUser name="about" value={formState.about} onChange={handleChange} placeholder="All about you!!!"></AboutUser>
        </FormDiv>
        <FormDiv>
          <SubHeading>Social Media</SubHeading>
          <SideBySideInputContainer>
            <ProfileShortInput name="facebook" value={formState.facebook} onChange={handleChange}
              style={{ gridArea: "left" }}
              placeholder="Facebook"
              ></ProfileShortInput>
            <InputLabel  style={{ gridArea: "leftLabel" }}>Facebook</InputLabel>
            <ProfileShortInput name="instagram" value={formState.instagram} onChange={handleChange} 
              style={{ gridArea: "right" }}
              placeholder="Instagram"
              ></ProfileShortInput>
            <InputLabel style={{ gridArea: "rightLabel" }}>
              Instagram
            </InputLabel>
          </SideBySideInputContainer>
          <SideBySideInputContainer>
            <ProfileShortInput name="twitter" value={formState.twitter} onChange={handleChange} 
              style={{ gridArea: "left" }}
              placeholder="Twitter"
              ></ProfileShortInput>
            <InputLabel style={{ gridArea: "leftLabel" }}>Twitter</InputLabel>
            <ProfileShortInput name="other" value={formState.other} onChange={handleChange}
              style={{ gridArea: "right" }}
              placeholder="Other"
              ></ProfileShortInput>
            <InputLabel style={{ gridArea: "rightLabel" }}>Other</InputLabel>
          </SideBySideInputContainer>
        </FormDiv>
        <InputButton onClick={handleSubmit}>Save</InputButton>
        <div style={{ margin: "2rem" }}> </div>
        </ProfileContainer>
        </> : <> </>
      }
      </>
        );
      };
      
      export default JobSeekerProfilePage;
      