import React from "react";
import Canvas from "../Canvas";
import Rotation from "../Animations/Rotation";

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

    this.state = {selectedEffect : "Rotation"};

    this.clicked = this.clicked.bind(this);
    this.toggleManual = this.toggleManual.bind(this);
    this.changeEffect = this.changeEffect.bind(this);

    this.canvas = new Canvas();
  }

  componentDidMount() {
    this.refs.myCanvas.appendChild(this.canvas.getView());

    this.canvas.setAnimation(new Rotation());
  }

  clicked() {
    this.canvas.incTicker();
  }

  toggleManual() {
    this.canvas.toggleManual();
  }

  changeEffect(event) {
    console.log(event.target.value);
    this.setState({selectedEffect: event.target.value});
  }

  applyChange() {

  }

  render() {
    console.log("rerender");
    return (
        <div>

          <select onChange={this.changeEffect} value={this.state.selectedEffect}>
            <option value="Effect1">Effect1</option>
            <option value="Rotation">Rotation</option>
          </select>

          <button onClick={this.applyChange}>Apply</button>
          <br/>

          <button onClick={this.toggleManual}>Toggle manual</button>
          <button onClick={this.clicked}>Step</button>
          <div ref="myCanvas"/>

        </div>
    )
  }
}

export default Main;