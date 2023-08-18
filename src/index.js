import React from "react";
import ReactDOM from "react-dom/client";
import { TaskProvider } from "./Componentes/Context/Context";
import "./index.css";
import Main from "./Main";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TaskProvider>
    <Main />
  </TaskProvider>
);
