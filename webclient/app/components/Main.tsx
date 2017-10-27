import * as React from "react";
import Axios from "axios";
import CanvasComponent from "./CanvasComponent";
import CanvasHtml from "../CanvasHtml";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";
import Form from "./Form";

class Main extends React.Component<any, any> {

  private canvas: CanvasHtml;
  private manualMode: boolean = false;
  private host: string;
  private animationList: Array<string>;

  constructor(props: any) {
    super(props);

    // this.canvas = new CanvasHtml();
    // this.canvas.setAnimations(AnimationFactory.getDefault(), AnimationFactory.getOff());

    this.animationList = Array.from(AnimationFactory.getAll().map(anim => anim.getName()));

    this.host = props.hostUrl;
  }

  applyChanges(animJson: any): void {
    Axios.post(this.host + "update", animJson).then(res => console.log(res));
  }

  flash(num: number): void {
    Axios.post(this.host + "flash", {num: num}).then(res => console.log(res));
  }

  switchAutoColorChange(): void {
    Axios.post(this.host + "switchAutoColorChange").then(res => console.log(res));
  }

  changeAnimation1(name: string): void {
    // this.canvas.setAnimation1(AnimationFactory.get(name));
  }

  changeAnimation2(name: string): void {
    // this.canvas.setAnimation2(AnimationFactory.get(name));
  }

  changeColor(colorId: string, colorName: string): void {
    // this.canvas.setColor(colorId, colorName);
  }

  changeBpm(bpm: number) {
    // this.canvas.setBpm(bpm);
  }

  incTicker() {
    // this.canvas.incTicker();
    Axios.get(this.host + "tick/");
  }

  toggleManual() {
    this.manualMode = !this.manualMode;
    // this.canvas.setManual(this.manualMode);
    Axios.get(this.host + "setManual/" + this.manualMode);
  }

  stopPreview() {
    // this.canvas.setManual(true);
  }

  getView() {
    // return this.canvas.getView();
  }

  render() {

    return (
        <div>

          <Form changeAnimation1={(name: string) => this.changeAnimation1(name)}
                changeAnimation2={(name: string) => this.changeAnimation2(name)}
                changeColor={(colorId: string, colorName: string) => this.changeColor(colorId, colorName)}
                applyChanges={(animJson: any) => this.applyChanges(animJson)}
                animationList={this.animationList} toggleManual={() => this.toggleManual()}
                incTicker={() => this.incTicker()}
                changeBpm={(bpm: number) => this.changeBpm(bpm)}
                stopPreview={() => this.stopPreview()}
                flash={(num: number) => this.flash(num)}
                switchAutoColorChange={() => this.switchAutoColorChange()}
          />

          <CanvasComponent getView={() => this.getView()}/>

        </div>
    );
  }
}

export default Main;