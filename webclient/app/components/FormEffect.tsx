import * as React from "react";
import Color from "../../../neopixelclient/src/canvas/Color";

interface FormProps {
  changeAnimation: (name: string) => void;
  changeColor: (colorName: string, pos: number) => void;
  animationList: Array<string>;
  number: number;
  color1: string;
  color2: string;
}

class FormEffect extends React.Component<FormProps, any> {

  constructor(props: any) {
    super(props);

  }

  onChangeAnimation(event: any) {
    this.props.changeAnimation(event.target.value);
  }

  onChangeColor(colorName: string, pos: number): () => void {
    return () => {
      this.props.changeColor(colorName, pos);
    };
  }

  colorDropdown(pos: number) {

    const colorList = Color.COLORS.map((color: Color, index: number) => {
          let style = {backgroundColor: color.valueString};
          return <li key={color.name} style={style} className={"color-select-" + color.valueString}>
            <a href="#" style={style}
               onClick={this.onChangeColor(color.name, pos)}>{color.name}</a>
          </li>;
        }
    );

    let color;
    if (pos === 1) {
      color = this.props.color1;
    } else {
      color = this.props.color2;
    }
    const style = {backgroundColor: Color.fromName(color).valueString};

    return (
        <div className="btn-group">
          <div className="btn-group">
            <a href="" className="btn btn-default btn-sm dropdown-toggle" style={style} data-toggle="dropdown"
               aria-expanded="false">
              {"color" + pos}
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

        <div className="col-lg-3">

          <legend>Effect {this.props.number}</legend>

          <div className="form-group">
            <label htmlFor="selectEffect1" className="col-lg-2 control-label">Animation</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectEffect1"
                      onChange={(event: any) => this.onChangeAnimation(event)}>
                {animOptions}
              </select>
            </div>
          </div>

          {this.colorDropdown(1)}
          {this.colorDropdown(2)}

        </div>
    );
  }
}

export default FormEffect;