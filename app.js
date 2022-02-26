const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const productsRoutes = require("./api/products/productRoutes");
const shopsRoutes = require('./api/shops/shopRoutes')
require('dotenv').config

const app = express();
connectDb();

// .config can be called in import -> require('dotenv').config
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log url requests
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/shops", shopsRoutes);

// error handling 
// how does the error handling work exactly
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT,
 () => {console.log(`Listening to port ${PORT}`)}
);
