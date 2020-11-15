import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import img from "../../assets/undraw_Login_re_4vu2.svg";
import "./style.sass";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoged, isLoading } from "../../redux/selectores/login";
import { loginUser } from "../../redux/actions/login";
import { useTranslation } from "react-i18next";
import { SAVE } from "../../controllers/LocalStorageController";

export const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => userLoged(state));
  const loading = useSelector((state) => isLoading(state));

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [mail_err, setMail_err] = useState("");
  const [pass_err, setPass_err] = useState("");

  useEffect(() => {
    if (user) {
      history.push("/ControlPanel");
    }
  });

  const handleMail = (e) => {
    let mail = e.target.value;

    if (!mail) {
      setMail_err(t("debe-ingresar-un-mail"));
    } else {
      setMail_err("");
    }

    setMail(mail);
  };

  const handlePass = (e) => {
    let pass = e.target.value;

    if (!pass) {
      setPass_err(t("debe-ingresar-una-contrasena"));
    } else {
      setPass_err("");
    }

    setPass(pass);
  };

  const handleLogin = (e) =>
    dispatch(loginUser({ mail: mail, password: pass }));

  const handleRegister = (e) =>
    dispatch(loginUser({ mail: mail, password: pass }));

  return (
    <Container className='login'>
      {loading ? <CircularProgress color='secondary' /> : ""}
      <Grid container>
        <Typography variant='h4'>{t("conectate")}</Typography>
      </Grid>
      <Grid container>
        <Grid className='login-form'>
          <form noValidate autoComplete='off' className='form'>
            <TextField
              className='mail'
              label={t("mail")}
              type='text'
              color='secondary'
              required
              error={mail_err !== ""}
              helperText={mail_err}
              onChange={handleMail}
            />
            <TextField
              className='password'
              label={t("contrasena")}
              type='password'
              color='secondary'
              autoComplete='current-password'
              required
              error={pass_err !== ""}
              helperText={pass_err}
              onChange={handlePass}
            />
            <Button
              className='singup'
              color='primary'
              variant='outlined'
              onClick={handleRegister}>
              {t("registrar")}
            </Button>
            <Button
              className='login'
              color='secondary'
              variant='contained'
              onClick={handleLogin}>
              {t("ingresar")}
            </Button>
          </form>
        </Grid>
        <Grid className='login-img'>
          <img src={img} />
        </Grid>
      </Grid>
    </Container>
  );
};
