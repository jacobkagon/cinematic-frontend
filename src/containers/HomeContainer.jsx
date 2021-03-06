import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieContainer from "./MovieContainer";
import MovieDetails from "../components/MovieDetails";



import Paper from '@material-ui/core/Paper';
import UserProfile from "../components/userProfile/UserProfile";


class HomeContainer extends Component {
  render() {
    return (
      <Paper>
      <div>
            
        <BrowserRouter>
       
          <div>
            <Route exact path={"/"} component={MovieContainer}></Route>
            
            <Switch>
              <Route path={"/movie/:id"} component={MovieDetails}></Route>
              <Route path={"/:username/:id"} component={UserProfile}></Route>
            </Switch>
             
          
          </div>
         
        </BrowserRouter>
         
      </div>
      </Paper>
    );
  }
}

export default HomeContainer;
