import 'reflect-metadata';// esse import precisa sempre ser na primeira linha
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/appError';
import 'src/shared/typeorm';
import {errors} from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((error: Error, request: Request, response: Response, next: NextFunction) =>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});
app.listen(3333, () => {
    console.log('Server listening on port 3333');
})


