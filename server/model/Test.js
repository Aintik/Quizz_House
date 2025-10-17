const { model, Schema } = require("mongoose");
module.exports = model(
  "Tests",
  Schema({
    subject: {
      type: String,
      required: true,
      enum: ["Math", "Biology", "Physics", "Geography"]
    },
    dificulty: {
      type: Number,
      required: true,
      default: 5
    },
    question: {
      type: String,
      required: true
    },
      options: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length == 4
    },
    answer: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D"]
    }
  })
);
