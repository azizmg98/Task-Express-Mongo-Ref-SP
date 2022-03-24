const express = require("express");
// add profile picture
const upload = require("../../middleware/multer");
const { signup, signin, getUsers } = require("./userControllers");
const passport = require("passport");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/", getUsers);

module.exports = router;
