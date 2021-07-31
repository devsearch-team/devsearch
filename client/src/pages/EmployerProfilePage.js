import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { useGlobalState } from '../utils/globalContext'
import {updateEmployer,getEmployer} from '../services/authServices'
import {
  ProfileInput,
  ProfileLongInput,
  ProfileShortInput,
} from "../globalComponents/Inputs";
import { InputButton } from "../globalComponents/Buttons";
import { theme } from "../globalStyles";

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
const Email = styled.h5`
font-weight:500;
font-size:16px;
`;
const AboutCompany = styled.textarea`
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
const EmployerProfilePage = () => {

  const initialFormState = {
    name:'',
    email:'',
    phone: '',
    website:'',
    address:'',
    city:'',
    state:'',
    postcode:'',
    country:'',
    about:'',
    facebook:'',
    instagram:'',
    twitter:'',
    other:''
}

const [resMessage, setResMessage]=useState("")
const [formState, setFormState] = useState(initialFormState)

const {store } = useGlobalState()
const { loggedInUser } = store

useEffect(()=>{
  getEmployer().then((data)=>{
    setFormState(data)
    }
  ).catch()
},[])

function handleChange(event) {
	setFormState({
			...formState,
			[event.target.name]: event.target.value
		})
	}
function handleSubmit(event){
  updateEmployer(formState)
  .then(setResMessage("Your profile is successfully updated"))
  .catch((error) =>{ 
    setResMessage(error.message)
  })
}

  return (
    <>
      {loggedInUser ?
        <>
          {/* <CompanyLogo> */}
          {/* <Logo src={RobotArm} alt="Company Logo"></Logo> */}
          {/* </CompanyLogo> */}
          <ProfileContainer>
          {resMessage && <p>{resMessage}</p>}
            <Heading>Company Profile</Heading>
            <FormDiv>
              <SubHeading>{formState.name}</SubHeading>
              {/* <ProfileInput value={formState.email} placeholder="Email"></ProfileInput> */}
              <Email value={formState.email} Emaillaceholder="Email">{formState.email}</Email>
              {/* <InputLabel>Email</InputLabel> */}
              <ProfileInput placeholder="Phone" name="phone" value={formState.phone} onChange={handleChange}></ProfileInput>
              <InputLabel type="text">Phone</InputLabel>
              <ProfileInput placeholder="Website" name="website" value={formState.website} onChange={handleChange}></ProfileInput>
              <InputLabel type="text"  >Website</InputLabel>
            </FormDiv>
            <FormDiv>
              <SubHeading>Address</SubHeading>
              <ProfileLongInput type="text"  name="address" value={formState.address} onChange={handleChange} placeholder="Street Address"></ProfileLongInput>
              <InputLabel >Street Address</InputLabel>
              <SideBySideInputContainer>
                <ProfileShortInput type="text"  name="city" value={formState.city} onChange={handleChange}
                  style={{ gridArea: "left" }}
                  placeholder="City"
                ></ProfileShortInput>
                <InputLabel style={{ gridArea: "leftLabel" }}>City</InputLabel>
                <ProfileShortInput type="text"  name="state" value={formState.state} onChange={handleChange}
                  style={{ gridArea: "right" }}
                  placeholder="State"
                ></ProfileShortInput>
                <InputLabel style={{ gridArea: "rightLabel" }}>State</InputLabel>
              </SideBySideInputContainer>
              <SideBySideInputContainer>
                <ProfileShortInput name="postcode" value={formState.postcode} onChange={handleChange}
                  style={{ gridArea: "left" }}
                  placeholder="Postcode"
                ></ProfileShortInput>
                <InputLabel style={{ gridArea: "leftLabel" }}>Postcode</InputLabel>
                <ProfileShortInput name="country" value={formState.country} onChange={handleChange}
                  style={{ gridArea: "right" }}
                  placeholder="Country"
                ></ProfileShortInput>
                <InputLabel style={{ gridArea: "rightLabel" }}>Country</InputLabel>
              </SideBySideInputContainer>
            </FormDiv>
            <FormDiv>
              <SubHeading>About Company</SubHeading>
              <AboutCompany name="about" value={formState.about} onChange={handleChange} placeholder="About your company!!!"></AboutCompany>

            </FormDiv>
            <FormDiv>
              <SubHeading>Social Media</SubHeading>
              <SideBySideInputContainer>
                <ProfileShortInput name="facebook" value={formState.facebook} onChange={handleChange}
                  style={{ gridArea: "left" }}
                  placeholder="Facebook"
                ></ProfileShortInput>
                <InputLabel style={{ gridArea: "leftLabel" }}>Facebook</InputLabel>
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

export default EmployerProfilePage;
