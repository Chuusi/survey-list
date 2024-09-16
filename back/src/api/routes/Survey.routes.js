const {
    createSurvey,
    getAllSurveys,
    getSurveyById,
    deleteSurvey,
} = require("../controllers/Survey.controller");

const SurveyRoutes = require("express").Router();

//! POST
SurveyRoutes.post("/createSurvey", createSurvey);

//! GET
SurveyRoutes.get("/surveyById/:id", getSurveyById);
SurveyRoutes.get("/allSurveys", getAllSurveys);

//! DELETE
SurveyRoutes.delete("/deleteSurvey/:id", deleteSurvey);

module.exports = SurveyRoutes;
