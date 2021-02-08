import "./App.css";

import { BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import Welcome from "./components/Welcome";
import MainApp from "./containers/MainApp";
import LoginContainer from "./components/LoginContainer";
import SignUpContainer from "./components/SignUpContainer";
import { ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";

import { createMuiTheme } from "@material-ui/core/styles";




export default function App() {
  const [theme, setTheme] = useState(true);
  const history = useHistory()
  const handleUser = (userData) => {
    localStorage.setItem("user_id", userData.id);
    localStorage.setItem("username", userData.username);
  };

  

  const appliedTheme = createMuiTheme(localStorage.getItem('theme') === 'true' ? light : isDark);

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Switch>
          <Route
            path="/login"
            component={(props) => (
              <LoginContainer {...props} handleUser={handleUser} />
            )}
          />
          <Route
            path="/signup"
            component={(props) => (
              <SignUpContainer
                {...props}
                handleUser={handleUser}
                
              />
            )}
          />
          
          <MainApp  theme={theme} history={history}
                setTheme={setTheme} /> 
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export const light = {
  palette: {
    type: "light",
  },
};

export const isDark = {
  palette: {
    type: "dark",
  },
};
