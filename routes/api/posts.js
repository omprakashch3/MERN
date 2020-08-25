const express = require("express");
const router = express.Router();

//@route        GET api/Posts
//@description  test routes
//@access       public
router.get("/", (req, res) => {
  res.send("Posts routes...");
});

module.exports = router;
