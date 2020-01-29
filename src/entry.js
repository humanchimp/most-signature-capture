import {
  runEffects,
  switchLatest,
  startWith,
  map,
  now,
  tap,
  merge,
} from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import { mousedown, mouseup, mousemove } from "@most/dom-event";

const preventDefault = e => {
  e.preventDefault();
};

const action = (name, event, offset) => ({
  action: name,
  event,
  offset,
});

const pen = canvas => {
  const drag = map(beginDrag(canvas), tap(preventDefault, mousedown(canvas)));
  const drop = map(endDrag(), mouseup(canvas));

  return switchLatest(merge(drag, drop));
};

const beginDrag = canvas => event =>
  startWith(
    action("GRAB", event),
    map(e => action("DRAG", e), mousemove(canvas)),
  );

const endDrag = () => event => now(action("DROP", event));

const ink = context => ({ action, event }) => {
  if (action === "GRAB") {
    context.beginPath();
  }
  if (action === "DRAG") {
    context.strokeStyle = "black";
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
  }
};

const canvas = document.querySelector(".pen");

runEffects(
  tap(ink(canvas.getContext("2d")), pen(canvas)),
  newDefaultScheduler(),
);
