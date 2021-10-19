import mongoose from 'mongoose'
import config from './config'

const connect = async () => {
  const options = {}
  const conn = await mongoose.connect(config.mongodb_uri, options)
  console.log(`MongDB Connected: ${conn.connection.host}`.cyan.underline)
}
export default { connect }
