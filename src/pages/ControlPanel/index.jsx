import React, { useEffect } from "react";
import "./style.sass";
import { Proyectos } from "../../components/Proyectos";
import { UserInfo } from "../../components/UserInfo";
import { Container, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const ControlPanel = () => {
  const { t } = useTranslation();
  useEffectt(() => {
    document.title = t("proyectos-y-donaciones");
  });
  return (
    <Container>
      <Grid container className='container'>
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
