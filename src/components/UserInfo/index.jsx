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
} from "@material-ui/core";
import "./style.sass";
import { userLoged } from "../../redux/selectores/login";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { LicenseInfo } from "@material-ui/x-grid";
import { DataGrid } from "@material-ui/data-grid";

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

  const { t } = useTranslation();
  const user = useSelector((state) => userLoged(state));
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
    { field: "name", headerName: "proyecto", width: 150 },
    {
      field: "coverTheMinimumPercentage",
      headerName: t("finalizado"),
      width: 150,
    },
  ];
  let tabla = <CircularProgress color='secondary'></CircularProgress>;

  if (!user) {
    return <CircularProgress color='primary'></CircularProgress>;
  }

  if (user.donaciones && user.donaciones.length > 0) {
    tabla = (
      <Grid container style={{ height: "70vh" }}>
        <DataGrid
          pageSize={4}
          rowsPerPageOptions={[1, 4, 5]}
          pagination
          rows={user.donaciones}
          columns={columns}
        />
      </Grid>
    );
  }

  return (
    <Container>
      <Typography variant='h5'>Informacion de usuario</Typography>
      {/* USER INFO */}
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {user.name}
          </Typography>
          <Typography color='textSecondary'>Donador</Typography>
          <Typography variant='body2' component='p'>
            <strong> emial: </strong> {user.name}
          </Typography>
          <Typography variant='body2' component='p'>
            <strong> ultima donacion: </strong>
            $1000
          </Typography>
          <Typography variant='body2' component='p'>
            <strong> puntos: </strong>
            1000
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item xs='12'>
              <Button
                color='secondary'
                style={{ width: "100%" }}
                onClick={openVerDonaciones}>
                ver donaciones
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {/* MODAL PARA DONAR */}
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
          <Typography variant='h6'>Donaste 🎉</Typography>
          {tabla}
        </div>
      </Modal>
    </Container>
  );
};
