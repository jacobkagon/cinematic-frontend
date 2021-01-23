import React, { Component } from "react";
import MovieGrid from "../components/home/MovieGrid";
import { URL_LIST, API_KEY, SORT_URL } from "../const";
import Watchlist from "../components/home/Watchlist";

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
      <h4 text-align='center'>
       Trending
       </h4>
        <MovieGrid movies={this.state.movies} />
        <h4>Watchlist</h4>
        <Watchlist />
      </div>
    );
  }
}

export default MovieContainer;
