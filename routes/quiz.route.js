const express = require("express");
const quizController = require("../controllers/quiz.controller"); 

const router = express.Router();

router.get("/", quizController.fetchQuiz);
router.post("/", quizController.insertQuiz);
router.put ("/:id", quizController.updateQuiz);
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;