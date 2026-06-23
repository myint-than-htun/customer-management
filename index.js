
import express from 'express';
import { CustomError } from './utils/CustomError.js';
import { globalErrorHandler } from './controllers/error.controller.js';
import customerRouter from './routes/customer.routes.js'
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

const app = express();
app.use(express.json());

app.use('/api/v1/customers', customerRouter);

app.use((req, res, next) => {
    const err = new CustomError(`Cant't find ${req.originalUrl} on this server.`, 404);
    next(err);
})

app.use(globalErrorHandler);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on : http://${HOST}:${PORT}`);
});
