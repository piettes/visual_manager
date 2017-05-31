import * as React from "react";
import {Point, Effect1, Animation, Rotation} from "bob";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";

// TODO HSV to hexa
// TODO param for ax
// TODO random rain
// TODO strobo
// TODO
// TODO

class AnimationParameters {
  type: string;
}

class Main extends React.Component<any, any> {

  canvas: any;
  animationParameters: AnimationParameters;
  defaultAnimation: Animation;

  constructor(props: any) {
    super(props);

    this.state = {selectedEffect: "Rotation"};

    this.clicked = this.clicked.bind(this);
    this.toggleManual = this.toggleManual.bind(this);
    this.getView = this.getView.bind(this);
    this.changeEffect = this.changeEffect.bind(this);

    this.canvas = new CanvasHtml();
    this.animationParameters = new AnimationParameters();

    this.defaultAnimation = new Effect1();
  }

  applyChange() {
  }

  changeEffect(event: any) {
    this.animationParameters.type = event.target.value;

    switch (this.animationParameters.type) {
      case "Rotation":
        this.canvas.setAnimation(new Rotation());
        break;
      case "Effect1":
        this.canvas.setAnimation(new Effect1());
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.canvas.setAnimation(this.defaultAnimation);
  }

  clicked() {
    this.canvas.incTicker();
  }

  toggleManual() {
    this.canvas.toggleManual();
  }

  getView() {
    return this.canvas.getView();
  }

  render() {
    return (
        <div>

          <select onChange={this.changeEffect}>
            <option value="Rotation">Rotation</option>
            <option value="Effect1">Effect1</option>
          </select>

          <button onClick={this.applyChange}>Apply</button>

          <br/>

          <button onClick={this.toggleManual}>Toggle manual</button>
          <button onClick={this.clicked}>Step</button>

          <CanvasComponent getView={this.getView}/>

        </div>
    );
  }
}

export default Main;