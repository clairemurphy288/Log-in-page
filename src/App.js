import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login.js";
import Admin from "./components/admin-page/admin.js"
import Edit from "./components/admin-page/edit-quizzes-admin"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/admin" element = {<Admin/>}/>
      <Route path='/edit/:query/:page' element={<Edit/>}/>
      </Routes>
    </Router>
 
  );
}

export default App;
