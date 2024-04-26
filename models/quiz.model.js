const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = Quiz = mongoose.model("Quiz", QuizSchema);
