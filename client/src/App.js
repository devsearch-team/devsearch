import React,{useReducer, useEffect, useState} from "react";
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import NavBar from "./globalComponents/NavBar";
import { Container, Styles, theme } from "../src/globalStyles";
import EmployerProfilePage from "../src/pages/EmployerProfilePage";
import JobSeekerProfilePage from "../src/pages/JobSeekerProfilePage";
import SideBar from "./globalComponents/SideBar";
import LandingPage from "./pages/landingPage";
import EmpLogIn from "./pages/EmpLogIn";
import EmpRegister from "./pages/EmpRegister"
import SeekerRegister from "./pages/SeekerRegister"
import SeekerLogIn from "./pages/SeekerLogIn"
import AddNewJob from "./pages/AddNewJob";
import EmpApplications from './pages/EmpApplications'
import SeekerApplications from './pages/SeekerApplications'
import JobSeekerJobListings from "../src/pages/JobSeekerJobListings";
import SeekerViewJob from "../src/pages/SeekerViewJob";
import EmployerJobListings from "../src/pages/EmployerJobListings";
import NavMobile from "./globalComponents/NavMobile";
import stateReducer from './utils/stateReducer'
import { StateContext } from './utils/globalContext'


const App = () => {
  const initialState = {
		loggedInUser: localStorage.getItem("username") || null,
    isEmployer:localStorage.getItem("isEmployer"),
		auth: {token: localStorage.getItem("token") || null}
	}
  const [store, dispatch] = useReducer(stateReducer, initialState )
  const {loggedInUser,isEmployer}=store
  const [selectedPage,setSelectedPage]=useState(1)  //selected nav bar page
  const [landingEmail,setLandingEmail]=useState("")
  const [width, setWidth] = useState(window.innerWidth);
  
  const breakpoint = 768;
  useEffect(()=> {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
  })  
  console.log("landingEmail",landingEmail)
  return (
    <ThemeProvider theme={theme}>
      <Styles /> 
      <StateContext.Provider value={{store,dispatch,selectedPage,setSelectedPage,landingEmail,setLandingEmail}}>
        <BrowserRouter>
        { width < breakpoint ? <NavMobile /> : <NavBar />}
            <Switch>
              <Route exact path="/" >
                {loggedInUser?
                  isEmployer==="true"? <Redirect to="/employer/profile"/>
                  :<Redirect to="/seeker/profile"/>
                :<Redirect to="/landing"/>}    
              </Route>
              <Route exact path="/landing" component={LandingPage}/>
              <Route exact path="/employer/login" component={EmpLogIn}/>
              <Route exact path="/employer/register" component={EmpRegister}/>
              <Route exact path="/seeker/login" component={SeekerLogIn}/>
              <Route exact path="/seeker/register" component={SeekerRegister}/>
           <Container>
              <SideBar /> 
              <Route exact path="/employer/profile" component={EmployerProfilePage}/>
              <Route exact path="/seeker/profile" component={JobSeekerProfilePage}/>
              
              <Route exact path="/employer/applications" component={EmpApplications}/>
              <Route exact path="/seeker/applications" component={SeekerApplications}/>
              <Route exact path="/employer/jobs/newjob" component={AddNewJob} />
              <Route exact path="/employer/jobs/update/:id" component={AddNewJob} />
              <Route exact path="/employer/jobs" component={EmployerJobListings}/>
              <Route exact path="/seeker/jobs" component={JobSeekerJobListings}/>
              <Route  path="/seeker/jobs/:id" component={SeekerViewJob}/>
            </Container>
            </Switch>
          </BrowserRouter>
        {/* <EmployerProfilePage /> */}
        </StateContext.Provider>
      {/* <LandingPage />     */}
      {/* The Container and sidebar need to conditionally loaded when a user / employer is logged in */}
    </ThemeProvider>
  );
};

export default App;


