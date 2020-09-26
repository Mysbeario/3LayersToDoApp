import React, { lazy, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import getAccountInfo from "../utilities/getAccountInfo";
import { accountState } from "./state";

const AdminPage = lazy(() => import("./Admin"));
const UserPage = lazy(() => import("./User"));
const HomePage = lazy(() => import("./Home"));

const Routes = (): JSX.Element => {
  const setAccount = useSetRecoilState(accountState);

  useEffect(() => {
    setAccount(getAccountInfo());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/user">
          <UserPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
