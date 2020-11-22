import React from "react";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth0 } from "@auth0/auth0-react";

export const Logout = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <Button
        variant='contained'
        size='small'
        style={{ marginRight: 10 }}
        color='primary'
        onClick={() => logout({ returnTo: window.location.origin })}>
        <ExitToAppIcon />
      </Button>
    </div>
  );
};
