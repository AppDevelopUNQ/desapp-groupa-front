import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Modal,
  FormControl,
  Input,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../redux/actions/projects";
import { getAllProjects, isLoading } from "../../redux/selectores/projects";
import { LicenseInfo } from "@material-ui/x-grid";
import "./style.sass";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: "translateZ(0)",
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
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

export const Proyectos = () => {
  LicenseInfo.setLicenseKey(
    "x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e"
  );
  const { t } = useTranslation();
  const proyectos = useSelector((state) => getAllProjects(state));
  const loading = useSelector((state) => isLoading(state));
  const dispatch = useDispatch();
  const donar = (idProyecto) => {
    setOpen(true);
    setProyectoADonar(idProyecto);
  };

  const [open, setOpen] = useState(false);
  const [proyectoADonar, setProyectoADonar] = useState(0);
  const [montoADonar, setMontoADonar] = useState(0);
  const handleClose = (e) => {
    setMontoADonar(0);
    setOpen(false);
  };
  const handleChangeMontoADonar = (e) => setMontoADonar(e.target.value);
  const handleClickEventoDeDonar = (e) => {
    setOpen(false);
    console.log(`Donaste ${montoADonar} al proyecto id: ${proyectoADonar}!!!`);
    setMontoADonar(0);
  };
  const classes = useStyles();
  const rootRef = useRef(null);

  const columns = [
    { field: "name", headerName: t("nombre"), width: 150 },
    { field: "fantasyName", headerName: t("nombre-fantasia"), width: 150 },
    { field: "deadline", headerName: t("fecha-fin"), width: 150 },
    {
      field: "coverTheMinimumPercentage",
      headerName: t("finalizado"),
      width: 150,
    },
    {
      field: "id",
      renderCell: (params) => (
        <Button
          variant='contained'
          color='primary'
          onClick={(e) => {
            donar(params.value);
          }}>
          {t("donar")}
        </Button>
      ),
      headerName: t("donar"),
      width: 150,
    },
  ];
  let tabla = "";

  useEffect(() => {
    if (!proyectos) {
      dispatch(search());
    }
  });

  if (loading) {
    return <CircularProgress color='secondary' />;
  }

  if (proyectos && proyectos.length > 0) {
    tabla = (
      <Grid container style={{ height: "70vh" }}>
        <DataGrid
          pageSize={4}
          rowsPerPageOptions={[1, 4, 5]}
          pagination
          rows={proyectos}
          columns={columns}
        />
      </Grid>
    );
  }

  return (
    <Container>
      <Typography variant='h5'>{t("proyectos-abiertos")}</Typography>
      {tabla}
      {/* MODAL PARA DONAR */}
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={handleClose}
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        className={classes.modal}
        container={() => rootRef.current}>
        <div className={classes.paper}>
          <Typography variant='h6'>Donar 💸</Typography>
          <Typography component='p' id='server-modal-description'>
            ¿Que monto desea donar?
          </Typography>
          <FormControl fullWidth style={{ marginTop: "1.2em" }}>
            <Input
              id='standard-adornment-amount'
              value={montoADonar}
              type='number'
              onChange={handleChangeMontoADonar}
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
            />
          </FormControl>
          <Grid container style={{ marginTop: "2em" }}>
            <Grid item xs='12' lg='3'>
              <Button
                onClick={(e) => setMontoADonar(100)}
                variant='contained'
                color='primary'>
                $100
              </Button>
            </Grid>
            <Grid item xs='12' lg='3'>
              <Button
                onClick={(e) => setMontoADonar(500)}
                variant='contained'
                color='primary'>
                $500
              </Button>
            </Grid>
            <Grid item xs='12' lg='3'>
              <Button
                onClick={(e) => setMontoADonar(1000)}
                variant='contained'
                color='primary'>
                $1000
              </Button>
            </Grid>
            <Grid item xs='12' lg='3'>
              <Button
                onClick={(e) => setMontoADonar(2000)}
                variant='contained'
                color='secondary'>
                $2000
              </Button>
            </Grid>
          </Grid>
          <Grid item xs='12'>
            <Button
              color='secondary'
              variant='contained'
              style={{ width: "100%", marginTop: "2em" }}
              onClick={handleClickEventoDeDonar}>
              Donar
            </Button>
          </Grid>
        </div>
      </Modal>
    </Container>
  );
};
