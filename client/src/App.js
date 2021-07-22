import React from "react";
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from "./globalComponents/NavBar";
import { Container, Styles, theme } from "../src/globalStyles";
// import SideBar from "./globalComponents/SideBar";
import LandingPage from "./pages/landingPage";
import EmpLogIn from "./pages/EmpLogIn";
import SeekerLogIn from "./pages/SeekerLogIn"
// import reducer from '../utils/reducer'
// import { StateContext } from '../utils/stateContext'
const App = () => {
  const initialState = {
		loggedInUser: null,
		auth: {token: null}
	}
  // const [store, dispatch] = useReducer(stateReducer, initialState )

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
      {/* <StateContext.Provider value={{store, dispatch}}>
        </StateContext.Provider> */}
      {/* <LandingPage />     */}
      {/* The Container and sidebar need to conditionally loaded when a user / employer is logged in */}
      <Container>{/* <SideBar /> */}</Container>
    </ThemeProvider>
  );
};

export default App;
