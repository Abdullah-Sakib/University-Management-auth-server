import express, { Application } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.router'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', usersRouter)

// Global error handler
app.use(globalErrorHandler)

export default app
