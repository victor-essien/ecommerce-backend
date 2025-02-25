import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './dbConfig';
import router from './routes/index';
import errorMiddleware from './middleware/errorMiddleware';
import { sendNomail } from './utils/sendEmail';



const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()
app.use(router);
app.use(errorMiddleware)


const PORT =  6000;
dbConnection()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;