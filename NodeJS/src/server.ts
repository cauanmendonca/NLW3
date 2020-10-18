import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import path from 'path';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST',
    optionsSuccessStatus: 204
}));
//Habilitar o uso de Json no request
app.use(express.json());
app.use(routes);
app.use(errorHandler);

//Retornar a imagem em si
app.use('/uploads',express.static(path.join(__dirname,'../','uploads')))

app.listen(process.env.PORT);