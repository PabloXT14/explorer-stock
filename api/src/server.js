require("express-async-errors");
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const AppError = require("./utils/AppError");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.ENABLED_CORS.split(";") ?? ["*"],
  credentials: true,// to working with cookies
}));

app.use(routes);

app.use((err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
  
    console.error(err);
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));