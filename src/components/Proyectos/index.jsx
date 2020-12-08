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
  Box,
  Chip,
  InputBase,
  Snackbar,
  TextField,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../redux/actions/projects";
import { searchLocalidadesAction } from "../../redux/actions/localidades";
import { finalizar } from "../../redux/actions/projects";
import { donate } from "../../redux/actions/user";
import { getAllProjects, isLoading } from "../../redux/selectores/projects";
import {
  isLoading as isLoadingLocate,
  getAllLocalidades,
} from "../../redux/selectores/localidades";
import { isLoadingUser, getUser } from "../../redux/selectores/user";
import { LicenseInfo } from "@material-ui/x-grid";
import "./style.sass";
import { useTranslation } from "react-i18next";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  getLenguageDatePicker,
  getLanguageI18n,
  getCurrencySymbol,
  numberFormat,
} from "../../i18n";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { withRouter } from "react-router-dom";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ProyectoComponent = () => {
  LicenseInfo.setLicenseKey(
    "x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e"
  );

  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const { t } = useTranslation();
  let proyectos = useSelector((state) => getAllProjects(state));
  let listaDeLocalidades = useSelector((state) => getAllLocalidades(state));
  const loading = useSelector((state) => isLoading(state));
  const loadingLocalidades = useSelector((state) => isLoadingLocate(state));
  const isLoadingDonate = useSelector((state) => isLoadingUser(state));
  const usuarioConDatos = useSelector((state) => getUser(state));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openModalLocalidad, setOpenModalLocalidad] = useState(false);
  const [proyectoADonar, setProyectoADonar] = useState(null);
  const [montoADonar, setMontoADonar] = useState(0);
  const [missingAmount, setMissingAmount] = useState(0);
  const [searchText, setSearchText] = useState("");
  // const [textSearchLocalidades, setTextSearchLocalidades] = useState("");

  const searchLocalidades = () => {
    if (
      loadingLocalidades ||
      !listaDeLocalidades ||
      listaDeLocalidades.length === 0
    )
      return [];

    return listaDeLocalidades;
    // let expresion = new RegExp(`${textSearchLocalidades}.*`, "i");
    // let listaFiltrada = listaDeLocalidades.filter(
    //   (x) => expresion.test(x.name) || expresion.test(x.province)
    // );
    // return listaFiltrada ? listaFiltrada : [];
  };

  const donar = (idProyecto, missingAmount) => {
    setOpen(true);
    setMissingAmount(missingAmount);
    setProyectoADonar(idProyecto);
  };

  const handleClose = (e) => {
    setMontoADonar(0);
    setOpen(false);
    setOpenModalLocalidad(false);
  };
  const handleChangeMontoADonar = (e) => setMontoADonar(e.target.value);
  const handleClickEventoDeDonar = (e) => {
    if (montoADonar <= 0 || montoADonar > missingAmount) return;
    setOpen(false);
    let d = new Date(selectedDate);
    dispatch(
      donate({
        donacion: {
          idProyecto: proyectoADonar,
          amount: montoADonar,
        },
        search: {
          word: searchText,
          date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
        },
      })
    );
    setMontoADonar(0);
    setOpenAlert(true);
  };
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearch = (e) => {
    let d = new Date(selectedDate);
    dispatch(
      search({
        word: searchText,
        date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      })
    );
  };
  const classes = useStyles();
  const rootRef = useRef(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const [localidadSeleccionada, setLocalidadSeleccionada] = React.useState(
    null
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const getPercentage = (x, c) => {
    if (c) return "100%";
    return `${100 - Math.round(x)}%`;
  };

  const columns = [
    { field: "name", headerName: t("nombre"), width: 100 },
    { field: "fantasyName", headerName: t("nombre-fantasia"), width: 150 },
    {
      field: "deadline",
      renderCell: (params) => (
        <Box position='relative' display='inline-flex'>
          {new Intl.DateTimeFormat(getLanguageI18n()).format(
            new Date(params.value)
          )}
        </Box>
      ),
      headerName: t("fecha-fin"),
      width: 100,
    },
    {
      field: "missingPercentage",
      renderCell: (params) => (
        <Box position='relative' display='inline-flex'>
          <CircularProgress variant='static' {...params} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position='absolute'
            display='flex'
            alignItems='center'
            justifyContent='center'>
            <Typography variant='caption' component='div' color='textSecondary'>
              {getPercentage(
                params.value,
                params.getValue("coverTheMinimumPercentage")
              )}
            </Typography>
          </Box>
        </Box>
      ),
      headerName: t("finalizado"),
      width: 100,
    },
    {
      field: "missingAmount",
      renderCell: (params) => (
        <Box position='relative' display='inline-flex'>
          {numberFormat(params.value)}
        </Box>
      ),
      headerName: t("resta"),
      width: 150,
    },
    {
      field: "id",
      renderCell: (params) => {
        if (params.getValue("coverTheMinimumPercentage")) {
          return <Chip label={t("finalizado")} color='secondary' disabled />;
        }

        if (usuarioConDatos && usuarioConDatos.admin) {
          return (
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                dispatch(finalizar({ idProyecto: params.value }));
              }}>
              {t("Finalizar")}
            </Button>
          );
        }

        return (
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => {
              donar(params.value, params.getValue("missingAmount"));
            }}>
            {t("donar")}
          </Button>
        );
      },
      headerName: t("donar"),
      width: 250,
    },
  ];

  const columnsLocalidades = [
    { field: "name", headerName: t("nombre"), width: 100 },
    { field: "province", headerName: t("provincia"), width: 150 },
    {
      field: "population",
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <div>{params.value}</div>
          <div style={{ marginTop: "6px", marginLeft: "6px" }}>
            <PeopleAltIcon color='secondary' />
          </div>
        </div>
      ),
      headerName: t("poblacion"),
      width: 150,
    },
    {
      field: "stateOfConnection",
      renderCell: (params) => (
        <Box position='relative' display='inline-flex'>
          <CircularProgress
            variant='static'
            color='secondary'
            value={params.value ? 100 - params.value : 0}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position='absolute'
            display='flex'
            alignItems='center'
            justifyContent='center'>
            <Typography variant='caption' component='div' color='textSecondary'>
              {getPercentage(params.value, false)}
            </Typography>
          </Box>
        </Box>
      ),
      headerName: t("conexiones"),
      width: 150,
    },
    {
      field: "id",
      renderCell: (params) => (
        <Button
          variant='contained'
          color='secondary'
          onClick={(e) => {
            let localidad = listaDeLocalidades.filter(
              (x) => x.id === params.value
            )[0];
            setLocalidadSeleccionada({
              id: localidad.id,
              name: localidad.name,
              province: localidad.province,
              population: localidad.population,
              connection: localidad.connection,
              stateOfConnection: localidad.stateOfConnection,
            });
            setOpenModalLocalidad(true);
          }}>
          {t("editar")}
        </Button>
      ),
      headerName: t("editar"),
      width: 250,
    },
  ];

  useEffect(() => {
    if (!proyectos) {
      dispatch(search());
    }

    if (usuarioConDatos && usuarioConDatos.admin && !listaDeLocalidades) {
      dispatch(searchLocalidadesAction());
    }
  });

  const tabla = (listaDeProyectos) => {
    if (!loading && listaDeProyectos && listaDeProyectos.length >= 1) {
      return (
        <Grid container className='table'>
          <DataGrid
            pageSize={4}
            rowsPerPageOptions={[1, 4, 5]}
            pagination
            rows={listaDeProyectos}
            columns={columns}
          />
        </Grid>
      );
    }

    return <CircularProgress color='secondary'></CircularProgress>;
  };

  const tablaDeLocalidades = () => {
    let localidades = searchLocalidades();
    if (localidades && localidades.length >= 1) {
      return (
        <Grid container className='table'>
          <DataGrid
            pageSize={4}
            rowsPerPageOptions={[1, 4, 5]}
            pagination
            rows={searchLocalidades()}
            columns={columnsLocalidades}
          />
        </Grid>
      );
    }

    return <CircularProgress color='secondary'></CircularProgress>;
  };

  function Alert(props) {
    if (isLoadingDonate) {
      return <CircularProgress color='secondary'></CircularProgress>;
    }
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const getLocalidadesTable = () => {
    if (usuarioConDatos && usuarioConDatos.admin) {
      return (
        <>
          <hr />

          <Grid item xs={12} lg={4}>
            <Typography variant='h5'>{t("localidades")}</Typography>
          </Grid>
          <Grid style={{ marginTop: 20 }}>{tablaDeLocalidades()}</Grid>
        </>
      );
    }

    return;
  };

  const modalLocalidadContent = () => {
    if (localidadSeleccionada) {
      return (
        <div className={classes.paper}>
          <Typography variant='h6'>
            Editar Localidad - {localidadSeleccionada.name}
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label={t("nombre")}
                defaultValue={localidadSeleccionada.name}
                type='text'
                onChange={(e) => {
                  localidadSeleccionada.name = e.target.value;
                }}
                error={
                  !localidadSeleccionada.name ||
                  localidadSeleccionada.name === " "
                }
              />
            </Grid>

            <br />
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label={t("provincia")}
                defaultValue={localidadSeleccionada.province}
                type='text'
                onChange={(e) => {
                  localidadSeleccionada.province = e.target.value;
                }}
                error={
                  !localidadSeleccionada.province ||
                  localidadSeleccionada.province === " "
                }
              />
            </Grid>

            <br />
            <Grid item xs={12}>
              <FormControl fullWidth style={{ marginTop: "1.2em" }}>
                <Typography>{t("poblacion")}</Typography>
                <Input
                  style={{ width: "100%" }}
                  defaultValue={localidadSeleccionada.population}
                  type='number'
                  onChange={(e) => {
                    localidadSeleccionada.population = e.target.value;
                  }}
                  error={
                    !localidadSeleccionada.population ||
                    localidadSeleccionada.population < 1
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color='secondary'
              variant='contained'
              style={{ width: "100%", marginTop: "2em" }}
              onClick={(e) => {
                listaDeLocalidades.forEach((x) => {
                  if (x.id === localidadSeleccionada.id) {
                    x.id = localidadSeleccionada.id;
                    x.name = localidadSeleccionada.name;
                    x.province = localidadSeleccionada.province;
                    x.population = localidadSeleccionada.population;
                    x.connection = localidadSeleccionada.connection;
                    x.stateOfConnection =
                      localidadSeleccionada.stateOfConnection;
                  }
                });
                setOpenModalLocalidad(false);
              }}>
              {t("editar")}
            </Button>
          </Grid>
        </div>
      );
    }

    return;
  };

  return (
    <Container className='proyectos'>
      <Grid item xs={12} lg={4}>
        <Typography variant='h5'>{t("proyectos-abiertos")}</Typography>
      </Grid>
      <Grid container className='margintop'>
        <Grid item xs={12} lg={4}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              style={{ width: "100%" }}
              placeholder={t("buscar")}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleSearchTextChange}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={2} style={{ marginLeft: 10 }}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={getLenguageDatePicker()}>
            <Grid container className='margintop' style={{ width: "100%" }}>
              <KeyboardDatePicker
                id='date-picker-dialog'
                format={t("mm-dd-yyyy")}
                value={selectedDate}
                style={{ width: "100%" }}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          className='margintop'
          style={{ marginLeft: 10 }}>
          <Button
            color='secondary'
            variant='contained'
            style={{ width: "100%" }}
            onClick={handleSearch}>
            {t("buscar")}
          </Button>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 20 }}>{tabla(proyectos)}</Grid>
      {getLocalidadesTable()}
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
          <Typography variant='h6'>{t("donar")} 💸</Typography>
          <Typography component='p' id='server-modal-description'>
            {t("que-monto-desea-donar")}
          </Typography>
          <FormControl fullWidth style={{ marginTop: "1.2em" }}>
            <Input
              id='standard-adornment-amount'
              value={montoADonar}
              type='number'
              onChange={handleChangeMontoADonar}
              error={montoADonar <= 0 || montoADonar > missingAmount}
              startAdornment={
                <InputAdornment position={t("currencyPosition")}>
                  {getCurrencySymbol()}
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid container style={{ marginTop: "2em" }}>
            <Grid item xs={6} lg={3}>
              <Button
                style={{ width: "90%", margin: 10 }}
                onClick={(e) => setMontoADonar(100)}
                variant='contained'
                color='primary'>
                {numberFormat(100)}
              </Button>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Button
                onClick={(e) => setMontoADonar(200)}
                style={{ width: "90%", margin: 10 }}
                variant='contained'
                color='primary'>
                {numberFormat(200)}
              </Button>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Button
                onClick={(e) => setMontoADonar(500)}
                style={{ width: "90%", margin: 10 }}
                variant='contained'
                color='primary'>
                {numberFormat(500)}
              </Button>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Button
                onClick={(e) => setMontoADonar(1000)}
                style={{ width: "90%", margin: 10 }}
                variant='contained'
                color='primary'>
                {numberFormat(1000)}
              </Button>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Button
                style={{ width: "100%" }}
                onClick={(e) => setMontoADonar(2000)}
                variant='contained'
                color='secondary'>
                {numberFormat(2000)}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color='secondary'
              variant='contained'
              style={{ width: "100%", marginTop: "2em" }}
              onClick={handleClickEventoDeDonar}>
              {t("donar")}
            </Button>
          </Grid>
        </div>
      </Modal>
      {/* Modal para editar una localidad */}
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={openModalLocalidad}
        onClose={handleClose}
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        className={classes.modal}
        container={() => rootRef.current}>
        {modalLocalidadContent()}
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity='success'>
          {t("su-donacion-se-registro-con-exito")}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export const Proyectos = withRouter(ProyectoComponent);
