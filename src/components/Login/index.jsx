import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";

export const Login = () => {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Button
        variant='contained'
        size='small'
        style={{ marginRight: 10 }}
        color='primary'
        onClick={() => loginWithRedirect()}>
        {t("ingresar")}
      </Button>
    </div>
  );
};
