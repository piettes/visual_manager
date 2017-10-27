import * as express from "express";
import CanvasNeopixel from "./CanvasNeopixel";
import {Canvas} from "./canvas/Canvas";
import {AnimationFactory} from "./canvas/AnimationFactory";
import {Express} from "express";
import * as bodyParser from "body-parser";
import {Animation} from "./canvas/Animation";

const app: Express = express();

const canvas: Canvas = new CanvasNeopixel();
canvas.setAnimations(AnimationFactory.getDefaultArray());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get("/", function (req: any, res: any) {
  res.send("Hello World!");
});

app.post("/update", function (req: any, res: any) {
  console.log(req.body);
  const anims: Array<Animation> = [];
  for (let i = 1; i < 5; i++) {
    let animObj: any = req.body["anim" + i] || {};
    let anim: Animation = AnimationFactory.get(animObj.name);
    if (anim) {
      anim.setColor1(animObj.color1);
      anim.setColor2(animObj.color2);
      anim.setBpm(parseInt(req.body.bpm));
      anim.setPatternLength(parseInt(animObj.patternLength));
      anim.setLuminosity(parseInt(animObj.luminosity));
      anims.push(anim);
    } else {
      anims.push(AnimationFactory.getOff());
    }
  }
  canvas.setAnimations(anims);
  res.send("Ok");
});

app.post("/flash", function (req: any, res: any) {
  let num: any = req.body["num"];
  canvas.flash(num);
  res.send("Ok");
});

app.post("/switchAutoColorChange", function (req: any, res: any) {
  canvas.switchAutoColorChange();
  console.log("switchAutoColorChange: " + canvas.getAutoColorChange());
  res.send("Ok");
});

app.get("/setManual/:bool", function (req: any, res: any) {
  canvas.setManual(req.params.bool === "true");
  res.send("Set manual " + req.params.bool);
});

app.get("/tick", function (req: any, res: any) {
  canvas.incTicker();
  res.send("Ticked");
});

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});

process.on("SIGINT", function () {
  canvas.reset();
  process.nextTick(function () {
    process.exit(0);
  });
});

console.log("Press <ctrl>+C to exit.");