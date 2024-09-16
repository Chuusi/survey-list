const Survey = require("../models/Survey.model");
const SurveyCompleted = require("../models/SurveyCompleted.model");

//! CREATE
const createSurveyCompleted = async (req, res, next) => {
    try {
        await SurveyCompleted.syncIndexes();

        // Nos traemos al autor y las respuestas del body, el id del param
        const { owner, surveyFull } = req.body.formData;
        const { id } = req.params;
        const originalSurvey = await Survey.findById(id);

        const newSurveyCompleted = {
            owner,
            surveyFull,
            originalSurvey: originalSurvey._id,
        };
        const createSurvey = new SurveyCompleted(newSurveyCompleted);

        const saveSurveyCompleted = await createSurvey.save();

        if (saveSurveyCompleted) {
            return res.status(200).json({
                message: "Encuesta completada y guardada",
                saveSurveyCompleted,
            });
        } else {
            return res.status(404).json({
                error: "No se guardó la encuesta contestada",
            });
        }
    } catch (error) {
        return (
            res.status(404).json({
                error: "Error al guardar la encuesta",
                message: error.message,
            }) && next(error)
        );
    }
};

//! GET
const getAllSurveysByID = async (req, res, next) => {
    try {
        //Nos traemos id del formulario original del params, y buscamos todos los formularios contestados, después, filtramos por id.
        const { id } = req.params;
        const allSurveysCompleted = await SurveyCompleted.find();

        if (allSurveysCompleted.length > 0) {
            const surveysFiltered = allSurveysCompleted.filter(
                (survey) => survey.originalSurvey == id
            );

            if (surveysFiltered.length > 0) {
                return res.status(200).json({
                    surveysFiltered,
                });
            } else {
                return res.status(200).json({
                    message: "No hay formularios rellenos aún.",
                });
            }
        } else {
            return res.status(404).json({
                error: "No se encontraron formularios rellenos.",
            });
        }
    } catch (error) {
        return res.status(404).json({
            error: "Ha habido un error al buscar los formularios",
            message: error.message,
        });
    }
};

//Añadir para obtener los formularios por números de respuestas
const getStatsSurveyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const survey = await Survey.findById(id);

        if (!survey) {
            return res.status(404).json({
                error: "No se ha encontrado el formulario",
            });
        } else {
            const surveyFilled = await SurveyCompleted.find();
            const surveySearched = surveyFilled.filter(
                (survey) => survey.originalSurvey == id
            );

            if (surveySearched.length > 0) {
                //Aquí tenemos un array de los formularios rellenos del formulario seleccionado

                //Nos creamos el objeto que vamos a devolver
                let answer = [];

                //Recorremos cada una de las preguntas del formulario
                for (let i = 0; i < survey.questions.length; i++) {
                    answer.push({ text: survey.questions[i].text });
                    answer[i].options = [];

                    //Recorremos cada una de las respuestas de la pregunta
                    for (
                        let j = 0;
                        j < survey.questions[i].options.length;
                        j++
                    ) {
                        answer[i].options.push({
                            answer: survey.questions[i].options[j],
                            num: 0,
                        });

                        //Recorremos los formularios contestados
                        for (let k = 0; k < surveySearched.length; k++) {
                            //Comprobamos que la respuesta encaja con el formulario relleno
                            if (
                                survey.questions[i].options[j] ==
                                surveySearched[k].surveyFull[i].answer
                            ) {
                                answer[i].options[j].num++;
                            }
                        }
                    }
                }
                return res.status(200).json({
                    answer,
                    title: survey.title,
                    total: surveySearched.length,
                });
            } else {
                return res.status(404).json({
                    error: "No se encontraron los resultados del formulario o no hay formularios rellenos aún",
                });
            }
        }
    } catch (error) {
        return res.status(404).json({
            error: "No se pudo obtener las respuestas",
            message: error.message,
        });
    }
};

module.exports = {
    createSurveyCompleted,
    getAllSurveysByID,
    getStatsSurveyById,
};
