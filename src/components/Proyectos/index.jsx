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
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../redux/actions/projects";
import { donate } from "../../redux/actions/user";
import { getAllProjects, isLoading } from "../../redux/selectores/projects";
import { isLoadingUser } from "../../redux/selectores/user";
import { LicenseInfo } from "@material-ui/x-grid";
import "./style.sass";
import { useTranslation } from "react-i18next";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
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

export const Proyectos = () => {
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
  const loading = useSelector((state) => isLoading(state));
  const isLoadingDonate = useSelector((state) => isLoadingUser(state));
  const dispatch = useDispatch();
  const donar = (idProyecto) => {
    setOpen(true);
    setProyectoADonar(idProyecto);
  };

  const [open, setOpen] = useState(false);
  const [proyectoADonar, setProyectoADonar] = useState(0);
  const [montoADonar, setMontoADonar] = useState(0);
  const [searchText, setSearchText] = useState("");
  const handleClose = (e) => {
    setMontoADonar(0);
    setOpen(false);
  };
  const handleChangeMontoADonar = (e) => setMontoADonar(e.target.value);
  const handleClickEventoDeDonar = (e) => {
    if (montoADonar <= 0) return;
    setOpen(false);
    dispatch(
      donate({
        idProyecto: proyectoADonar,
        amount: montoADonar,
      })
    );
    setMontoADonar(0);
    setOpenAlert(true);
  };
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearch = (e) => {
    dispatch(
      search(
        searchText,
        new Intl.DateTimeFormat("es-AR").format(new Date(selectedDate))
      )
    );
  };
  const classes = useStyles();
  const rootRef = useRef(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const columns = [
    { field: "name", headerName: t("nombre"), width: 150 },
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
      width: 150,
    },

    {
      field: "coverTheMinimumPercentage",
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
              {`${Math.round(params.value)}%`}
            </Typography>
          </Box>
        </Box>
      ),
      headerName: t("finalizado"),
      width: 150,
    },
    {
      field: "id",
      renderCell: (params) => {
        if (params.getValue("coverTheMinimumPercentage") < 100) {
          return (
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                donar(params.value);
              }}>
              {t("donar")}
            </Button>
          );
        }
        return <Chip label={t("finalizado")} color='secondary' disabled />;
      },
      headerName: t("donar"),
      width: 150,
    },
  ];

  useEffect(() => {
    if (!proyectos) {
      dispatch(search());
    }
  });

  const tabla = (listaDeProyectos) => {
    if (!loading && listaDeProyectos && listaDeProyectos.length >= 1) {
      return (
        <Grid container style={{ height: "70vh" }}>
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

  function Alert(props) {
    if (isLoadingDonate) {
      return <CircularProgress color='secondary'></CircularProgress>;
    }
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  return (
    <Container>
      <Grid item xs={12} lg={4}>
        <Typography variant='h5'>{t("proyectos-abiertos")}</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
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
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                id='date-picker-dialog'
                format={t("mm-dd-yyyy")}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} lg={2} style={{ marginLeft: 10 }}>
          <Button color='secondary' variant='contained' onClick={handleSearch}>
            {t("buscar")}
          </Button>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 20 }}>{tabla(proyectos)}</Grid>
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
              error={montoADonar <= 0}
              startAdornment={
                <InputAdornment position={t("currencyPosition")}>
                  {getCurrencySymbol()}
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid container style={{ marginTop: "2em" }}>
            <Grid item xs={12} lg={3}>
              <Button
                onClick={(e) => setMontoADonar(t("100"))}
                variant='contained'
                color='primary'>
                {numberFormat(t("100"))}
              </Button>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Button
                onClick={(e) => setMontoADonar(t("500"))}
                variant='contained'
                color='primary'>
                {numberFormat(t("500"))}
              </Button>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Button
                onClick={(e) => setMontoADonar(t("1000"))}
                variant='contained'
                color='primary'>
                {numberFormat(t("1000"))}
              </Button>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Button
                onClick={(e) => setMontoADonar(t("2000"))}
                variant='contained'
                color='secondary'>
                {numberFormat(t("2000"))}
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
