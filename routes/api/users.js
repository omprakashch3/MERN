const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
// accesing models
const User = require("../../model/User");

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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // see if user already exists
      let user = await User.findOne({ email }); //email:email =email
      if (user) {
        res.status(400).json({ errors: [{ msg: "user already exist" }] });
      }

      // get user gravatar
      const avatar = gravatar.url(email, {
        s: "200", //string of 200
        r: "pg", //can't have sensentive images
        d: "mm", //default img
      });
      user = new User({
        //creating an instance of the user
        name,
        email,
        avatar,
        password,
      });

      // encrypt password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return json web token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      res.send("User Registered...");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
