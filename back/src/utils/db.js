const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
    try {
        const db = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const { name, host } = db.connection;
        console.log(`✅ Conectados a la DB. Host: ${host} - Name: ${name} ✅`);
    } catch (error) {
        console.log("Error en la conexión con la DB", error);
    }
};

module.exports = { connect };
