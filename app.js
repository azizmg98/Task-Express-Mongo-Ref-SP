const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const productRoutes = require("./api/products/productRoutes");
const shopRoutes = require('./api/shops/shopRoutes')
const userRoutes = require('./api/users/userRoutes')
require('dotenv').config
const passport = require('passport')
const { localStrategy } = require('./middleware/passport')

const app = express();
connectDb();

// .config can be called in import -> require('dotenv').config
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

passport.use(localStrategy)

// log url requests
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/users", userRoutes);

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
