import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Paper from "@material-ui/core/Paper";

const username = localStorage.getItem("username");
const userId = localStorage.getItem("user_id");

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    // padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { theme, setTheme } = props;
  const history = useHistory();

  const icon =
    localStorage.getItem("theme") === "true" ? (
      <Brightness2Icon />
    ) : (
      <Brightness5Icon />
    );

  const darkMode = () => {
    setTheme(!theme);
    localStorage.setItem("theme", theme);
    if (localStorage.getItem("theme") === "true") {
      localStorage.setItem("theme", "false");
    }
    localStorage.setItem("theme", !theme);
  };

  const logout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };

  const userProfile = () => {
    history.push("/" + username + "/" + userId);
    window.location.reload();
  };

  const handleSearch = () => {
    history.push("/search");
  };

  const goHome = () => {
    history.push("/");
  };
  return (
    <React.Fragment>
      <Paper>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={() => userProfile()}>
            <Avatar size="small" src="/broken-image.jpg" />
          </IconButton>
          <IconButton onClick={() => goHome()}>
            <HomeIcon fontSize="large" />
          </IconButton>
          
          <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={() => darkMode()}

            // onClick={() => localStorage.setItem('newTheme', !theme) }
          >
            {icon}
          </IconButton>
          <IconButton onClick={() => handleSearch()}>
            <SearchIcon />
          </IconButton>
          <Button text-align="right" variant="outlined" size="small" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>

        <Link
          color="inherit"
          noWrap
          // key={section.title}
          variant="body2"
          // href={section.url}
          className={classes.toolbarLink}
          // {sections.title}
        ></Link>
      </Paper>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
