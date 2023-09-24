import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Devices from "./pages/Devices/Devices";

import Industries from "./pages/Industries/Industries";

function App() {
  const [openDevices, setDevices] = useState(true);
  const [openIndustry, setIndustries] = useState(false);

  function showDevices() {
    setDevices(true);
    setIndustries(false);
  }

  function showIndustries() {
    setIndustries(true);
    setDevices(false);
  }

  return (
    <>
      <div className="App">
        <h1>IoT App - MERN STACK</h1>
        <div className="view-selection-div">
          <button
            className="view-button active-button"
            onClick={() => showDevices()}
          >
            Devices Page
          </button>
          <button
            data-testid="openIndustryTab"
            className="view-button active-button"
            onClick={() => showIndustries()}
          >
            Industry Page
          </button>
        </div>
        {openDevices & !openIndustry ? <Devices /> : <Industries />}
      </div>
    </>
  );
}

export default App;
