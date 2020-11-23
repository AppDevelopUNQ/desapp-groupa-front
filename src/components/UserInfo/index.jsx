import React, { useRef, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
  Modal,
  Box,
  Avatar,
} from "@material-ui/core";
import "./style.sass";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { LicenseInfo } from "@material-ui/x-grid";
import { DataGrid } from "@material-ui/data-grid";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getDonacionesFor } from "../../redux/actions/user";
import { getDonations, getUser } from "../../redux/selectores/user";
import { getLanguageI18n } from "../../i18n";
import { withRouter } from "react-router-dom";
import { numberFormat } from "../../i18n";

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
    width: "60vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1.2rem",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    "@media (max-width: 1023px)": {
      width: "100vw",
    },
  },
}));

const UserInfoComponent = () => {
  LicenseInfo.setLicenseKey(
    "x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e"
  );
  const { user } = useAuth0();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const donaciones = useSelector((state) => getDonations(state));
  const usuarioConDatos = useSelector((state) => getUser(state));
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
    {
      field: "date",
      renderCell: (params) => (
        <Box position='relative' display='inline-flex'>
          {new Intl.DateTimeFormat(getLanguageI18n()).format(
            new Date(params.value)
          )}
        </Box>
      ),
      headerName: t("fecha"),
      width: 150,
    },
    {
      field: "name",
      renderCell: (params) => (
        <Box position='relative' display='inline-flex'>
          {params.value}
        </Box>
      ),
      headerName: t("proyecto"),
      width: 150,
    },
    {
      field: "fantasyName",
      renderCell: (params) => (
        <Box position='relative' display='inline-flex'>
          {params.value}
        </Box>
      ),
      headerName: t("nombre"),
      width: 150,
    },
    { field: "points", headerName: t("puntos"), width: 150 },
    { field: "amount", headerName: t("donado"), width: 150 },
  ];

  if (!user) {
    return <CircularProgress color='secondary'></CircularProgress>;
  }
  const tabla = () => {
    if (donaciones && donaciones.length >= 0) {
      return (
        <Grid container className='table'>
          <DataGrid
            pageSize={6}
            rowsPerPageOptions={[1, 4, 6]}
            pagination
            rows={donaciones.map((x) => ({
              id: x.id,
              date: x.date,
              name: x.project.name,
              fantasyName: x.project.fantasyName,
              points: x.points,
              amount: x.amount,
            }))}
            columns={columns}
          />
        </Grid>
      );
    }
    dispatch(getDonacionesFor());

    return <CircularProgress color='secondary'></CircularProgress>;
  };

  return (
    <Grid item xs={12} className='container'>
      {/* USER INFO */}
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            <Avatar aria-label='recipe' src={user.picture}></Avatar>
            {user.name}
          </Typography>
          <Typography color='textSecondary'>{t("donador")}</Typography>
          <Typography variant='body2' component='p'>
            <strong> {t("emial")} </strong> {user.email}
          </Typography>
          <Typography variant='body2' component='p'>
            <strong> {t("ultima-donacion")} </strong>
            {usuarioConDatos && usuarioConDatos.donations
              ? numberFormat(
                  usuarioConDatos.donations
                    .map((x) => x.amount)
                    .slice(-1)
                    .pop()
                )
              : numberFormat(0)}
          </Typography>
          <Typography variant='body2' component='p'>
            <strong> {t("puntos")} </strong>
            {usuarioConDatos ? usuarioConDatos.points : 0}
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
    </Grid>
  );
};

export const UserInfo = withRouter(UserInfoComponent);
