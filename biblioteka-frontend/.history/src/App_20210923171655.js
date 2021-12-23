import React from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Sidebar from "./components/layouts/Sidebar";

const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Sidebar />
        <Header />
      </BrowserRouter>
    </div>
  );
};

export default App;
