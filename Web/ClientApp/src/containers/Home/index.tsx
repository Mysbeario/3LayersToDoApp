import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Home = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);

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
