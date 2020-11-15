import React, { useEffect } from "react";
import "./style.sass";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLoged } from "../../redux/selectores/login";
import { Proyectos } from "../../components/Proyectos";
import { UserInfo } from "../../components/UserInfo";
import { GET } from "../../controllers/LocalStorageController";
import { Container, Grid } from "@material-ui/core";

export const ControlPanel = () => {
  const history = useHistory();
  const user = useSelector((state) => userLoged(state));

  useEffect(() => {
    if (user === undefined && !GET("userLoged")) {
      history.push("/");
    }
  });

  return (
    <Container>
      <Grid container>
        <Grid item xs='12' lg='3'>
          <UserInfo />
        </Grid>
        <Grid item xs='12' lg='9'>
          <Proyectos />
        </Grid>
      </Grid>
    </Container>
  );
};
