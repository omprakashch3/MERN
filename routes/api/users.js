const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

//@route        POST api/Users
//@description  register user
//@access       public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Users routes...");
  }
);

module.exports = router;
