import React, { Component } from "react";
import MovieGrid from "../components/MovieGrid";
import {URL_LIST, API_KEY, SORT_URL} from '../const'

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
           <MovieGrid  movies={this.state.movies} />
      </div>
    );
  }
}

export default MovieContainer;
