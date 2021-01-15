import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from './components/Welcome'
import MainApp from './containers/MainApp'

export default function App() {
  
  return (
    <Router>
     <Switch>
        <Route path= "/welcome" component={Welcome}/>
        <Route path= "/" component={MainApp}/>

      </Switch>
    </Router>
  );
}
