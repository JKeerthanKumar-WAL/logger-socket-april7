const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 3001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIo(server, { cors: { original: "*" } });
let interval;
io.on("connection", (socket) => {
  console.log("New socket client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiandEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
const getApiandEmit = (socket) => {
  const response = new Date();
  socket.emit("GetTime", response.toLocaleTimeString());
};
