const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cookieSession = require("cookie-session");
const cors = require("cors");
const { FRONTEND_URL } = process.env;
require("./db.js");

const dotenv = require('dotenv');

dotenv.config();

const server = express();

server.name = "API";

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://shoppingonline-production.up.railway.app',
  // Add any other origins you want to allow
];

// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: "GET, POST, OPTIONS, PUT, DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
};

server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use(cookieParser());
server.use(morgan("dev"));

server.use(
  cookieSession({
    name: "FOOD-API",
    secret: process.env.COOKIE_SECRET, // Crear variable
    httpOnly: false,
    sameSite: "strict",
    secure: false
  })
);

// para acceder a info sensible primero verificar el id desde la galleta req.session.userId
// if (!req.session.userId) {
//   throw new Error("not authenticated");
// }

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
