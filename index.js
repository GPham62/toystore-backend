const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config-local.json");
const cors = require("cors");

const app = express();

const productRouter = require("./modules/api/products/router");
const userRouter = require("./modules/api/users/router");
const authRouter = require("./modules/api/auth/router");

app.use(cors({origin: true, credentials: true}));

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );

  if (req.headers.origin) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(express.static('./public'));

app.get('/', (req,res) => {
  res.sendFile('./public/index.html');
});

mongoose.connect(config.mongoPath,{ useNewUrlParser: true }, err => {
  if (err) console.error(err);
  else console.log("Database connect successful");
});

const port = process.env.PORT || 6969;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});
