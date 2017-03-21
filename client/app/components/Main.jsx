import React from "react";
import Canvas from "../Canvas";
import Ax from "../Ax";

// TODO HSV to hexa
// TODO param for ax
// TODO random rain
// TODO strobo
// TODO
// TODO

class Main extends React.Component {

  canvas;

  constructor(props) {
    super(props);

    this.clicked = this.clicked.bind(this);
    this.toggleManual = this.toggleManual.bind(this);

    this.canvas = new Canvas();
  }

  componentDidMount() {
    this.refs.myCanvas.appendChild(this.canvas.getView());

    this.canvas.setAnimation(new Ax());
  }

  clicked() {
    this.canvas.incTicker();
  }

  toggleManual() {
    this.canvas.toggleManual();
  }


  render() {
    return (
        <div>

          <button onClick={this.toggleManual}>Toggle manual</button>
          <button onClick={this.clicked}>Step</button>
          <div ref="myCanvas"/>

        </div>
    )
  }
}

export default Main;