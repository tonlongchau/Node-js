import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { toJSON, paginate } from './plugins'
import { roles } from '../config/roles'

const workSchema = mongoose.Schema(
  {
    DOJ: {
      type: Date,
    },

    salary: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
workSchema.plugin(toJSON)
workSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The work's email
 * @param {ObjectId} [excludeworkId] - The id of the work to be excluded
 * @returns {Promise<boolean>}
 */
workSchema.statics.isEmailTaken = async function (email, excludeworkId) {
  const work = await this.findOne({ email, _id: { $ne: excludeworkId } })
  return !!work
}

/**
 * Check if password matches the work's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
workSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password)
}

workSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

/**
 * @typedef work
 */
const work = mongoose.model('work', workSchema)

export default work
