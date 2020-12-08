import React from "react";
import Wrapper from "./containers/Wrapper";
import { UserProvider } from "./store/UserContext";
import "./assets/App.scss";

const App = () => (
  <UserProvider>
    <div className="container">
      <h1 className="title">Employees App</h1>
      <div className="wrapper">
        <Wrapper />
      </div>
    </div>
  </UserProvider>
);

export default App;
