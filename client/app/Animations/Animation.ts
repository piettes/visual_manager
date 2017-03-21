

interface Animation {

  animate:(frame: any, theta: any) => void;

  resetTick:(tick: number) => number;

}

export default Animation;