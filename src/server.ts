import mongoose from 'mongoose'
import app from './app'
import confit from './config/index'

async function bootstrap() {
  try {
    await mongoose.connect(confit.database_url as string)
    console.log('✅ Database connected successfully')
    app.listen(confit.port, () => {
      console.log(`Application listening on port ${confit.port}`)
    })
  } catch (err) {
    console.log('❌ Failed to connect database.', err)
  }
}

bootstrap()
