// Importamos el modelo
const Survey = require("../models/Survey.model");

//! CREATE
const createSurvey = async (req, res, next) => {
    try {
        await Survey.syncIndexes();

        // Guardamos el formulario trayéndonos el body del req

        const { formData } = req.body;

        const newSurvey = new Survey(formData);

        const saveSurvey = await newSurvey.save();

        if (saveSurvey) {
            return res.status(200).json({
                message: "Encuesta creada",
                saveSurvey,
            });
        } else {
            return res.status(404).json({
                error: "Error al guardar la encuesta",
            });
        }
    } catch (error) {
        return (
            res.status(404).json({
                error: "Error en la creación de la encuesta",
                message: error.message,
            }) && next(error)
        );
    }
};

//! GETS
const getAllSurveys = async (req, res, next) => {
    try {
        const allSurveys = await Survey.find();
        if (allSurveys.length > 0) {
            return res.status(200).json(allSurveys);
        } else {
            return res.status(404).json({
                error: "No se han encontrado formularios",
            });
        }
    } catch (error) {
        return res.status(404).json({
            error: "Error buscando formularios",
            message: error.message,
        });
    }
};

const getSurveyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const surveyById = await Survey.findById(id);
        if (surveyById) {
            return res.status(200).json(surveyById);
        } else {
            return res.status(404).json({
                error: "No se encontró el formulario",
            });
        }
    } catch (error) {
        return res.status(404).json({
            error: "Error al buscar el formulario",
            message: error.message,
        });
    }
};

//! UPDATE
//En caso de querer añadirlo

//! DELETE
const deleteSurvey = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Survey.findByIdAndDelete(id);

        if (await Survey.findById(id)) {
            //Testing
            return res.status(404).json({
                error: "No se borró correctamente",
            });
        } else {
            return res.status(200).json({
                message: "Formulario borrado",
            });
        }
    } catch (error) {
        return res.status(404).json({
            error: "Error al borrar el formulario",
            message: error.message,
        });
    }
};

module.exports = {
    createSurvey,
    getAllSurveys,
    getSurveyById,
    deleteSurvey,
};
