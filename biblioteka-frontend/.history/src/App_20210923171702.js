import React from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/";

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
