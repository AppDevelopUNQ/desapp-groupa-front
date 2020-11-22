import React from "react";
import { Banner } from "../../components/Banner";
import { Container, Grid } from "@material-ui/core";
import "./style.sass";

export const Home = () => {
  return (
    <Container className='home'>
      <Grid container className='top'>
        <Banner className='banner' />
      </Grid>
      <Grid container className='bottom'></Grid>
    </Container>
  );
};
