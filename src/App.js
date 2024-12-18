import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employee from "./Employee";
import Dataf from "./Dataf";
class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* Route for HomePage */}
          <Route path="/" element={<Employee />} />

          {/* Route for Employees page */}
          <Route path="/getdata" element={<Dataf />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
