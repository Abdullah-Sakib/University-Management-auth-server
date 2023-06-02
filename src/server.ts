import mongoose from 'mongoose'
import app from './app'
import confit from './config/index'
import { logger, errorlogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(confit.database_url as string)
    logger.info('✅ Database connected successfully')
    app.listen(confit.port, () => {
      logger.info(`Application listening on port ${confit.port}`)
    })
  } catch (err) {
    errorlogger.error('❌ Failed to connect database.', err)
  }
}

bootstrap()
