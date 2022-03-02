import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateDepartment from "./components/Department/CreateDepartment";
import Department from "./components/Department/Department";
import CreateEmployee from "./components/Employee/CreateEmployee";
import Employees from "./components/Employee/Employees";
import Home from "./components/Home/Home";
import Topbar from "./components/Navbar/Topbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/create-department" element={<CreateDepartment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
