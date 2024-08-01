const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const http = require("http");
const WebSocket = require("ws");
const uuidv4 = require("uuid").v4;
const path = require("path");
const apiRouter = require("./routes/");
const sequelize = require("./config/database");

const morgan = require("morgan");
require("dotenv").config();

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(morgan("tiny"));

// Register public directory
app.use("/static", express.static(path.join(__dirname, "public")));

//session
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Add WebSocket CORS handling
wss.on("headers", (headers, req) => {
  headers.push("Access-Control-Allow-Origin: http://localhost:3000");
});

app.use(express.static(path.join(__dirname, "public")));

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Web-socket-working");

  ws.on("message", (message) => {
    console.log("Received:", message);
    // Handle incoming messages if needed
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Broadcast function for sending updates to all clients
function broadcastUpdate(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Make broadcastUpdate available to your routes
app.set("broadcastUpdate", broadcastUpdate);

// Routes
app.use("/", apiRouter);

const port = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    server.listen(port, "0.0.0.0", () =>
      console.log(`Server up and running on port ${port} !`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
