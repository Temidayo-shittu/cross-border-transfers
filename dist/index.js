"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./db/data-source");
//Middleware
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.json('Established connection!');
});
app.use(not_found_1.notFoundMiddleware);
app.use(error_handler_1.errorHandlerMiddleware);
const PORT = process.env.PORT || 3000;
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
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
