import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "../components/Loading";

const AdminPage = lazy(() => import("./Admin"));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            Go to /admin to enter Administrator Dashboard
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
