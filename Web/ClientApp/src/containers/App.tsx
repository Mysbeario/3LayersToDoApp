import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "../components/Loading";

const AdminPage = lazy(() => import("./Admin"));
const UserPage = lazy(() => import("./User"));
const HomePage = lazy(() => import("./Home"));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default App;
