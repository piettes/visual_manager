import * as React from "react";
import {AnimationFactory} from "../../../neopixelclient/src/canvas/AnimationFactory";
import Color from "../../../neopixelclient/src/canvas/Color";
import {AnimationBase} from "../../../neopixelclient/src/canvas/AnimationBase";

interface FormProps {
  changeAnimation1: (name: string) => void;
  changeAnimation2: (name: string) => void;
  changeColor: (colorId: string, colorName: string) => void;
  changeBpm: (bpm: number) => void;
  animationList: Array<string>;
  applyChanges: (animJson: any) => void;
  toggleManual: () => void;
  incTicker: () => void;
  stopPreview: () => void;
}

class Form extends React.Component<FormProps, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      color11: "purple", color12: "purple", color21: "purple", color22: "purple",
      animation1: AnimationFactory.getDefault().getName(), animation2: AnimationFactory.getOff().getName(),
      bpm: AnimationBase.DEFAULT_BPM
    };
  }

  onChangeAnimation1(event: any) {
    this.setState({animation1: event.target.value});
    this.props.changeAnimation1(event.target.value);
  }

  onChangeAnimation2(event: any) {
    this.setState({animation2: event.target.value});
    this.props.changeAnimation2(event.target.value);
  }

  onChangeColor(colorId: string, colorName: string): () => void {
    return () => {
      this.setState({[colorId]: colorName});
      this.props.changeColor(colorId, colorName);
    };
  }

  onChangeBpm(event: any) {
    let val: number = event.target.value;
    if (val > 250) {
      val = 250;
    }
    if (val < 0) {
      val = 0;
    }
    this.setState({bpm: val});
    this.props.changeBpm(val === 0 ? 1 : val);
  }

  onBpmPlus() {
    if (this.state.bpm === "") {
      this.setState({bpm: 1});
    } else if (this.state.bpm < 250) {
      this.setState({bpm: parseInt(this.state.bpm) + 1});
    }
  }

  onBpmMinus() {
    if (this.state.bpm === "") {
      this.setState({bpm: 1});
    } else if (this.state.bpm > 1) {
      this.setState({bpm: parseInt(this.state.bpm) - 1});
    }
  }

  applyChanges() {
    this.props.applyChanges(this.buildAnimJson());
  }

  buildAnimJson(): any {
    let res: any = {};
    if (this.state.animation1) {
      let anim1: any = {};
      anim1.name = this.state.animation1;
      anim1.color1 = this.state.color11;
      anim1.color2 = this.state.color12;
      res.anim1 = anim1;
    }
    if (this.state.animation2) {
      let anim2: any = {};
      anim2.name = this.state.animation2;
      anim2.color1 = this.state.color21;
      anim2.color2 = this.state.color22;
      res.anim2 = anim2;
    }
    res.bpm = this.state.bpm ? this.state.bpm : 1;

    return res;
  }

  colorDropdown(colorId: string) {

    const colorList = Color.COLORS.map((color: Color, index: number) => {
          let style = {backgroundColor: color.valueString};
          return <li key={color.name} style={style} className={"color-select-" + color.valueString}>
            <a href="#" style={style}
               onClick={this.onChangeColor(colorId, color.name)}>{color.name}</a>
          </li>;
        }
    );

    const style = {backgroundColor: Color.fromName(this.state[colorId]).valueString};

    return (
        <div className="btn-group">
          <div className="btn-group">
            <a href="" className="btn btn-default btn-sm dropdown-toggle" style={style} data-toggle="dropdown"
               aria-expanded="false">
              {colorId}
            </a>
            <ul className="dropdown-menu">
              {colorList}
            </ul>
          </div>
        </div>
    );
  }

  render() {

    const animOptions = this.props.animationList.map((anim: string) =>
        <option key={anim} value={anim}>{anim}</option>
    );

    return (
        <div className="container">

          <form className="form-horizontal">

            <fieldset>

              <div className="row">
                <div className="col-lg-4">

                  <legend>Effect 1</legend>

                  <div className="form-group">
                    <label htmlFor="selectEffect1" className="col-lg-2 control-label">Animation</label>
                    <div className="col-lg-10">
                      <select className="form-control" id="selectEffect1" onChange={(event: any) => this.onChangeAnimation1(event)}>
                        {animOptions}
                      </select>
                    </div>
                  </div>

                  {this.colorDropdown("color11")}
                  {this.colorDropdown("color12")}

                </div>

                <div className="col-lg-4">

                  <legend>Effect 2</legend>

                  <div className="form-group">
                    <label htmlFor="selectEffect2" className="col-lg-2 control-label">Animation</label>
                    <div className="col-lg-10">
                      <select className="form-control" id="selectEffect2" onChange={(event: any) => this.onChangeAnimation2(event)}>
                        {animOptions}
                      </select>
                    </div>
                  </div>

                  {this.colorDropdown("color21")}
                  {this.colorDropdown("color22")}

                </div>

              </div>

              <br/>

              <div className="row">
                <div className="col-lg-3">

                  <div className="form-group">
                    <label htmlFor="bpm" className="col-lg-2 control-label">BPM</label>
                    <div className="input-group col-lg-2">
                      <input type="number" className="form-control" id="bpm" onChange={(event: any) => this.onChangeBpm(event)}
                             value={this.state.bpm}/>
                      <span className="input-group-btn">
                          <button className="btn btn-default btn-xs my-plus-button" onClick={() => this.onBpmPlus()}
                                  type="button">+</button>
                        <br/>
                          <button className="btn btn-default btn-xs my-minus-button" onClick={() => this.onBpmMinus()}
                                  type="button">-</button>
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </fieldset>
          </form>

          <br/>

          <button className="btn btn-sm btn-primary" onClick={() => this.applyChanges()}>Apply</button>
          <br/>
          <br/>
          <button className="btn btn-sm btn-default" onClick={this.props.toggleManual}>Toggle manual</button>
          <button className="btn btn-sm btn-default" onClick={this.props.incTicker}>Step</button>
          <button className="btn btn-sm btn-default" onClick={() => this.props.stopPreview()}>Stop preview</button>
        </div>
    );

  }

}

export default Form;