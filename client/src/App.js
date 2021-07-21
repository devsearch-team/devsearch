import React from "react";
import { ThemeProvider } from "styled-components";

import { Container, Styles, theme } from "../src/globalStyles";
// import SideBar from "./globalComponents/SideBar";
import LandingPage from "./pages/landingPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Styles />
      <LandingPage />
      {/* The Container and sidebar need to conditionally loaded when a user / employer is logged in */}
      <Container>{/* <SideBar /> */}</Container>
    </ThemeProvider>
  );
};

export default App;
