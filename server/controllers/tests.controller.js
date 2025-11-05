const Tests = require("../model/Test");
const path = require("path");
const fs = require("fs");


//Get all
const all = async (req, res) => {
  const data = await Tests.find({});
  res.json({ massage: "All tests", data }).status(201);
};

//Create
const create = async (req, res) => {
  const fileRoute = req.file?.path;
  const subject = req.body.sub;
  let massage = "done";

  if (req.file?.originalname) {
    fs.readFile(fileRoute, "utf8", async (err, data) => {
      if (err) throw err;
      let obj = { ...JSON.parse(data), subject };
      const test = await Tests.create(obj);
      fs.unlinkSync(fileRoute);
      console.log(test);
    });
  } else massage = "no file";
  res.json({ massage }).status(201);
};
/* JSON like this
{
    "question": "What is 1",
    "options":[
        "its 2",
        "its 1",
        "its 21",
        "its 3"
    ],
    "answer": "B",
    "dificulty": 1-10
}
*/

//Delete by id
const del = async (req, res) => {
  const data = await Tests.findByIdAndDelete(req.params.id);
  res.json({ massage: "Test deleted", data }).status(201);
};

//Update admin by Id
const update = async (req, res) => {
  const data = await Tests.findByIdAndUpdate(req.params.id, req.body);
  res.json({ massage: "Test updated", data }).status(201);
};

//Show one admin by Id
const show = async (req, res) => {
  const data = await Tests.findById(req.params.id);
  res.json({ massage: "Test was found", data }).status(201);
};

//Get 30 tests of one subject
const preps = async (req, res) => {
  const all = await Tests.find({ subject: req.params.subject });
  all.sort((a, b) => {
    0.5 - Math.random();
  });
  const first30 = all.slice(0, 30);
  res.json({ massage: "30 tests", first30 }).status(201);
};

//Checking answers
const checking = async (req, res) => {
  async function check(data) {
    let correct = [];
    let id = data.map((item) => {
      return item.id;
    });
    let Data = await Tests.find({ _id: { $in: id } }, "answer");

    data.map((item) => {
      Data.map((obj) => {
        if (item.id == obj.id) {
          correct.push(item.selected == obj.answer);
        }
      });
    });
    return correct;
  }

  const checking = await check(req.body);

  res.json({ massage: "Carrects", checking }).status(201);
};



module.exports = {
  all,
  create,
  del,
  update,
  show,
  preps,
  checking,
};
