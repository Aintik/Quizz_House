const Admins = require("../model/Admin");

//Get all
const all = async (req, res) => {
  const data = await Admins.find({});
  res.json({ massage: "All admins", data }).status(201);
};

//Create
const create = async (req, res) => {
  Admins.create(req.body).then((data) => {
    res.json({ message: "Admin craeted", data }).status(201);
  });
};

//Delete by id
const del = async (req, res, next) => {
  const data = await Admins.findByIdAndDelete(req.params.id);
  res.json({ massage: "Admin deleted", data }).status(201);
};

//Update admin by Id
const update = async (req, res) => {
  const data = await Admins.findByIdAndUpdate(req.params.id, req.body);
  res.json({ massage: "Admin updated", data }).status(201);
}

//Show one admin by Id
const show = async (req, res, next) => {
  const data = await Admins.findById(req.params.id);
  res.json({ massage: "Admin was found", data }).status(201);
};

module.exports = {
  all,
  create,
  del,
  update,
  show
}