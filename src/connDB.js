import mongoose from "mongoose";
import { config } from "./config/config.js"

mongoose.set('strictQuery', false);

export const connDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log(`DB conectada...!!!`);
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`);
    }
}