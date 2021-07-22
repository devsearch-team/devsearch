import React from "react";
import { ThemeProvider } from "styled-components";
// import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import NavBar from "./globalComponents/NavBar";
import Tabs from "./globalComponents/Tabs";

import { Container, Styles, theme } from "../src/globalStyles";
import SideBar from "./globalComponents/SideBar";
import LandingPage from "./pages/landingPage";
import EmpLogIn from "./pages/EmpLogIn";
import SeekerLogIn from "./pages/SeekerLogIn";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Styles />
      <NavBar />
      {/* Past BrowserRouter when finished tabs */}
      {/* <LandingPage />     */}
      {/* The Container and sidebar need to conditionally loaded when a user / employer is logged in */}
      <Container>
        <SideBar />
        <Tabs></Tabs>
      </Container>
    </ThemeProvider>
  );
};

export default App;
