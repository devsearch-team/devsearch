import React from "react";
import { ThemeProvider } from "styled-components";

import { Container, Styles, theme } from "../src/globalStyles";
import SideBar from "./globalComponents/SideBar";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Styles />
      <Container>
        <SideBar />
      </Container>
    </ThemeProvider>
  );
};

export default App;
