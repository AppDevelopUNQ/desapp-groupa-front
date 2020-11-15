import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GET } from "../../controllers/LocalStorageController";
import { useSelector, useDispatch } from "react-redux";
import { userLoged } from "../../redux/selectores/login";
import { logout } from "../../redux/actions/login";

export const Logout = () => {
  const userALogearse = useSelector((state) => userLoged(state));
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const handleClick = () => {
    dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    if (!user) setUser(GET("userLoged"));
  });
  if (!user && !userALogearse) {
    return "";
  }
  return (
    <div>
      <Button
        variant='contained'
        size='small'
        style={{ marginRight: 10 }}
        color='primary'
        onClick={handleClick}>
        <ExitToAppIcon />
      </Button>
    </div>
  );
};
