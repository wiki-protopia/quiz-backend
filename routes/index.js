const quizRoutes = require("./quiz.route");
const userRoutes = require("./user.route");

module.exports = (app) => {
    app.use("/quiz", quizRoutes);
    app.use("/user", userRoutes)
}