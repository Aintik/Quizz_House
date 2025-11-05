const Users = require("../model/User");
const { generateToken } = require("../config/jwt.js");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const PDFDocument = require("pdfkit");

//Get all
const all = async (req, res, next) => {
  const data = await Users.find({});
  res.json({ massage: "All users", data }).status(201);
};

//Create
const create = async (req, res, next) => {
  const emailed = await Users.findOne({ email: req.body.email });
  if (emailed) res.json({ message: "email already exists" }).status(403);
  else {
    await bcrypt.hash(
      req.body.password,
      10,
      function (err, hash) {
        if (err) throw err;
        Users.create({ ...req.body, password: hash }).then((data) => {
          res.json({ message: "User craeted", data }).status(201);
        });
      }
    );
  }
};

//Delete by id
const del = async (req, res, next) => {
  const data = await Users.findByIdAndDelete(req.user.id);
  res.json({ massage: "User deleted", data }).status(201);
};

//Update admin by Id
const update = async (req, res, next) => {
  let hash;
  let pasChanged = true;
  if (req.body.password) {
    const user = await Users.findById(req.user.id, "password");
    console.log(user.password);
    const result = await bcrypt.compare(req.body.checkPassword, user.password);
    if (result) {
      hash = await bcrypt.hash(req.body.password, 10);
    } else pasChanged = false;
  }
  const data = await Users.findByIdAndUpdate(req.user.id, {
    ...req.body,
    password: hash,
  });
  res.json({ massage: "User updated", data, pasChanged }).status(201);
};

//Sign in
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const data = await Users.findOne({ email });

  let mes, token;
  if (data) {
    const result = await bcrypt.compare(password, data.password);
    if (result) {
      mes = "U r logged";
      token = generateToken({ id: data.id });
    } else mes = "Password is wrong";
  } else mes = "User wasn't found";

  res.json({ massage: mes, token }).status(201);
};

const addingCertif = async (req, res) => {
  const user = await Users.findById(req.user.id, "certificates");
  let certif = user.certificates.find((elem) => {
    return elem.subject == req.body?.addCertificate?.subject;
  });
  if (certif) {
    await Users.findByIdAndUpdate(req.user.id, {
      $pull: { certificates: { _id: certif._id } },
    });
  }
  const data = await Users.findByIdAndUpdate(req.user.id, {
    $push: { certificates: req.body.addCertificate },
  });
  res.json({ massage: "Certif Aded", data }).status(201);
};

//Show one admin by Id
const show = async (req, res, next) => {
  const data = await Users.findById(req.user.id);
  res.json({ massage: "User was found", data }).status(201);
};

// View schools
const schooling = async (req, res, next) => {
  let data = await Users.aggregate([
    { $group: { _id: "$school", total: { $sum: 1 } } },
  ]);
  res.json({ massage: "Schools", data }).status(201);
};

// View class
const classing = async (req, res, next) => {
  let data = await Users.aggregate([
    { $match: { school: req.params.one } },
    {
      $group: {
        _id: { degree: "$class.degree", letter: "$class.letter" },
        total: { $sum: 1 },
      },
    },
  ]);
  res.json({ massage: "Schools", data }).status(201);
};

// students of One class
const studenting = async (req, res, next) => {
  const degree = +req.params.class.split("-")[0];
  const letter = req.params.class.split("-")[1];

  let data = await Users.aggregate([
    { $match: { school: req.params.one } },
    { $match: { "class.degree": degree } },
    { $match: { "class.letter": letter } },
  ]);
  let obj = {
    Math: [],
    Biology: [],
    Physics: [],
    Geography: [],
  };
  data.map((elem) => {
    for (const key in obj) {
      let one = elem.certificates.find((c) => c.subject == key);
      if (one) {
        obj[key].push({
          score: one.score,
          name: elem.name,
          surname: elem.surname,
        });
      }
    }
  });

  res.json({ massage: "One class", data: obj }).status(201);
};

// get num of pupils of subject
const numOfpassed = async (req, res, next) => {
  let data = await Users.aggregate([
    { $match: { school: req.params.one } },
    {
      $group: {
        _id: "$certificates.subject",
      },
    },
  ]);
  let arr = [];
  data.forEach((elem) => {
    elem._id.forEach((e) => {
      arr.push(e);
    });
  });
  const count = {};
  arr.forEach((x) => {
    count[x] = (count[x] || 0) + 1;
  });
  arr = [];
  Object.keys(count).forEach((key) => {
    arr.push({
      sub: key,
      value: count[key],
    });
  });
  res.json({ massage: "Schools", arr }).status(201);
};

//Giving or creating certificate
const giveCertif = async (req, res) => {
  // Create the pdf document
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });
  //name
  const user = await Users.findById(req.user.id, "name surname certificates");
  const name = user.name + " " + user.surname;
  const subject = req.body.sub;
  let percent = user.certificates.find((elem) => elem.subject == subject).score;
  if (percent == null) percent = "0%";
  const writeStream = fs.createWriteStream(`./public/${name}.pdf`);

  doc.pipe(writeStream);
  doc.image("public/Certificate.png", 0, 0, { width: 842 });
  doc.font("public/fonts/LaBelleAurore-Regular.ttf");
  doc.fontSize(60).text(name, 20, 278, {
    align: "center",
  });
  doc.fontSize(15).text(name, 240, 362, {
    align: "center",
  });
  doc.fontSize(15).text(subject, -63, 382, {
    align: "center",
  });
  doc.fontSize(17).text(moment().format("MMMM Do YYYY"), -340, 478, {
    align: "center",
  });
  doc.fontSize(17).text("Quizz React App", 460, 478, {
    align: "center",
  });
  doc
    .font("public/fonts/OpenSans-VariableFont_wdth,wght.ttf")
    .fontSize(45)
    .text(percent, 73, 450, {
      align: "center",
    });
  doc.end();

  writeStream.on("finish", () => {
    res.sendFile(
      `${name}.pdf`,
      { root: path.join(__dirname, "../public") },
      (err) => {
        if (err) throw err;
        fs.unlinkSync(path.join(__dirname, "../public", `${name}.pdf`));
      }
    );
  });
};

module.exports = {
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
};
