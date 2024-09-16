const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = new Schema({
    text: { type: String, required: true },
    answer: { type: String, required: true },
});

const SurveyCompletedSchema = new Schema({
    owner: { type: String },
    surveyFull: [Question],
    originalSurvey: { type: mongoose.Schema.Types.ObjectId, ref: "Survey" },
});

const SurveyCompleted = mongoose.model(
    "SurveyCompleted",
    SurveyCompletedSchema
);

module.exports = SurveyCompleted;
