import React, { Component } from "react";
import MovieGrid from "../components/home/MovieGrid";
import { URL_LIST, API_KEY, SORT_URL } from "../const";
import Watchlist from "../components/home/Watchlist";
import FriendsWatchlist from "../components/home/FriendsWatchlist"
import Popular from "../components/home/Popular"
import { Typography } from "@material-ui/core";

import Paper from '@material-ui/core/Paper';


class MovieContainer extends Component {
   
  state = {
    movies: [],
  };

 

  componentDidMount() {
    fetch(URL_LIST + API_KEY + SORT_URL)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          movies: data.results,
        })
      );
  }

 
  render() {
    return (
      
  <Paper>
      <h4  align='center'>
       Popular
       </h4>
        <MovieGrid movies={this.state.movies} />
        <Watchlist />
        <FriendsWatchlist/>
        <h4 align='center'>Now Playing</h4>
       <Popular/>
       
     
       </Paper>
       
    );
  }
}

export default MovieContainer;
