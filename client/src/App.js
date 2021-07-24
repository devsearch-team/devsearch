import React,{useReducer} from "react";
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from "./globalComponents/NavBar";
import { Container, Styles, theme } from "../src/globalStyles";
// import SideBar from "./globalComponents/SideBar";
import Register from "./globalComponents/Register"
import LandingPage from "./pages/landingPage";
import EmpLogIn from "./pages/EmpLogIn";
import SeekerLogIn from "./pages/SeekerLogIn"
import stateReducer from './utils/stateReducer'
import { StateContext } from './utils/globalContext'
const App = () => {
  const initialState = {
		loggedInUser: null,
    isEmployer:false,
		auth: {token: null}
	}
  const [store, dispatch] = useReducer(stateReducer, initialState )

  return (
    <ThemeProvider theme={theme}>
      <Styles /> 
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>
        <NavBar />
            <Switch>
              <Route exact path="/" component={LandingPage}/>
              <Route exact path="/employer/login" component={EmpLogIn}/>
              <Route exact path="/employer/register" component={Register}/>
              <Route exact path="/seeker/login" component={SeekerLogIn}/>
              {/* <Route exact path="/seeker/singup" component={SeekerSignUP}/> */}
            </Switch>
          </BrowserRouter>
        </StateContext.Provider>
      {/* <LandingPage />     */}
      {/* The Container and sidebar need to conditionally loaded when a user / employer is logged in */}
      <Container>{/* <SideBar /> */}</Container>
    </ThemeProvider>
  );
};

export default App;
