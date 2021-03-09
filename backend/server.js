const express = require("express");
const connectDB = require("./config/db");
const http = require("http");

const app = express();

var cors = require("cors");
app.use(cors());

// connect Database
connectDB();
//const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//web socket
const io = require("socket.io")(server);

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RUNNING 1"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/coffee", require("./routes/api/coffee"));
const chat = require("./utils/ChatWebSocket")(io);
//const video = require("./utils/VideoStreamWebSocket")(io);

//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
