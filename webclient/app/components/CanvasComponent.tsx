import * as React from "react";

interface CanvasComponentProps {
  getView: () => any;
}

class CanvasComponent extends React.Component<CanvasComponentProps, any> {

  constructor(props: CanvasComponentProps) {
    super(props);
  }

  componentDidMount() {
    let myCanvas: any = this.refs.myCanvas;
    myCanvas.appendChild(this.props.getView());
  }

  render() {
    return <div ref="myCanvas"/>
  }
}

export default CanvasComponent;
