const express = require("express");
const router = express.Router();

//@route        GET api/profile
//@description  test routes
//@access       public
router.get("/", (req, res) => {
  res.send("Profile routes...");
});

module.exports = router;