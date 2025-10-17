const express = require("express");
const { all, create, del, update, show } = require("../controllers/admins.controller");
const router = express.Router();


/* GET All admins */
router.get("/", all);

//Create admin
router.post("/", create);

//Delete admin by Id
router.delete("/:id", del);

//Update admin by Id
router.put("/:id", update);

//Show one admin by Id
router.get("/:id", show);



module.exports = router;