import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import Loading from "../components/Loading";
import Routes from "./Routes";

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
