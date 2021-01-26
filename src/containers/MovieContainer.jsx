import React, { Component } from "react";
import MovieGrid from "../components/home/MovieGrid";
import { URL_LIST, API_KEY, SORT_URL } from "../const";
import Watchlist from "../components/home/Watchlist";
import FriendsWatchlist from "../components/home/FriendsWatchlist"
import Popular from "../components/home/Popular"
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
      <div>
      

      <h4 align='center'>
       Popular
       </h4>
        <MovieGrid movies={this.state.movies} />
        <h4 align='center'>Your Watchlist</h4>
        <Watchlist />
        
        <h4 align='center'> What Your Friends are Watching</h4>
        <FriendsWatchlist/>
        <h4 align='center'>Now Playing</h4>
       <Popular/>
      </div>
    );
  }
}

export default MovieContainer;
