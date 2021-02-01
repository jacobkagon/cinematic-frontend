import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import Welcome from "./components/Welcome";
import MainApp from "./containers/MainApp";
import LoginContainer from "./components/LoginContainer";
import SignUpContainer from "./components/SignUpContainer";
import { ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";

import { createMuiTheme } from "@material-ui/core/styles";




export default function App() {
  const [theme, setTheme] = useState(false);
  const history = useHistory()
  const handleUser = (userData) => {
    localStorage.setItem("user_id", userData.id);
    localStorage.setItem("username", userData.username);
  };

  const appliedTheme = createMuiTheme(theme ? light : isDark);

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
          <Route path="/welcome" component={Welcome} />
          <Route path="/" component={(props) => <MainApp {...props} theme={theme} history={history}
                setTheme={setTheme} />} />
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
