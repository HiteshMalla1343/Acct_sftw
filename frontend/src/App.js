import Background from './components/Background';
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import DraggableWindow from "./components/DraggableWindow";
import AccountWindow from "./components/AccountWindow";
import ProductWindow from "./components/ProductWindow";
import CustomerList from "./components/CustomerList";
import ScheduleWindow from "./components/ScheduleWindow";
import StockEntry from './components/StockEntry';
import { GlobalStateProvider } from './context/GlobalState'; // Path to your GlobalState file

import "./App.css";


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
  const [focusedWindow, setFocusedWindow] = useState(null);

  const openWindow = (windowName) => {
    if (!activeWindows.includes(windowName)) {
      setActiveWindows([...activeWindows, windowName]);
      setFocusedWindow(windowName);
    }
  };

  const closeWindow = (windowName) => {
    setActiveWindows(activeWindows.filter((name) => name !== windowName));
    if (focusedWindow === windowName) {
      setFocusedWindow(activeWindows.length > 1 ? activeWindows[0] : null);
    }
  };

  const windowRefs = {
    "Account": useRef(null),
    "Product": useRef(null),
    "Customer List": useRef(null),
    "Schedules": useRef(null),
    "Stock Entry": useRef(null),
  };

  // Define handleKeyDown outside to avoid ESLint error
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && focusedWindow) {
      const ref = windowRefs[focusedWindow];
      if (ref && ref.current) {
        ref.current?.handleSave();
      }
    }
  };

  // Focus handler to set focused window
  const handleWindowFocus = (windowName) => {
    setFocusedWindow(windowName); // Bring clicked window to focus
  };

  // Cleanup keydown event listener when the component is unmounted or focusedWindow changes
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedWindow]); // Re-run this effect when focusedWindow changes

  const windowComponents = {
    "Account": { component: <AccountWindow ref={windowRefs["Account"]} />, defaultSize: { width: 600, height: 600 } },
    "Product": { component: <ProductWindow ref={windowRefs["Product"]} />, defaultSize: { width: 600, height: 600 } },
    "Customer List": { component: <CustomerList ref={windowRefs["Customer List"]} />, defaultSize: { width: 700, height: 700 } },
    "Schedules": { component: <ScheduleWindow ref={windowRefs["Schedules"]} />, defaultSize: { width: 600, height: 600 } },
    "Stock Entry": { component: <StockEntry ref={windowRefs["Stock Entry"]} />, defaultSize: { width: 1000, height: 600 } }
  };

  return (
    <GlobalStateProvider>
      <div className="App">
        <div id="navbar" className="navbar-container">
          <Navbar onOpenWindow={openWindow} />
        </div>
        <div className="background-container">
          <Background />
          {activeWindows.map((windowName, index) => {
            const { component, defaultSize } = windowComponents[windowName];
            return (
              <DraggableWindow
                key={windowName}
                title={`${windowName} Window`}
                onClose={() => closeWindow(windowName)}
                onFocus={() => handleWindowFocus(windowName)} // Focus event to trigger handleKeyDown
                initialSize={{ ...defaultSize, zIndex: focusedWindow === windowName ? 5 + index : index }}
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
