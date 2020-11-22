import React from "react";
import "./style.sass";
import { Proyectos } from "../../components/Proyectos";
import { UserInfo } from "../../components/UserInfo";
import { Container, Grid } from "@material-ui/core";

export const ControlPanel = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Proyectos />
        </Grid>
      </Grid>
    </Container>
  );
};
