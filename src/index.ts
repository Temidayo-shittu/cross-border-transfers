import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from './db/data-source';
//Middleware
import { notFoundMiddleware } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';

const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json());

    app.get('/', (req, res) => {
    return res.json('Established connection!');
  });

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
 }).catch((error:any) => {
    console.error("Error connecting to the database:", error);
  });



/*
AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
 }).catch((error:any) => {
    console.error("Error connecting to the database:", error);
  });
*/