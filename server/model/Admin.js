const { model, Schema } = require("mongoose");
module.exports = model(
  "Admins",
  Schema({
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);
