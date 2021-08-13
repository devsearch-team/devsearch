import React,{useState, useEffect} from "react";
import {useGlobalState} from '../utils/globalContext'
import {updateSeeker,getSeeker} from '../services/authServices'
import {
  ProfileInput,
  ProfileShortInput,
} from "../globalComponents/Inputs";
import {ProfileContainer,Heading,SubHeading,SideBySideInputContainer,About,FormDiv,Email,InputLabel} from "../globalComponents/styledComponents"
import { InputButton } from "../globalComponents/Buttons";


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
    setFormState({...formState, "resumeFile": target.files[0]});
    setFile(target.value);
    console.log(target.files[0])
  };

  const { store} = useGlobalState()
  const {isEmployer}=store
  // console.log("isEmployer",isEmployer)

  useEffect(()=>{
    getSeeker().then((data)=>{
      console.log("dataProf", data)
      setFormState(data)
      }
    ).catch()
  },[])
  
  function handleChange(event) {
    // console.log("formState",formState)
    // console.log("file value",file)
    setFormState({
        ...formState,
        [event.target.name]: event.target.value
      })
    }
  function handleSubmit(event){
    console.log("formState before submit",formState)
    var form_data = new FormData();
    for ( var key in formState ) {
      form_data.append(key, formState[key]);
    }
    //console.log("submit formState",formState)
    updateSeeker(form_data)
    .then((data)=>
      { setFormState(data)
        // console.log("job seeker profile",data)
        setResMessage("Your profile is successfully updated")}
    )
    .catch((error) =>{ 
      setResMessage(error.message)
    })
  }

  return (
    <>
    {(isEmployer==="false")? 
    <>
      <ProfileContainer>
      {resMessage && <p>{resMessage}</p>}
      <Heading>User Profile</Heading>
      <FormDiv>
        <SubHeading>{formState.name}</SubHeading>
        <Email placeholder="Email">{formState.email}</Email>    
        <ProfileInput placeholder="Phone" name="phone" value={formState.phone} onChange={handleChange}></ProfileInput>
        <InputLabel>Phone</InputLabel>
        <ProfileInput placeholder="Website" name="website" value={formState.website} onChange={handleChange}></ProfileInput>
        <InputLabel>Website</InputLabel>
        {formState.resumeFile? <a href={formState.resumeFile} target="blank" >Your resume</a>: <p>No resume uploaded yet</p>}
        <ProfileInput type="file"  value={file} name="file" accept=".pdf" onChange={handleFileChange} placeholder="upload file"/>
      </FormDiv>
      <FormDiv>

        <SubHeading>About You</SubHeading>
        <About name="about" value={formState.about} onChange={handleChange} placeholder="All about you!!!"></About>
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
      