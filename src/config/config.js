import dotenv from 'dotenv'
import { object, mixed, number, string } from 'yup'

dotenv.config()

const envVarsSchema = object({
  NODE_ENV: mixed().oneOf(['production', 'development', 'test']).required(),
  PORT: number().default(8888),
  MONGODB_URI: string().required(), // Mongo DB url
  JWT_SECRET: string().required(), // JWT secret key
  JWT_ACCESS_EXPIRATION_MINUTES: number().default(30), // minutes after which access tokens expire
  JWT_REFRESH_EXPIRATION_DAYS: number().default(30), // days after which refresh tokens expire
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: number().default(10), // minutes after which reset password token expires
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: number().default(10), // minutes after which verify email token expires
  SMTP_HOST: string(), // server that will send the emails
  SMTP_PORT: number(), // port to connect to the email server
  SMTP_USERNAME: string(), // username for email server
  SMTP_PASSWORD: string(), // password for email server
  EMAIL_FROM: string(), // the from field in the emails sent by the app
}).noUnknown()

envVarsSchema
  .validate(process.env)
  .catch(error => new Error(`Config validation error: ${error.message}`))
const envVars = envVarsSchema.validateSync(process.env)

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodb_uri: envVars.MONGODB_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
}

export default config
