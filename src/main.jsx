import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Form from "./Form";
import Search from "./Search";
import Result from "./Result";
import "./index.css";
import { BrowserRouter as Router, Route, Routes ,Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import Footer from "./Footer";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Header/>
    <ToastContainer />
    <Routes>
      <Route exact path="/" element={<Navigate to ="/profile"/>} />
      <Route path="/profile" exact element={<Form />} />
      <Route path="/profile/:profile" exact element={<Result />} />
      <Route path="/search" exact element={<Search />} />
      <Route path="/search/:profile" exact element={<Result />} />
    </Routes>
    <Footer/>

    {/* <App /> */}
  </Router>
);
