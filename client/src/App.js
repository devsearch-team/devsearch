import React from "react";
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import NavBar from "./globalComponents/NavBar";

import { Container, Styles, theme } from "../src/globalStyles";
// import SideBar from "./globalComponents/SideBar";
import LandingPage from "./pages/landingPage";
import EmpLogIn from "./pages/EmpLogIn";
import SeekerLogIn from "./pages/SeekerLogIn"
 
const App = () => {

  fetch("/api")
    .then(res=>res.json())
    .then(res=>console.log(res));
  return (
    <ThemeProvider theme={theme}>
      <Styles /> 
      <BrowserRouter>
       <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/employer/login" component={EmpLogIn}/>
            {/* <Route exact path="/employer/singup" component={EmpSignUP}/> */}
            <Route exact path="/seeker/login" component={SeekerLogIn}/>
            {/* <Route exact path="/seeker/singup" component={SeekerSignUP}/> */}
          </Switch>
        </BrowserRouter>
      {/* <LandingPage />     */}
      {/* The Container and sidebar need to conditionally loaded when a user / employer is logged in */}
      <Container>{/* <SideBar /> */}</Container>
    </ThemeProvider>
  );
};

export default App;
