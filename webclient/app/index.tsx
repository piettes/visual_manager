import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";

import * as jQuery from "jquery";

declare global {
  interface Window { jQuery: any;
    $: any;
  }
}

window.jQuery = jQuery || {};

import "bootstrap";

import "bootswatch/paper/bootstrap.css";

import "../resources/css/custom.css";

declare let process: any;
let hostUrl = process.env !== undefined ? process.env.HOST : "";

ReactDOM.render(
    <Main hostUrl={hostUrl}/>,
    document.getElementById("app")
);
