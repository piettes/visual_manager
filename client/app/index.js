import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main.jsx";
import "bootstrap/dist/css/bootstrap.css";

let hostUrl = process.env !== undefined ? process.env.host : '';

ReactDOM.render(
    <Main hostUrl={hostUrl}/>,
    document.getElementById('app')
);
