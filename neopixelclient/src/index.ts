import * as express from "express";
import CanvasNeopixel from "./CanvasNeopixel";
import {Canvas} from "./canvas/Canvas";
import {AnimationFactory} from "./canvas/AnimationFactory";
import {Express} from "express";
import * as bodyParser from "body-parser";

const app: Express = express();

const canvas: Canvas = new CanvasNeopixel();
canvas.setAnimation(AnimationFactory.getDefault());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.get("/", function (req: any, res: any) {
  res.send("Hello World!");
});

app.get("/anim/:anim", function (req: any, res: any) {
  console.log("Changing Animation to " + req.params.anim);
  canvas.setAnimation(req.params.anim);
  res.send("Changing Animation to " + req.params.anim);
});

app.post("/update", function (req: any, res: any) {
  console.log(req.params);
  console.log(req.body);
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