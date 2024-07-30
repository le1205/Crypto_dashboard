const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");
const uuidv4 = require("uuid").v4;
const path = require("path");
const apiRouter = require("./routes/");
const sequelize = require("./config/database");

const morgan = require("morgan");
require("dotenv").config();

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

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

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", apiRouter);

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Implement real-time updates here
});

const port = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(port, "0.0.0.0", () =>
      console.log(`Server up and running on port ${port} !`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
