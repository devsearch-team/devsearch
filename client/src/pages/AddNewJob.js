import React, {useState,useEffect,useRef} from "react";
import {useParams,useHistory} from 'react-router-dom'
import {getJob,updateJob,createJob} from "../services/jobServices"
import './myeditor.css'
import { Editor } from '@tinymce/tinymce-react';
import styled from "styled-components";
import RobotArm from "../Assets/robotArm.jpg";
import { useGlobalState } from "../utils/globalContext";
import {FormDiv,SubHeading} from '../globalComponents/styledComponents'
import { theme } from "../globalStyles";

const AddJobContainer = styled.div`
  display: grid;
  grid-area: content;
  margin-top: 15rem;
  margin-left: 15rem;
  @media only screen and (max-width: 1200px) {
    margin-left: 15rem;
    width: 100%;
  }
  @media only screen and (max-width: 900px) {
    margin-left: 15rem;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 3rem;
    margin-left: 1rem;
    width: 100%;
  }
`;
const CompanyLogo = styled.div`
  margin: 1rem 0rem;
  width: 86px;
  height: 86px;
  
  overflow: hidden !important;
  border-radius: 50%;
`;
const Logo = styled.img`
  border: none;
  object-fit: cover;
  width: 100%;
  
`;

const TextBoxContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  justify-content: start;
  width: 100%;
  //   margin: 0rem 1rem;
`;

const InputField = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  margin: 1rem 0rem;
  border: none;
  color: ${theme.SecondaryTxt};
  font-size: 18px;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    max-width: 60%;
    width: 400px;
  }
`;
const InputButton = styled.button`
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  margin: 0rem 1rem;
  font-weight: 400;
  color: #fff;
  background: ${(props) => theme.PrimaryBtnBg};
  cursor: pointer;
  &:hover {
    font-weight: bold;
    box-shadow: 3px 3px 5px #333;
  }
  &:disabled {
    font-weight: 400;
    box-shadow: unset;
    cursor: unset;
    background: ${(props) => theme.DisabledPrimaryBtnBg};
  }
  @media only screen and (max-width: 800px) {
    width: 8rem;
    font-size: 14px;
  }
  @media only screen and (max-width: 768px) {
    // margin-left: 1.4rem;
    // text-align: center;
    font-size: 16px;
    max-width: 60%;
    width: 100%;
  }
`;
const ShortInput = styled.input`
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 1rem 0rem;
  color: ${theme.SecondaryTxt};
  font-size: 18px;
  // @media only screen and (max-width: 800px) {
  //   font-size: 14px;
  //   max-width: 160px;
  // }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    max-width: 60%;
    width: 300px;
  }
`;

const DescContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${theme.NavBg};
  font-size: 18px;
  border: 1px solid ${theme.Accent};
  // resize: none;
  
  @media only screen and (max-width: 900px) {
    width: 500px;
  }
  @media only screen and (max-width: 800px) {
    // width: 400px;
    max-width: 80%;
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    // width: 400px;
    max-width: 80%;

    height: 300px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin: 0 1rem;
  @media only screen and (max-width: 768px) {
    margin: 0;
    font-size: 16px;
    max-width: 75%;
    width: 100%;
  }
`;

const AddNewJob = () => {
  const { store} = useGlobalState();
  const { loggedInUser } = store;
  let {id}=useParams()
  let history= useHistory()
  const editorRef = useRef(null);
  const initialFormState = {
    title:"",
    location: '',
    minPay: '',
    maxPay: '',
    category:'',
    description:'',
  }
  const [formState, setFormState] = useState(initialFormState);
  const [serverError, setServerError] = useState("")
  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  
  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  const [wysiwyg, setWysiwyg] = useState("");
  
  const handleEditorChange = event => {
    setFormState({...formState, 'description': event.target.getContent()})
    // setWysiwyg(event.target.getContent());
    // console.log(wysiwyg);
  };
  useEffect(() => {

    if(id) {
			getJob(id)
			.then((job) => {
				console.log(job)
				setFormState(job.data)
        setWysiwyg(job.data.description)
        // editorRef.current.setContent(job.data.description)
			})
      
		}
  // console.log( "editor",editorRef.current)

	},[id])
 
 


  function handleSubmit(){
   // console.log("inside handle submit")
   let titleError=""
   let descriptionError=""
  if (!formState.title){
    titleError="Title is required"
  }
  if(!formState.description){
    descriptionError="Description is required"
  }
  setTitleError(titleError)
  setDescriptionError(descriptionError)
  if(!titleError&&!descriptionError){    
    if(id) {
        updateJob( {id: id, ...formState})
        .then((data) => {
          //console.log("data updated",data)
          setSuccessMessage("Your listing has neen updated")
        }).catch(
          (error) =>{ 
            console.log("err from catch",error.message)
            setServerError(error.message)
            }
        )
      }
      else{
        
        createJob(formState)
        .then((data)=>{
          console.log("new added job",data)
          history.push("/employer/jobs")
        })
        .catch((error) =>{ 
          //console.log("err from catch",error.message)
          setServerError(error.message)
          })
      }
  }  
  }

  return (
    <>
      {loggedInUser ? (
        <>
          <AddJobContainer>
            <CompanyLogo>
              <Logo src={RobotArm} alt="Company Logo"></Logo>
            </CompanyLogo>
              {serverError && <p style={{color:"red"}}>{serverError}</p>}
              {successMessage&&<p>{successMessage}</p>}
            <InputField name='title' value={formState.title} onChange={handleChange} placeholder="Position title"></InputField>
        <div style={{color:"red"}}>{titleError}</div>           
            <FormDiv>
              <TextBoxContainer>
                <InputField name='location' value={formState.location} onChange={handleChange} placeholder="Location"></InputField>
              </TextBoxContainer>
              <TextBoxContainer>
                <ShortInput name='minPay' value={formState.minPay} onChange={handleChange} placeholder="Minimum Pay Rate"></ShortInput>
              </TextBoxContainer>
              <TextBoxContainer>
                <ShortInput name='maxPay' value={formState.maxPay} onChange={handleChange} placeholder="Maximum Pay Rate"></ShortInput>
              </TextBoxContainer>
            </FormDiv>
            <FormDiv>
              <SubHeading>Role Description</SubHeading>
        <div style={{color:"red"}}>{descriptionError}</div>
              <DescContainer style={{height:'600px', width:'600px'}}>
              <Editor ref={editorRef} name='description'  initialValue={wysiwyg} apiKey='59omwpr6thzzk3ci27k6w0497s9d0alttwb5dc09yb788b3u' init={{
                    auto_focus:false,
                    resize:'both',
                    height:600,
                    placeholder:"Please note we will automaticaly include the About Your Company section from your profile in this job listing",
                    editor_css: 'myeditor.css',   
                    selector: '#textarea',
                    inline_boundaries: true,
                    branding: false,
                    statusbar:false,
                    menubar: false,
                    plugins: [
                      '  lists ',
                    ],
                    toolbar: '  fontselect fontsizeselect ' +
                    'bold italic  | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist  | ' ,
                    fontsize_formats: "10pt 12pt 14pt 16pt 18pt 24pt 36pt",
                    content_style: 'body { font-family:Roboto;  color:#000; border:none; }'
                    
                  }}
                  
                  onChange={handleEditorChange}
                  /> 
              </DescContainer>
              {/* <div  style={{height:'200px',color:'#000' }}> */}
              {/* {ReactHtmlParser(wysiwyg)} */}
              {/* {ReactHtmlParser(formState.description)} */}
              {/* </div> */}
            </FormDiv>
            <BtnContainer>
              <InputButton onClick={()=>{handleSubmit()}}>{id ? 'Update' : 'Create'}</InputButton>
              <InputButton
                style={{
                  background: theme.SecondaryBtnBg,
                  color: theme.SecondaryTxt,
                }}
              >
                Cancel
              </InputButton>
            </BtnContainer>
            <div style={{ margin: "2rem" }}> </div>
          </AddJobContainer>
        </>
      ) : (
        <> </>
        )}
        </>
  );
};

export default AddNewJob;
