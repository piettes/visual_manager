import * as React from "react";
import Axios from "axios";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";
import Form from "./Form";
import {Animation} from "../../../neopixelclient/src/canvas/Animation";

class Main extends React.Component<any, any> {

  private manualMode: boolean = false;
  private host: string;
  private animationList: Array<string>;
  private currentAnimations: Array<Animation>;

  constructor(props: any) {
    super(props);

    this.animationList = Array.from(AnimationFactory.getAll().map(anim => anim.getName()));

    this.currentAnimations = AnimationFactory.getDefaultArray();

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
    this.currentAnimations[0] = AnimationFactory.get(name);
  }

  changeAnimation2(name: string): void {
    this.currentAnimations[1] = AnimationFactory.get(name);
  }

  changeColor(pos: number, id: number, colorName: string): void {
    if (pos === 1) {
      this.currentAnimations[id - 1].setColor1(colorName);
    } else {
      this.currentAnimations[id - 1].setColor2(colorName);
    }
  }

  incTicker() {
    Axios.get(this.host + "tick/");
  }

  toggleManual() {
    this.manualMode = !this.manualMode;
    Axios.get(this.host + "setManual/" + this.manualMode);
  }

  render() {

    return (
        <div>

          <Form changeAnimation1={(name: string) => this.changeAnimation1(name)}
                changeAnimation2={(name: string) => this.changeAnimation2(name)}
                changeColor={(pos: number, id: number, colorName: string) => this.changeColor(pos, id, colorName)}
                applyChanges={(animJson: any) => this.applyChanges(animJson)}
                animationList={this.animationList} toggleManual={() => this.toggleManual()}
                incTicker={() => this.incTicker()}
                flash={(num: number) => this.flash(num)}
                switchAutoColorChange={() => this.switchAutoColorChange()}
          />

        </div>
    );
  }
}

export default Main;