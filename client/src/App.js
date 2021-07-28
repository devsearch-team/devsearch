import React,{useReducer} from "react";
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from "./globalComponents/NavBar";
import { Container, Styles, theme } from "../src/globalStyles";
import EmployerProfilePage from "../src/pages/EmployerProfilePage";
import SideBar from "./globalComponents/SideBar";
import LandingPage from "./pages/landingPage";
import EmpLogIn from "./pages/EmpLogIn";
import EmpRegister from "./pages/EmpRegister"
import SeekerRegister from "./pages/SeekerRegister"
import SeekerLogIn from "./pages/SeekerLogIn"
import stateReducer from './utils/stateReducer'
import { StateContext } from './utils/globalContext'
const App = () => {
  const initialState = {
		loggedInUser: sessionStorage.getItem("username") || null,
    isEmployer:sessionStorage.getItem("isEmployer"),
		auth: {token: sessionStorage.getItem("token") || null}
	}
  const [store, dispatch] = useReducer(stateReducer, initialState )
  console.log("session token",sessionStorage.getItem("token"))
  return (
    <ThemeProvider theme={theme}>
      <Styles /> 
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>
        <NavBar />
            <Switch>
              <Route exact path="/" component={LandingPage}/>
              <Route exact path="/employer/login" component={EmpLogIn}/>
              <Route exact path="/employer/register" component={EmpRegister}/>
              <Route exact path="/seeker/login" component={SeekerLogIn}/>
              <Route exact path="/seeker/register" component={SeekerRegister}/>
           <Container>
              <SideBar /> 
              <Route exact path="/employer/profile" component={EmployerProfilePage}/>
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


