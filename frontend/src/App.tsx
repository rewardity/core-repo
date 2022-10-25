import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { useApplicationInitialization } from "./hooks/useApplicationInitialiation";
import { useWallet } from "./hooks/useWallet";
import { NavigationBar } from "./components/NavigationBar";
import BackOffice from "./components/pages/BackOffice";
import { LandingPage } from "./components/pages/LandingPage";

const App: React.FC<{}> = () => {
  useApplicationInitialization();
  const [, connectWallet] = useWallet();

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/back-office" element={<BackOffice />} />
      </Routes>
    </>
  );
};

export default App;
