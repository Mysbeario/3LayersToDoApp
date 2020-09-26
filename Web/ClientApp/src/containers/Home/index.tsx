import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accountState } from "../state";
import Login from "./Login";
import Register from "./Register";

const Home = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const account = useRecoilValue(accountState);
  const history = useHistory();

  useEffect(() => {
    if (account.id && account.role !== -1) {
      history.push("/user");
    }
  }, [account]);

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={(_, newValue: number) => setTabIndex(newValue)}
          centered
        >
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 ? <Login /> : <Register />}
    </Container>
  );
};

export default Home;
