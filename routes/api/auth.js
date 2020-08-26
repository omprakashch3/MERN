const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../model/User");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//@route        GET api/Auth
//@description  test routes
//@access       public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    // res.json(user);
    res
      .status(200)
      .send({ data: user, status: 200, msg: "user already exists", err: null });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("serevr error");
  }
});

//@route        POST api/auth
//@description  authenticate  user & get token
//@access       public
router.post(
  "/",
  [
    check("email", "include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // see if user already exists
      let user = await User.findOne({ email }); //email:email =email
      if (!user) {
        res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      }

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
          // console.log("token");
          // console.log(token);
          res.send({ token });
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
