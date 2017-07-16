import * as express from "express";
import CanvasNeopixel from "./CanvasNeopixel";
import {Canvas} from "./canvas/Canvas";
import {AnimationFactory} from "./canvas/AnimationFactory";
import {Express} from "express";
import * as bodyParser from "body-parser";

const app: Express = express();

const canvas: Canvas = new CanvasNeopixel();
canvas.setAnimations(AnimationFactory.getDefault(), AnimationFactory.getOff());
canvas.setAnimations(AnimationFactory.getDefault(), AnimationFactory.getOff());

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
  let anim1Obj: any = req.body.anim1 || {};
  let anim1 = AnimationFactory.get(anim1Obj.name);
  if (anim1) {
    anim1.setColor1(anim1Obj.color1);
    anim1.setColor2(anim1Obj.color2);
    anim1.setBpm(parseInt(req.body.bpm));
  }
  let anim2Obj: any = req.body.anim2 || {};
  let anim2 = AnimationFactory.get(anim2Obj.name);
  if (anim2) {
    anim2.setColor1(anim2Obj.color1);
    anim2.setColor2(anim2Obj.color2);
    anim2.setBpm(parseInt(req.body.bpm));
  }

  canvas.setAnimations(anim1, anim2);
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