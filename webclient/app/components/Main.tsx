import * as React from "react";
import Axios from "axios";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";
import Form from "./Form";

class Main extends React.Component<any, any> {

  private canvas: CanvasHtml;
  private manualMode: boolean = false;
  private host: string = "http://pi:3000/";
  private animationList: Array<string>;

  constructor(props: any) {
    super(props);

    this.incTicker = this.incTicker.bind(this);
    this.toggleManual = this.toggleManual.bind(this);
    this.getView = this.getView.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeAnimation1 = this.changeAnimation1.bind(this);
    this.changeAnimation2 = this.changeAnimation2.bind(this);

    this.canvas = new CanvasHtml();
    this.canvas.setAnimation1(AnimationFactory.getDefault());
    this.canvas.setAnimation2(undefined);

    this.state = {animation1: AnimationFactory.getDefault()};

    this.animationList = Array.from(AnimationFactory.getAll().map(anim => anim.getName()));
  }

  applyChanges(animJson: any): void {
    console.log(this.state.animation1);
    // Axios.get(this.host + "anim/" + this.state.animation1).then(res => console.log(res));
    Axios.post(this.host + "update", animJson).then(res => console.log(res));
  }

  changeAnimation1(name: string): void {
    this.canvas.setAnimation2(name);
  }

  changeAnimation2(name: string): void {
    this.canvas.setAnimation2(name);
  }

  changeColor(colorId: string, colorIndex: number): void {
    let anim;
    switch (colorId) {
      case "color11":
        anim = this.canvas.getAnimation1();
        if (anim !== undefined) {
          anim.setColor1(colorIndex);
        }
        return;
      case "color12":
        anim = this.canvas.getAnimation1();
        if (anim !== undefined) {
          anim.setColor2(colorIndex);
        }
        return;
      case "color21":
        anim = this.canvas.getAnimation2();
        if (anim !== undefined) {
          anim.setColor1(colorIndex);
        }
        return;
      case "color22":
        anim = this.canvas.getAnimation2();
        if (anim !== undefined) {
          anim.setColor2(colorIndex);
        }
        return;
    }
  }

  incTicker() {
    this.canvas.incTicker();
    Axios.get(this.host + "tick/");
  }

  toggleManual() {
    this.manualMode = !this.manualMode;
    this.canvas.setManual(this.manualMode);
    Axios.get(this.host + "setManual/" + this.manualMode);
  }

  getView() {
    return this.canvas.getView();
  }

  render() {

    return (
        <div>

          <Form changeAnimation1={this.changeAnimation1} changeAnimation2={this.changeAnimation2}
                changeColor={this.changeColor} applyChanges={this.applyChanges}
                animationList={this.animationList} toggleManual={this.toggleManual} incTicker={this.incTicker}/>

          <CanvasComponent getView={this.getView}/>

        </div>
    );
  }
}

export default Main;