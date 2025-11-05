const { model, Schema } = require("mongoose");
module.exports = model(
  'Users',
  Schema({
    name: String,
    surname: String,
    school: {
      type: String
    },
    class: {
        degree: Number,
        letter: String
      },
    email: {
      type: String,
      unique: true
    },
    password: String,
    certificates: [
      {
        score: Number,
        subject: {
          type: String,
          enum: ["Math", "Biology", "Physics", "Geagraphy"]
        }
      }
    ]
  })
);
