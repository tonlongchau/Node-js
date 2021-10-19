import 'colors'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'

import errorHandler from './middleware/error'
import db from './config/db'
import routes from './routes/v1/_index'
import rateLimit from './config/rateLimit'
import config from './config/config'

// Init express app
const app = express()

// Connect to database
db.connect()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === ' development') {
  app.use(morgan('dev'))
}
// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting

app.use(rateLimit)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// v1 api routes
app.use('/v1', routes)

// Error response
app.use(errorHandler)

const server = app.listen(
  config.port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode at http://localhost:${config.port}`
      .yellow.bold
  )
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})
