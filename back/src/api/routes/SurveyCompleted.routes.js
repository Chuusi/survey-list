const {
    createSurveyCompleted,
    getAllSurveysByID,
    getStatsSurveyById,
} = require("../controllers/SurveyCompleted.controller");

const SurveyCompletedRoutes = require("express").Router();

//! POST
SurveyCompletedRoutes.post("/createSurveyCompleted/:id", createSurveyCompleted);

//! GET
SurveyCompletedRoutes.get("/surveysCompletedById/:id", getAllSurveysByID);
SurveyCompletedRoutes.get("/statsSurvey/:id", getStatsSurveyById);

module.exports = SurveyCompletedRoutes;
