const express = require('express');
// add profile picture
const upload = require('../../middleware/multer');
const { signup, signin } = require('./userControllers')
const passport = require('passport')

const router = express.Router();

router.param('userId', async (req, res, next, userId) => {
    const user = await fetchUser(userId, next);
    if (user) {
      req.user = user;
      next();
    } else {
      const err = new Error('user Not Found');
      err.status = 404;
      next(err);
    }
  });

router.post('/signup', signup);
router.post(
  '/signin',
  passport.authenticate("local", { session: false }),
  signin
)

module.exports = router;