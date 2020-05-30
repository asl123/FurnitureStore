import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";
//import { MyForm } from "./component/formFormik";
import { App } from "./component/formFormikYup";
import A122 from "./component/A122";
import { BrowserRouter } from "react-router-dom";
import FurnMain from "./component/furnMain";
ReactDOM.render(
  <BrowserRouter>
    <FurnMain />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
