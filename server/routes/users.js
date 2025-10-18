const express = require("express");
const router = express.Router();

const {
  all,
  create,
  del,
  update,
  show,
  signIn,
  schooling,
  classing,
  studenting,
  numOfpassed,
  addingCertif,
  giveCertif,
} = require("../controllers/users.controller");
const {authenticate} = require("../middleware/auth")

/* GET All users */
router.get("/", all);

//Create user
router.post("/", create);

//Delete user by token Id
router.delete("/", authenticate, del);

//Update user by Id
router.put("/", authenticate, update);
router.put("/addingCertif", authenticate, addingCertif);

//Giving certificate
router.post("/giveCertif", authenticate, giveCertif);

//Show one user by Id
router.get("/one", authenticate, show);

// Sign in
router.post("/signin", signIn);

// View schools
router.get("/schools", schooling);

// View class
router.get("/schools/:one", classing);

// students of One class
router.get("/schools/:one/:class", studenting);

// get num of pupils of subject
router.get("/black/:one", numOfpassed);

module.exports = router;
