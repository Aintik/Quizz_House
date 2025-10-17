const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

const {
  all,
  create,
  del,
  update,
  show,
  preps,
  checking,
  giveCertif,
} = require("../controllers/tests.controller");
const router = express.Router();

/* GET All tests */
router.get("/", all);

//Create test
router.post("/", upload.single("test"), create);

//Delete test by Id
router.delete("/:id", del);

//Update test by Id
router.put("/:id", update);

//Get 30 tests of one subject
router.get("/solve/:subject", preps);

//Checking answers
router.post("/check", checking);
/* Post like this
[
  {
    selected: 'A',
    id: "74747of83810"
  },
  {
    selected: 'B',
    id: "7345ad833450"
  }, ...
]
*/

//Show one test by Id
router.get("/:id", show);

module.exports = router;
