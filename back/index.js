// Importamos express y dotenv
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

// Conexión a la DB
const { connect } = require("./src/utils/db");
connect();

// Creamos servidor express
const app = express();

// Limitaciones del server
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

var cors = require("cors");
app.use(cors());

// Traemos las rutas
const SurveyRoutes = require("./src/api/routes/Survey.routes");
app.use("/survey", SurveyRoutes);

const SurveyCompletedRoutes = require("./src/api/routes/SurveyCompleted.routes");
app.use("/surveyCompleted", SurveyCompletedRoutes);

// Error de ruta
app.use("*", (req, res, next) => {
    const error = new Error("❌ Ruta no encontrada ❌");
    error.status = 404;
    return next(error);
});

// Escuchamos al servidor en el puerto designado
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto "http://localhost:${PORT}"`);
});
