import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieContainer from "./MovieContainer";
import MovieDetails from "../components/MovieDetails";


import Paper from '@material-ui/core/Paper';


class HomeContainer extends Component {
  render() {
    return (
      <Paper>
      <div>
            
        <BrowserRouter>
       
          <div>
            <Route path="/home" component={MovieContainer}></Route>
            
            <Switch>
              <Route path={"/movie/:id"} component={MovieDetails}></Route>
            </Switch>
             
          
          </div>
         
        </BrowserRouter>
         
      </div>
      </Paper>
    );
  }
}

export default HomeContainer;
