const express = require("express");
const router = express.Router();
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const auth = require("../../middleware/auth");
//@route        GET api/profile/me
//@description  Get current user profile
//@access       private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findone({
      user: req.User.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
