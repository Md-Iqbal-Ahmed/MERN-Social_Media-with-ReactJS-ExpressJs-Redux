import React, { useEffect, useState } from "react";
import { Grid, Container, Grow } from "@material-ui/core";
import Form from "../form/Form";
import Posts from "../posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import useStyles from "./styles";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const styles = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
