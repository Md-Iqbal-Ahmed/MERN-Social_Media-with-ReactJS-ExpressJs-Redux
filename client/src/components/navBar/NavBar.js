import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import image from "../../image/memories.png";
import useStyles from "./styles";
import * as Types from "../../reducers/types";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const NavBar = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const handleLogout = () => {
    dispatch({ type: Types.LOGOUT });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={styles.appBar} position="static" color="inherit">
      <div className={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={styles.heading}
          variant="h2"
          align="center"
        >
          {" "}
          Rabbits{" "}
        </Typography>
        <img
          src={image}
          className={styles.image}
          alt="memroies"
          height="60"
        ></img>
      </div>
      <div>
        <Toolbar className={styles.toolbar}>
          {user ? (
            <div className={styles.profile}>
              <Avatar
                className={styles.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={styles.userName} variant="h6">
                {user.result.name}
              </Typography>

              <Button
                variant="contained"
                className={styles.logout}
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default NavBar;
