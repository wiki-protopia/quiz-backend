const Quiz = require("../models/quiz.model");

exports.fetchQuiz = (req, res) => {
  Quiz.find({}).then(data => {
   res.status(200).json(data);
  }).catch(err => {
    if (err) {
      console.log("[fetchQuiz]", err);
    }
  })
};

exports.insertQuiz = async (req, res, next) => {
  try {
    await Quiz.create({
        question: req.body.question,
        answer: req.body.answer
      });
    res.status(200).json({msg: "Success"})
  }
  catch(e) {
    console.log(e);
  }

};

exports.updateQuiz = (req, res, next) => {
  res.status(200).json({msg: "Update Quiz"});

};

exports.deleteQuiz = (req, res, next) => {
  // res.status(200).json({msg: "Delete Quiz"});
};
