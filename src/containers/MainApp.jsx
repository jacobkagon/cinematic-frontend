import React, { Component } from "react";
import HomeContainer from "./HomeContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MovieDetails from "../components/MovieDetails";
import UserProfile from "../components/userProfile/UserProfile";
import SearchContainer from "../components/SearchContainer";
import NavBar from "../components/Navbar";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router";
class MainApp extends Component {
  render() {
    return (
      <Paper>
        <BrowserRouter>
          {localStorage.getItem("token") ? (
            <div>
              <NavBar theme={this.props.theme} setTheme={this.props.setTheme} />
              
              {/* <Route path="/home" component={NavBar}/> */}

              <Switch>
              <Route exact path='/' component={HomeContainer}/>
                <Route path={"/movie/:id"} component={MovieDetails}></Route>
                <Route
                  path={"/:username/:user_id"}
                  component={UserProfile}
                ></Route>
                <Route path="/search" component={SearchContainer} />
              </Switch>
            </div>
          ) : (
            <div>{this.props.history.push("/login")}</div>
          )}
        </BrowserRouter>
      </Paper>
    );
  }
}

export default withRouter(MainApp);
