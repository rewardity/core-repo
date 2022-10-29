import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useApplicationInitialization } from "./hooks/useApplicationInitialiation";
import { useWallet } from "./hooks/useWallet";
import { NavigationBar } from "./components/NavigationBar";
import { Dashboard } from "./components/pages/Dashboard";
import { LandingPage } from "./components/pages/LandingPage/LandingPage";

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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
