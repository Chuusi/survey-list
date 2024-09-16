const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = new Schema({
    text: {
        type: String,
        required: true,
    },
    options: [{ type: String, required: true, minlength: 1 }],
});

// Creación del esquema del cuestionario
const SurveySchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        questions: [Question],
        owner: { type: String, minlength: 4 },
    },
    {
        timestamps: true,
    }
);

const Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;
