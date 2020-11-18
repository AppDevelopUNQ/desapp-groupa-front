import React, { useRef, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Typography,
  Modal,
  Box,
  Chip,
} from "@material-ui/core";
import "./style.sass";
import { userLoged } from "../../redux/selectores/login";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { LicenseInfo } from "@material-ui/x-grid";
import { DataGrid } from "@material-ui/data-grid";
import { getDonacionesFor } from "../../redux/actions/user";
import { getDonations } from "../../redux/selectores/user";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: "translateZ(0)",
    "@media all and (-ms-high-contrast: none)": {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1.2rem",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const UserInfo = () => {
  LicenseInfo.setLicenseKey(
    "x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e"
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => userLoged(state));
  const donaciones = useSelector((state) => getDonations(state));
  const [verDonaciones, setVerDonaciones] = useState(false);
  const openVerDonaciones = (e) => {
    setVerDonaciones(true);
  };
  const closeVerDonaciones = (e) => {
    setVerDonaciones(false);
  };

  const classes = useStyles();
  const rootRef = useRef(null);

  const columns = [
    { field: "name", headerName: t("proyecto"), width: 150 },
    {
      field: "coverTheMinimumPercentage",
      renderCell: (params) => {
        if (params.value === 100) {
          return <Chip label={t("finalizado")} color='secondary' />;
        }
        return (
          <Box position='relative' display='inline-flex'>
            <CircularProgress color='primary' variant='static' {...params} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position='absolute'
              display='flex'
              alignItems='center'
              justifyContent='center'>
              <Typography
                variant='caption'
                component='div'
                color='textSecondary'>
                {`${Math.round(params.value)}%`}
              </Typography>
            </Box>
          </Box>
        );
      },
      headerName: t("finalizado"),
      width: 150,
    },
  ];
  const tabla = () => {
    if (donaciones && donaciones.length > 0) {
      return (
        <Grid container style={{ height: "70vh" }}>
          <DataGrid
            pageSize={6}
            rowsPerPageOptions={[1, 4, 6]}
            pagination
            rows={donaciones}
            columns={columns}
          />
        </Grid>
      );
    }
    dispatch(getDonacionesFor(user.id));
    return <CircularProgress color='secondary'></CircularProgress>;
  };

  if (!user) {
    return <CircularProgress color='primary'></CircularProgress>;
  }

  return (
    <Container>
      <Typography variant='h5'>{t("informacion-de-usuario")}</Typography>
      {/* USER INFO */}
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {user.name}
          </Typography>
          <Typography color='textSecondary'>{t("donador")}</Typography>
          <Typography variant='body2' component='p'>
            <strong> {t("emial")} </strong> {user.name}
          </Typography>
          <Typography variant='body2' component='p'>
            <strong> {t("ultima-donacion")} </strong>
            $1000
          </Typography>
          <Typography variant='body2' component='p'>
            <strong> {t('puntos')} </strong>
            1000
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item xs={12}>
              <Button
                color='secondary'
                style={{ width: "100%" }}
                onClick={openVerDonaciones}>
                {t("ver-donaciones")}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {/* MODAL PARA VER DONACIONES */}
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={verDonaciones}
        onClose={closeVerDonaciones}
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        className={classes.modal}
        container={() => rootRef.current}>
        <div className={classes.paper}>
          <Typography variant='h6'>{t("donaste")} 🎉</Typography>
          {tabla()}
        </div>
      </Modal>
    </Container>
  );
};
