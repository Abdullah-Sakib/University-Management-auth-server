import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRouter } from './app/modules/user/user.router';
import { AcademicSemisterRouter } from './app/modules/academicSemister/academicSemister.router';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users/', UserRouter);
app.use('/api/v1/academic-semisters/', AcademicSemisterRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
