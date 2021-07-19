import React from "react";
import { ThemeProvider } from "styled-components";

import { Styles, theme } from "../src/globalStyles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Styles />
      Hellow World
    </ThemeProvider>
  );
};

export default App;
