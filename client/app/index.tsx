import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.css";

declare let process: any;
let hostUrl = process.env !== undefined ? process.env.host : '';

ReactDOM.render(
    <Main hostUrl={hostUrl}/>,
    document.getElementById('app')
);
