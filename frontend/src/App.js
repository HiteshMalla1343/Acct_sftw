import Background from './components/Background';
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DraggableWindow from "./components/DraggableWindow";
import AccountWindow from "./components/AccountWindow";
import ProductWindow from "./components/ProductWindow";
import CustomerList from "./components/CustomerList";
import ScheduleWindow from "./components/ScheduleWindow";
import StockNumberComponent from "./components/StockEntry"
import { GlobalStateProvider } from './context/GlobalState'; // Path to your GlobalState file

import "./App.css";
import StockEntry from './components/StockEntry';

const windowComponents = {
  "Account": { component: <AccountWindow />, defaultSize: { width: 600, height: 600 } },
  "Product": { component: <ProductWindow />, defaultSize: { width: 600, height: 450 } },
  "Customer List": { component: <CustomerList />, defaultSize: {width: 700 , height:700} },
  "Schedules": { component: <ScheduleWindow />, defaultSize: { width: 600, height: 600 }},
  "Stock Entry" :{component: <StockEntry />, defaultSize: { width: 600, height: 600 }}
  // Add more window components here
};

function adjustBackgroundHeight() {
  const navbar = document.getElementById("navbar");
  const backgroundContainer = document.querySelector(".background-container");
  if (navbar && backgroundContainer) {
    const navbarHeight = navbar.offsetHeight;
    backgroundContainer.style.height = `calc(100vh - ${navbarHeight}px)`;
  }
}

// Adjust on page load and window resize
window.addEventListener("load", adjustBackgroundHeight);
window.addEventListener("resize", adjustBackgroundHeight);
function App() {
  const [activeWindows, setActiveWindows] = useState([]);
  const openWindow = (windowName) => {
    if (!activeWindows.includes(windowName)) {
      setActiveWindows([...activeWindows, windowName]);
    }
  };

  const closeWindow = (windowName) => {
    setActiveWindows(activeWindows.filter((name) => name !== windowName));
  };

  return (
    <GlobalStateProvider>
      <div className="App">
        <div id="navbar" className="navbar-container">
          <Navbar onOpenWindow={openWindow} />
        </div>
        <div className="background-container">
          <Background />
          {activeWindows.map((windowName) => {
            const { component, defaultSize } = windowComponents[windowName];
            return (
                <DraggableWindow
                  key={windowName}
                  title={`${windowName} Window`}
                  onClose={() => closeWindow(windowName)}
                  initialSize={defaultSize}
                  bounds=".background-container" // Restrict movement to the background
                >
                  {component}
                </DraggableWindow>
              );
            })}
        </div>
      </div>  
    </GlobalStateProvider>
  );
}

export default App;


