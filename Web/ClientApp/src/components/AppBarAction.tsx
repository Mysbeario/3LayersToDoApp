import { IconButton } from "@material-ui/core";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { accountState } from "../containers/state";
import {
  PowerSettingsNew as LogOutIcon,
  Dashboard as DashboardIcon,
} from "@material-ui/icons";
import deleteCookie from "../utilities/deleteCookie";

const AppBarAction = (): JSX.Element => {
  const [account, setAccount] = useRecoilState(accountState);
  const { path } = useRouteMatch();
  const history = useHistory();

  const onLogOut = (): void => {
    deleteCookie("cre.id");
    deleteCookie("cre.role");
    deleteCookie("cre.email");
    deleteCookie("cre.name");
    setAccount({ id: 0, role: -1, name: "", email: "" });
  };

  return (
    <div>
      {account.role === 1 && (
        <IconButton
          onClick={() => history.push(path === "/admin" ? "/user" : "/admin")}
        >
          <DashboardIcon />
        </IconButton>
      )}
      <IconButton onClick={onLogOut}>
        <LogOutIcon />
      </IconButton>
    </div>
  );
};

export default AppBarAction;
