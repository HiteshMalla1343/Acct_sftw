import Background from './components/Background';
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DraggableWindow from "./components/DraggableWindow";
import AccountWindow from "./components/AccountWindow";
import ProductWindow from "./components/ProductWindow";
import CustomerList from "./components/CustomerList";
import "./App.css";

const windowComponents = {
  "Account": { component: <AccountWindow />, defaultSize: { width: 600, height: 600 } },
  "Product": { component: <ProductWindow />, defaultSize: { width: 600, height: 450 } },
  "Customer List": { component: <CustomerList />, defaultSize: {width: 700 , height:700} },
  // Add more window components here
};

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
    <div className="App">
      <Navbar onOpenWindow={openWindow} />
      <Background />
      {activeWindows.map((windowName) => {
      console.log(windowName);
      const { component, defaultSize } = windowComponents[windowName];
      return (
        <DraggableWindow
          key={windowName}
          title={`${windowName} Window`}
          onClose={() => closeWindow(windowName)}
          initialSize={defaultSize}
        >
          {component}
        </DraggableWindow>
      );
    })}
    </div>
  );
}

export default App;


