import * as express from "express";
import CanvasNeopixel from "./CanvasNeopixel";
import {Canvas} from "./canvas/Canvas";

const app = express();

const canvas: Canvas = new CanvasNeopixel();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req: any, res: any) {
  res.send("Hello World!");
});

app.get("/anim/:anim", function (req: any, res: any) {
  console.log("Hello World! " + req.params.anim);
  res.send("Hello World! " + req.params.anim);
});

app.get("/setManual/:bool", function (req: any, res: any) {
  canvas.setManual(req.params.bool === "true");
  res.send("OK");
});

app.get("/tick", function (req: any, res: any) {
  canvas.incTicker();
  res.send("OK");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

process.on("SIGINT", function () {
  canvas.reset();
  process.nextTick(function () {
    process.exit(0);
  });
});

console.log("Press <ctrl>+C to exit.");