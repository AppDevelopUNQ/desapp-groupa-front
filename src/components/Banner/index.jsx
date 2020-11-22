import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import img from "../../assets/undraw_Master_plan_re_jvit.svg";
import "./style.sass";
import { useTranslation } from "react-i18next";

export const Banner = () => {
  const { t } = useTranslation();
  return (
    <Container className='banner'>
      <Grid container className='grid'>
        <Grid className='left'>
          <img src={img} alt='img' />
        </Grid>
        <Grid className='right'>
          <Typography variant='h3' className='title'>
            {t("conectemos-argentina")}
          </Typography>
          <Typography variant='h5' className='description'>
            {t(
              "actualmente-existen-muchisimos-pueblos-y-localidades-que-aun-no-cuentan-con-conectividad-a-internet-el-programa-argentina-conectada-luego-rebautizado-como-plan-federal-de-internet-se-propone-llevar-conectividad-a-todo-el-pais-pueblo-por-pueblo"
            )}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
