var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("Check console for custom logger");
});
module.exports = router;
