import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from './components/Welcome'
import MainApp from './containers/MainApp'
import LoginContainer from "./components/LoginContainer"
import SignUpContainer from "./components/SignUpContainer"

export default function App() {
  
  const handleUser = (userData) => {
    localStorage.setItem("user_id", userData.id);
    localStorage.setItem("username", userData.username);
  };
  
  return (
    <Router>
     <Switch>
     <Route path="/login" component={(props) => (
            <LoginContainer {...props} handleUser={handleUser} />
          )}/>
      <Route path="/signup" component={(props) => (
            <SignUpContainer {...props} handleUser={handleUser}/> )}/>
        <Route path= "/welcome" component={Welcome}/>
        <Route path= "/" component={MainApp}/>
      </Switch>
    </Router>
  );
}
