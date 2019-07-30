import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Item from "./components/Item";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/home" component={Homepage} />
        <Route path="/prices/" component={Item} />
      </div>
    </Router>
  );
}

export default App;
