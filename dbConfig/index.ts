import mongoose from "mongoose";

const dbConnection = async () => {
    try{
        // Get uri from .env file
        const mongoUri = process.env.MONGO_URI;
    
        if (!mongoUri) {
            //throw error if uri is not defined
            throw new Error("MONGO_URI is not defined");
        }
        //connect to mongoDb
        await mongoose.connect(mongoUri);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("Error in DB Connection", error);
    }
}

export default dbConnection;