const express = require("express");
const router = express.Router();

//@route        GET api/Users
//@description  test routes
//@access       public
router.get("/", (req, res) => {
  res.send("Users routes...");
});

module.exports = router;
