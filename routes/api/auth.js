const express = require("express");
const router = express.Router();

//@route        GET api/Auth
//@description  test routes
//@access       public
router.get("/", (req, res) => {
  res.send("Auth routes...");
});

module.exports = router;
