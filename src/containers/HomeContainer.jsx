import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieContainer from "./MovieContainer"
import MovieDetails from "../components/MovieDetails"

class HomeContainer extends Component {
    render() {
        return (
        <BrowserRouter>
      <div>
        <MovieContainer />
        <Switch>
          <Route path={"/movie/:id"} component={MovieDetails}></Route>
        </Switch>
      </div>
    </BrowserRouter>
        );
    }
}

export default HomeContainer;
