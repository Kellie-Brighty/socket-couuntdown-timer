const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 1997;
const io = require("socket.io")(server, {
  cors: {
    origin: true,
  },
});
const cors = require("cors");

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

app.use(cors({ origin: "*" }));

const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

let countdown;

let interval;

const runTimer = async () => {
  const duration = 600;
  var timer = duration,
    minutes,
    seconds;
  interval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdown = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration - 1;
    }
  }, 1000);

};
runTimer();

// console.log("Global countdown>>>", countdown)



// Here's the begining of the socket connection
io.on("connection", (socket) => {
  console.log("New client connected");
  // if (interval) {
    //   clearInterval(interval);
    // }
    
    socket.emit("countdown", countdown);

  // console.log("Countdown>>>", countdown);
  // console.log("Interval>>>", interval);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// function startTimer(duration, display) {
//   var timer = duration,
//     minutes,
//     seconds;
//   setInterval(function () {
//     minutes = parseInt(timer / 60, 10);
//     seconds = parseInt(timer % 60, 10);

//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     display.textContent = minutes + ":" + seconds;

//     if (--timer < 0) {
//       timer = duration - 1;
//     }
//   }, 1000);
// }

// window.onload = function () {
//   var sixtySecs = 60,
//     display = document.querySelector("#sixtySecs");
//   startTimer(sixtySecs, display);

//   var threeMinute = 60 * 3,
//     display = document.querySelector("#threeMinute");
//   startTimer(threeMinute, display);

//   var fiveMinute = 60 * 5,
//     display = document.querySelector("#fiveMinute");
//   startTimer(fiveMinute, display);
// };
