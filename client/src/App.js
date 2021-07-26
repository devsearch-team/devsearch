import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import NavBar from "./globalComponents/NavBar";

import { Container, Styles, theme } from "../src/globalStyles";
// import SideBar from "./globalComponents/SideBar";
import LandingPage from "./pages/landingPage";
import EmpLogIn from "./pages/EmpLogIn";
import SeekerLogIn from "./pages/SeekerLogIn"
import NavMobile from "./globalComponents/NavMobile";
 
const App = () => {
  
  const [width, setWidth] = useState(window.innerWidth);
  
  const breakpoint = 768;

  useEffect(()=> {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
  })  
  

  
  return (
    <ThemeProvider theme={theme}>
      <Styles /> 
      <BrowserRouter>
      { width < breakpoint ? <NavMobile /> : <NavBar />}
       
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
