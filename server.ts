import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './dbConfig';




const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()



const PORT =  6000;
dbConnection()
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;