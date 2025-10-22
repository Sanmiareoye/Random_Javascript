import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

function greenHandler(name) {
  console.log("Hello " + name);
}

function goodbyeHandler(name) {
  console.log("Goodbye " + name);
}

// Register event listenenrs
myEmitter.on("greet", greenHandler);
myEmitter.on("goodbye", goodbyeHandler);

// Emit events
myEmitter.emit("greet", "John");
myEmitter.emit("goodbye", "John");

// Error handling
myEmitter.on("error", (err) => {
  console.log("An Error Occured:", err);
});

myEmitter.emit("error", new Error("something went wrong"));
